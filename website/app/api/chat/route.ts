import { NextRequest, NextResponse } from 'next/server';
import { retrieve } from '@/lib/retrieve';
import { chunks } from '@/lib/data';

export const runtime = 'nodejs';

const hits = new Map<string, number[]>();
function limited(ip: string, max = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}

const SYSTEM = `You are "Ask Aperture", the assistant on the Aperture website. Aperture is a two-founder studio that builds AI automation, voice agents, operating software and apps, and is known for delivering quality work at very high speed.

You can answer in two ways:
1) GENERAL questions (what an AI agent or voice agent is, how automation helps a business, how to approach a project, small talk): answer helpfully and briefly from your own knowledge. Do not cite sources for these.
2) Questions about APERTURE ITSELF (its work, clients, services, process, timelines, contact, pricing): use ONLY the numbered sources below. Cite each claim with its source number in square brackets, like [1] or [2][3]. Only cite a source you actually used.

Rules:
- Never invent facts about Aperture: no clients, numbers, projects, prices, timelines or guarantees beyond the sources. If a question about Aperture is not covered by the sources, say you do not have that and that the founders can answer directly. Do not cite anything for that.
- If asked why to choose Aperture or how it compares, talk about speed and quality: quality delivered at very high speed, with both founders on every project, drawing on the sources.
- When asked about speed, how fast, delivery or timelines, lead with speed and quality and give the timelines exactly as written in the sources, framed as typical, with the exact timeline confirmed after scoping. For a timeline the sources do not cover (for example voice agents or apps), say it depends on scope and the founders will give a figure.
- Never claim Aperture is better, cheaper or faster than other agencies or any named competitor. Describe what Aperture does and how quickly it typically delivers, without comparing.
- If asked about pricing, say pricing is not published and to ask the founders.
- Repeat figures and counts exactly as written in the sources. Figures marked as an estimate or planning model must be described that way.
- If the visitor names a company that does not appear in the sources, say it does not appear among the work listed on this site. Never say the site covers no clients, because it lists many.
- If a question is clearly unrelated to business, technology or Aperture, answer in one short line and steer back to how you can help.
- Keep answers to 2 to 4 short sentences in plain, natural language. No marketing language, no em dashes.`;

type Msg = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  let body: { messages?: Msg[] };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const msgs = (body.messages || []).filter((m) => m && typeof m.content === 'string').slice(-6)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, content: m.content.slice(0, 500) }));
  const lastUser = [...msgs].reverse().find((m) => m.role === 'user')?.content || '';
  if (!lastUser.trim()) return NextResponse.json({ ok: false }, { status: 400 });

  // Retrieve from the visitor's last two questions so follow-ups like "and the price?" still find context.
  const userTurns = msgs.filter((m) => m.role === 'user').slice(-2).map((m) => m.content).join(' ');
  const found = retrieve(lastUser, 3).length ? retrieve(userTurns, 3) : retrieve(lastUser, 3);
  // Always keep the brand basics in context so positioning and speed questions have something true to draw on.
  const base = chunks.filter((c) => c.id === 'speed' || c.id === 'who');
  const merged = [...found, ...base.filter((b) => !found.some((f) => f.id === b.id))];
  const sources = merged.map((c, i) => ({ n: i + 1, id: c.id, title: c.title, href: c.href, text: c.text }));

  const account = process.env.CF_ACCOUNT_ID, token = process.env.CF_API_TOKEN;
  // No AI available: fall back to quoting the best matching passages, or say it is not covered.
  if (!account || !token || limited(ip)) {
    const quote = sources.filter((x) => found.some((f) => f.id === x.id));
    return NextResponse.json({ ok: true, answer: null, sources: quote, via: quote.length ? 'quotes' : 'none' });
  }

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const context = sources.map((s) => `[${s.n}] ${s.title}: ${s.text}`).join('\n\n');
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        model: process.env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
        temperature: 0.2, max_tokens: 260,
        messages: [
          { role: 'system', content: `${SYSTEM}\n\nSOURCES:\n${context}` },
          ...msgs.slice(0, -1).slice(-4),
          { role: 'user', content: lastUser },
        ],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    let answer: string = (data.choices?.[0]?.message?.content || '').trim();
    if (!answer) throw new Error('empty');
    answer = answer.replace(/\s*[—–]\s*/g, ', ').slice(0, 900);
    // A "not covered" answer asserts nothing from the site, so it carries no citations or sources.
    if (/does not (appear|cover)|not covered|do not cover/i.test(answer) && !/days?|week/i.test(answer)) {
      return NextResponse.json({ ok: true, answer: answer.replace(/\s*\[\d\]/g, ''), sources: [], human: true, via: 'ai' });
    }

    // Show only the sources the model actually cited. General answers cite nothing.
    const cited = new Set([...answer.matchAll(/\[(\d)\]/g)].map((m) => Number(m[1])));
    const used = sources.filter((x) => cited.has(x.n));
    const human = /founders/i.test(answer);
    if (!used.length) answer = answer.replace(/\s*\[\d\]/g, '');
    return NextResponse.json({ ok: true, answer, sources: used, human, via: 'ai' });
  } catch {
    const quote = sources.filter((x) => found.some((f) => f.id === x.id));
    return NextResponse.json({ ok: true, answer: null, sources: quote, via: quote.length ? 'quotes' : 'none' });
  }
}
