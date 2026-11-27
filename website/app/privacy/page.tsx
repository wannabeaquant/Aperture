import Link from 'next/link';
import type { Metadata } from 'next';
import Arr from '@/components/Arr';
import Fit from '@/components/Fit';
import Tape from '@/components/Tape';
import Barcode from '@/components/Barcode';
import JsonLd from '@/components/JsonLd';
import { Lines, Rv } from '@/components/Reveal';
import { founders } from '@/lib/data';
import { page } from '@/lib/schema';
import { ADDRESS_LINE, CONTACT_EMAIL } from '@/lib/site';

// Keep this page true to what the code does. If a form, tracker, provider or AI tool is added or
// removed anywhere (site, CRM, Telegram assistant), update the matching section and UPDATED.

const PATH = '/privacy';
const UPDATED = '27 November 2026';
const TITLE = 'Privacy Policy';
const DESC = 'How Aperture collects, uses and protects personal data across this website, our outreach, client work and internal tools, including Google user data. Written plainly.';

export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: PATH }, openGraph: { url: PATH, title: `${TITLE} / Aperture`, description: DESC, images: ['/opengraph-image'] }, twitter: { card: 'summary_large_image', images: ['/opengraph-image'] } };

const name = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
const Mail = ({ to }: { to: string }) => <a href={`mailto:${to}`}>{to}</a>;

const sections = [
  { id: 'who', t: 'Who we are' },
  { id: 'collect', t: 'What we collect' },
  { id: 'use', t: 'Why we use it' },
  { id: 'ai', t: 'AI and your data' },
  { id: 'google', t: 'Google user data' },
  { id: 'share', t: 'Who else handles it' },
  { id: 'keep', t: 'How long we keep it' },
  { id: 'protect', t: 'How we protect it' },
  { id: 'rights', t: 'Your rights' },
  { id: 'cookies', t: 'Cookies and tracking' },
  { id: 'more', t: 'The fine print' },
] as const;
type Id = (typeof sections)[number]['id'];
const num = (id: Id) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');

function Row({ id, tone, children }: { id: Id; tone?: 'yl' | 'g'; children: React.ReactNode }) {
  const s = sections.find((x) => x.id === id)!;
  return (
    <section className={`pv${tone ? ` pv-${tone}` : ''}`} id={id}>
      <div className="pv-l">
        <div className="pv-stick">
          <p className="mono">{num(id)} / {sections.length}</p>
          <h2 className="pv-h">{s.t}</h2>
        </div>
      </div>
      <div className="pv-r">{children}</div>
    </section>
  );
}

const promises: [string, string, string][] = [
  ['0', 'Cookies', 'No cookies, no analytics, no ad pixels, no session recording on this site.'],
  ['0', 'Data sold', 'We never sell or rent personal data, and never use it for advertising.'],
  ['1', 'Message to stop', 'Say "stop" once, on any channel, and we never contact you again.'],
  ['30', 'Days, at most', 'To answer any request to see, correct or delete your data. Usually far sooner.'],
];

const collect: [string, string, string][] = [
  ['Website', 'When you send a brief or chat', 'The project form and the chat ask for your name or company, a WhatsApp number or email, and what you want built. The chat also sends us the conversation you had with it. We attach the page you were on and where the visit came from (the referring website and the first page you landed on).'],
  ['Website', 'When you click to contact us', 'Clicking a call, WhatsApp, email or booking link is counted with the page and visit source, never with who you are. Calls you book go through Calendly, which collects your details on its own form under its own policy.'],
  ['Outreach', 'When we reach out to a business', 'Public business contact details: company name, website, business phone, city, business email, and the name and role of a contact person where they are listed publicly (the company site, a directory, Google Maps or LinkedIn).'],
  ['Outreach', 'When we speak to you', 'Short notes of the conversation, the outcome, and any follow-up, callback or meeting agreed. Calls are not recorded. A team member may dictate a voice note after a call; it is turned into text and kept as the call note.'],
  ['Clients', 'When you work with us', 'The contact and billing details needed to run the project. Data inside systems we build or run for you belongs to you: we use it only to deliver the work, under our agreement, and return or delete it when the work ends.'],
  ['Visits', 'When you browse', 'Our host, Vercel, receives standard technical data (IP address, browser, page requested) to serve and secure the site. Visits by search engines and AI crawlers are logged (user agent, page, country). Visits by people are not.'],
];

const purposes: [string, string][] = [
  ['Reply to your message, brief or chat, and send a quote or proposal', 'You asked us to: consent, and steps before a contract'],
  ['Contact businesses about our services by phone, WhatsApp or email, and follow up when they ask', 'Legitimate interest in business-to-business outreach. You can object at any time.'],
  ['Book calls and demos, send calendar invites, keep our team in sync', 'Legitimate interest in running our sales process, and steps you asked for'],
  ['Deliver, support and invoice client projects', 'Our contract with you'],
  ['Count which pages and sources bring enquiries, with no names or contact details', 'Legitimate interest in knowing what works'],
  ['Keep tax and accounting records', 'Legal obligation'],
  ['Keep the site and our systems secure, and stop spam', 'Legitimate interest in security'],
];

const providers: { g: string; list: [string, string][] }[] = [
  { g: 'This website', list: [
    ['Vercel', 'Hosts the site'],
    ['Cloudflare', 'Runs the chat and brief AI; stores anonymous enquiry and click counts and the crawler log'],
    ['Telegram, ntfy, Resend', 'Deliver your enquiry to the founders’ phones and inboxes'],
    ['Forward Email', `Forwards mail sent to ${CONTACT_EMAIL}`],
    ['Calendly, WhatsApp', 'Only if you choose to book or message us there'],
  ] },
  { g: 'Our work and tools', list: [
    ['Google', 'Gmail, Calendar and Workspace tools'],
    ['Supabase', 'The database behind our CRM (the CRM app runs on Vercel)'],
    ['Render', 'Hosts our internal team assistant'],
    ['Anthropic', 'The AI model behind our team assistant'],
    ['Cloudflare, Groq', 'Transcribe our own team’s voice notes'],
    ['Telegram', 'Our private team chat'],
  ] },
];

const keep: [string, string, string][] = [
  ['24', 'Months', 'Enquiries, chats and outreach records, counted from our last contact, unless you become a client.'],
  ['8', 'Years', 'Invoices and client records, as long as Indian tax and accounting law requires.'],
  ['∞', 'Do-not-contact', 'If you ask us to stop, only your company name and number or email stay on this list, so we never contact you by mistake.'],
  ['0', 'Personal fields', 'In our anonymous enquiry counts and crawler logs, which we keep for reporting.'],
];

const rights: [string, string][] = [
  ['See it', 'What we hold about you and how we use it.'],
  ['Fix it', 'Correct anything wrong or incomplete.'],
  ['Delete it', 'Unless the law makes us keep it.'],
  ['Stop it', 'Contact or any particular use, any time.'],
  ['Take it', 'A copy in a usable format.'],
  ['Withdraw', 'Consent you gave earlier, going forward.'],
];

export default function Privacy() {
  const graph = { '@context': 'https://schema.org', '@graph': [page(PATH, `${TITLE} / Aperture`, DESC)] };
  return (
    <>
      <JsonLd data={graph} />
      <div className="fig mono"><Link href="/"><Arr d="l" /> HOME</Link><span>PRIVACY POLICY · UPDATED {UPDATED.toUpperCase()}</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
        <Fit as="h1" now className="mega" max={220} lines={['"YOUR DATA,', 'PLAINLY"']} />
        <Rv delay={300}><p className="lead2">What we collect, why, who else touches it, and how to make us stop or delete it. It covers this site, our outreach, client work and the tools we run inside the studio.</p></Rv>
      </div>
      <Tape />

      <section className="pv-promise">
        {promises.map(([n, t, d], i) => (
          <Rv key={t} delay={i * 80}><div><p className="pv-n">{n}</p><p className="mono" style={{ margin: '18px 0 10px' }}>{t}</p><p>{d}</p></div></Rv>
        ))}
      </section>

      <nav className="pv-toc" aria-label="On this page">
        <p className="mono">ON THIS PAGE</p>
        <ol>{sections.map((s) => (<li key={s.id}><a href={`#${s.id}`}><span className="mono">{num(s.id)}</span>{s.t}</a></li>))}</ol>
      </nav>

      <Row id="who">
        <p className="pv-lead">Aperture is an AI automation and software studio in {ADDRESS_LINE}, run by its two founders, {founders.map((f) => name(f.name)).join(' and ')}. &quot;Aperture&quot;, &quot;we&quot; and &quot;us&quot; mean the studio and its founders.</p>
        <div className="pv-cards">
          <div><p className="mono">WHO IS RESPONSIBLE</p><h3>Aperture</h3><p>We decide why and how the data on this page is used, so we answer for it: the data fiduciary under India&apos;s Digital Personal Data Protection Act, 2023, and the controller under the GDPR and UK GDPR where they apply.</p></div>
          <div id="client-work"><p className="mono">CLIENT PROJECTS</p><h3>Your data, your rules</h3><p>Inside a system we build or run for a client, the client is in charge of the data and we act only on their instructions.</p></div>
        </div>
      </Row>

      <Row id="collect">
        <p className="pv-lead">Only what you send us, public business details, and the bare minimum needed to run the site.</p>
        <div className="pv-cards">
          {collect.map(([tag, t, d]) => (<div key={t}><p className="mono">{tag}</p><h3>{t}</h3><p>{d}</p></div>))}
        </div>
        <p className="pv-note"><b>Please don&apos;t send sensitive data</b> such as health details, bank or card numbers, or government ID numbers. We never need them to scope a project.</p>
      </Row>

      <Row id="use">
        <div className="pv-table" role="table" aria-label="Purposes and legal bases">
          <div role="row" className="pv-tr head"><span role="columnheader" className="mono">What we do</span><span role="columnheader" className="mono">Why we are allowed to</span></div>
          {purposes.map(([a, b]) => (<div role="row" className="pv-tr" key={a}><span role="cell">{a}</span><span role="cell">{b}</span></div>))}
        </div>
        <p className="pv-note"><b>Never:</b> selling or renting personal data, using it for advertising, or letting a machine alone make a decision with legal or similarly significant effects on you.</p>
      </Row>

      <Row id="ai">
        <div className="pv-cards">
          <div><p className="mono">ON THIS SITE</p><h3>The chat and brief helper</h3><p>Both run on an AI model hosted by Cloudflare (Workers AI). The model only sees what you type and a fact sheet about Aperture. It does not keep your messages or learn from them. A founder reads every enquiry.</p></div>
          <div><p className="mono">INSIDE THE STUDIO</p><h3>Our team assistant</h3><p>It uses Anthropic&apos;s Claude to answer the founders&apos; questions about our pipeline and to make the CRM changes and calendar bookings they ask for. Our team&apos;s voice notes are transcribed by Whisper models on Cloudflare and Groq.</p></div>
          <div><p className="mono">THE RULE</p><h3>No training on your data</h3><p>Every AI provider we use works under business terms that do not let it train its models on what we send.</p></div>
        </div>
      </Row>

      <Row id="google" tone="yl">
        <p className="pv-lead">Our internal scheduling tool, Aperture Outbound Ops, connects to Google Calendar. Only the Aperture team uses it, and only with Aperture&apos;s own Google account. It never asks anyone outside Aperture to sign in with Google.</p>
        <div className="pv-cards">
          <div><p className="mono">ACCESS</p><h3>Calendar events only</h3><p>With the Google Calendar events permission it can see, create, change and cancel events on Aperture&apos;s calendar. It reads event details (title, time, description, guests and replies, Meet link) only to check for clashes and to find a call it was asked to change.</p></div>
          <div><p className="mono">USE</p><h3>Only when a founder asks</h3><p>It books the call, invites the guests named in the request, adds a Google Meet link and lets Google send its standard invitation and update emails. It never acts on its own initiative.</p></div>
          <div><p className="mono">SHARING</p><h3>Stays in Google Calendar</h3><p>To understand a request, the relevant event details go to the AI model behind the tool (Anthropic&apos;s Claude, under terms that forbid training on our data), and the reply goes to the founders in our private Telegram chat. Nothing is copied into other databases or shared with anyone else.</p></div>
          <div><p className="mono">CONTROL</p><h3>Revoke any time</h3><p>Access can be removed from the account&apos;s <a href="https://myaccount.google.com/connections" target="_blank" rel="noreferrer">Google third-party connections</a> page. Once removed, the tool can no longer reach the calendar.</p></div>
        </div>
        <div className="pv-statement">
          <p className="mono">LIMITED USE</p>
          <p>Aperture Outbound Ops&apos; use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements. We do not use Google user data for advertising, we do not sell it, and we do not use it to develop, improve or train generalised AI or machine learning models. People read it only where needed to run the tool, for security, or to comply with the law.</p>
        </div>
      </Row>

      <Row id="share">
        <p className="pv-lead">Only the two founders, and team members who need it for their role (such as the person who makes our calls), see personal data. These providers handle it for us, each under its own security and data protection terms.</p>
        <div className="pv-providers">
          {providers.map((g) => (
            <div key={g.g}>
              <p className="mono">{g.g}</p>
              <ul>{g.list.map(([n, d]) => (<li key={n}><b>{n}</b><span>{d}</span></li>))}</ul>
            </div>
          ))}
        </div>
        <p className="pv-note">Some providers store data outside India, including in the United States and the European Union. Where data crosses borders we rely on their safeguards, such as Standard Contractual Clauses where the GDPR applies. We may also share data when the law requires it, to protect our rights or someone&apos;s safety, or with a buyer or successor if Aperture is ever reorganised or sold, who would be bound by this policy.</p>
      </Row>

      <Row id="keep">
        <div className="pv-stats">
          {keep.map(([n, t, d]) => (<div key={t}><p className="pv-n">{n}</p><p className="mono" style={{ margin: '16px 0 8px' }}>{t}</p><p>{d}</p></div>))}
        </div>
        <p className="pv-note">Calendar events stay as a record of meetings and are deleted on request unless an open project needs them. Notification and hosting providers keep their own copies only for their standard short periods.</p>
      </Row>

      <Row id="protect">
        <div className="pv-cards">
          <div><p className="mono">IN TRANSIT AND AT REST</p><h3>Encrypted</h3><p>Data moves over encrypted connections and sits with providers that encrypt it at rest.</p></div>
          <div><p className="mono">ACCESS</p><h3>Need to know</h3><p>Separate accounts and permissions. Passwords and keys never go into our code.</p></div>
          <div><p className="mono">OUR ASSISTANT</p><h3>Narrowest access</h3><p>It can read the CRM and make only the specific changes the founders allow. It cannot delete records or message leads.</p></div>
          <div><p className="mono">IF SOMETHING GOES WRONG</p><h3>We tell you</h3><p>No system is perfectly secure. If a breach affects your data, we tell you and the authorities as the law requires.</p></div>
        </div>
      </Row>

      <Row id="rights">
        <p className="pv-lead">Wherever you are, you can ask us to:</p>
        <div className="pv-rights">
          {rights.map(([t, d], i) => (<div key={t}><span className="mono">{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></div>))}
        </div>
        <p className="pv-note"><b>To stop hearing from us</b>, reply &quot;stop&quot; to any message, tell us on a call, or email <Mail to={CONTACT_EMAIL} />. We act on it right away. We answer every request within 30 days and may first confirm it is you. If you are unhappy with our answer, you can complain to the Data Protection Board of India, or to your data protection authority in the EU or UK, though we would like the chance to fix it first. Under the DPDP Act you can also nominate someone to exercise these rights for you if you die or can no longer do so yourself.</p>
      </Row>

      <Row id="cookies">
        <div className="pv-cards">
          <div><p className="mono">COOKIES</p><h3>None</h3><p>This site sets no cookies and runs no analytics, ad pixels or session recording.</p></div>
          <div><p className="mono">FONTS</p><h3>Self-hosted</h3><p>Fonts are served from our own domain, so no font provider sees your visit.</p></div>
          <div><p className="mono">SESSION STORAGE</p><h3>One small note</h3><p>To credit an enquiry to the page that brought it, the site keeps your referring website and landing page in your browser&apos;s session storage. It holds nothing about who you are and is cleared when you close the tab.</p></div>
          <div><p className="mono">EMBEDS</p><h3>No third-party widgets</h3><p>No embedded videos, maps, social feeds or ad scripts. Calendly and WhatsApp only open when you click their links.</p></div>
        </div>
        <p className="pv-note">If we ever add analytics, we will update this page first and ask for consent where the law requires it.</p>
      </Row>

      <Row id="more">
        <div className="pv-cards">
          <div><p className="mono">CHILDREN</p><h3>Business only</h3><p>Our services are for businesses. We don&apos;t knowingly collect data from anyone under 18. If you think we have, tell us and we will delete it.</p></div>
          <div><p className="mono">CHANGES</p><h3>Dated and announced</h3><p>When the way we handle data changes, we update this page and the date at the top. If a change is significant, we also tell clients and anyone we are in an open conversation with.</p></div>
        </div>
      </Row>

      <section className="pv-end" id="contact">
        <div className="hz-t" />
        <div style={{ padding: 'clamp(48px,7vw,110px) var(--pad)' }}>
          <p className="mono" style={{ opacity: 0.6, marginBottom: 28 }}>PRIVACY QUESTIONS, REQUESTS, COMPLAINTS</p>
          <Lines className="big" lines={['"ASK US', 'ANYTHING"']} />
          <p style={{ marginTop: 36, maxWidth: '52ch', fontSize: 19, lineHeight: 1.45 }}>Privacy goes straight to the founders. We are also the people responsible for data protection at Aperture, so there is no one else to escalate to.</p>
          <div className="pv-mails">
            <a href={`mailto:${CONTACT_EMAIL}`}><span className="mono">STUDIO INBOX · BOTH FOUNDERS</span><b>{CONTACT_EMAIL}</b></a>
            {founders.map((f) => (<a key={f.email} href={`mailto:${f.email}`}><span className="mono">{name(f.name).toUpperCase()} · CO-FOUNDER</span><b>{f.email}</b></a>))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 40, flexWrap: 'wrap', gap: 24 }}>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20request`} className="btn or">Send a privacy request <Arr d="ne" /></a>
            <Barcode seed={7} />
          </div>
        </div>
      </section>
    </>
  );
}
