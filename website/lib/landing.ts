// Service landing pages, one per buyer search. Facts must match lib/data.ts: no new clients,
// numbers or timelines. AI calling is five languages; 14 is the BPO platform's overall regional scope.

export type Landing = {
  slug: string; keyword: string; title: string; description: string;
  h1: string[];          // poster lines for the big headline
  lead: string;          // the one-paragraph answer
  build: string[];       // what we build
  how: { t: string; d: string }[];
  work: { slug: string; name: string; why: string }[];
  timeline: string;
  faqs: { q: string; a: string }[];
  guide?: { href: string; label: string };
};

const fast = 'Automations typically ship in 2 to 3 days, multi-agent systems in under a week and websites in 4 to 5 days. We confirm the exact timeline after a short scoping call.';

export const landings: Landing[] = [
  {
    slug: 'ai-automation-agency-india',
    keyword: 'ai automation agency in india',
    title: 'AI Automation Agency in India',
    description: 'Aperture is a founder-led AI automation agency in India. We automate follow-ups, CRM updates, WhatsApp, calls and reporting, and typically ship in 2 to 3 days.',
    h1: ['"AI AUTOMATION', 'AGENCY, INDIA"'],
    lead: 'We are a two-founder AI automation agency in India. We take the repetitive work off your team: lead follow-ups, CRM updates, WhatsApp and Instagram replies, calls, document handling and reporting. A working automation usually reaches you in 2 to 3 days.',
    build: ['Lead capture, qualification and follow-up', 'CRM updates and data entry', 'WhatsApp and Instagram replies', 'AI calling and call summaries', 'Daily and weekly reporting', 'n8n and custom workflows with AI steps'],
    how: [
      { t: 'Map the real work', d: 'We start from how the task is done today, awkward edge cases included, and agree what a good result looks like.' },
      { t: 'Ship something working early', d: 'A first version runs on your real data within days, while changing your mind is still cheap.' },
      { t: 'Stay through launch', d: 'Both founders stay for launch, training and the fixes that only show up once people use it.' },
    ],
    work: [
      { slug: 'livedelite-interiors', name: 'LiveDelite Interiors', why: 'One AI front desk across Instagram, WhatsApp and phone, with every lead in one list.' },
      { slug: 'aigtm-channel', name: 'AIGTM Channel', why: 'A multi-agent system that runs outbound email campaigns and qualifies replies.' },
      { slug: 'calling-24o7', name: 'Calling 24o7', why: 'One operating system for a 700-person BPO, with AI calling and human transfer.' },
    ],
    timeline: fast,
    faqs: [
      { q: 'What does an AI automation agency do?', a: 'It builds systems that do repetitive work for your team, such as following up leads, updating your CRM, answering WhatsApp, making calls and preparing reports, using AI where judgement is needed.' },
      { q: 'How fast can you deliver?', a: fast },
      { q: 'How much does it cost?', a: 'Pricing depends on the workflow, tools and volume. We do not publish prices; a founder quotes after a short call.' },
      { q: 'Do you work remotely?', a: 'Yes. Scoping happens on a call or WhatsApp, and you see working versions as we build.' },
    ],
    guide: { href: 'https://apertureautomates.com', label: 'Best AI automation agencies in India, compared' },
  },
  {
    slug: 'n8n-automation-services',
    keyword: 'n8n automation services india',
    title: 'n8n Automation Services and n8n Developers in India',
    description: 'n8n automation services from Aperture: workflow design, AI agents inside n8n, self-hosting, and Zapier or Make migrations. Typical delivery 2 to 3 days.',
    h1: ['"N8N', 'AUTOMATION"'],
    lead: 'We build n8n workflows for teams that have outgrown Zapier or want automation with real AI in it. That means workflow design, AI agent steps, integrations with your CRM and WhatsApp, error handling and monitoring, on n8n Cloud or self-hosted.',
    build: ['New n8n workflows end to end', 'AI agent and LLM steps inside n8n', 'CRM, WhatsApp, email and Sheets integrations', 'Self-hosted n8n with monitoring', 'Zapier and Make migrations', 'Retries, error alerts and logging'],
    how: [
      { t: 'Pick the workflow', d: 'We start with the one workflow that costs your team the most hours.' },
      { t: 'Build it production-grade', d: 'Error branches, retries and alerts from day one, so it keeps running at 2am.' },
      { t: 'Hand it over', d: 'Workflows, credentials and notes live in your account. No lock-in.' },
    ],
    work: [
      { slug: 'aigtm-channel', name: 'AIGTM Channel', why: 'Campaign automation and lead qualification run by a multi-agent system.' },
      { slug: 'livedelite-interiors', name: 'LiveDelite Interiors', why: 'Instagram, WhatsApp and call enquiries automated into one lead list.' },
    ],
    timeline: fast,
    faqs: [
      { q: 'Do you build in n8n?', a: 'Yes, regularly, and we go beyond n8n with custom agents or software when a workflow needs it.' },
      { q: 'Cloud or self-hosted?', a: 'n8n Cloud is quicker to start; self-hosting is cheaper at volume and keeps data with you. We recommend one based on your volume and data.' },
      { q: 'Can you migrate our Zapier or Make automations?', a: 'Yes. We rebuild them in n8n, run both side by side, then switch over.' },
      { q: 'How long does it take?', a: fast },
    ],
    guide: { href: 'https://apertureautomates.com/best-n8n-agencies-india', label: 'Best n8n agencies in India, compared' },
  },
  {
    slug: 'ai-voice-agent-development',
    keyword: 'ai voice agent development india',
    title: 'AI Voice Agent Development in India (Hindi and Regional Languages)',
    description: 'Custom AI voice and calling agents in Hindi and regional languages, built into your dialer, CRM and reporting, with transfer to a person. By Aperture.',
    h1: ['"AI VOICE', 'AGENTS"'],
    lead: 'We build phone agents that call your customers or pick up for you in Hindi and regional languages, and hand over to a person when the call needs one. We wire them into your dialer, CRM, callbacks and reporting, so the agent is part of your operation, not another tool.',
    build: ['Inbound and outbound calling agents', 'Hindi, Hinglish and regional languages', 'Transfer to a person with context', 'Dialer, CRM and callback integration', 'Call QA and reporting', 'Collections, reminders and lead qualification flows'],
    how: [
      { t: 'Script from real calls', d: 'We design the flow from your actual calls and edge cases, not a demo script.' },
      { t: 'Pilot on your numbers', d: 'A small live pilot on your own customers before scaling up.' },
      { t: 'Measure and hand over', d: 'Call outcomes, transfers and QA in one view, with your team trained on it.' },
    ],
    work: [
      { slug: 'calling-24o7', name: 'Calling 24o7', why: 'AI calling inside the operating system for a 700-person BPO serving 14 regional languages, with approved workflows in five languages.' },
      { slug: 'persuaders', name: 'Persuaders', why: 'The same platform on a 24/7 floor serving fifteen-plus enterprise partners.' },
      { slug: 'livedelite-interiors', name: 'LiveDelite Interiors', why: 'Calls answered by AI alongside WhatsApp and Instagram.' },
    ],
    timeline: 'Voice agent timelines depend on languages, integrations and call volume. A founder gives you a timeline after a short call.',
    faqs: [
      { q: 'Which languages can the voice agent speak?', a: 'Hindi, Hinglish and regional languages. In our BPO work, AI calling runs approved workflows in five languages.' },
      { q: 'Can it transfer to a human?', a: 'Yes. It passes the call to a person with the context when the call needs one.' },
      { q: 'Should I use a platform or a custom build?', a: 'Platforms are cheaper per minute if you have people to design flows and integrations. We build and run it inside your operation if you do not.' },
      { q: 'How much does it cost?', a: 'It depends on volume, languages and integrations. A founder quotes after a short call.' },
    ],
    guide: { href: 'https://aperturebuilds.com/best-ai-voice-agents-india', label: 'Best AI voice agents in India, compared' },
  },
  {
    slug: 'whatsapp-chatbot-development',
    keyword: 'whatsapp chatbot development company india',
    title: 'WhatsApp Chatbot Development Company in India',
    description: 'AI WhatsApp and Instagram bots that answer from your own facts, qualify leads and hand them to your team. Built by Aperture, typically in days.',
    h1: ['"WHATSAPP', 'CHATBOTS"'],
    lead: 'We build WhatsApp, Instagram and website assistants that answer from facts you approve, qualify the person as the conversation goes, and hand the lead to your team at the right moment, with everything landing in one inbox.',
    build: ['WhatsApp Business API bots', 'Instagram DM automation', 'Website chat assistants', 'Lead qualification and handover', 'CRM and Sheets sync', 'One lead inbox for the team'],
    how: [
      { t: 'Your facts only', d: 'The bot answers from what you approve, so it never invents prices or promises.' },
      { t: 'Qualify, then hand over', d: 'It collects what your team needs and passes the lead on WhatsApp.' },
      { t: 'Live in days', d: 'A first version goes live quickly and improves from real conversations.' },
    ],
    work: [
      { slug: 'interioarty', name: 'InterioArty', why: 'Arty answers from approved studio facts and hands qualified leads to the team on WhatsApp.' },
      { slug: 'livedelite-interiors', name: 'LiveDelite Interiors', why: 'One AI front desk across Instagram, WhatsApp and phone.' },
    ],
    timeline: fast,
    faqs: [
      { q: 'Do I need the WhatsApp Business API?', a: 'For an automated bot, yes. We help set it up through a provider and build the bot on top.' },
      { q: 'Will the bot make things up?', a: 'Our bots answer only from facts you approve and hand anything else to your team.' },
      { q: 'How long does it take?', a: fast },
      { q: 'What does it cost?', a: 'It depends on channels, volume and integrations. A founder quotes after a short call.' },
    ],
  },
  {
    slug: 'ai-agent-development',
    keyword: 'ai agent development company india',
    title: 'AI Agent Development Company in India',
    description: 'Custom AI agents and multi-agent systems that use your tools and data, stay inside limits you set, and ship in under a week. Built by Aperture.',
    h1: ['"AI AGENT', 'DEVELOPMENT"'],
    lead: 'We build AI agents that work with your own data and tools, remember context and stay inside the limits you set, and multi-agent systems where specialist agents plan a job, pass work along and check each other’s results. Multi-agent systems typically ship in under a week.',
    build: ['Single-task agents for one job', 'Multi-agent systems with hand-offs', 'Tool use: CRM, email, Sheets, internal APIs', 'Memory and persistent outputs', 'Permissions, limits and human approval', 'Logs and monitoring'],
    how: [
      { t: 'One job first', d: 'We start with one well-defined job the agent can do reliably.' },
      { t: 'Guardrails before features', d: 'Limits, approvals and logs are part of the first version.' },
      { t: 'Then expand', d: 'Add agents once the first one has earned trust.' },
    ],
    work: [
      { slug: 'zero-capxai', name: 'CapxAI', why: 'The full mainnet product behind ZERO: agent workspace, orchestration, persistent outputs and controls.' },
      { slug: 'aigtm-channel', name: 'AIGTM Channel', why: 'A multi-agent system running outbound campaigns and qualifying replies.' },
    ],
    timeline: fast,
    faqs: [
      { q: 'What is the difference between a chatbot and an AI agent?', a: 'A chatbot answers questions. An agent takes actions: it looks things up, updates records, sends messages and finishes tasks within limits you set.' },
      { q: 'How fast can you build one?', a: fast },
      { q: 'Who owns the code and data?', a: 'You do. Code, prompts, data and accounts end up in your name.' },
      { q: 'What does it cost?', a: 'It depends on scope. A founder quotes after a short call.' },
    ],
    guide: { href: 'https://aperturebuilds.com', label: 'Best AI agent development companies in India, compared' },
  },
  {
    slug: 'ai-chatbot-development',
    keyword: 'ai chatbot development company in india',
    title: 'AI Chatbot Development Company in India',
    description: 'Custom AI chatbots for your website, WhatsApp and Instagram that answer from your facts, qualify leads and hand them to your team. Built by Aperture in days.',
    h1: ['"AI CHATBOT', 'DEVELOPMENT"'],
    lead: 'We build AI chatbots that do a job: answer customers from facts you approve, qualify leads as the conversation goes, and pass them to your team on WhatsApp. One assistant can run on your website, WhatsApp and Instagram, with every lead in one inbox.',
    build: ['Website chat assistants', 'WhatsApp and Instagram bots', 'Answers grounded in your own content', 'Lead qualification and handover', 'CRM, Sheets and helpdesk sync', 'Internal knowledge assistants'],
    how: [
      { t: 'One job first', d: 'Lead capture, support or internal search. We build for one and measure it.' },
      { t: 'No made-up answers', d: 'The bot answers from your approved facts and hands anything else to a person.' },
      { t: 'Live in days', d: 'A first version goes live quickly and improves from real conversations.' },
    ],
    work: [
      { slug: 'interioarty', name: 'InterioArty', why: 'Arty answers from approved studio facts, qualifies leads and hands them over on WhatsApp, with about 130ms to first token.' },
      { slug: 'livedelite-interiors', name: 'LiveDelite Interiors', why: 'One AI front desk across Instagram, WhatsApp and phone.' },
    ],
    timeline: fast,
    faqs: [
      { q: 'How is this different from a chatbot builder?', a: 'Builders give you a tool to configure. We build and run the assistant for you, connected to your tools and trained on your facts.' },
      { q: 'Will it work on WhatsApp too?', a: 'Yes. The same assistant can run on your website, WhatsApp and Instagram.' },
      { q: 'How long does it take?', a: fast },
      { q: 'What does it cost?', a: 'It depends on channels, volume and integrations. A founder quotes after a short call.' },
    ],
    guide: { href: 'https://aperturebuilds.com/best-ai-chatbot-development-companies-india', label: 'Best AI chatbot development companies in India, compared' },
  },
  {
    slug: 'custom-crm-development',
    keyword: 'custom crm development company in india',
    title: 'Custom CRM Development Company in India',
    description: 'Custom CRMs and internal tools built around how your team works: leads, callbacks, QA, incentives, approvals and reporting, with AI where it helps. By Aperture.',
    h1: ['"CUSTOM', 'CRM"'],
    lead: 'We build CRMs and internal tools around how your team actually works, instead of bending your process to an off-the-shelf product: leads and callbacks, approvals, QA, incentives, admin panels and the reports your clients and managers read.',
    build: ['Lead, deal and callback management', 'Admin panels and approvals', 'QA, incentives and workforce records', 'Client and management reporting', 'WhatsApp, calling and email built in', 'AI for follow-ups and summaries'],
    how: [
      { t: 'Map how you work', d: 'We start from your real process and the reports people need.' },
      { t: 'Ship in slices', d: 'The most-used screens first, so your team gets value early.' },
      { t: 'Own it outright', d: 'Your code, your data, your accounts.' },
    ],
    work: [
      { slug: 'calling-24o7', name: 'Calling 24o7', why: 'Dialer, CRM, workforce, QA, incentives and client reporting in one product for a 700-person BPO.' },
      { slug: 'pribhum-nest', name: 'PriBhum Nest', why: 'Admin panel and app for listings, enquiries, KYC and rewards.' },
      { slug: 'firstqa', name: 'FirstQA', why: 'A client-facing test management dashboard and QA workflow tooling.' },
    ],
    timeline: 'Depends on the number of modules. A founder scopes it with you and we ship the first screens early.',
    faqs: [
      { q: 'Why custom instead of Zoho or HubSpot?', a: 'Off-the-shelf CRMs are great when your process is standard. When it is not, such as BPO QA and incentives or PG listings and KYC, a custom CRM fits the work and replaces several tools.' },
      { q: 'Can it include AI?', a: 'Yes: AI calling, follow-ups, summaries and lead scoring where they save time.' },
      { q: 'Who owns the code?', a: 'You do.' },
      { q: 'What does it cost?', a: 'It depends on modules and users. A founder quotes after scoping.' },
    ],
  },
  {
    slug: 'ai-calling-software',
    keyword: 'ai calling software in india',
    title: 'AI Calling Software for Indian Businesses',
    description: 'AI calling for sales, collections, reminders and support in Hindi and regional languages, built into your CRM and dialer with transfer to a person. By Aperture.',
    h1: ['"AI', 'CALLING"'],
    lead: 'We set up AI calling that makes and takes calls for approved workflows such as lead qualification, payment reminders, confirmations and support, in Hindi and regional languages, and transfers to a person when needed. It runs inside your CRM and dialer, with outcomes logged and reported.',
    build: ['Outbound qualification and reminders', 'Inbound answering and routing', 'Hindi, Hinglish and regional languages', 'Transfer to a person with context', 'CRM and dialer integration', 'Call outcomes and QA reporting'],
    how: [
      { t: 'Approved workflows only', d: 'We script the calls the AI handles and route everything else to people.' },
      { t: 'Pilot first', d: 'A small live pilot on your own numbers before scaling.' },
      { t: 'Report every call', d: 'Outcomes, transfers and QA in one view.' },
    ],
    work: [
      { slug: 'calling-24o7', name: 'Calling 24o7', why: 'AI calling inside a 700-person BPO platform, approved workflows in five languages.' },
      { slug: 'persuaders', name: 'Persuaders', why: 'The same platform on a 24/7 floor.' },
    ],
    timeline: 'Depends on languages, integrations and volume. A founder gives you a timeline after a short call.',
    faqs: [
      { q: 'Which languages are supported?', a: 'Hindi, Hinglish and regional languages; our BPO deployment runs approved workflows in five languages.' },
      { q: 'Is it a platform I configure?', a: 'No. We set it up, integrate it and run it with you.' },
      { q: 'Can it do collections calls?', a: 'Yes, on approved scripts such as payment reminders, with sensitive cases transferred to a person.' },
      { q: 'What does it cost?', a: 'It depends on call volume and integrations. A founder quotes after a short call.' },
    ],
    guide: { href: 'https://aperturebuilds.com/best-ai-voice-agents-india', label: 'Best AI voice agents in India, compared' },
  },
  {
    slug: 'ai-receptionist',
    keyword: 'ai receptionist india',
    title: 'AI Receptionist for Indian Businesses (Calls, WhatsApp, Instagram)',
    description: 'An AI front desk that answers calls, WhatsApp and Instagram any hour, captures every enquiry in one list and hands over to your team. Built by Aperture.',
    h1: ['"AI', 'RECEPTIONIST"'],
    lead: 'We build an AI front desk that answers your calls, WhatsApp and Instagram at any hour, captures every enquiry in one list, books or qualifies where it can, and hands the conversation to your team whenever a person is needed.',
    build: ['Answers calls in Hindi and English', 'WhatsApp and Instagram replies', 'Enquiries in one central list', 'Booking and qualification', 'Hand-off to your team', 'Daily summary of enquiries'],
    how: [
      { t: 'Learn your front desk', d: 'We capture what your team says to callers today, and what it never says.' },
      { t: 'Go live on one channel', d: 'Start with calls or WhatsApp, then add the rest.' },
      { t: 'Never lose a lead', d: 'Every enquiry lands in one list your team works through.' },
    ],
    work: [
      { slug: 'livedelite-interiors', name: 'LiveDelite Interiors', why: 'An AI system answering Instagram DMs, WhatsApp and inbound calls at any hour, with one lead list.' },
      { slug: 'interioarty', name: 'InterioArty', why: 'A website assistant that qualifies and hands over on WhatsApp.' },
    ],
    timeline: fast,
    faqs: [
      { q: 'Can it answer phone calls?', a: 'Yes. It answers calls, handles common questions and transfers to a person when needed.' },
      { q: 'What about after hours?', a: 'It answers at any hour and leaves your team a list of enquiries to follow up.' },
      { q: 'How long does it take?', a: fast },
      { q: 'What does it cost?', a: 'It depends on channels and volume. A founder quotes after a short call.' },
    ],
  },
  {
    slug: 'bpo-crm-software',
    keyword: 'bpo crm software india',
    title: 'BPO and Call Centre CRM Software, Built for Your Floor',
    description: 'One operating system for BPOs and call centres: dialer, CRM, QA, incentives, workforce and client reporting, with regional-language AI calling. Built by Aperture.',
    h1: ['"BPO', 'SOFTWARE"'],
    lead: 'We build one operating system for calling teams in place of a stack of disconnected tools: campaign dialer, CRM and callbacks, workforce records, evidence-linked QA, incentives, a live floor view and client reporting, with regional-language AI calling that transfers to a person.',
    build: ['Campaign dialer, CRM and callbacks', 'Regional-language AI calling with human transfer', 'Evidence-linked QA and coaching', 'Workforce records and incentives', 'Live floor view', 'Reporting for each client'],
    how: [
      { t: 'Map your floor', d: 'We start from how your campaigns, QA and reporting run today.' },
      { t: 'Replace tools in stages', d: 'Move one piece at a time so the floor never stops.' },
      { t: 'Report honestly', d: 'Clear numbers on what works and what is still being measured.' },
    ],
    work: [
      { slug: 'calling-24o7', name: 'Calling 24o7', why: 'A 700-person BPO on one system, serving 14 regional languages.' },
      { slug: 'persuaders', name: 'Persuaders', why: 'A 24/7 floor of 300 to 400 people serving fifteen-plus enterprise partners.' },
    ],
    timeline: 'Depends on the size of the floor and which tools are replaced first. A founder scopes it with you on a call.',
    faqs: [
      { q: 'Is this off-the-shelf software?', a: 'No. It is a platform we set up for your floor, campaigns and clients, built on what we run for Calling 24o7 and Persuaders.' },
      { q: 'Does it include AI calling?', a: 'Yes, regional-language AI calling with transfer to a person, on approved workflows.' },
      { q: 'Can we move over gradually?', a: 'Yes. We replace one tool at a time so the floor keeps running.' },
      { q: 'What does it cost?', a: 'It depends on seats and modules. A founder quotes after scoping.' },
    ],
  },
];
