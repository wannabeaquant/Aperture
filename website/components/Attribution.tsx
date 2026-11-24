'use client';
import { useEffect } from 'react';
import { firstTouch } from '@/lib/attrib';

const kindOf = (href: string) =>
  /wa\.me|whatsapp\.com/.test(href) ? 'whatsapp_click'
    : href.startsWith('tel:') ? 'call_click'
    : /calendly\.com/.test(href) ? 'booking_click'
    : href.startsWith('mailto:') ? 'email_click' : '';

/** Records the visit's first-touch source and beacons contact clicks (WhatsApp, call, booking, email). */
export default function Attribution() {
  useEffect(() => {
    firstTouch();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const kind = kindOf(a.getAttribute('href') || '');
      if (!kind) return;
      const body = JSON.stringify({ kind, page: location.pathname.slice(0, 120), src: firstTouch() });
      try { navigator.sendBeacon('/api/event', new Blob([body], { type: 'application/json' })); } catch { /* ignore */ }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
