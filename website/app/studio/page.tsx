import Link from 'next/link';
import type { Metadata } from 'next';
import Barcode from '@/components/Barcode';
import Tape from '@/components/Tape';
import ZipTie from '@/components/ZipTie';
import Fit from '@/components/Fit';
import { Lines, Rv } from '@/components/Reveal';
import { founders, steps } from '@/lib/data';

export const metadata: Metadata = { title: 'Studio', description: 'Two founders who both stay on the work, from the first scope call to launch.' };

export default function Studio() {
  return (
    <>
      <div className="fig mono"><span>(04) STUDIO</span><span>26+ CLIENTS, 6+ INDUSTRIES</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
        <Fit as="h1" now className="mega" max={230} lines={['"TWO', 'FOUNDERS"']} />
        <Rv delay={300}><p className="lead2">Atharva and Sanidhya both work on every project, from the first scoping call through to launch, so the people you talk to are the people building your system.</p></Rv>
      </div>
      <Tape />

      <section className="duo">
        {founders.map((f, i) => (
          <Rv key={f.name}>
            <div className="founder" style={{ background: i === 0 ? 'var(--or)' : 'var(--yl)' }}>
              <span className="mono">FOUNDER 0{i + 1}</span>
              {i === 0 && <ZipTie style={{ position: 'absolute', right: 20, top: 52, transform: 'rotate(12deg)' }} />}
              <div>
                <p className="big" style={{ fontSize: 'clamp(40px,6.4vw,104px)' }}>{f.name.split(' ')[0]}<br />{f.name.split(' ')[1]}</p>
                <a href={`mailto:${f.email}`} className="sm" style={{ textTransform: 'none', display: 'inline-block', marginTop: 28, borderBottom: '3px solid var(--k)' }} data-cur="EMAIL">{f.email}</a>
              </div>
            </div>
          </Rv>
        ))}
      </section>

      <section style={{ borderTop: '2px solid var(--k)' }}>
        <div className="fig mono"><span>HOW A PROJECT GOES</span><span>FOUR STAGES</span></div>
        <div className="steps">
          {steps.map((s, i) => (<Rv key={s.n} delay={i * 80}><div><p className="mono">{s.n}</p><p className="mid" style={{ margin: '36px 0 14px' }}>{s.t}</p><p>{s.d}</p></div></Rv>))}
        </div>
      </section>

      <section style={{ background: 'var(--k)', color: 'var(--w)', position: 'relative', overflow: 'hidden' }}>
        <div className="hz-t" />
        <div style={{ padding: 'clamp(48px,7vw,110px) var(--pad)' }}>
          <p className="mono" style={{ opacity: 0.6, marginBottom: 28 }}>FOR AGENCIES AND GTM PARTNERS</p>
          <Lines className="big" lines={['"BUILT FOR', 'AGENCIES"']} />
          <p style={{ marginTop: 36, maxWidth: '52ch', fontSize: 19, lineHeight: 1.45 }}>If you hold the client relationship and need a team to build the automation or software behind it, we can be that team. We cover AI, software and web together, and we agree how the engagement is packaged, including white-label delivery, on a call.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 40, flexWrap: 'wrap', gap: 24 }}>
            <Link href="/contact" className="btn or" data-cur="BOOK">Talk to us ↗</Link>
            <Barcode seed={3} />
          </div>
        </div>
      </section>
    </>
  );
}
