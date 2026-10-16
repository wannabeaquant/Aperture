'use client';
import { useState } from 'react';
import { founders } from '@/lib/data';
import { waLink } from '@/lib/contact';

const quick = ['Voice agents', 'AI automation', 'Chat or WhatsApp bot', 'CRM or internal tool', 'Website or app', 'Not sure yet'];
type Assist = { summary: string; services: string[]; question: string };
type Step = 'need' | 'confirm' | 'reach' | 'done' | 'fallback';

/**
 * A three-question intake that never blocks the visitor: WhatsApp and calling stay visible beside it.
 * AI only restates the need and maps it to our services. It never quotes prices or promises anything.
 */
export default function Intake() {
  const [step, setStep] = useState<Step>('need');
  const [picked, setPicked] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [assist, setAssist] = useState<Assist | null>(null);
  const [extra, setExtra] = useState('');
  const [contact, setContact] = useState('');
  const [name, setName] = useState('');
  const [hp, setHp] = useState('');
  const [err, setErr] = useState('');

  const need = [picked.join(', '), text].filter(Boolean).join('. ');
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const next = async () => {
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/assist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: need }) });
      const d = await r.json();
      setAssist({ summary: d.summary || need, services: d.services || [], question: d.question || '' });
    } catch { setAssist({ summary: need, services: [], question: '' }); }
    setBusy(false); setStep('confirm');
  };

  const brief = () => `Hi Aperture, here is a quick brief from your website. ${assist?.summary || need}${extra ? ` (${extra})` : ''}${name ? ` I am ${name}.` : ''}`;

  const send = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, need, summary: assist?.summary, services: assist?.services, note: extra, website: hp, page: location.pathname }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 400 && d.reason === 'contact') { setErr('Add a WhatsApp number or an email so we can reply.'); setBusy(false); return; }
      setStep(d.ok ? 'done' : 'fallback');
    } catch { setStep('fallback'); }
    setBusy(false);
  };

  const dots = ['need', 'confirm', 'reach'].indexOf(step);

  return (
    <div className="tagform intake">
      {(step === 'need' || step === 'confirm' || step === 'reach') && <p className="mono">QUICK BRIEF / {Math.max(dots, 0) + 1} OF 3</p>}

      {step === 'need' && (
        <>
          <h2 className="sm q">What would you like to build or automate?</h2>
          <div className="chips">{quick.map((q) => (<button type="button" key={q} aria-pressed={picked.includes(q)} onClick={() => toggle(q)}>{q}</button>))}</div>
          <label><span className="mono">Or say it in your own words (optional)</span>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="For example: we answer the same customer questions on WhatsApp all day" maxLength={300} /></label>
          <button className="btn k" style={{ justifySelf: 'start' }} disabled={busy || (!picked.length && text.trim().length < 3)} onClick={next} data-cur="NEXT">{busy ? 'Reading…' : 'Next'} ︎</button>
        </>
      )}

      {step === 'confirm' && assist && (
        <>
          <h2 className="sm q">Here is how we read that</h2>
          <p className="readback">{assist.summary}</p>
          {assist.services.length > 0 && <div className="chips">{assist.services.map((s) => (<span className="tag-s" key={s}>{s}</span>))}</div>}
          {assist.question && (
            <label><span className="mono">{assist.question} (optional)</span><input value={extra} onChange={(e) => setExtra(e.target.value)} maxLength={200} /></label>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn k" onClick={() => setStep('reach')} data-cur="YES">That is right ︎</button>
            <button className="btn" onClick={() => setStep('need')}>Change it</button>
          </div>
        </>
      )}

      {step === 'reach' && (
        <form onSubmit={send} className="stack">
          <h2 className="sm q">Where should we reply?</h2>
          <label><span className="mono">WhatsApp number or email</span>
            <input required autoFocus value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+91 98765 43210 or you@company.com" inputMode="text" autoComplete="tel email" maxLength={120} /></label>
          <label><span className="mono">Your name or company (optional)</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="organization" maxLength={80} /></label>
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={hp} onChange={(e) => setHp(e.target.value)} name="website" />
          {err && <p className="mono" style={{ color: '#c00' }}>{err}</p>}
          <button className="btn or" style={{ justifySelf: 'start' }} disabled={busy} data-cur="SEND">{busy ? 'Sending…' : 'Send to the founders'} ︎</button>
          <p className="mono fine">We use these details only to reply to you. Write to us any time to have them deleted.</p>
        </form>
      )}

      {step === 'done' && (
        <>
          <h2 className="sm q">Sent. A founder will reply.</h2>
          <p>Your brief has gone to both of us. If you would rather not wait, message one of us now.</p>
          <div className="chips">
            {founders.map((f) => (<a key={f.name} className="btn" href={waLink(f.phone, brief())} target="_blank" rel="noreferrer">WhatsApp {f.name.split(' ')[0]} ︎</a>))}
          </div>
        </>
      )}

      {step === 'fallback' && (
        <>
          <h2 className="sm q">One tap and it is with us</h2>
          <p>We could not send that automatically, so it is ready in WhatsApp for you. Pick either of us.</p>
          <div className="chips">
            {founders.map((f) => (<a key={f.name} className="btn k" href={waLink(f.phone, brief())} target="_blank" rel="noreferrer">WhatsApp {f.name.split(' ')[0]} ︎</a>))}
          </div>
        </>
      )}
    </div>
  );
}
