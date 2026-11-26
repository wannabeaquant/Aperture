// Deeper case-study sections. Facts come only from Aperture Client Work.pptx and data.ts; nothing here is estimated.

export type Depth = {
  challenge: string;
  how: { t: string; d: string }[];
  outcome: string;
  faqs: { q: string; a: string }[];
  services: { slug: string; label: string }[];
};

const WORKED = 'Both founders worked on it from the first scoping call to launch: we mapped the real workflow first, shipped a working path early so decisions were still cheap to change, and stayed through handover for the fixes that only show up in real use.';

export const depth: Record<string, Depth> = {
  'calling-24o7': {
    challenge: 'Calling 24o7 runs a 700-person BPO. Calling, CRM, workforce records, quality checks, incentives and client reporting lived in separate tools, so supervisors spent their day moving between screens and assembling reports by hand. The operation also serves callers in 14 regional languages, which any calling automation had to respect.',
    how: [
      { t: 'Calling', d: 'Inbound and outbound calling, regional-language AI workflows, call transfer to a person, recordings and structured call outcomes. AI calling covers approved workflows in five languages and hands the call to an agent whenever it needs to.' },
      { t: 'Operations', d: 'Campaign dialer, CRM, assignments, callbacks, workforce records, attendance and shift handling in the same product the agents call from.' },
      { t: 'Quality', d: 'Evidence-linked QA with human review, coaching, script checks and long-call investigation, so a reviewer can see exactly which part of a call a score refers to.' },
      { t: 'Management', d: 'Live floor view, agent performance, incentives, client reporting and controlled access to data, so each client sees only its own numbers.' },
    ],
    outcome: `One operating product replaced a stack of disconnected tools. Our planning model, 10 minutes saved per person per working day across 700 people, puts the time returned at 2,917 hours a month. Together with Persuaders, more than 1,000 people now work on the same operating layer. ${WORKED}`,
    faqs: [
      { q: 'Does the AI take every call?', a: 'No. AI calling handles approved workflows in five languages and transfers the call to a person whenever it needs to. Agents keep the calls that need judgement.' },
      { q: 'How is the 2,917 hours figure worked out?', a: 'It is a planning model, not a measured result: 10 minutes saved per person per day, 25 working days a month, across 700 people.' },
      { q: 'Can the same system run a smaller BPO?', a: 'Yes. Persuaders runs the same operating layer for a 300 to 400 person, 24/7 operation.' },
    ],
    services: [
      { slug: 'bpo-crm-software', label: 'BPO CRM software' },
      { slug: 'ai-calling-software', label: 'AI calling software' },
      { slug: 'ai-voice-agent-development', label: 'AI voice agent development' },
    ],
  },
  persuaders: {
    challenge: 'Persuaders runs a 24/7 floor of 300 to 400 people for more than fifteen enterprise partners. With partners, shifts and campaigns running at once, managers needed one place that showed what was happening on the floor and what needed someone’s attention, and each partner needed its own reporting.',
    how: [
      { t: 'Live operations', d: 'A live floor view across shifts and partners, with agent work and status in one screen.' },
      { t: 'Quality and coaching', d: 'Quality review with evidence from the call, plus coaching that follows from what the reviewer found.' },
      { t: 'Records and incentives', d: 'Customer records and incentive tracking in the same system the floor works in.' },
      { t: 'Partner reporting', d: 'Reporting set up for each enterprise partner, so every partner sees its own results.' },
    ],
    outcome: `Persuaders runs on the same operating layer we built for Calling 24o7, set up for a round-the-clock service model. Using a 350-person midpoint and the same 10-minute daily planning assumption, the model puts the time returned at 1,458 hours a month. ${WORKED}`,
    faqs: [
      { q: 'Is this the same product as Calling 24o7?', a: 'Yes. It is the same operating layer, configured for a 24/7 service model and more than fifteen enterprise partners.' },
      { q: 'How is the 1,458 hours figure worked out?', a: 'It is a planning model: a 350-person midpoint, 10 minutes saved per person per working day, 25 working days a month.' },
    ],
    services: [
      { slug: 'bpo-crm-software', label: 'BPO CRM software' },
      { slug: 'ai-calling-software', label: 'AI calling software' },
    ],
  },
  'zero-capxai': {
    challenge: 'ZERO is CapxAI’s zero-person company: a business meant to be run by AI agents. That needs more than a chat window. Agents have to pick up work, run it somewhere safe, keep what they produce, and stay inside rules and budgets a person can check.',
    how: [
      { t: 'Agent workspace', d: 'Specialist workers, task queues and execution views, so it is clear which agent owns which task and where it stands.' },
      { t: 'Task execution', d: 'Tasks run in isolated environments with connected tools, and an agent can create follow-up tasks for others.' },
      { t: 'Saved outputs', d: 'Files and execution history are linked to the agent and task that produced them, so the work stays visible after a session ends.' },
      { t: 'Operating controls', d: 'Access rules, budget approvals and financial records. A worker requests a task budget, rules or the CEO agent approve it, the worker spends from a funded wallet, and expenses and unused funds are reconciled with auditable receipts.' },
    ],
    outcome: `We built the complete mainnet product ZERO runs on: the workspace, orchestration, persistent outputs, integrations and controls. ZERO reached a reported peak market cap of $40M with 15K token holders. ${WORKED}`,
    faqs: [
      { q: 'What did Aperture build for ZERO?', a: 'The full mainnet product: agent workspace, task orchestration across agents, persistent outputs, integrations, and the controls and permissions around them, including the agent budget and expense flow.' },
      { q: 'How do the agents stay within limits?', a: 'Every action runs under access rules, and spending goes through a request, approve, execute and reconcile flow with records a person can audit.' },
    ],
    services: [
      { slug: 'ai-agent-development', label: 'AI agent development' },
      { slug: 'ai-automation-agency-india', label: 'AI automation agency in India' },
    ],
  },
  'aigtm-channel': {
    challenge: 'AIGTM Channel runs outbound email campaigns for its clients. Each campaign repeats the same chain of work, from setup and copy to sending, follow-ups, reply handling and qualifying the people who answer, and doing it by hand limits how many campaigns a small team can run.',
    how: [
      { t: 'Campaign setup', d: 'Agents prepare each campaign from the brief: who to contact and what to say.' },
      { t: 'Sending and follow-up', d: 'The system sends the sequence and runs the follow-ups on schedule.' },
      { t: 'Reply handling', d: 'Replies are read and sorted as they arrive, so interested people are not left waiting.' },
      { t: 'Lead qualification', d: 'Responding leads are qualified and passed on with the context the team needs for the next step.' },
    ],
    outcome: `A multi-agent system now runs AIGTM Channel’s outbound email campaigns from start to finish and qualifies the leads that respond, along with the follow-up work around it. ${WORKED}`,
    faqs: [
      { q: 'What is a multi-agent system here?', a: 'Several AI agents, each with one job (preparing, sending, handling replies, qualifying), passing work between them inside limits the team sets.' },
      { q: 'Does a person still see the leads?', a: 'Yes. The system qualifies replies and hands qualified leads to the team with context.' },
    ],
    services: [
      { slug: 'ai-agent-development', label: 'AI agent development' },
      { slug: 'n8n-automation-services', label: 'n8n automation services' },
    ],
  },
  interioarty: {
    challenge: 'InterioArty is an interior design studio in Pune. Its website got visitors with real questions, but answers depended on someone being free, and the details of a project brief came out in scattered messages instead of one clean lead.',
    how: [
      { t: 'Visitor asks', d: 'Arty sits on the website and answers using only facts the studio has approved, with memory of the conversation.' },
      { t: 'Arty answers', d: 'Replies start in about 130 milliseconds, so the conversation feels immediate.' },
      { t: 'Lead is structured', d: 'Arty collects the brief as the conversation goes and captures nine lead fields.' },
      { t: 'Team follows up', d: 'The lead is handed to the team on WhatsApp and lands in a three-stage inbox they work through.' },
    ],
    outcome: `The studio’s website now qualifies the lead before anyone picks up the phone. Arty is added with a single line of code. ${WORKED}`,
    faqs: [
      { q: 'Can Arty say something the studio has not approved?', a: 'It answers only from facts the studio has approved, and passes anything else to the team.' },
      { q: 'How does the team get the lead?', a: 'On WhatsApp, with the brief already structured, and in a simple three-stage inbox.' },
    ],
    services: [
      { slug: 'ai-chatbot-development', label: 'AI chatbot development' },
      { slug: 'whatsapp-chatbot-development', label: 'WhatsApp chatbot development' },
      { slug: 'ai-receptionist', label: 'AI receptionist' },
    ],
  },
  'livedelite-interiors': {
    challenge: 'LiveDelite Interiors gets enquiries on Instagram DMs, WhatsApp and inbound calls. Each channel was answered separately, whenever someone was free, so replies were slow after hours and leads were scattered across three inboxes with no single list to follow up from.',
    how: [
      { t: 'Instagram DMs', d: 'The AI answers common questions from facts the studio approves and collects what the team needs to know about the project.' },
      { t: 'WhatsApp', d: 'The same assistant answers on WhatsApp, so a customer gets the same answers whichever channel they use.' },
      { t: 'Inbound calls', d: 'Calls are answered at any hour, with the enquiry details captured instead of a missed call.' },
      { t: 'One lead list and handover', d: 'Every enquiry from every channel lands in one list. Whenever a person is needed, the conversation is handed to the team with the details already captured.' },
    ],
    outcome: 'The studio now has one AI front desk across Instagram, WhatsApp and phone, answering at any hour, with every lead in a single list and a clear point where a person takes over. Both founders worked on it from the first scoping call to launch.',
    faqs: [
      { q: 'Does the AI replace the studio team?', a: 'No. It answers and records enquiries, and hands the conversation to the team whenever a person is needed.' },
      { q: 'Which channels does it cover?', a: 'Instagram DMs, WhatsApp and inbound phone calls, with every lead recorded in one list.' },
    ],
    services: [
      { slug: 'ai-receptionist', label: 'AI receptionist' },
      { slug: 'whatsapp-chatbot-development', label: 'WhatsApp chatbot development' },
    ],
  },
  'pribhum-nest': {
    challenge: 'PG listings and enquiries were handled in separate spreadsheets and chats. Owners had no single place to manage beds and tenants, students had no clean way to find and enquire, and approvals and KYC happened by hand.',
    how: [
      { t: 'Mobile app for two roles', d: 'One mobile app with 15 screens serves both owners and students: owners manage listings and availability, students search, enquire and onboard.' },
      { t: 'Admin panel', d: 'Operations staff approve listings and users and run day-to-day operations from one panel.' },
      { t: 'Listings and onboarding', d: 'Listings, bed availability, enquiries and onboarding live in the same product instead of spreadsheets.' },
      { t: 'KYC, rewards and analytics', d: 'KYC, a rewards system and owner analytics sit on a Supabase backend handling authentication, data and permissions.' },
    ],
    outcome: 'Owners, students and the operations team now work in one product, replacing the spreadsheets and chats. The build covers a 15-screen mobile app with two user roles, an admin panel and the Supabase backend underneath. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What does the platform include?', a: 'A 15-screen mobile app for owners and students, a web admin panel, and a Supabase backend for authentication, data and permissions.' },
      { q: 'Who uses the platform?', a: 'Two roles: PG owners and students, with operations staff working in the admin panel.' },
    ],
    services: [
      { slug: 'custom-crm-development', label: 'Custom CRM and internal tools' },
    ],
  },
  firstqa: {
    challenge: 'FirstQA runs quality assurance for its clients. Its platform needed a clearer interface, parts of the QA workflow were repetitive manual work, and clients had no direct view of how their testing was going.',
    how: [
      { t: 'Platform redesign', d: 'We redesigned the SaaS platform interface so the team and clients can find and work through tests more easily.' },
      { t: 'QA workflow automation', d: 'We built tooling that automates repetitive parts of the QA workflow, so testers spend their time on the testing itself.' },
      { t: 'Client dashboard', d: 'A client-facing dashboard lets FirstQA’s own customers follow test management without asking for updates.' },
    ],
    outcome: 'FirstQA now has a redesigned platform, tooling that takes repetitive steps out of its QA workflow, and a dashboard its clients use to follow their tests. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What did Aperture build for FirstQA?', a: 'A redesign of the SaaS platform, QA workflow automation tooling and a client-facing test management dashboard.' },
      { q: 'Can you automate parts of a QA process?', a: 'Yes. We automate the repetitive, rule-based steps and keep people on the judgement calls, as we did for FirstQA.' },
    ],
    services: [
      { slug: 'custom-crm-development', label: 'Custom CRM and internal tools' },
      { slug: 'ai-automation-agency-india', label: 'AI automation' },
    ],
  },
  'rsvd-capital': {
    challenge: 'RSVD Capital is a microfinance company that needed a brand, a website that explains its lending clearly, and a way for borrowers to see where their application stands without calling the office.',
    how: [
      { t: 'Brand identity', d: 'A full brand identity system, so the company looks the same on its website, documents and portal.' },
      { t: 'Marketing website', d: 'A website that explains what RSVD offers and how to apply.' },
      { t: 'Borrower portal', d: 'A loan management portal where borrowers track the progress of their application.' },
    ],
    outcome: 'RSVD now has a consistent brand, a marketing website and a borrower-facing portal with application tracking, all from one team. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What did Aperture build for RSVD Capital?', a: 'The brand identity system, the marketing website and a borrower-facing loan management portal with application tracking.' },
      { q: 'Do you build portals for financial services companies?', a: 'Yes. RSVD’s borrower portal is one example; we build customer portals, admin panels and the systems behind them.' },
    ],
    services: [
      { slug: 'custom-crm-development', label: 'Custom CRM, portals and internal tools' },
    ],
  },
  'luminar-fintech': {
    challenge: 'Luminar is a retail trading platform. Traders need to watch live market data, track their portfolio and place trades quickly, and the interface has to stay clear while prices move.',
    how: [
      { t: 'Market data dashboard', d: 'A real-time dashboard that shows live market data in the view a retail trader works from.' },
      { t: 'Portfolio tracker', d: 'A portfolio view so traders see their positions alongside the market.' },
      { t: 'Trade execution', d: 'The interface for placing trades, from choosing an instrument to confirming the order.' },
    ],
    outcome: 'We designed and built the screens a Luminar trader works in: the real-time market data dashboard, the portfolio tracker and the trade execution interface. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What did Aperture build for Luminar?', a: 'The retail trading platform interface: a real-time market data dashboard, a portfolio tracker and the trade execution interface.' },
      { q: 'Do you build real-time interfaces?', a: 'Yes. Luminar’s market data dashboard updates live, and we build dashboards for operations and reporting the same way.' },
    ],
    services: [
      { slug: 'custom-crm-development', label: 'Custom software and internal tools' },
    ],
  },
  'roccs-academy': {
    challenge: 'ROCCS’ Academy is a coaching institute that needed to look established online and to move enrolment and course management out of manual processes.',
    how: [
      { t: 'Brand identity', d: 'A full brand identity for the academy.' },
      { t: 'Website', d: 'A coaching institute website that presents the courses and brings in enquiries.' },
      { t: 'Student enrolment portal', d: 'A portal where students enrol themselves.' },
      { t: 'Course management system', d: 'The system staff use day to day to run courses.' },
    ],
    outcome: 'The academy now has a brand, a website, a student enrolment portal and a course management system, built as one project by one team. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What did Aperture build for ROCCS’ Academy?', a: 'The brand identity, the website, a student enrolment portal and a course management system for staff.' },
      { q: 'Do you work with education businesses?', a: 'Yes. Coaching institutes and education businesses are among the sectors we build for.' },
    ],
    services: [
      { slug: 'custom-crm-development', label: 'Custom CRM and internal tools' },
    ],
  },
  owasp: {
    challenge: 'OWASP is a global nonprofit run largely by volunteers in local chapters. Chapters need their own pages, members need one place to find security resources, and events need registration that volunteers can run.',
    how: [
      { t: 'Chapter landing pages', d: 'Landing pages for chapters, so each local group has a home on the web.' },
      { t: 'Security resource hub', d: 'A hub where the community finds security resources in one place.' },
      { t: 'Event registration', d: 'An event registration system for chapter and community events.' },
      { t: 'Documentation infrastructure', d: 'The infrastructure behind the documentation the community maintains.' },
    ],
    outcome: 'We built the web pieces OWASP’s volunteer community relies on: chapter landing pages, a security resource hub, an event registration system and the documentation infrastructure behind it. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What did Aperture build for OWASP?', a: 'Chapter landing pages, a security resource hub, an event registration system and documentation infrastructure.' },
      { q: 'Do you work with nonprofits?', a: 'Yes. OWASP, a global cybersecurity nonprofit, is one of our clients.' },
    ],
    services: [
      { slug: 'custom-crm-development', label: 'Custom software and portals' },
    ],
  },
  'ch-plus-partners': {
    challenge: 'CH Plus Partners designs and builds residential interiors in Hyderabad. A standard gallery site could not show what makes their work different: how a project comes together from an empty plot to a finished villa.',
    how: [
      { t: 'Scroll-driven 3D website', d: 'The website is one continuous scroll that moves from plot to structure to finished villa.' },
      { t: 'Walkthrough sequence', d: 'A plot-to-villa sequence shows prospective clients how a project comes together before they get in touch.' },
      { t: 'Project gallery', d: 'A gallery of finished work alongside the walkthrough.' },
      { t: 'Enquiry flow', d: 'An enquiry and contact flow so interested visitors can reach the team.' },
    ],
    outcome: 'CH Plus Partners now has a scroll-driven 3D website that walks visitors from an empty plot to a finished villa, with a project gallery and an enquiry flow. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What makes this website different?', a: 'It is one continuous 3D scroll from plot to structure to finished villa, instead of a page of photos.' },
      { q: 'Do you build websites for interior and construction firms?', a: 'Yes, including CH Plus Partners in Hyderabad, and AI assistants for interior studios such as InterioArty and LiveDelite.' },
    ],
    services: [
      { slug: 'ai-automation-agency-gurugram', label: 'Websites and automation from Gurugram' },
    ],
  },
  vellar: {
    challenge: 'Vellar is a clothing brand that needed its whole website built, from the storefront to checkout, so a visitor could go from browsing to buying without leaving the site.',
    how: [
      { t: 'Brand storefront', d: 'The complete clothing-brand website, built around the brand and its collections.' },
      { t: 'Payment gateway', d: 'An integrated payment gateway, so customers pay on the site itself.' },
    ],
    outcome: 'Vellar has a complete website with the payment gateway built in, taking a visitor from browsing to buying in one place. Both founders worked on it from scoping to launch.',
    faqs: [
      { q: 'What did Aperture build for Vellar?', a: 'The complete clothing-brand website with an integrated payment gateway.' },
      { q: 'How long does a website take?', a: 'Websites typically ship in 4 to 5 days, confirmed after a short scoping call.' },
    ],
    services: [
      { slug: 'ai-automation-agency-india', label: 'AI automation for D2C and ecommerce' },
    ],
  },
};
