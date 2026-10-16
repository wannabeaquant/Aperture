import Link from 'next/link';
import Arr from '@/components/Arr';
import Barcode from '@/components/Barcode';
import LogoWall from '@/components/LogoWall';
import Poster from '@/components/Poster';
import SpinMark from '@/components/SpinMark';
import Tape from '@/components/Tape';
import ZipTie from '@/components/ZipTie';
import Fit from '@/components/Fit';
import { Lines, Rv } from '@/components/Reveal';
import { clients, featured, services, steps } from '@/lib/data';

const Head = ({ no, title, right }: { no: string; title: string; right?: string }) => (
  <div className="fig mono"><span>({no}) {title}</span><span>{right}</span></div>
);

export default function Home() {
  return (
    <>
      <section className="hero" style={{ position: 'relative', overflow: 'hidden', borderBottom: '2px solid var(--k)' }}>
        <div className="fig mono"><span>FIG. 01 / APERTURE</span><span className="hide-s" style={{ textAlign: 'center' }}>AI SYSTEMS FOR AGENCIES, BPOS AND PRODUCT TEAMS</span><span>APERTURECM.IN</span></div>

        <div className="hero-orange" aria-hidden>
          <SpinMark />
          <ZipTie style={{ position: 'absolute', left: -52, bottom: 26, transform: 'rotate(-24deg)' }} />
        </div>

        <div className="hero-h" style={{ padding: 'clamp(28px,5vw,72px) var(--pad) 0', position: 'relative' }}>
          <Fit as="h1" now className="mega" max={150} lines={['"THE THING', 'BEHIND', 'THE THING"']} />
        </div>

        <div className="hero-foot">
          <ul className="mono hero-list">
            {['VOICE AGENTS', 'AI WORKFLOWS', 'OPERATING SOFTWARE', 'APPS AND WEBSITES'].map((t, i) => (<li key={t}><span>0{i + 1}</span> <Arr d="r" /> {t}</li>))}
          </ul>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/work" className="btn k" data-cur="SEE">See the work <Arr d="se" /></Link>
            <Link href="/contact" className="btn or" data-cur="BOOK">Talk to us <Arr d="ne" /></Link>
          </div>
          <div className="hero-bc"><Barcode seed={21} /><p className="mono" style={{ marginTop: 6 }}>TWO FOUNDERS, BOTH ON THE WORK</p></div>
        </div>
      </section>

      <Tape />

      <section style={{ borderTop: '2px solid var(--k)' }}>
        <Head no="02" title="SELECTED WORK" right={`${featured.length} OF ${clients.length} CLIENTS`} />
        <div className="posters">
          <Poster c={featured[0]} span="span-7" />
          <Poster c={featured[1]} span="span-5" tie />
          <Poster c={featured[2]} span="span-4" />
          <Poster c={featured[3]} span="span-4" />
          <Poster c={featured[4]} span="span-4" />
        </div>
        <Link href="/work" className="allwork" data-cur="ALL">SEE MORE <span><Arr d="ne" /></span></Link>
      </section>

      <section style={{ background: 'var(--k)', color: 'var(--w)', position: 'relative', overflow: 'hidden' }}>
        <div className="hz-t" />
        <div style={{ padding: 'clamp(48px,7vw,110px) var(--pad)' }}>
          <p className="mono" style={{ opacity: 0.6, marginBottom: 24 }}>(03) THE NUMBERS</p>
          <div className="nums">
            <Rv><p className="big" style={{ color: 'var(--or)' }}>1,200+</p><p className="mono">HOURS SAVED EVERY MONTH</p></Rv>
            <Rv delay={120}><p className="big" style={{ color: 'var(--yl)' }}>{'₹'}5CR+</p><p className="mono">SAVED FOR OUR CLIENTS</p></Rv>
            <Rv delay={240}><p className="big" style={{ color: 'var(--w)' }}>26+</p><p className="mono">CLIENTS ACROSS 6 INDUSTRIES</p></Rv>
          </div>
        </div>
      </section>

      <section>
        <Head no="04" title="WHAT WE BUILD" right={`${services.length} THINGS, AND MORE`} />
        <div style={{ padding: 'clamp(32px,5vw,72px) var(--pad)' }}>
          <Lines className="big" lines={['"EVERYTHING', 'WE BUILD"']} />
        </div>
        <div className="cat">
          {services.map((s) => (
            <div className="item" key={s.n}>
              <span className="n">{s.n}</span>
              <div><p className="sm" style={{ marginBottom: 8 }}>{s.t}</p><p className="d">{s.d}</p></div>
            </div>
          ))}
          <Link href="/services" className="item" style={{ background: 'var(--or)' }} data-cur="ALL"><span className="n"><Arr d="ne" /></span><p className="sm">SEE THE<br />FULL LIST</p></Link>
        </div>
      </section>

      <section style={{ marginTop: 'clamp(56px,8vw,120px)' }}>
        <Head no="05" title="HOW A PROJECT GOES" right="FOUR STAGES" />
        <div className="steps">
          {steps.map((s, i) => (
            <Rv key={s.n} delay={i * 80}><div><p className="mono">{s.n}</p><p className="mid" style={{ margin: '36px 0 14px' }}>{s.t}</p><p>{s.d}</p></div></Rv>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--g1)', padding: 'clamp(40px,6vw,90px) 0 0', marginTop: 'clamp(56px,8vw,120px)', borderTop: '2px solid var(--k)' }}>
        <div style={{ padding: '0 var(--pad) 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
          <Lines className="mid" lines={['"TRUSTED BY"']} /><p className="mono">AI, FINANCE, EDUCATION, PROPERTY, INTERIORS, OPERATIONS</p>
        </div>
        <LogoWall />
      </section>
    </>
  );
}
