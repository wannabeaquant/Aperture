// Markdown versions of the main pages: the same facts as the HTML (from data.ts and landing.ts), in the format
// AI assistants quote most reliably. Served at <path>.md, to `Accept: text/markdown`, and to AI fetchers (middleware).
import { clients, services, steps, founders, stack, chunks } from './data';
import { landings } from './landing';
import { ADDRESS_LINE, BOOKING_URL, SITE_DESC, abs } from './site';

const contact = () => [
  '## Contact Aperture',
  '',
  ...founders.map((f) => `- ${title(f.name)}: ${f.phoneShow} (WhatsApp https://wa.me/${f.phone}), ${f.email}`),
  `- Book a 30-minute call: ${BOOKING_URL}`,
  `- Location: ${ADDRESS_LINE} (service-area business, works with clients across India)`,
  '- Pricing: affordable for Indian businesses, quoted after a short scoping call (no published rate card).',
  '',
];
const title = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const head = (h1: string, path: string) => [`# ${h1}`, '', `Source: ${abs(path)}`, ''];
const chunk = (id: string) => chunks.find((c) => c.id === id)?.text || '';

function home(): string {
  return [
    ...head('Aperture: AI automation and voice agent studio in Gurugram, India', '/'),
    SITE_DESC, '',
    chunk('who'), '',
    '## What we build', '',
    ...services.map((s) => `- **${s.t}:** ${s.d}`), '',
    `## Tools we build with`, '', stack.join(', ') + '.', '',
    '## Selected work', '',
    ...clients.map((c) => `- [${c.name}](${abs(`/work/${c.slug}`)}) (${title(c.sector)}): ${c.line}`), '',
    '## How a project runs', '',
    ...steps.map((s) => `- **${title(s.t)}:** ${s.d}`), '',
    chunk('speed'), '',
    '## Service pages', '',
    ...landings.map((l) => `- [${l.title}](${abs(`/services/${l.slug}`)})`), '',
    ...contact(),
  ].join('\n');
}

function servicesPage(): string {
  return [
    ...head('AI automation, voice agent and multi-agent system services in India', '/services'),
    ...services.flatMap((s) => [`## ${s.t}`, '', s.d, '']),
    '## Tools we build with', '', stack.join(', ') + '.', '',
    '## Service pages', '',
    ...landings.map((l) => `- [${l.title}](${abs(`/services/${l.slug}`)}): ${l.description}`), '',
    ...contact(),
  ].join('\n');
}

function landing(slug: string): string | null {
  const l = landings.find((x) => x.slug === slug);
  if (!l) return null;
  return [
    ...head(l.title, `/services/${l.slug}`),
    l.lead, '',
    '## What we build', '', ...l.build.map((b) => `- ${b}`), '',
    '## How we work', '', ...l.how.map((h) => `- **${h.t}.** ${h.d}`), '',
    '## Related work', '', ...l.work.map((w) => `- [${w.name}](${abs(`/work/${w.slug}`)}): ${w.why}`), '',
    '## Timeline', '', l.timeline, '',
    '## Frequently asked questions', '', ...l.faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    ...(l.guide ? [`Related guide: [${l.guide.label}](${l.guide.href})`, ''] : []),
    ...contact(),
  ].join('\n');
}

function workIndex(): string {
  return [
    ...head('Client work: AI systems, websites and apps', '/work'),
    ...clients.map((c) => `- [${c.name}](${abs(`/work/${c.slug}`)}) (${title(c.sector)}): ${c.line}`), '',
    ...contact(),
  ].join('\n');
}

function work(slug: string): string | null {
  const c = clients.find((x) => x.slug === slug);
  if (!c) return null;
  return [
    ...head(`${c.name} case study`, `/work/${c.slug}`),
    `Sector: ${title(c.sector)}. Built by Aperture.`, '',
    c.line, '', c.body, '',
    '## What we built', '', ...c.built.map((b) => `- ${b}`), '',
    ...(c.facts?.length ? ['## Numbers', '', ...c.facts.map((f) => `- ${f}`), ''] : []),
    ...(c.footnote ? [c.footnote, ''] : []),
    ...contact(),
  ].join('\n');
}

function studio(): string {
  return [
    ...head('About Aperture: the studio and founders', '/studio'),
    chunk('who'), '', 'Team: two founders, Atharva Singh and Sanidhya Shishodia, both on every project.', '',
    '## How we work', '', chunk('proc'), '', ...steps.map((s) => `- **${title(s.t)}:** ${s.d}`), '',
    '## Speed and timelines', '', chunk('speed'), '',
    '## For agencies', '', chunk('agency'), '',
    '## Tools we build with', '', stack.join(', ') + '.', '',
    ...contact(),
  ].join('\n');
}

/** Path without .md (e.g. "/", "/services/ai-receptionist") to Markdown, or null if there is no Markdown version. */
export function pageMarkdown(path: string): string | null {
  const p = path.replace(/\/$/, '') || '/';
  if (p === '/' || p === '/index') return home();
  if (p === '/services') return servicesPage();
  if (p === '/work') return workIndex();
  if (p === '/studio') return studio();
  if (p === '/contact') return [...head('Contact Aperture', '/contact'), ...contact()].join('\n');
  let m = p.match(/^\/services\/([^/]+)$/);
  if (m) return landing(m[1]);
  m = p.match(/^\/work\/([^/]+)$/);
  if (m) return work(m[1]);
  return null;
}

export const mdUrl = (path: string) => abs(path === '/' ? '/index.md' : `${path}.md`);
