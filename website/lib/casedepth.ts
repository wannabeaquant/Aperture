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
};
