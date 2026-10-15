import { NextRequest, NextResponse } from 'next/server';
import { retrieve } from '@/lib/retrieve';

export const runtime = 'nodejs';

const hits = new Map<string, number[]>();
function limited(ip: string, max = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}

const SYSTEM = `You are "Ask Aperture", the assistant on the Aperture website. Aperture is a two-founder studio that builds AI automation, voice agents, operating software and apps.
Answer the visitor's question using ONLY the numbered sources provided. Rules:
- Cite every claim with its source number in square brackets, like [1] or [2][3].
- If the sources do not answer the question, say plainly that this site does not cover it and that the founders can answer directly. Do not guess.
- Keep it to 2 to 4 short sentences in plain, natural language. No marketing language, no lists unless asked.
- Never state prices, timelines, guarantees or capabilities that are not in the sources. If asked about pricing, say pricing is not published and to ask the founders.
- Never invent clients, numbers or projects. Figures marked as an estimate or planning model must be described that way.
- Repeat figures and counts exactly as written in the sources. Never add, merge or reinterpret numbers or languages.
- If the visitor names a company that does not appear in the sources, say it does not appear among the work listed on this site and suggest asking the founders. Never say the site covers no clients, because it lists many.
- Only cite a source for something it actually says. Do not cite a source for a statement that something is not covered.
- Do not use em dashes.`;

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
  const sources = found.map((c, i) => ({ n: i + 1, id: c.id, title: c.title, href: c.href, text: c.text }));

  // Nothing relevant on the site: do not call the model, so it cannot make something up.
  if (!sources.length) return NextResponse.json({ ok: true, answer: null, sources: [], via: 'none' });
  if (limited(ip)) return NextResponse.json({ ok: true, answer: null, sources, via: 'quotes' });

  const account = process.env.CF_ACCOUNT_ID, token = process.env.CF_API_TOKEN;
  if (!account || !token) return NextResponse.json({ ok: true, answer: null, sources, via: 'quotes' });

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

    // Keep only the sources the model actually cited; if it cited none, show what it was given.
    const cited = new Set([...answer.matchAll(/\[(\d)\]/g)].map((m) => Number(m[1])));
    const used = sources.filter((s) => cited.has(s.n));
    // An honest "not covered" answer cites nothing, so show no source chips under it.
    const notCovered = !used.length && /does not (appear|cover)|not covered|not published|ask the founders/i.test(answer);
    return NextResponse.json({ ok: true, answer, sources: notCovered ? [] : used.length ? used : sources, via: 'ai' });
  } catch {
    return NextResponse.json({ ok: true, answer: null, sources, via: 'quotes' });
  }
}
