import { NextRequest, NextResponse } from 'next/server';
import { keywordAssist, serviceNames } from '@/lib/contact';

export const runtime = 'nodejs';

// Small in-memory limiter. Good enough per warm instance; use a shared store if traffic grows.
const hits = new Map<string, number[]>();
function limited(ip: string, max = 12, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}

const SYSTEM = `You help a visitor to the Aperture website describe what they want built. Aperture is a two-founder studio that builds: ${serviceNames.join(', ')}.
Return ONLY JSON: {"summary": string, "services": string[], "question": string}.
- summary: one plain sentence restating what the visitor wants, in their own terms, written without "I" or "you" (for example "Wants a WhatsApp bot to answer repeated customer questions."). No marketing language.
- services: up to 3 items chosen ONLY from the list above, most relevant first. Empty array if unclear.
- question: ONE short optional follow-up that would help the founders (for example about tools they use or team size), or an empty string.
Never mention prices, timelines, guarantees or capabilities beyond the list. Do not invent details the visitor did not give.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  let body: { text?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const text = String(body.text || '').slice(0, 600);
  if (limited(ip)) return NextResponse.json({ ok: true, ...keywordAssist(text), via: 'fallback' });

  const account = process.env.CF_ACCOUNT_ID, token = process.env.CF_API_TOKEN;
  if (!account || !token || text.trim().length < 3) return NextResponse.json({ ok: true, ...keywordAssist(text), via: 'fallback' });

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    // Cloudflare Workers AI, OpenAI-compatible endpoint (same one the lead funnel uses).
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        model: process.env.CF_AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
        temperature: 0.2, max_tokens: 220,
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: text }],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const raw: string = data.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1) || '{}');
    const services = Array.isArray(parsed.services) ? parsed.services.filter((x: string) => serviceNames.includes(x)).slice(0, 3) : [];
    const summary = typeof parsed.summary === 'string' && parsed.summary ? parsed.summary.slice(0, 220) : keywordAssist(text).summary;
    const question = typeof parsed.question === 'string' ? parsed.question.slice(0, 140) : '';
    return NextResponse.json({ ok: true, summary, services, question, via: 'ai' });
  } catch {
    return NextResponse.json({ ok: true, ...keywordAssist(text), via: 'fallback' });
  }
}
