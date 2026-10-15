'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clients } from '@/lib/data';

const items = [
  { l: 'Home', h: '/', k: 'start landing' },
  { l: 'Work', h: '/work', k: 'clients case studies projects' },
  { l: 'Services', h: '/services', k: 'what we build voice agents automation' },
  { l: 'Studio', h: '/studio', k: 'about founders process partners agencies' },
  { l: 'Contact', h: '/contact', k: 'book call email scope' },
  ...clients.map((c) => ({ l: c.name, h: `/work/${c.slug}`, k: `${c.sector} client work` })),
  { l: 'Email Atharva', h: 'mailto:atharvasingh0405@gmail.com', k: 'atharva singh email' },
  { l: 'Email Sanidhya', h: 'mailto:shishodiasanidhya@gmail.com', k: 'sanidhya shishodia email' },
];

export default function Palette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const res = useMemo(() => {
    const t = q.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((it) => t.every((w) => (it.l + ' ' + it.k).toLowerCase().includes(w)));
  }, [q]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); } };
    const o = () => setOpen(true);
    window.addEventListener('keydown', k);
    window.addEventListener('aperture:palette', o);
    return () => { window.removeEventListener('keydown', k); window.removeEventListener('aperture:palette', o); };
  }, []);

  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (open && !d.open) { d.showModal(); setQ(''); setI(0); }
    if (!open && d.open) d.close();
  }, [open]);

  const go = (h: string) => { setOpen(false); if (h.startsWith('mailto')) location.href = h; else router.push(h); };

  return (
    <dialog ref={ref} className="pal" data-lenis-prevent onClose={() => setOpen(false)} onClick={(e) => { if (e.target === ref.current) setOpen(false); }}>
      <input autoFocus placeholder="Jump to a page, a case study, a founder" value={q} aria-label="Search"
        onChange={(e) => { setQ(e.target.value); setI(0); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(x + 1, res.length - 1)); }
          if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(x - 1, 0)); }
          if (e.key === 'Enter' && res[i]) go(res[i].h);
        }} />
      <ul>
        {res.map((r, n) => (
          <li key={r.h + r.l}>
            <button className={n === i ? 'on' : ''} onMouseEnter={() => setI(n)} onClick={() => go(r.h)}>
              <span>{r.l}</span><span className="mono">{r.h.startsWith('mailto') ? 'email' : r.h}</span>
            </button>
          </li>
        ))}
        {res.length === 0 && <li className="muted" style={{ padding: 16 }}>Nothing matches. Try Ask Aperture, bottom right.</li>}
      </ul>
    </dialog>
  );
}
