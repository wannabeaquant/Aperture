import { clients, services } from './data';
import { SAME_AS, SITE_DESC, SITE_NAME, SITE_URL, abs, people } from './site';

type Node = Record<string, unknown>;
const ORG = `${SITE_URL}/#organization`;
const SITE = `${SITE_URL}/#website`;

const topics = [
  'AI automation', 'Voice agents', 'AI agents', 'Multi-agent systems', 'AI workflows', 'Chatbots and WhatsApp bots',
  'Website development', 'Web and mobile app development', 'CRM and internal tools', 'API integrations', 'Dashboards and reporting',
];

export const serviceId = (n: string) => `${SITE_URL}/services#service-${n}`;

const serviceNode = (s: (typeof services)[number]): Node => ({
  '@type': 'Service',
  '@id': serviceId(s.n),
  name: s.t,
  serviceType: s.t,
  description: s.d,
  url: abs('/services'),
  provider: { '@id': ORG },
  areaServed: { '@type': 'Country', name: 'India' },
});

const organization = (): Node => ({
  '@type': 'Organization',
  '@id': ORG,
  name: SITE_NAME,
  alternateName: ['Aperture CM', 'Aperture AI Studio', 'aperturecm.in'],
  url: abs('/'),
  logo: { '@type': 'ImageObject', '@id': `${SITE_URL}/#logo`, url: abs('/img/aperture-lockup.png'), caption: 'Aperture' },
  image: abs('/opengraph-image'),
  description: SITE_DESC,
  slogan: 'The thing behind the thing',
  email: people[0].email,
  telephone: people[0].phone,
  contactPoint: [
    ...people.map((p) => ({ '@type': 'ContactPoint', contactType: 'sales', name: p.name, telephone: p.phone, email: p.email, availableLanguage: ['English', 'Hindi'], areaServed: 'IN' })),
  ],
  founder: people.map((p) => ({ '@id': p.id })),
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: topics,
  makesOffer: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': serviceId(s.n) } })),
  ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
});

const person = (p: (typeof people)[number]): Node => ({
  '@type': 'Person',
  '@id': p.id,
  name: p.name,
  jobTitle: 'Co-founder',
  email: p.email,
  telephone: p.phone,
  worksFor: { '@id': ORG },
  knowsAbout: topics,
  url: abs('/studio'),
});

const website = (): Node => ({
  '@type': 'WebSite',
  '@id': SITE,
  url: abs('/'),
  name: SITE_NAME,
  description: SITE_DESC,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG },
});

const crumbs = (items: [string, string][]): Node => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

export function page(path: string, name: string, description: string, type = 'WebPage', extra: Node = {}): Node {
  return {
    '@type': type,
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': SITE },
    about: { '@id': ORG },
    ...extra,
  };
}

const wrap = (nodes: Node[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Sitewide graph: the entity itself. Rendered once, in the root layout. */
export const siteGraph = () => wrap([organization(), website(), ...people.map(person)]);

export const homeGraph = () => wrap([
  page('/', 'Aperture | AI Automation, Voice Agents and App Development Studio', SITE_DESC, 'WebPage', { breadcrumb: { '@id': `${abs('/')}#breadcrumb` } }),
  { ...crumbs([['Home', '/']]), '@id': `${abs('/')}#breadcrumb` },
]);

export const servicesGraph = () => wrap([
  page('/services', 'AI Automation, Voice Agent and Multi-Agent System Services', 'Voice agents, AI automation, multi-agent systems, websites, apps, CRM and integrations from one team.', 'CollectionPage', { breadcrumb: { '@id': `${abs('/services')}#breadcrumb` } }),
  { ...crumbs([['Home', '/'], ['Services', '/services']]), '@id': `${abs('/services')}#breadcrumb` },
  ...services.map(serviceNode),
]);

export const workGraph = () => wrap([
  page('/work', 'Client Work: AI Systems, Websites and Apps', 'What Aperture has built for AI, finance, education, property, interiors and operations teams.', 'CollectionPage', { breadcrumb: { '@id': `${abs('/work')}#breadcrumb` } }),
  { ...crumbs([['Home', '/'], ['Work', '/work']]), '@id': `${abs('/work')}#breadcrumb` },
  {
    '@type': 'ItemList',
    '@id': `${abs('/work')}#list`,
    itemListElement: clients.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, url: abs(`/work/${c.slug}`) })),
  },
]);

export const studioGraph = () => wrap([
  page('/studio', 'About the Studio and Founders', 'Two founders who both stay on the work, from the first scope call to launch.', 'AboutPage', { breadcrumb: { '@id': `${abs('/studio')}#breadcrumb` }, mainEntity: { '@id': ORG } }),
  { ...crumbs([['Home', '/'], ['Studio', '/studio']]), '@id': `${abs('/studio')}#breadcrumb` },
]);

export const contactGraph = () => wrap([
  page('/contact', 'Contact Aperture', 'Message or call the founders on WhatsApp, or leave a quick brief.', 'ContactPage', { breadcrumb: { '@id': `${abs('/contact')}#breadcrumb` }, mainEntity: { '@id': ORG } }),
  { ...crumbs([['Home', '/'], ['Contact', '/contact']]), '@id': `${abs('/contact')}#breadcrumb` },
]);

export const caseGraph = (slug: string) => {
  const c = clients.find((x) => x.slug === slug);
  if (!c) return wrap([]);
  const path = `/work/${slug}`;
  return wrap([
    page(path, `${c.name}: ${c.line}`, c.line, 'WebPage', { breadcrumb: { '@id': `${abs(path)}#breadcrumb` }, mainEntity: { '@id': `${abs(path)}#project` } }),
    { ...crumbs([['Home', '/'], ['Work', '/work'], [c.name, path]]), '@id': `${abs(path)}#breadcrumb` },
    {
      '@type': 'CreativeWork',
      '@id': `${abs(path)}#project`,
      name: `${c.name} project`,
      description: c.body,
      about: c.built,
      genre: c.sector,
      creator: { '@id': ORG },
      publisher: { '@id': ORG },
      url: abs(path),
    },
  ]);
};
