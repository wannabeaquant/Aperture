// Client facts come from Aperture_Client_Work_v2.pptx and the existing aperturecm.in clients page.

export type Client = {
  slug: string; no: string; name: string; sector: string; bg: string; fg: string;
  line: string; body: string; built: string[]; facts?: string[]; footnote?: string;
  logo?: string; logoClass?: string; logoText?: string; wordmark?: 'aigtm';
};

export const clients: Client[] = [
  {
    slug: 'zero-capxai', no: '01', name: 'CapxAI', sector: 'AI PRODUCT', bg: '#0A0A0A', fg: '#FFFFFF',
    line: 'The full mainnet product behind ZERO, CapxAI’s zero-person company.',
    body: 'ZERO is CapxAI’s zero-person company, and we built the product it runs on. That covers the workspace where agents pick up work, the orchestration that hands tasks between them, outputs that stay available once a run ends, and the integrations and controls around all of it.',
    built: ['Agent workspace', 'Task orchestration across agents', 'Persistent outputs', 'Integrations', 'Controls and permissions'],
    facts: ['$40M peak market cap', '15K token holders'], logo: '/logos/capx.png', logoClass: 'lg-capx',
  },
  {
    slug: 'calling-24o7', no: '02', name: 'Calling 24o7', sector: 'BPO OPERATIONS', bg: '#FF5A00', fg: '#0A0A0A',
    line: 'One operating system for a 700-person BPO, from the dialer to client reporting.',
    body: 'For Calling 24o7 we built a single product covering calling, CRM, workforce records, QA, incentives and client reporting, in place of a stack of disconnected tools. It includes AI calling in regional languages that passes the call to a person whenever it needs to.',
    built: ['Inbound and outbound calling with regional-language AI and human transfer', 'Campaign dialer, CRM, callbacks and workforce records', 'Evidence-linked QA with human review and coaching', 'Live floor view, incentives and client reporting'],
    facts: ['700 people', '14 regional languages', '2,917 hours back a month*'],
    footnote: '*Planning model: 10 minutes saved per person per day, 25 working days, ₹150 to ₹250 per hour, which values the time at ₹52.5L to ₹87.5L a year.',
    logo: '/logos/calling24o7.png', logoClass: 'lg-call',
  },
  {
    slug: 'persuaders', no: '03', name: 'Persuaders', sector: 'BPO OPERATIONS', bg: '#F4E000', fg: '#0A0A0A',
    line: 'The same platform, set up for a 24/7 floor serving fifteen-plus enterprise partners.',
    body: 'Persuaders runs around the clock for a long list of enterprise partners, so the platform had to show, in one place, what is happening on the floor and what needs someone’s attention. Live operations, quality review, coaching, customer records, incentives and client reporting all sit together.',
    built: ['Live floor view', 'Quality review and coaching', 'Customer records', 'Incentives', 'Reporting for each enterprise partner'],
    facts: ['300–400 people', '15+ enterprise partners', '1,458 hours back a month*'],
    footnote: '*Planning model with a 350-person midpoint and the same 10-minute daily assumption, worth ₹26.3L to ₹43.8L a year.',
    logo: '/logos/persuaders.png', logoClass: 'lg-dark',
  },
  {
    slug: 'interioarty', no: '04', name: 'InterioArty', sector: 'SALES ASSISTANT', bg: '#1C3DFF', fg: '#FFFFFF',
    line: 'Arty, a website assistant that answers from the studio’s own facts and passes qualified leads to the team.',
    body: 'InterioArty is an interior studio in Pune. Arty lives on its website, answers visitors using only facts the studio has approved, collects the brief as the conversation goes, and hands the lead to the team on WhatsApp. Everything lands in a simple inbox the team can work through.',
    built: ['Website assistant with memory', 'Lead qualification', 'WhatsApp handoff', 'Three-stage lead inbox', 'One-line embed'],
    facts: ['About 130ms to first token'],
    logo: '/logos/interioarty.png', logoClass: 'lg-dark',
  },
  {
    slug: 'pribhum-nest', no: '05', name: 'PriBhum Nest', sector: 'PROPERTY', bg: '#E9E9E9', fg: '#0A0A0A',
    line: 'A PG platform where owners and students manage listings, enquiries, KYC and rewards in one app.',
    body: 'PG listings and enquiries were being handled in separate spreadsheets and chats. We built a mobile app for both sides, an admin panel for approvals and operations, and the Supabase backend underneath: listings, bed availability, onboarding, KYC, rewards and owner analytics in one product.',
    built: ['Mobile app for owners and students', 'Admin panel for approvals and operations', 'Listings, bed availability and enquiries', 'KYC, rewards and owner analytics'],
    facts: ['15 mobile screens', '2 user roles'], logo: '/logos/pribhum.png', logoClass: 'lg-dark',
  },
  {
    slug: 'firstqa', no: '06', name: 'FirstQA', sector: 'QA SOFTWARE', bg: '#FF5A00', fg: '#0A0A0A',
    line: 'A redesigned SaaS platform with QA workflow automation and a client-facing test dashboard.',
    body: 'We redesigned the FirstQA platform, built tooling to automate parts of their QA workflow, and added a dashboard their own clients use to follow test management.',
    built: ['SaaS platform UI redesign', 'QA workflow automation tooling', 'Client-facing test management dashboard'],
    logo: '/logos/firstqa.png', logoClass: 'lg-mult',
  },
  {
    slug: 'rsvd-capital', no: '07', name: 'RSVD Capital', sector: 'MICROFINANCE', bg: '#F4E000', fg: '#0A0A0A',
    line: 'A brand, a website and a borrower portal for a microfinance company.',
    body: 'We created RSVD’s brand identity, built its marketing website, and added a loan management portal where borrowers can track the progress of an application.',
    built: ['Brand identity system', 'Marketing website', 'Borrower-facing loan management portal with application tracking'],
    logo: '/logos/rsvd.png', logoClass: 'lg-dark',
  },
  {
    slug: 'luminar-fintech', no: '08', name: 'Luminar Fintech', sector: 'TRADING PLATFORM', bg: '#1C3DFF', fg: '#FFFFFF',
    line: 'The interface for a retail trading platform, from live market data to placing the trade.',
    body: 'For Luminar we designed and built the screens a retail trader works in: a real-time market data dashboard, a portfolio tracker and the interface for executing trades.',
    built: ['Retail trading platform UI', 'Real-time market data dashboard', 'Portfolio tracker', 'Trade execution interface'],
    logo: '/logos/luminar.png', logoClass: 'lg-dark',
  },
  {
    slug: 'roccs-academy', no: '09', name: 'ROCCS’ Academy', sector: 'EDUCATION', bg: '#0A0A0A', fg: '#FFFFFF',
    line: 'A brand, a website and the student systems behind a coaching institute.',
    body: 'We gave the academy a full brand identity and a website, then built the systems behind it: a portal where students enrol and a course management system the staff use day to day.',
    built: ['Full brand identity', 'Coaching institute website', 'Student enrolment portal', 'Course management system'],
    logo: '/logos/roccs.png', logoClass: 'lg-dark',
  },
  {
    slug: 'owasp', no: '10', name: 'OWASP', sector: 'CYBERSECURITY', bg: '#E9E9E9', fg: '#0A0A0A',
    line: 'Chapter sites, a security resource hub and event registration for a global nonprofit.',
    body: 'For OWASP we built the web pieces a global volunteer community relies on: landing pages for chapters, a hub for security resources, an event registration system and the documentation infrastructure behind it.',
    built: ['Chapter landing pages', 'Security resource hub', 'Event registration system', 'Documentation infrastructure'],
    logo: '/logos/owasp.svg', logoClass: 'lg-owasp', logoText: 'OWASP',
  },
  {
    slug: 'ch-plus-partners', no: '11', name: 'CH Plus Partners', sector: 'INTERIORS / HYDERABAD', bg: '#FF5A00', fg: '#0A0A0A',
    line: 'A scroll-driven 3D website that takes visitors from an empty plot to a finished villa.',
    body: 'CH Plus Partners designs and builds residential interiors in Hyderabad. We created their website as one continuous scroll that moves from plot to structure to finished villa, so prospective clients see how a project comes together before they get in touch.',
    built: ['Scroll-driven 3D website', 'Plot-to-villa walkthrough sequence', 'Project gallery', 'Enquiry and contact flow'],
    logo: '/logos/chplus.png', logoClass: 'lg-chplus',
  },
  {
    slug: 'livedelite-interiors', no: '12', name: 'LiveDelite Interiors', sector: 'INTERIORS / AI AUTOMATION', bg: '#F4E000', fg: '#0A0A0A',
    line: 'An AI front desk for Instagram, WhatsApp and phone enquiries, with every lead kept in one place.',
    body: 'LiveDelite Interiors receives enquiries across Instagram DMs, WhatsApp and inbound calls. We built one AI system that answers on all three channels at any hour, records every lead in a single list, and hands the conversation to the team whenever a person is needed.',
    built: ['Instagram DM, WhatsApp and call automation', 'One central lead list', 'Human handover'],
    logo: '/logos/livedelite.png', logoClass: 'lg-livedelite',
  },
  {
    slug: 'aigtm-channel', no: '13', name: 'AIGTM Channel', sector: 'MULTI-AGENT SYSTEM', bg: '#1C3DFF', fg: '#FFFFFF',
    line: 'A multi-agent system that runs their outbound email campaigns and qualifies the leads that come back.',
    body: 'For AIGTM Channel we built a multi-agent system that automates their outbound email campaigns from start to finish and qualifies the leads that respond, along with the other follow-up work around it.',
    built: ['Multi-agent system', 'Outbound email campaign automation', 'Lead qualification', 'And more around the campaign workflow'],
    wordmark: 'aigtm',
  },
  {
    slug: 'vellar', no: '14', name: 'Vellar', sector: 'FASHION / E-COMMERCE', bg: '#0A0A0A', fg: '#FFFFFF',
    line: 'The complete website for a clothing brand, with the payment gateway built in.',
    body: 'Vellar is a clothing brand, and we built its entire website, from the brand storefront to the way customers pay. The payment gateway is integrated, so a visitor can go from browsing to buying without leaving the site.',
    built: ['Complete clothing-brand website', 'Payment gateway integration'],
  },
];

export const featured = clients.slice(0, 5);
export const rest = clients.slice(5);

export const services = [
  { n: '01', t: 'Voice agents', d: 'Phone agents that call your customers or pick up for you in Hindi and regional languages, and hand over to a person when the call needs one.' },
  { n: '02', t: 'AI automation', d: 'The follow-ups, data entry and weekly reporting that eat your team’s afternoons, done for them.' },
  { n: '03', t: 'AI workflows', d: 'Lead capture, qualification, approvals and CRM updates connected into one flow.' },
  { n: '04', t: 'AI agents', d: 'Agents that work with your own data and tools, remember context and stay inside the limits you set.' },
  { n: '05', t: 'Multi-agent systems', d: 'Several specialist agents that plan a job, pass work along and check each other’s results.' },
  { n: '06', t: 'Chat and WhatsApp bots', d: 'Assistants for sales and support that answer questions, qualify people and bring in your team at the right moment.' },
  { n: '07', t: 'Websites', d: 'Fast sites and landing pages built to convert, with AI worked in where it helps.' },
  { n: '08', t: 'Web and mobile apps', d: 'Customer apps, portals and admin panels, taken from first screen to launch.' },
  { n: '09', t: 'CRM and internal tools', d: 'Operating software for calling teams, QA, incentives and reporting.' },
  { n: '10', t: 'Integrations and APIs', d: 'Your CRM, ads, email, payments and messaging tools talking to one another.' },
  { n: '11', t: 'Data and dashboards', d: 'One live view of clients, campaigns and operations.' },
];

export const steps = [
  { n: '01', t: 'SCOPING', d: 'We begin by mapping how the work really happens today, awkward edge cases included, and agree what a good result looks like.' },
  { n: '02', t: 'BUILDING', d: 'A working version reaches you early, while changing your mind is still cheap.' },
  { n: '03', t: 'HANDOVER', d: 'We stay for launch and training, and for the fixes that only show up once people use it.' },
  { n: '04', t: 'REPORTING', d: 'You get an honest account of what works today, what we are measuring and what comes next.' },
];

export const founders = [
  { name: 'ATHARVA SINGH', email: 'atharvasingh0405@gmail.com', phone: '919990052074', phoneShow: '+91 99900 52074' },
  { name: 'SANIDHYA SHISHODIA', email: 'shishodiasanidhya@gmail.com', phone: '919368322072', phoneShow: '+91 93683 22072' },
];

export const tape = ['AI AUTOMATION', 'VOICE AGENTS', 'OPERATING SOFTWARE', 'MULTI-AGENT SYSTEMS', 'WHATSAPP BOTS', 'WEB AND MOBILE APPS', 'INTEGRATIONS'];

/** Knowledge the "Ask Aperture" concierge quotes from. It never answers outside this. */
export type Chunk = { id: string; title: string; href: string; text: string; keys: string };
export const chunks: Chunk[] = [
  { id: 'who', title: 'Who we are', href: '/studio', keys: 'who about team founders studio aperture company small', text: 'Aperture is two founders, Atharva Singh and Sanidhya Shishodia, who both stay on every project from the first scope call through launch. We have worked with more than twenty-five clients across six industries.' },
  { id: 'what', title: 'What we build', href: '/services', keys: 'build services offer do what ai automation apps websites', text: 'Voice agents, AI automation and workflows, agents and multi-agent systems, chat and WhatsApp bots, websites, web and mobile apps, CRM and internal tools, integrations and dashboards. If it is a workflow or a product, we can scope it.' },
  { id: 'voice', title: 'Voice agents', href: '/services', keys: 'voice calling hindi regional language call transfer phone', text: 'Our voice agents handle inbound and outbound calls in Hindi and regional languages and transfer to a person when needed. In the BPO work, AI calling covers approved workflows in five languages.' },
  { id: 'bpo', title: 'Calling 24o7', href: '/work/calling-24o7', keys: 'bpo calling 24o7 700 call center operations qa incentives', text: 'For the 700-person BPO Calling 24o7 we built one system for calling, CRM, workforce operations, QA, incentives and client reporting, serving 14 regional languages. Our planning model puts it at 2,917 hours returned a month, worth INR 52.5L to 87.5L a year. That is an estimate, not a measured result.' },
  { id: 'pers', title: 'Persuaders', href: '/work/persuaders', keys: 'persuaders bpo 24/7 enterprise partners', text: 'Persuaders uses the same platform for a 24/7 floor of 300 to 400 people serving more than fifteen enterprise partners. Our planning model estimates 1,458 hours returned a month.' },
  { id: 'zero', title: 'CapxAI', href: '/work/zero-capxai', keys: 'zero capx capxai agents multi agent mainnet token crypto zero person company', text: 'We built the complete mainnet product for CapxAI’s ZERO: the agent workspace, task orchestration, persistent outputs, integrations and controls. It reached a $40M peak market cap and 15K token holders.' },
  { id: 'arty', title: 'InterioArty', href: '/work/interioarty', keys: 'interioarty arty chatbot lead qualification whatsapp interior pune', text: 'Arty is a website assistant for a Pune interior studio. It answers from approved studio facts, qualifies the lead, and hands it to the team on WhatsApp through a simple inbox.' },
  { id: 'pri', title: 'PriBhum Nest', href: '/work/pribhum-nest', keys: 'pribhum pg property real estate app mobile students owners kyc supabase', text: 'A PG platform for owners and students with a mobile app, an admin panel and a Supabase backend, covering listings, enquiries, onboarding, bed availability, KYC, rewards and owner analytics.' },
  { id: 'more', title: 'More work', href: '/work', keys: 'clients other firstqa rsvd luminar roccs owasp ch plus livedelite aigtm outbound email fintech education trading', text: 'We have also built for FirstQA, RSVD Capital, Luminar Fintech, ROCCS’ Academy, OWASP, CH Plus Partners, LiveDelite Interiors, Vellar (a clothing brand whose website and payment gateway we built) and AIGTM Channel, whose outbound email campaigns and lead qualification now run on a multi-agent system we built. Each has its own page under Work.' },
  { id: 'proc', title: 'How we work', href: '/studio', keys: 'process how work scope timeline handover honest', text: 'We map the real workflow first, get a working version to you early, stay through launch and training, and report honestly on what works and what is still being measured.' },
  { id: 'agency', title: 'For agencies', href: '/studio', keys: 'agency partner white label resell gtm subcontract', text: 'If you hold the client relationship and need a team to build the automation or software behind it, that is something we do. The way the engagement is packaged, including white-label delivery, is agreed on a call.' },
  { id: 'contact', title: 'Contact', href: '/contact', keys: 'contact email book call reach hire price pricing cost quote', text: 'The fastest way is WhatsApp or a call: Atharva Singh on +91 99900 52074 and Sanidhya Shishodia on +91 93683 22072. You can also email atharvasingh0405@gmail.com or shishodiasanidhya@gmail.com. We do not publish pricing, so ask us directly.' },
];
