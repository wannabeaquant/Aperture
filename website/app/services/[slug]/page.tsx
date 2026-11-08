import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Arr from '@/components/Arr';
import Fit from '@/components/Fit';
import Tape from '@/components/Tape';
import JsonLd from '@/components/JsonLd';
import ChatButton from '@/components/ChatButton';
import { landings } from '@/lib/landing';
import { page } from '@/lib/schema';
import { abs, SITE_URL, BOOKING_URL } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return landings.map((l) => ({ slug: l.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = landings.find((x) => x.slug === slug);
  if (!l) return {};
  const url = `/services/${l.slug}`;
  return { title: l.title, description: l.description, alternates: { canonical: url }, openGraph: { url, title: l.title, description: l.description, images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/opengraph-image'] } };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = landings.find((x) => x.slug === slug);
  if (!l) notFound();
  const path = `/services/${l.slug}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      page(path, l.title, l.description),
      { '@type': 'Service', '@id': `${abs(path)}#service`, name: l.title, serviceType: l.keyword, description: l.description, url: abs(path), provider: { '@id': `${SITE_URL}/#organization` }, areaServed: { '@type': 'Country', name: 'India' } },
      { '@type': 'FAQPage', '@id': `${abs(path)}#faq`, mainEntity: l.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Services', item: abs('/services') }, { '@type': 'ListItem', position: 2, name: l.title, item: abs(path) }] },
    ],
  };
  return (
    <>
      <JsonLd data={graph} />
      <div className="fig mono"><Link href="/services"><Arr d="l" /> ALL SERVICES</Link><span>{l.keyword.toUpperCase()}</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(20px,3vw,40px)' }}>
        <Fit as="h1" now className="mega" max={200} lines={l.h1} />
        <p className="mono" style={{ marginTop: 18, opacity: 0.7 }}>{l.title}</p>
      </div>
      <Tape />

      <section className="case">
        <div>
          <p className="mono" style={{ marginBottom: 20 }}>IN SHORT</p>
          <p className="lead">{l.lead}</p>
          <div className="cta-row" style={{ marginTop: 28 }}>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn k">Book a 30-min call</a>
            <ChatButton className="btn">Describe your project</ChatButton>
          </div>
        </div>
        <ol className="built">{l.build.map((t, n) => (<li key={t}><span>0{n + 1}</span>{t}</li>))}</ol>
      </section>

      <section className="lp">
        <p className="mono">HOW WE WORK</p>
        <div className="lp-grid">{l.how.map((h, n) => (<div key={h.t}><span className="mono">0{n + 1}</span><h2>{h.t}</h2><p>{h.d}</p></div>))}</div>
      </section>

      <section className="lp">
        <p className="mono">RELEVANT WORK</p>
        <div className="lp-work">{l.work.map((w) => (<Link key={w.slug} href={`/work/${w.slug}`}><b>{w.name} <Arr d="ne" /></b><span>{w.why}</span></Link>))}</div>
        <p className="lp-time"><b>Timeline.</b> {l.timeline}</p>
      </section>

      <section className="lp">
        <p className="mono">QUESTIONS</p>
        <div className="lp-faq">{l.faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
        {l.guide && <p className="lp-time">Comparing options? Read our guide: <a className="ulink" href={l.guide.href}>{l.guide.label}</a>.</p>}
        <div className="cta-row" style={{ marginTop: 28 }}><a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn k">Book a 30-min call</a><ChatButton className="btn">Chat with a founder</ChatButton></div>
      </section>
    </>
  );
}
