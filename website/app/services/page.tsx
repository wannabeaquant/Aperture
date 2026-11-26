import Link from 'next/link';
import Arr from '@/components/Arr';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { servicesGraph } from '@/lib/schema';
import Tape from '@/components/Tape';
import Fit from '@/components/Fit';
import { services } from '@/lib/data';
import { landings } from '@/lib/landing';

export const metadata: Metadata = { title: 'AI Automation, Voice Agent and Multi-Agent System Services in India', description: 'Voice agents, AI automation, multi-agent systems, chatbots, websites, web and mobile apps, CRM and integrations from one team in Gurugram, India.', alternates: { canonical: '/services', types: { 'text/markdown': '/services.md' } } };

export default function Services() {
  return (
    <>
      <JsonLd data={servicesGraph()} />
      <div className="fig mono"><span>(03) SERVICES</span><span>{services.length} THINGS, AND MORE</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
        <Fit as="h1" now className="mega" max={260} lines={['"SERVICES"']} />
      </div>
      <Tape />
      <section className="lp">
        <p className="mono">WHAT WE DO</p>
        <p className="lp-time" style={{ marginTop: 0, fontSize: 18 }}>Aperture is a two-founder AI automation and software studio in Gurugram, India. We build the systems that take repetitive work off a team: AI voice agents that call in Hindi and regional languages, n8n and custom automations, AI agents and multi-agent systems, WhatsApp and website assistants, and the CRMs, portals, websites and apps around them. Both founders work on every project, from the first scoping call to launch.</p>
        <p className="lp-time">Automations typically ship in 2 to 3 days, multi-agent systems in under a week and websites in 4 to 5 days. Pricing is affordable and quoted after a short scoping call, with build and running costs stated separately.</p>
      </section>
      <section className="lp">
        <h2 className="lp-h2">Which service fits your problem</h2>
        <p className="lp-time" style={{ marginTop: 12 }}><b>Leads slip through or follow-ups are late:</b> <Link className="ulink" href="/services/ai-automation-agency-india">AI automation</Link> or <Link className="ulink" href="/services/n8n-automation-services">n8n automation</Link> captures, qualifies and follows up every lead, and keeps your CRM current.</p>
        <p className="lp-time"><b>Too many calls, or calls go unanswered:</b> <Link className="ulink" href="/services/ai-voice-agent-development">AI voice agents</Link> and <Link className="ulink" href="/services/ai-calling-software">AI calling software</Link> handle approved calls in five languages and transfer to a person. An <Link className="ulink" href="/services/ai-receptionist">AI receptionist</Link> answers calls, WhatsApp and Instagram at any hour.</p>
        <p className="lp-time"><b>Customers ask the same questions on chat:</b> a <Link className="ulink" href="/services/whatsapp-chatbot-development">WhatsApp chatbot</Link> or <Link className="ulink" href="/services/ai-chatbot-development">website chatbot</Link> answers from facts you approve, qualifies the lead and hands over to your team.</p>
        <p className="lp-time"><b>A job needs judgement across several tools:</b> <Link className="ulink" href="/services/ai-agent-development">AI agents and multi-agent systems</Link> plan the work, use your tools and data within limits you set, and log what they did.</p>
        <p className="lp-time"><b>Your process does not fit an off-the-shelf tool:</b> a <Link className="ulink" href="/services/custom-crm-development">custom CRM or internal tool</Link>, or for calling teams, <Link className="ulink" href="/services/bpo-crm-software">BPO CRM software</Link> covering the dialer, QA, incentives and client reporting.</p>
        <p className="lp-time"><b>You want to meet the team:</b> we are based in Gurugram and work across India. See <Link className="ulink" href="/services/ai-automation-agency-gurugram">AI automation in Gurugram</Link>.</p>
      </section>
      <section className="lp">
        <h2 className="lp-h2">How a project runs</h2>
        <p className="lp-time" style={{ marginTop: 12 }}>We start by mapping how the work is done today, awkward cases included, and agree what a good result looks like. Then we build one working path on your real data so you can react to it while changes are still cheap. We stay through launch, training and the fixes that only show up in real use. You own the systems, accounts and data we build.</p>
        <p className="lp-time">Recent work includes one operating system with AI calling for <Link className="ulink" href="/work/calling-24o7">Calling 24o7</Link>, a 700-person BPO; the mainnet agent product for <Link className="ulink" href="/work/zero-capxai">CapxAI’s ZERO</Link>; a multi-agent outbound system for <Link className="ulink" href="/work/aigtm-channel">AIGTM Channel</Link>; and a website sales assistant for <Link className="ulink" href="/work/interioarty">InterioArty</Link> in Pune.</p>
      </section>
      <nav className="svc-pages mono" aria-label="Service pages">{landings.map((l) => (<Link key={l.slug} href={`/services/${l.slug}`} className="src-chip">{l.title}</Link>))}</nav>
      <div className="cat full">
        {services.map((s) => (
          <div className="item" key={s.n} style={{ minHeight: 300 }}>
            <span className="n">{s.n}</span>
            <div><p className="sm" style={{ marginBottom: 8 }}>{s.t}</p><p className="d">{s.d}</p></div>
          </div>
        ))}
        <Link href="/contact" className="item" style={{ background: 'var(--or)', minHeight: 300 }} data-cur="BOOK"><span className="n">+</span><p className="sm">SOMETHING ELSE?<br />TELL US <Arr d="ne" /></p></Link>
      </div>
    </>
  );
}
