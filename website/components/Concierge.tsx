'use client';
import { Fragment, useRef, useState } from 'react';
import Link from 'next/link';
import { founders } from '@/lib/data';
import { starter, waLink } from '@/lib/contact';

const WANTS_HUMAN = /price|pricing|cost|quote|budget|hire|talk|call|whatsapp|contact|human|person|speak|reach|meet|book|demo/i;

type Src = { n: number; id: string; title: string; href: string; text: string };
type Msg = { from: 'you' | 'bot'; text?: string; answer?: string | null; sources?: Src[]; cta?: boolean; pending?: boolean };
const starters = ['What do you build?', 'Have you built voice agents?', 'How do you work with agencies?', 'How do I reach the founders?'];

/** Turns [1] [2] markers in the AI answer into small links to the page each claim came from. */
function Cited({ text, sources }: { text: string; sources: Src[] }) {
  return (
    <p>
      {text.split(/(\[\d\])/g).map((part, i) => {
        const m = part.match(/^\[(\d)\]$/);
        if (!m) return <Fragment key={i}>{part}</Fragment>;
        const s = sources.find((x) => x.n === Number(m[1]));
        return s ? <sup key={i}><Link href={s.href} className="cite" title={s.title}>{s.n}</Link></sup> : null;
      })}
    </p>
  );
}

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [m, setM] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const scroll = () => setTimeout(() => end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 40);

  const ask = async (text: string) => {
    if (!text.trim() || busy) return;
    const cta = WANTS_HUMAN.test(text);
    const history = [...m.filter((x) => !x.pending).map((x) => ({ role: x.from === 'you' ? 'user' : 'assistant', content: (x.from === 'you' ? x.text : x.answer || x.text) || '' })), { role: 'user', content: text }];
    setM((p) => [...p, { from: 'you', text }, { from: 'bot', pending: true }]);
    setQ(''); setBusy(true); scroll();
    let bot: Msg;
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history }) });
      const d = await r.json();
      bot = d.answer || d.sources?.length
        ? { from: 'bot', answer: d.answer, sources: d.sources || [], cta: cta || (d.answer && !d.sources?.length) }
        : { from: 'bot', text: 'That is not covered on this site, so I will not guess. The founders can answer it directly.', cta: true };
    } catch {
      bot = { from: 'bot', text: 'Something went wrong on our side. You can reach the founders directly below.', cta: true };
    }
    setM((p) => [...p.slice(0, -1), bot]); setBusy(false); scroll();
  };

  return (
    <>
      <button className={`ask-fab ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} aria-label="Open Ask Aperture"><span className="dot" />Ask Aperture</button>
      <section className={`ask ${open ? 'open' : ''}`} aria-label="Ask Aperture" aria-hidden={!open}>
        <header>
          <div><p className="mono">Ask Aperture</p><p className="mono">AI answers drawn from this site, with sources. Not a person.</p></div>
          <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </header>
        <div className="ask-body" aria-live="polite">
          {m.length === 0 && <div className="starters">{starters.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}</div>}
          {m.map((x, n) => x.from === 'you' ? <p key={n} className="you">{x.text}</p> : (
            <div key={n} className="bot">
              {x.pending && <p className="mono thinking">Reading the site…</p>}
              {x.text && <p>{x.text}</p>}
              {x.answer && x.sources && <Cited text={x.answer} sources={x.sources} />}
              {x.sources && x.sources.length > 0 && (
                <>
                  {!x.answer && x.sources.map((s) => (
                    <blockquote key={s.id}><p>{s.text}</p><Link href={s.href} className="mono ulink" onClick={() => setOpen(false)}>Source: {s.title} →</Link></blockquote>
                  ))}
                  {x.answer && (
                    <div className="srcs">
                      <span className="mono">SOURCES</span>
                      {x.sources.map((s) => (<Link key={s.id} href={s.href} className="src-chip" onClick={() => setOpen(false)}><b>{s.n}</b> {s.title}</Link>))}
                    </div>
                  )}
                  {x.answer && (
                    <details className="passages">
                      <summary className="mono">Show the passages from the site</summary>
                      {x.sources.map((s) => (<blockquote key={s.id}><p><b>{s.n}.</b> {s.text}</p></blockquote>))}
                    </details>
                  )}
                </>
              )}
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
          <button aria-label="Send" disabled={busy}>→</button>
        </form>
      </section>
    </>
  );
}
