import type { Metadata } from 'next';
import Intake from '@/components/Intake';
import Tape from '@/components/Tape';
import Fit from '@/components/Fit';
import { Rv } from '@/components/Reveal';
import { founders } from '@/lib/data';
import { starter, waLink } from '@/lib/contact';

export const metadata: Metadata = { title: 'Talk to us', description: 'Message or call the founders directly, or leave a quick brief.' };

export default function Contact() {
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <>
      <div className="fig mono"><span>(05) CONTACT</span><span>THE FASTEST WAY IS WHATSAPP</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
        <Fit as="h1" now className="mega" max={230} lines={['"TALK', 'TO US"']} />
        <Rv delay={300}><p className="lead2">Tell us what you are trying to get done, in whichever way suits you. Both founders read everything that comes in.</p></Rv>
      </div>
      <Tape />

      <div className="wa-row" style={{ marginTop: 'clamp(28px,4vw,56px)' }}>
        {founders.map((f, i) => (
          <div key={f.name} className="wa-card" style={{ background: i === 0 ? 'var(--or)' : 'var(--yl)' }}>
            <p className="mono">{f.name}</p>
            <a className="tel" href={`tel:+${f.phone}`} data-cur="CALL">{f.phoneShow}</a>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn k" href={waLink(f.phone, starter)} target="_blank" rel="noreferrer" data-cur="CHAT">WhatsApp ↗</a>
              <a className="btn" href={`tel:+${f.phone}`}>Call</a>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-grid">
        <Intake />
        <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
          {booking && (
            <a href={booking} target="_blank" rel="noreferrer" className="wa-card" style={{ background: 'var(--bl)', color: '#fff' }} data-cur="BOOK">
              <p className="mono">PREFER A TIME THAT SUITS YOU?</p>
              <p className="big" style={{ fontSize: 'clamp(30px,3.4vw,52px)' }}>BOOK 15 MINUTES ↗</p>
            </a>
          )}
          <div style={{ border: '3px solid var(--k)', padding: 22 }}>
            <p className="mono" style={{ marginBottom: 12 }}>PREFER EMAIL</p>
            {founders.map((f) => (
              <p key={f.name} style={{ marginBottom: 8 }}><a className="ulink" style={{ wordBreak: 'break-all' }} href={`mailto:${f.email}`}>{f.email}</a></p>
            ))}
          </div>
          <p className="mono" style={{ lineHeight: 1.6 }}>THE QUICK BRIEF TAKES THREE ANSWERS. IT GOES TO BOTH FOUNDERS AT ONCE, AND IT IS NEVER THE ONLY WAY IN.</p>
        </div>
      </div>
    </>
  );
}
