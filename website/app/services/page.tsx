import Link from 'next/link';
import type { Metadata } from 'next';
import Tape from '@/components/Tape';
import Fit from '@/components/Fit';
import { services } from '@/lib/data';

export const metadata: Metadata = { title: 'Services', description: 'Voice agents, AI automation, multi-agent systems, apps, websites, CRM and integrations from one team.' };

export default function Services() {
  return (
    <>
      <div className="fig mono"><span>(03) SERVICES</span><span>{services.length} THINGS, AND MORE</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
        <Fit as="h1" now className="mega" max={260} lines={['"SERVICES"']} />
      </div>
      <Tape />
      <div className="cat full">
        {services.map((s) => (
          <div className="item" key={s.n} style={{ minHeight: 300 }}>
            <span className="n">{s.n}</span>
            <div><p className="sm" style={{ marginBottom: 8 }}>{s.t}</p><p className="d">{s.d}</p></div>
          </div>
        ))}
        <Link href="/contact" className="item" style={{ background: 'var(--or)', minHeight: 300 }} data-cur="BOOK"><span className="n">+</span><p className="sm">SOMETHING ELSE?<br />TELL US ︎</p></Link>
      </div>
    </>
  );
}
