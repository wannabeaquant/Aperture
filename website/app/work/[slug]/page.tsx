import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Barcode from '@/components/Barcode';
import Poster from '@/components/Poster';
import Fit from '@/components/Fit';
import { nameLines } from '@/lib/lines';
import { Rv } from '@/components/Reveal';
import { clients } from '@/lib/data';

export function generateStaticParams() { return clients.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = clients.find((x) => x.slug === slug);
  return c ? { title: c.name, description: c.line } : {};
}

export default async function Client({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = clients.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = clients[i];
  const next = clients[(i + 1) % clients.length];
  return (
    <>
      <section style={{ background: c.bg, color: c.fg, borderBottom: '2px solid var(--k)' }}>
        <div className="fig mono" style={{ borderColor: c.fg }}><Link href="/work">︎ ALL WORK</Link><span>{c.no} / {c.sector}</span></div>
        <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
          <Fit as="h1" now className="mega" max={230} lines={nameLines(c.name)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 var(--pad) 22px', gap: 16, flexWrap: 'wrap' }}>
          <span className="mono">{c.facts?.join('  /  ')}</span><Barcode seed={c.no.charCodeAt(1) * 7} w={140} h={34} />
        </div>
      </section>

      <section className="case">
        <div>
          <p className="mono" style={{ marginBottom: 20 }}>WHAT WE BUILT</p>
          <Rv><p className="lead">{c.body}</p></Rv>
          {c.footnote && <p className="mono" style={{ marginTop: 28, lineHeight: 1.6, opacity: 0.7 }}>{c.footnote}</p>}
        </div>
        <ol className="built">
          {c.built.map((t, n) => (<li key={t}><span>0{n + 1}</span>{t}</li>))}
        </ol>
      </section>

      <section>
        <div className="fig mono"><span>NEXT CLIENT</span><span>{next.no} / {next.sector}</span></div>
        <div className="posters"><Poster c={next} span="span-12" compact /></div>
      </section>
    </>
  );
}
