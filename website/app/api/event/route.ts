import { NextRequest, NextResponse } from 'next/server';
import { logLead } from '@/lib/leadlog';

export const runtime = 'nodejs';

const KINDS = new Set(['whatsapp_click', 'call_click', 'booking_click', 'email_click']);

/** Contact-click beacon: records which channel was clicked, on which page, and where the visit came from. */
export async function POST(req: NextRequest) {
  let b: Record<string, unknown> = {};
  try { b = JSON.parse(await req.text()); } catch { return new NextResponse(null, { status: 204 }); }
  const kind = String(b.kind || '');
  if (!KINDS.has(kind)) return new NextResponse(null, { status: 204 });
  await logLead({ kind, page: String(b.page || '').slice(0, 120), src: String(b.src || '').slice(0, 300) });
  return new NextResponse(null, { status: 204 });
}
