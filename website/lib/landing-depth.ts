// Deeper, page-specific sections for each service page. Aperture facts come only from lib/data.ts and lib/casedepth.ts
// (AI calling: five languages; timelines: automations 2-3 days, multi-agent under a week, websites 4-5 days; no prices).
// General background (how WhatsApp, calling or n8n work) is stated plainly and only where it is well established.

export type LandingDepth = {
  sections: { h: string; p: string[] }[];
  faqs: { q: string; a: string }[];
};

export const landingDepth: Record<string, LandingDepth> = {
  'ai-automation-agency-india': {
    sections: [
      { h: 'Who this is for', p: [
        'Indian businesses where a few people spend hours a day on the same steps: copying enquiries into a CRM, chasing leads on WhatsApp, calling to confirm, and building the same report every Monday. Sales teams, clinics, real estate developers, interior studios, BPOs, D2C brands and service businesses are the usual fit.',
        'If a task follows rules most of the time and needs judgement some of the time, it is a good candidate. The rules become a workflow, and the judgement becomes an AI step with clear limits and a person to hand over to.',
      ] },
      { h: 'What usually gets automated first', p: [
        'Lead handling is the most common starting point: a form, an ad lead or a WhatsApp message arrives, gets qualified, lands in the CRM with the right owner, and gets a follow-up on time without anyone remembering to send it.',
        'Next come replies (WhatsApp and Instagram answers from approved facts), calls (confirmations, reminders and first-round qualification by an AI caller that transfers to a person), and reporting (the daily or weekly numbers your team currently assembles by hand).',
      ] },
      { h: 'How a project runs', p: [
        'A short scoping call maps the real workflow, including the awkward cases. We then build one working path on your real data, so you see it run within days rather than reading a proposal. Both founders work on every project from that first call to launch.',
        'Automations typically ship in 2 to 3 days and multi-agent systems in under a week. You own the workflows and accounts, and we stay through the fixes that only show up once your team uses it.',
      ] },
      { h: 'What decides the cost', p: [
        'The number of steps and systems involved, how much AI judgement the work needs, message and call volumes, and whether it runs on a tool like n8n or as custom software. Running costs (AI usage, WhatsApp or calling minutes, hosting) are separate from the build. We keep pricing affordable and quote after scoping, with both numbers stated.',
      ] },
    ],
    faqs: [
      { q: 'Do I need to change my CRM or tools?', a: 'Usually not. We connect to what you already use, such as your CRM, Google Sheets, WhatsApp and email. If a tool is the real bottleneck, we say so and suggest an option.' },
      { q: 'What happens when the AI is not sure?', a: 'It hands over. Every automation we build has a clear point where a person takes the conversation or approves the step, so customers are never stuck with a bot.' },
      { q: 'Can you work with teams outside Delhi NCR?', a: 'Yes. We are based in Gurugram and work with businesses across India, including Pune and Hyderabad. Scoping and reviews happen on calls and WhatsApp.' },
    ],
  },
  'n8n-automation-services': {
    sections: [
      { h: 'When n8n is the right tool', p: [
        'n8n suits workflows that connect several apps, need branching logic, and benefit from AI steps in the middle: qualifying a lead, summarising a call, drafting a reply. It is open source, can run on n8n Cloud or on your own server, and charges by workflow runs rather than per step, which keeps busy automations affordable.',
        'It is less suited to products your customers log into, or to logic so large it becomes hard to maintain in a visual editor. In those cases we build custom software, sometimes with n8n still handling the integrations.',
      ] },
      { h: 'What production-grade n8n means', p: [
        'Most broken automations fail quietly. We build every workflow with error branches, retries, alerts to a person, and logs you can read, so a failed API call at night becomes a message to your team rather than a lost lead.',
        'Credentials stay in your account, workflows are named and documented, and the handover includes a short walkthrough so your team can make small changes without us.',
      ] },
      { h: 'Moving from Zapier or Make', p: [
        'We rebuild the existing automations in n8n, run old and new side by side on real data, compare the results, and switch over only when they match. Teams usually move to cut costs at volume, to self-host for data reasons, or to add AI steps their current tool makes awkward.',
      ] },
    ],
    faqs: [
      { q: 'Should we self-host n8n?', a: 'Self-hosting is cheaper at high volume and keeps data on your infrastructure, but someone has to own updates and monitoring. n8n Cloud is faster to start. We recommend one after looking at your volume and data needs.' },
      { q: 'Can n8n run AI agents?', a: 'Yes. n8n has AI agent and LLM steps, and we use them for tasks like lead qualification, classification and drafting. For multi-agent systems that need more control, we build those as custom software and connect them to n8n.' },
      { q: 'Who maintains the workflows after launch?', a: 'You own them. We hand over documentation and stay through the early fixes, and we can keep maintaining them if you prefer.' },
    ],
  },
  'ai-voice-agent-development': {
    sections: [
      { h: 'What a voice agent can handle', p: [
        'Voice agents work best on structured calls: lead qualification, appointment and order confirmations, payment and renewal reminders, feedback calls and first-line support. They follow an approved script and flow, understand free-form answers, and capture the outcome as structured data.',
        'For anything sensitive or outside the approved flow, the agent transfers the call to a person with context, so the customer does not repeat themselves.',
      ] },
      { h: 'Hindi and regional languages', p: [
        'Our AI calling covers approved workflows in five languages, including Hindi. Language support is decided per workflow: a script that works well in Hindi is tested with real callers before it goes live, and we do not switch on a language we have not tested on that flow.',
        'We built this for Calling 24o7, a 700-person BPO whose operation serves callers in 14 regional languages, where AI calling handles approved workflows and hands over to agents.',
      ] },
      { h: 'Built into your operation, not bolted on', p: [
        'A voice agent is only useful if its results reach your team. We connect it to your dialer or telephony, your CRM, callbacks and reporting, so every call produces a record, a next step and a number on a dashboard.',
        'Outbound calling in India has to respect TRAI rules on promotional calls and Do Not Disturb preferences, so we design campaigns around consented and transactional calls.',
      ] },
    ],
    faqs: [
      { q: 'Will customers know they are talking to AI?', a: 'We recommend the agent says so at the start. It builds trust, and customers who want a person can ask for one at any point.' },
      { q: 'How long does a voice agent take to build?', a: 'A first working flow can be tested within days. Going live depends on testing with real callers in each language, which we do before scaling up.' },
      { q: 'What does a voice agent cost to run?', a: 'Running cost depends on call minutes, the voice and language models used and telephony charges. We quote the build after scoping and state running costs separately.' },
    ],
  },
  'whatsapp-chatbot-development': {
    sections: [
      { h: 'How WhatsApp automation works', p: [
        'Business automation on WhatsApp runs on the WhatsApp Business Platform from Meta, usually through an approved provider. Customers can message you any time; messages you start, such as reminders or follow-ups, use templates that Meta approves in advance.',
        'The assistant we build sits on top: it answers from facts you approve, asks the questions your team would ask, and decides when to hand the chat to a person.',
      ] },
      { h: 'What a good WhatsApp assistant does', p: [
        'It answers common questions instantly, collects the details your team needs (what, where, when, budget), and passes a clean lead to the right person on WhatsApp with the conversation attached. It does not guess: anything outside the approved facts goes to a person.',
        'For InterioArty, an interior studio in Pune, the assistant collects the brief as the conversation goes, captures nine lead fields and hands the lead to the team on WhatsApp, with everything landing in a three-stage inbox.',
      ] },
      { h: 'Platform or custom build', p: [
        'Off-the-shelf WhatsApp platforms are good for broadcasts and simple menus. A custom assistant makes sense when answers need your own data, the conversation needs judgement, or leads must flow into your CRM and calling. We will tell you which fits after scoping.',
      ] },
    ],
    faqs: [
      { q: 'Do I need the WhatsApp Business API?', a: 'For automation at scale, yes: the WhatsApp Business Platform through an approved provider. We help set it up or work with the provider you already use.' },
      { q: 'Can the same assistant run on Instagram and my website?', a: 'Yes. One assistant can answer on WhatsApp, Instagram and your website, with every lead in one list.' },
      { q: 'What are the running costs?', a: 'Meta charges per message for certain message types, and your provider may charge a platform fee. AI usage is a small extra. We state these separately from the build price.' },
    ],
  },
  'ai-agent-development': {
    sections: [
      { h: 'What we mean by an AI agent', p: [
        'An AI agent is software that takes a goal, uses tools and data to work towards it, and records what it did. A useful agent has a narrow job, access only to what it needs, and limits a person can check: what it may do alone, what needs approval, and when it must stop.',
        'A multi-agent system splits a larger job between specialist agents that plan, pass work along and check each other, with persistent outputs so the work is visible after a run ends.',
      ] },
      { h: 'What we have built', p: [
        'For CapxAI we built the full mainnet product behind ZERO, a company meant to be run by AI agents: the agent workspace, task orchestration, persistent outputs, integrations and the controls around them, including a flow where agents request a budget, get approval, spend from a funded wallet and reconcile with auditable records. ZERO reached a reported peak market cap of $40M with 15K token holders.',
        'For AIGTM Channel we built a multi-agent system that runs outbound email campaigns from start to finish and qualifies the leads that reply.',
      ] },
      { h: 'Controls come first', p: [
        'Agents fail in expensive ways when they can do too much. We design access rules, approval steps, spending limits and execution logs before adding capability, so you can see and stop what an agent is doing.',
      ] },
    ],
    faqs: [
      { q: 'Which AI models do you use?', a: 'We pick per task, working with Claude, OpenAI and Gemini models among others, and choose on quality, speed and cost for that job.' },
      { q: 'How long does a multi-agent system take?', a: 'Multi-agent systems typically ship in under a week for a first working version, then improve with real use.' },
      { q: 'Can an agent work with our internal data safely?', a: 'Yes, with scoped access: the agent sees only the data and tools its job needs, and every action is logged.' },
    ],
  },
  'ai-chatbot-development': {
    sections: [
      { h: 'Chatbots that do a job', p: [
        'Most chatbots fail because they try to answer everything. The ones that work have a clear job: answer from approved facts, qualify the visitor, and hand over to a person at the right moment. Ours are built that way, with memory of the conversation so visitors do not repeat themselves.',
        'Arty, the assistant we built for InterioArty in Pune, starts replying in about 130 milliseconds, collects the brief as it talks, and is added to the website with a single line of code.',
      ] },
      { h: 'Where it runs', p: [
        'One assistant can answer on your website, WhatsApp and Instagram. Every lead lands in one inbox with its stage, so your team works from one list instead of three apps.',
      ] },
      { h: 'Keeping answers accurate', p: [
        'The assistant answers only from a set of facts you approve: services, areas served, timelines, policies. When a question falls outside them, it says so and passes the conversation to your team, rather than inventing an answer.',
      ] },
    ],
    faqs: [
      { q: 'Can the chatbot book appointments or calls?', a: 'Yes. It can share a booking link, or create the booking in your calendar or CRM once the visitor confirms.' },
      { q: 'How do we update what it knows?', a: 'You update the approved facts, and the assistant answers from the new version. We set this up so a non-technical person can do it.' },
      { q: 'How quickly can it go live?', a: 'A first version on your website typically takes days. WhatsApp adds the time Meta needs to approve your business account and templates.' },
    ],
  },
  'custom-crm-development': {
    sections: [
      { h: 'When a custom CRM makes sense', p: [
        'Off-the-shelf CRMs work until your process stops fitting them: callbacks across shifts, approvals, field teams, QA, incentives, or clients who need their own reports. At that point teams run a CRM plus spreadsheets plus chat groups, and nobody has one view.',
        'A custom CRM is built around how your team actually works, so the data is entered once and every report comes from it.',
      ] },
      { h: 'What we have built', p: [
        'For Calling 24o7, a 700-person BPO, we built one operating system covering calling, CRM, workforce records, QA, incentives and client reporting. For PriBhum Nest we built a PG platform with a mobile app for owners and students, an admin panel and a Supabase backend for listings, bed availability, KYC, rewards and analytics. For FirstQA we redesigned their SaaS platform and added a client-facing test management dashboard.',
      ] },
      { h: 'AI where it helps', p: [
        'Inside a CRM, AI is most useful for the slow parts: summarising calls, drafting follow-ups, scoring and routing leads, and flagging records that need attention. We add it to specific steps rather than everywhere.',
      ] },
    ],
    faqs: [
      { q: 'Can you migrate our existing data?', a: 'Yes. We map your current spreadsheets or CRM into the new system and run both until the numbers match.' },
      { q: 'Will we own the code and data?', a: 'Yes. The system and its data are yours.' },
      { q: 'Do you build mobile apps too?', a: 'Yes, with React Native and Expo, when field teams or customers need one, as we did for PriBhum Nest.' },
    ],
  },
  'ai-calling-software': {
    sections: [
      { h: 'Which calls to hand to AI', p: [
        'AI calling works on approved, repeatable workflows: qualifying new leads, confirming orders and appointments, payment and renewal reminders, collecting feedback and answering common support questions. Calls that need negotiation, empathy or judgement stay with people, and the AI transfers them with the context it has gathered.',
      ] },
      { h: 'Languages and testing', p: [
        'Our AI calling covers approved workflows in five languages, including Hindi. Each workflow is tested with real calls in each language before it scales, and the script is adjusted based on what callers actually say.',
      ] },
      { h: 'Part of the operation', p: [
        'Every AI call produces a recording, a structured outcome and a next step in your CRM, so supervisors see AI and human calls in the same reports. This is how it runs at Calling 24o7, where AI calling handles approved workflows inside one operating system with the dialer, CRM, QA and client reporting.',
        'Campaigns are designed for consented and transactional calls, in line with TRAI rules on promotional calls and Do Not Disturb preferences.',
      ] },
    ],
    faqs: [
      { q: 'Can AI calling replace our agents?', a: 'It takes the repetitive calls so your agents spend their time on the ones that need a person. Most teams use both.' },
      { q: 'How do you measure if it works?', a: 'By outcomes per call, such as confirmations, qualified leads and payments promised, compared with your agents on the same workflow.' },
      { q: 'Does it work with our existing dialer?', a: 'Usually, yes. We connect to your telephony and CRM, or include a dialer if you need one.' },
    ],
  },
  'ai-receptionist': {
    sections: [
      { h: 'What an AI front desk covers', p: [
        'Missed calls and slow replies lose enquiries, especially after hours. An AI receptionist answers calls, WhatsApp and Instagram at any hour, answers common questions from approved facts, takes the enquiry details, and books or qualifies where it can.',
        'Anything it cannot handle goes to your team with the details already captured.',
      ] },
      { h: 'One list for every enquiry', p: [
        'For LiveDelite Interiors we built one AI system that answers Instagram DMs, WhatsApp and inbound calls, records every lead in a single list, and hands the conversation to the team whenever a person is needed. The team works from one list instead of three inboxes.',
      ] },
      { h: 'Who it suits', p: [
        'Clinics, interior and design studios, real estate teams, coaching institutes and local service businesses, where enquiries arrive on several channels and speed of reply decides who wins the customer.',
      ] },
    ],
    faqs: [
      { q: 'Can it transfer a call to a person?', a: 'Yes. It transfers live calls to your team, or takes the details and schedules a callback when nobody is free.' },
      { q: 'Does it work after office hours?', a: 'Yes. It answers at any hour and your team picks up qualified enquiries in the morning.' },
      { q: 'What does it need from us?', a: 'Your approved facts (services, areas, timings, policies), the channels you use, and who should receive which enquiries.' },
    ],
  },
  'bpo-crm-software': {
    sections: [
      { h: 'One system instead of a tool stack', p: [
        'Most BPOs run a dialer, a CRM, spreadsheets for attendance and incentives, a separate QA process and hand-built client reports. Supervisors spend their day switching between them. We build one operating system that covers calling, CRM, workforce records, QA, incentives, a live floor view and client reporting.',
      ] },
      { h: 'Built for 700 people, set up for 24/7', p: [
        'Calling 24o7 runs this system for 700 people. Our planning model, 10 minutes saved per person per working day, puts the time returned at 2,917 hours a month. Persuaders runs the same operating layer for a 24/7 floor of 300 to 400 people serving more than fifteen enterprise partners, with reporting set up for each partner.',
      ] },
      { h: 'QA with evidence', p: [
        'Evidence-linked QA ties every score to the part of the call it refers to, with human review and coaching. Long calls can be investigated, scripts checked, and coaching follows directly from what the reviewer found.',
      ] },
    ],
    faqs: [
      { q: 'Can clients see their own data only?', a: 'Yes. Data access is controlled so each client sees its own reporting and nothing else.' },
      { q: 'Does it include AI calling?', a: 'It can. AI calling handles approved workflows in five languages and transfers to agents when needed.' },
      { q: 'How is the hours-saved number worked out?', a: 'It is a planning model, not a measured result: 10 minutes saved per person per working day, 25 working days a month.' },
    ],
  },
  'ai-automation-agency-gurugram': {
    sections: [
      { h: 'Local, and easy to meet', p: [
        'We are based in Gurugram and work with businesses across Delhi NCR and the rest of India. Scoping can happen on a call, on WhatsApp or in person in Gurugram, and both founders stay on the project through launch.',
      ] },
      { h: 'What Gurugram businesses ask us for', p: [
        'AI calling and CRMs for calling teams, WhatsApp and website assistants for service businesses, automation of lead follow-up and reporting, AI agents for software companies, and websites and apps. Our work includes Calling 24o7, a 700-person BPO, and products like CapxAI’s ZERO and AIGTM Channel’s multi-agent outbound system.',
      ] },
      { h: 'How fast it moves', p: [
        'Automations typically ship in 2 to 3 days, multi-agent systems in under a week and websites in 4 to 5 days. You see a working version early, while decisions are still cheap to change.',
      ] },
    ],
    faqs: [
      { q: 'Can we meet in person?', a: 'Yes. We are in Gurugram and can meet businesses in Gurugram and Delhi NCR. Most work happens on calls and WhatsApp.' },
      { q: 'Do you only work with Gurugram companies?', a: 'No. We work across India, including Pune and Hyderabad.' },
      { q: 'What size of business do you work with?', a: 'From single studios such as InterioArty to operations such as Calling 24o7, a 700-person BPO.' },
    ],
  },
};
