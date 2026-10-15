'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { chunks, Chunk, founders } from '@/lib/data';
import { starter, waLink } from '@/lib/contact';

const WANTS_HUMAN = /price|pricing|cost|quote|budget|hire|talk|call|whatsapp|contact|human|person|speak|reach|meet|book|demo/i;

const STOP = new Set('a an the is are do does you your we our of to for and or in on with how what who can i it me us about tell please have has'.split(' '));
const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9/ ]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w));

function retrieve(q: string): Chunk[] {
  const qt = tok(q);
  if (!qt.length) return [];
  return chunks
    .map((c) => {
      const body = tok(c.text + ' ' + c.title);
      const keys = tok(c.keys);
      let s = 0;
      for (const w of qt) { if (keys.includes(w)) s += 3; if (body.includes(w)) s += 1; }
      return { c, s };
    })
    .filter((x) => x.s >= 3)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .map((x) => x.c);
}

type Msg = { from: 'you' | 'bot'; text?: string; hits?: Chunk[]; cta?: boolean };
const starters = ['What do you build?', 'Have you built voice agents?', 'How do you work with agencies?', 'How do I reach the founders?'];

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [m, setM] = useState<Msg[]>([]);
  const end = useRef<HTMLDivElement>(null);

  const ask = (text: string) => {
    if (!text.trim()) return;
    const hits = retrieve(text);
    const cta = WANTS_HUMAN.test(text) || hits.length === 0;
    setM((p) => [...p, { from: 'you', text }, hits.length ? { from: 'bot', hits, cta } : { from: 'bot', text: 'That is not covered on this site, so I will not guess. The founders can answer it directly.', cta: true }]);
    setQ('');
    setTimeout(() => end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 30);
  };

  return (
    <>
      <button className={`ask-fab ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} aria-label="Open Ask Aperture"><span className="dot" />Ask Aperture</button>
      <section className={`ask ${open ? 'open' : ''}`} aria-label="Ask Aperture" aria-hidden={!open}>
        <header>
          <div><p className="mono">Ask Aperture</p><p className="mono">Answers quoted from this site only. Not a person.</p></div>
          <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </header>
        <div className="ask-body" aria-live="polite">
          {m.length === 0 && <div className="starters">{starters.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}</div>}
          {m.map((x, n) => x.from === 'you' ? <p key={n} className="you">{x.text}</p> : (
            <div key={n} className="bot">
              {x.text && <p>{x.text}</p>}
              {x.hits?.map((h) => (
                <blockquote key={h.id}>
                  <p>{h.text}</p>
                  <Link href={h.href} className="mono ulink" onClick={() => setOpen(false)}>Source: {h.title} →</Link>
                </blockquote>
              ))}
              {x.cta && (
                <div className="cta-row">
                  {founders.map((f) => (<a key={f.name} className="btn k" href={waLink(f.phone, starter)} target="_blank" rel="noreferrer">WhatsApp {f.name.split(' ')[0]}</a>))}
                  <Link href="/contact" className="btn" onClick={() => setOpen(false)}>Leave a quick brief</Link>
                </div>
              )}
            </div>
          ))}
          <div ref={end} />
        </div>
        <div className="ask-human mono">PREFER A PERSON? {founders.map((f, i) => (<span key={f.name}>{i ? ' / ' : ''}<a className="ulink" href={waLink(f.phone, starter)} target="_blank" rel="noreferrer">{f.name.split(' ')[0]}</a></span>))} ON WHATSAPP</div>
        <form onSubmit={(e) => { e.preventDefault(); ask(q); }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about our work, services, process" aria-label="Your question" />
          <button aria-label="Send">→</button>
        </form>
      </section>
    </>
  );
}
