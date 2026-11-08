import { NextRequest, NextResponse } from 'next/server';
import { chunks } from '@/lib/data';

export const runtime = 'nodejs';

const hits = new Map<string, number[]>();
function limited(ip: string, max = 30, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}

// The whole fact sheet is small, so the model always sees all of it instead of a keyword-picked slice.
const FACTS = chunks.map((c) => `- ${c.title}: ${c.text}`).join('\n');

const SYSTEM = `You are the assistant on the website of Aperture, a two-founder studio in India that builds AI automation, AI agents, voice agents, chat and WhatsApp bots, websites, apps and internal software. Your job is to help the visitor quickly and get them talking to the founders.

How to talk:
- Sound like a sharp, friendly person on the team, not a search engine. Plain words, 1 to 3 short sentences. No lists unless asked. No em dashes. No citations, brackets, "according to the site" or "the sources say".
- Answer what they asked first. Then, when it fits, ask ONE short question that moves things forward: what they want automated, what tools they use, how many people or calls or leads are involved, or when they need it.
- If they describe a problem, say concretely how Aperture would approach it in one or two sentences, mention a relevant past project only if it truly fits, and give the typical timeline if one exists.
- When they seem interested, want pricing, a call or next steps, suggest they leave their name and WhatsApp or email in the chat so a founder replies the same day.
- General questions (what an AI agent is, is n8n good, voice AI in Hindi) are fine: answer briefly from your own knowledge, then relate it back to what they might need.

Facts about Aperture (use them naturally, never quote them verbatim, never go beyond them):
${FACTS}

Hard rules:
- Never invent clients, numbers, prices, guarantees or timelines. Pricing is not published: say it depends on scope and a founder will quote after a short call.
- Figures described as a planning model or estimate must be called estimates.
- If you do not know something about Aperture, say a founder can answer it and invite them to leave their contact.
- If a named company is not in the facts, do not claim to have worked with it.
- Do not disparage or compare against named competitors.`;

type Msg = { role: 'user' | 'assistant'; content: string };

const FALLBACK = 'Happy to help with that. Tell me a bit about what you want automated or built, and leave your name and WhatsApp or email here so one of the founders can reply today.';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  let body: { messages?: Msg[] };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const msgs = (body.messages || []).filter((m) => m && typeof m.content === 'string' && m.content.trim()).slice(-10)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, content: m.content.slice(0, 800) }));
  if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return NextResponse.json({ ok: false }, { status: 400 });

  const account = process.env.CF_ACCOUNT_ID, token = process.env.CF_API_TOKEN;
  if (!account || !token || limited(ip)) return NextResponse.json({ ok: true, answer: FALLBACK, via: 'fallback' });

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        model: process.env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
        temperature: 0.4, max_tokens: 220,
        messages: [{ role: 'system', content: SYSTEM }, ...msgs],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    let answer: string = (data.choices?.[0]?.message?.content || '').trim();
    if (!answer) throw new Error('empty');
    // Strip anything citation-shaped the model might still emit, and em/en dashes.
    answer = answer.replace(/\s*\[\d+\]/g, '').replace(/\s*[—–]\s*/g, ', ').slice(0, 900);
    return NextResponse.json({ ok: true, answer, via: 'ai' });
  } catch {
    return NextResponse.json({ ok: true, answer: FALLBACK, via: 'fallback' });
  }
}
