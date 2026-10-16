import Link from 'next/link';
import Fit from './Fit';
import Tape from './Tape';
import { founders } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="foot">
      <div style={{ background: 'var(--w)' }}><Tape rev /></div>
      <div style={{ padding: '72px var(--pad) 28px' }}>
        <Fit className="big" max={170} lines={['"BRING US THE', 'MESSY BIT"']} now />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 80px', marginTop: 56 }}>
          {founders.map((f) => (
            <div key={f.name}>
              <p className="mono" style={{ opacity: 0.55, marginBottom: 8 }}>{f.name}</p>
              <a className="sm" style={{ textTransform: 'none', letterSpacing: '-.01em', borderBottom: '2px solid var(--or)', display: 'inline-block' }} href={`tel:+${f.phone}`}>{f.phoneShow}</a>
              <div className="mono" style={{ display: 'flex', gap: 18, marginTop: 12 }}>
                <a href={`https://wa.me/${f.phone}`} target="_blank" rel="noreferrer">WHATSAPP ︎</a>
                <a href={`mailto:${f.email}`}>EMAIL ︎</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginTop: 72, paddingTop: 20, borderTop: '2px solid rgba(255,255,255,.2)' }}>
          <span className="brand"><span className="markimg" style={{ width: 24, height: 24 }} />Aperture</span>
          <nav className="mono" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}><Link href="/work">Work</Link><Link href="/services">Services</Link><Link href="/studio">Studio</Link><Link href="/contact">Contact</Link></nav>
          <span className="mono" style={{ opacity: 0.55 }}>aperturecm.in</span>
        </div>
      </div>
    </footer>
  );
}
