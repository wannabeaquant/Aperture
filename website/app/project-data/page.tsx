import Link from 'next/link';
import type { Metadata } from 'next';
import Arr from '@/components/Arr';
import Fit from '@/components/Fit';
import Tape from '@/components/Tape';
import JsonLd from '@/components/JsonLd';
import ChatButton from '@/components/ChatButton';
import { clients } from '@/lib/data';
import { page } from '@/lib/schema';
import { abs, BOOKING_URL } from '@/lib/site';

// Every number on this page is counted from lib/data.ts (the projects on /work). Hours are the
// planning-model estimates shown on the case pages, labelled as estimates. Do not add numbers by hand.

const PATH = '/project-data';
const TITLE = 'What Businesses Hire an AI Studio to Build: Data From Our Projects';
const DESC = 'What Aperture has built across its published projects, grouped by type: operating software, lead assistants, agent systems, apps and websites, with timelines and labelled time-saving estimates.';

const groups: { t: string; d: string; slugs: string[] }[] = [
  { t: 'Apps, portals and SaaS platforms', d: 'Customer apps, admin panels, borrower and student portals, and SaaS dashboards.', slugs: ['pribhum-nest', 'firstqa', 'rsvd-capital', 'luminar-fintech', 'roccs-academy'] },
  { t: 'Websites', d: 'Marketing sites, storefronts with payments, and community sites.', slugs: ['owasp', 'ch-plus-partners', 'vellar'] },
  { t: 'Operating software for calling floors', d: 'Dialer, CRM, QA, incentives and client reporting in one system, with AI calling.', slugs: ['calling-24o7', 'persuaders'] },
  { t: 'AI lead assistants', d: 'Assistants on the website, WhatsApp, Instagram and phone that qualify leads and hand them to the team.', slugs: ['interioarty', 'livedelite-interiors'] },
  { t: 'AI agent and multi-agent systems', d: 'Agent workspaces, orchestration, and agents that run campaigns and qualify replies.', slugs: ['zero-capxai', 'aigtm-channel'] },
];

const bySlug = Object.fromEntries(clients.map((c) => [c.slug, c]));
const total = clients.length;
const aiCount = groups.filter((g) => /AI|calling/i.test(g.t)).reduce((n, g) => n + g.slugs.length, 0);

const faqs = [
  { q: 'Where does this data come from?', a: `From the ${total} projects published on our work page. Each project is counted once, under the main thing we built.` },
  { q: 'Are the hours saved measured?', a: 'No. They come from a planning model stated on each case page (minutes saved per person per day, working days and team size). They are estimates, not measured results.' },
  { q: 'How long do these projects take?', a: 'Automations typically take 2 to 3 days, websites 4 to 5 days and multi-agent systems under a week. Larger platforms are delivered in stages.' },
  { q: 'Is Aperture affordable?', a: 'Yes. We keep pricing affordable and scope the smallest system that solves the problem. We do not publish a rate card; a founder quotes after a short call.' },
];

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: PATH }, openGraph: { url: PATH, title: TITLE, description: DESC, images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/opengraph-image'] } };

export default function ProjectData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      page(PATH, TITLE, DESC),
      { '@type': 'Dataset', '@id': `${abs(PATH)}#dataset`, name: 'Aperture projects by type', description: DESC, url: abs(PATH), creator: { '@id': `${abs('/')}/#organization` }, variableMeasured: 'Projects by type of system built' },
      { '@type': 'FAQPage', '@id': `${abs(PATH)}#faq`, mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <JsonLd data={graph} />
      <div className="fig mono"><Link href="/work"><Arr d="l" /> ALL WORK</Link><span>{total} PUBLISHED PROJECTS</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(20px,3vw,40px)' }}>
        <Fit as="h1" now className="mega" max={200} lines={['"WHAT GETS', 'BUILT"']} />
        <p className="mono" style={{ marginTop: 18, opacity: 0.7 }}>{TITLE}</p>
      </div>
      <Tape />

      <section className="case">
        <div>
          <p className="mono" style={{ marginBottom: 20 }}>IN SHORT</p>
          <p className="lead">Across our {total} published projects, the most common request is an app, portal or platform ({groups[0].slugs.length} projects). {aiCount} of the {total} are AI systems: calling-floor software with AI calling, lead assistants and agent systems.</p>
          <div className="cta-row" style={{ marginTop: 28 }}>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn k">Book a 30-min call</a>
            <ChatButton className="btn">Describe your project</ChatButton>
          </div>
        </div>
        <ol className="built">{groups.map((g) => (<li key={g.t}><span>{String(g.slugs.length).padStart(2, '0')}</span>{g.t}</li>))}</ol>
      </section>

      {groups.map((g) => (
        <section className="lp" key={g.t}>
          <p className="mono">{g.t.toUpperCase()} · {g.slugs.length} OF {total}</p>
          <p className="lp-time" style={{ marginBottom: 20 }}>{g.d}</p>
          <div className="lp-work">{g.slugs.map((s) => bySlug[s]).filter(Boolean).map((c) => (<Link key={c.slug} href={`/work/${c.slug}`}><b>{c.name} <Arr d="ne" /></b><span>{c.line}</span></Link>))}</div>
        </section>
      ))}

      <section className="lp">
        <p className="mono">TIME BACK, ESTIMATED</p>
        <div className="lp-grid">
          {clients.filter((c) => c.footnote).map((c) => (
            <div key={c.slug}><span className="mono">{c.name.toUpperCase()}</span><h2>{c.facts?.find((f) => /hours/.test(f))?.replace('*', '')}</h2><p>{c.footnote?.replace(/^\*/, '')}</p></div>
          ))}
        </div>
        <p className="lp-time"><b>Timelines.</b> Automations typically ship in 2 to 3 days, websites in 4 to 5 days and multi-agent systems in under a week. We confirm the exact timeline after scoping.</p>
      </section>

      <section className="lp">
        <p className="mono">QUESTIONS</p>
        <div className="lp-faq">{faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}</div>
        <div className="cta-row" style={{ marginTop: 28 }}><a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn k">Book a 30-min call</a><ChatButton className="btn">Chat with a founder</ChatButton></div>
      </section>
    </>
  );
}
