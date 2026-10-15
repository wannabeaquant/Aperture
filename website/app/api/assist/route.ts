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

  const key = process.env.GROQ_API_KEY;
  if (!key || text.trim().length < 3) return NextResponse.json({ ok: true, ...keywordAssist(text), via: 'fallback' });

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        temperature: 0.2, max_tokens: 220,
        response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: text }],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
    const services = Array.isArray(parsed.services) ? parsed.services.filter((s: string) => serviceNames.includes(s)).slice(0, 3) : [];
    const summary = typeof parsed.summary === 'string' && parsed.summary ? parsed.summary.slice(0, 220) : keywordAssist(text).summary;
    const question = typeof parsed.question === 'string' ? parsed.question.slice(0, 140) : '';
    return NextResponse.json({ ok: true, summary, services, question, via: 'ai' });
  } catch {
    return NextResponse.json({ ok: true, ...keywordAssist(text), via: 'fallback' });
  }
}
