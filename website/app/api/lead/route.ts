import { NextRequest, NextResponse } from 'next/server';
import { isEmail, normalisePhone } from '@/lib/contact';

export const runtime = 'nodejs';

const hits = new Map<string, number[]>();
function limited(ip: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}

const clean = (v: unknown, n: number) => String(v ?? '').replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, n);

/** Deliver the brief to the founders on every channel that is configured. Returns how many succeeded. */
async function notify(text: string, click: string | null) {
  const jobs: Promise<boolean>[] = [];
  const topic = process.env.NTFY_TOPIC;
  if (topic) {
    jobs.push(fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: 'POST', body: text,
      headers: { Title: 'New Aperture enquiry', Priority: 'high', Tags: 'zap', ...(click ? { Click: click } : {}) },
    }).then((r) => r.ok).catch(() => false));
  }
  const tg = process.env.TELEGRAM_BOT_TOKEN, chats = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (tg && chats.length) {
    for (const id of chats) {
      jobs.push(fetch(`https://api.telegram.org/bot${tg}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: id, text, disable_web_page_preview: true }),
      }).then((r) => r.ok).catch(() => false));
    }
  }
  const rs = process.env.RESEND_API_KEY, to = (process.env.LEAD_EMAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (rs && to.length) {
    jobs.push(fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${rs}` },
      body: JSON.stringify({ from: process.env.RESEND_FROM || 'Aperture site <onboarding@resend.dev>', to, subject: 'New Aperture enquiry', text }),
    }).then((r) => r.ok).catch(() => false));
  }
  const results = await Promise.all(jobs);
  return results.filter(Boolean).length;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, reason: 'bad_request' }, { status: 400 }); }

  // Honeypot: real visitors never fill this. Pretend success so bots learn nothing.
  if (clean(b.website, 50)) return NextResponse.json({ ok: true, delivered: 0 });
  if (limited(ip)) return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });

  const contactRaw = clean(b.contact, 120);
  const phone = normalisePhone(contactRaw);
  const email = isEmail(contactRaw) ? contactRaw : '';
  if (!phone && !email) return NextResponse.json({ ok: false, reason: 'contact' }, { status: 400 });

  const name = clean(b.name, 80);
  const need = clean(b.need, 600);
  const summary = clean(b.summary, 240);
  const services = Array.isArray(b.services) ? (b.services as unknown[]).map((s) => clean(s, 40)).filter(Boolean).slice(0, 4) : [];
  const note = clean(b.note, 400);
  const page = clean(b.page, 120);
  const askedHuman = Boolean(b.askedHuman);

  const wa = phone ? `https://wa.me/${phone}` : null;
  const text = [
    `New enquiry from aperturecm.in${askedHuman ? '  (asked for a human)' : ''}`,
    name && `Name / company: ${name}`,
    `Contact: ${phone ? `+${phone}  ${wa}` : email}`,
    summary && `Wants: ${summary}`,
    need && need !== summary && `Their words: ${need}`,
    services.length ? `Services: ${services.join(', ')}` : '',
    note && `Extra: ${note}`,
    page && `Page: ${page}`,
  ].filter(Boolean).join('\n');

  const delivered = await notify(text, wa);
  if (!delivered) return NextResponse.json({ ok: false, reason: 'not_delivered' }, { status: 202 });
  return NextResponse.json({ ok: true, delivered });
}
