'use client';
import { useEffect, useRef, useState } from 'react';
import Arr from '@/components/Arr';
import { founders } from '@/lib/data';
import { starter, waLink, normalisePhone, isEmail } from '@/lib/contact';

const WANTS_HUMAN = /price|pricing|cost|quote|budget|hire|talk|call me|whatsapp|contact|human|person|speak|reach|meet|book|demo|interested|start|proposal/i;

type Msg = { from: 'you' | 'bot'; text: string; pending?: boolean };
const starters = ['I want to automate something', 'I need an AI agent or chatbot', 'I need a voice / calling agent', 'What does it cost?'];
const GREETING = 'Hi, I am Aperture’s assistant. Tell me what you want built or automated and I will tell you how we would do it. A founder can pick it up today.';

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [m, setM] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', contact: '', website: '' });
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'sent' | 'error' | 'failed'>('idle');
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [m, showLead, leadState]);
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 250); }, [open]);
  // Visitors arriving from the comparison guides (?chat=1&ref=...) land straight in the chat.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('chat') === '1') setOpen(true);
    const openChat = () => setOpen(true);
    window.addEventListener('aperture:chat', openChat);
    return () => window.removeEventListener('aperture:chat', openChat);
  }, []);

  const ask = async (text: string) => {
    if (!text.trim() || busy) return;
    const history = [...m.filter((x) => !x.pending), { from: 'you' as const, text }]
      .map((x) => ({ role: x.from === 'you' ? 'user' : 'assistant', content: x.text }));
    const userTurns = history.filter((x) => x.role === 'user').length;
    setM((p) => [...p, { from: 'you', text }, { from: 'bot', text: '', pending: true }]);
    setQ(''); setBusy(true);
    let reply: string;
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history }) });
      const d = await r.json();
      reply = d.answer || 'Sorry, I missed that. Could you say it another way?';
    } catch {
      reply = 'I could not connect just now. Leave your name and number below and a founder will reply today.';
    }
    setM((p) => [...p.slice(0, -1), { from: 'bot', text: reply }]); setBusy(false);
    // Offer the contact card once they show intent, or after a couple of exchanges.
    if (WANTS_HUMAN.test(text) || userTurns >= 2) setShowLead(true);
  };

  const sendLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const c = lead.contact.trim();
    if (!normalisePhone(c) && !isEmail(c)) { setLeadState('error'); return; }
    setLeadState('sending');
    const said = m.filter((x) => x.from === 'you').map((x) => x.text);
    const transcript = m.filter((x) => !x.pending).map((x) => `${x.from === 'you' ? 'VISITOR' : 'BOT'}: ${x.text}`).join('  ||  ');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name, contact: c, website: lead.website,
          need: said.join(' / ').slice(0, 600), summary: (said[0] || 'Chat enquiry').slice(0, 240),
          note: `Chat: ${transcript}`.slice(0, 1800), page: typeof window !== 'undefined' ? (window.location.pathname + window.location.search).slice(0, 120) : '',
          askedHuman: true,
        }),
      });
      const d = await r.json().catch(() => ({}));
      setLeadState(d.ok ? 'sent' : d.reason === 'contact' ? 'error' : 'failed');
    } catch { setLeadState('failed'); }
  };

  return (
    <>
      <button className={`ask-fab ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} aria-label="Chat with Aperture"><span className="dot" />Chat with us</button>
      <section className={`ask ${open ? 'open' : ''}`} aria-label="Chat with Aperture" aria-hidden={!open} data-lenis-prevent>
        <header>
          <div><p className="mono">Aperture</p><p className="mono ask-sub">Usually replies instantly. Founders reply the same day.</p></div>
          <button onClick={() => setOpen(false)} aria-label="Close"><Arr d="x" /></button>
        </header>
        <div className="ask-body" aria-live="polite">
          <div className="bot"><p>{GREETING}</p></div>
          {m.length === 0 && <div className="starters">{starters.map((s) => (<button key={s} onClick={() => ask(s)}>{s}</button>))}</div>}
          {m.map((x, n) => x.from === 'you'
            ? <p key={n} className="you">{x.text}</p>
            : <div key={n} className="bot">{x.pending ? <p className="typing" aria-label="Typing"><i /><i /><i /></p> : <p>{x.text}</p>}</div>)}
          {showLead && leadState !== 'sent' && (
            <form className="lead-card" onSubmit={sendLead}>
              <p className="mono">Get a reply from a founder today</p>
              <input placeholder="Your name / company" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} aria-label="Name or company" />
              <input placeholder="WhatsApp number or email" value={lead.contact} onChange={(e) => { setLead({ ...lead, contact: e.target.value }); setLeadState('idle'); }} aria-label="WhatsApp number or email" required />
              <input className="hp" tabIndex={-1} autoComplete="off" value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} aria-hidden />
              {leadState === 'error' && <p className="lead-err">Please check the number or email and try again.</p>}
              {leadState === 'failed' && <p className="lead-err">That did not go through. Please try again, or WhatsApp us directly below.</p>}
              <button className="btn k" disabled={leadState === 'sending'}>{leadState === 'sending' ? 'Sending…' : 'Send to the founders'}</button>
              <p className="lead-alt">or WhatsApp {founders.map((f, i) => (<span key={f.name}>{i ? ' / ' : ''}<a className="ulink" href={waLink(f.phone, starter)} target="_blank" rel="noreferrer">{f.name.split(' ')[0][0] + f.name.split(' ')[0].slice(1).toLowerCase()}</a></span>))} directly</p>
            </form>
          )}
          {leadState === 'sent' && <div className="bot"><p>Got it. A founder will reach out shortly. Keep asking anything in the meantime.</p></div>}
          <div ref={end} />
        </div>
        <form className="ask-input" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type your message" aria-label="Your message" />
          <button aria-label="Send" disabled={busy || !q.trim()}><Arr d="r" /></button>
        </form>
      </section>
    </>
  );
}
