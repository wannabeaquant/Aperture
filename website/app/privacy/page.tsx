import Link from 'next/link';
import type { Metadata } from 'next';
import Arr from '@/components/Arr';
import Fit from '@/components/Fit';
import Tape from '@/components/Tape';
import JsonLd from '@/components/JsonLd';
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

const sections: { id: string; t: string }[] = [
  { id: 'who', t: 'Who we are' },
  { id: 'collect', t: 'What we collect' },
  { id: 'use', t: 'How we use it' },
  { id: 'ai', t: 'AI on this site and in our tools' },
  { id: 'google', t: 'Google user data' },
  { id: 'share', t: 'Who else handles it' },
  { id: 'where', t: 'Where it is stored' },
  { id: 'keep', t: 'How long we keep it' },
  { id: 'protect', t: 'How we protect it' },
  { id: 'rights', t: 'Your rights and opting out' },
  { id: 'cookies', t: 'Cookies and tracking' },
  { id: 'children', t: 'Children' },
  { id: 'changes', t: 'Changes' },
  { id: 'contact', t: 'Contact' },
];
const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');

function Sec({ id, children }: { id: string; children: React.ReactNode }) {
  const s = sections.find((x) => x.id === id)!;
  return (
    <section className="lp legal" id={id}>
      <p className="mono">{num(id)} / {s.t.toUpperCase()}</p>
      <h2 className="lp-h2">{s.t}</h2>
      {children}
    </section>
  );
}

const purposes: [string, string][] = [
  ['Reply to your message, brief or chat, and send a quote or proposal', 'You asked us to (consent, and steps before a contract)'],
  ['Contact businesses about our services by phone, WhatsApp or email, and follow up when they ask us to', 'Our legitimate interest in business-to-business outreach. You can object at any time and we stop.'],
  ['Book calls and demos, send calendar invites and keep our team in sync about them', 'Legitimate interest in running our sales process, and steps you asked for'],
  ['Deliver, support and invoice client projects', 'Our contract with you'],
  ['Count which pages and sources bring enquiries, without names or contact details', 'Legitimate interest in understanding what works'],
  ['Keep tax and accounting records', 'Legal obligation'],
  ['Keep the site and our systems secure and stop spam', 'Legitimate interest in security'],
];

export default function Privacy() {
  const graph = { '@context': 'https://schema.org', '@graph': [page(PATH, `${TITLE} / Aperture`, DESC)] };
  return (
    <>
      <JsonLd data={graph} />
      <div className="fig mono"><Link href="/"><Arr d="l" /> HOME</Link><span>LAST UPDATED {UPDATED.toUpperCase()}</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(20px,3vw,40px)' }}>
        <Fit as="h1" now className="mega" max={200} lines={['"YOUR DATA,', 'PLAINLY"']} />
        <p className="mono" style={{ marginTop: 18, opacity: 0.7 }}>Privacy policy for aperturecm.in, our outreach, client work and internal tools</p>
      </div>
      <Tape />

      <section className="case">
        <div>
          <p className="mono" style={{ marginBottom: 20 }}>IN SHORT</p>
          <p className="lead">We collect what you send us and public business details. Nothing is ever sold. There are no ad trackers and no cookies, and one message is enough to make us stop contacting you or delete your data.</p>
          <ul className="legal-short">
            <li>No cookies, no analytics, no ad pixels on this site.</li>
            <li>Your enquiry goes straight to the two founders and nobody else.</li>
            <li>The AI tools we use work for us and don&apos;t train on your data.</li>
            <li>Say &quot;stop&quot; once and we take you off our list.</li>
            <li>Email <Mail to={CONTACT_EMAIL} /> to see, fix or delete your data.</li>
          </ul>
        </div>
        <ol className="built legal-toc">
          {sections.map((s) => (<li key={s.id}><span>{num(s.id)}</span><a href={`#${s.id}`}>{s.t}</a></li>))}
        </ol>
      </section>

      <Sec id="who">
        <p>Aperture is an AI automation and software studio in {ADDRESS_LINE}, run by its two founders, {founders.map((f) => name(f.name)).join(' and ')}. In this policy, &quot;Aperture&quot;, &quot;we&quot; and &quot;us&quot; mean the studio and its founders.</p>
        <p>We decide why and how the personal data described here is used, so we are responsible for it. That makes us the data fiduciary under India&apos;s Digital Personal Data Protection Act, 2023, and the controller under the GDPR and UK GDPR where they apply. When we handle data inside a system we build or run for a client, the client is in charge of that data and we follow their instructions (see <a href="#client-work">client projects</a>).</p>
      </Sec>

      <Sec id="collect">
        <h3>When you contact us through this site</h3>
        <p>The project form and the chat ask for your name or company, a WhatsApp number or email, and what you want built. The chat also sends us the conversation you had with it. We attach the page you were on and where your visit came from (the referring website and the first page you landed on) so we know which pages bring enquiries.</p>
        <h3>When you call, WhatsApp, email or book a call</h3>
        <p>We receive your number or address and whatever you send. Calls you book go through Calendly, which collects the details on its own form under its own privacy policy. When you click a call, WhatsApp, email or booking link on this site, we count the click with the page and visit source, but not who you are.</p>
        <h3>When we reach out to businesses</h3>
        <p>We contact companies we think could use our work. To do that we keep business contact information that is public: company name, website, business phone, city, business email, and the name and role of a contact person where they are listed publicly (for example on the company&apos;s website, a business directory, Google Maps or LinkedIn). When we speak to someone, we keep short notes of the conversation, the outcome, and any follow-up, callback or meeting agreed.</p>
        <p>We don&apos;t record calls. A team member may dictate a short voice note after a call. It is turned into text and kept as a call note.</p>
        <h3 id="client-work">When you work with us</h3>
        <p>For clients, we hold the contact and billing details needed to run the project. When we build or run a system for you, we may handle data that belongs to you or your customers. We use it only to deliver the work you asked for, under our agreement with you, and we return or delete it when the work ends.</p>
        <h3>When you visit</h3>
        <p>Our host, Vercel, receives standard technical data (IP address, browser, the page requested) to serve and secure the site. We also log visits by known search engines and AI crawlers (their user agent, the page and the country) to see who indexes the site. Visits from people are not logged this way.</p>
        <h3>What we don&apos;t want</h3>
        <p>Please don&apos;t send us sensitive data such as health details, bank or card numbers, or government ID numbers. We never need them to scope your project.</p>
      </Sec>

      <Sec id="use">
        <div className="legal-table" role="table" aria-label="Purposes and legal bases">
          <div role="row" className="legal-row head"><span role="columnheader" className="mono">What we do</span><span role="columnheader" className="mono">Why we are allowed to</span></div>
          {purposes.map(([a, b]) => (<div role="row" className="legal-row" key={a}><span role="cell">{a}</span><span role="cell">{b}</span></div>))}
        </div>
        <p>We never sell or rent personal data, and we never use it for advertising.</p>
      </Sec>

      <Sec id="ai">
        <p>The chat on this site and the step that turns your brief into a short summary run on an AI model hosted by Cloudflare (Workers AI). The model only sees what you type and a fact sheet about Aperture. It doesn&apos;t keep your messages or learn from them.</p>
        <p>Inside the studio we use AI to work faster. Our team assistant uses Anthropic&apos;s Claude to answer the founders&apos; questions about our pipeline and to make the CRM changes or calendar bookings they ask for. Voice notes from our team are transcribed by Whisper models on Cloudflare and Groq. All of these run under business terms that don&apos;t allow the provider to train on our data.</p>
        <p>No decision with legal or similarly significant effects on you is ever made by a machine alone. A founder reads every enquiry.</p>
      </Sec>

      <Sec id="google">
        <p>Our internal scheduling tool, Aperture Outbound Ops, connects to Google Calendar. Only the Aperture team uses it, and only with Aperture&apos;s own Google account. It never asks anyone outside Aperture to sign in with Google.</p>
        <h3>What it can access</h3>
        <p>It uses the Google Calendar events permission to see, create, change and cancel events on Aperture&apos;s calendar. It reads event details (title, time, description, guests and their replies, the Meet link) only to check for clashes and to find a call it has been asked to change. It creates events only when a founder asks it to book one.</p>
        <h3>How it uses that access</h3>
        <p>When a founder asks, it books the call on Aperture&apos;s calendar, invites the guests named in the request, adds a Google Meet link, and lets Google send its standard invitation and update emails. It does nothing on its own initiative.</p>
        <h3>Sharing and storage</h3>
        <p>Calendar data stays in Google Calendar. To understand a request and reply to the founder, the tool sends the relevant event details to the AI model behind it (Anthropic&apos;s Claude, under terms that forbid training on our data). The reply goes back to the founders in our private Telegram chat. We don&apos;t copy calendar data into any other database and don&apos;t share it with anyone else.</p>
        <h3>Limited Use</h3>
        <p>Aperture Outbound Ops&apos; use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements. We do not use Google user data for advertising, we do not sell it, and we do not use it to develop, improve or train generalised AI or machine learning models. People read it only where that is needed to run the tool, for security, or to comply with the law.</p>
        <p>Access can be removed at any time from the account&apos;s <a href="https://myaccount.google.com/connections" target="_blank" rel="noreferrer">Google third-party connections</a> page. Once it is removed, the tool can no longer reach the calendar.</p>
      </Sec>

      <Sec id="share">
        <p>Only the two founders, and team members who need it for their role (such as the person who makes our calls), can see personal data. We also use the providers below. Each one handles data for us under its own security and data protection terms.</p>
        <div className="legal-grid">
          <div>
            <p className="mono">THIS WEBSITE</p>
            <ul>
              <li><b>Vercel</b>: hosts the site.</li>
              <li><b>Cloudflare</b>: runs the chat and brief AI, and stores the anonymous enquiry and click counts and the crawler log.</li>
              <li><b>Telegram, ntfy and Resend</b>: deliver your enquiry to the founders&apos; phones and inboxes.</li>
              <li><b>Forward Email</b>: forwards mail sent to {CONTACT_EMAIL}.</li>
              <li><b>Calendly and WhatsApp</b>: only if you choose to book or message us there.</li>
            </ul>
          </div>
          <div>
            <p className="mono">OUR WORK AND TOOLS</p>
            <ul>
              <li><b>Google</b>: Gmail, Calendar and Workspace tools.</li>
              <li><b>Supabase</b>: the database behind our CRM. The CRM app itself runs on Vercel.</li>
              <li><b>Render</b>: hosts our team assistant.</li>
              <li><b>Anthropic</b>: the AI model behind our team assistant.</li>
              <li><b>Cloudflare and Groq</b>: transcribe our team&apos;s voice notes.</li>
              <li><b>Telegram</b>: our private team chat.</li>
            </ul>
          </div>
        </div>
        <p>We may also share data if the law requires it, to protect our rights or someone&apos;s safety, or with a buyer or successor if Aperture is ever reorganised or sold, who would be bound by this policy.</p>
      </Sec>

      <Sec id="where">
        <p>We are based in India. Some of our providers store or process data in other countries, including the United States and the European Union. When data crosses borders, we rely on the provider&apos;s safeguards, such as Standard Contractual Clauses where the GDPR applies, and we only use providers we trust to protect it the way this policy describes.</p>
      </Sec>

      <Sec id="keep">
        <ul>
          <li><b>Enquiries and chats</b>: up to 24 months after our last contact, unless you become a client.</li>
          <li><b>Outreach records</b>: up to 24 months after our last contact. If you ask us to stop, we keep only your company name and number or email on a do-not-contact list, so we never contact you again by mistake.</li>
          <li><b>Client records</b>: for the project, then as long as tax and accounting law requires (usually up to 8 years for invoices in India).</li>
          <li><b>Calendar events</b>: kept as a record of meetings. We delete them on request unless an open project needs them.</li>
          <li><b>Anonymous counts and crawler logs</b>: kept for reporting. They contain no names, numbers or emails.</li>
          <li><b>Notification and hosting copies</b>: kept by those providers for their standard short periods.</li>
        </ul>
      </Sec>

      <Sec id="protect">
        <p>Data is encrypted in transit and stored with providers that encrypt it at rest. Access is limited to the people who need it, with separate accounts and permissions. Our team assistant gets the narrowest access we can give it: it can read the CRM and make only the specific changes the founders allow. Passwords and keys never go into our code. No system is perfectly secure, but if a breach ever affects your data, we will tell you and the authorities as the law requires.</p>
      </Sec>

      <Sec id="rights">
        <p>Wherever you are, you can ask us to:</p>
        <ul>
          <li>tell you what personal data we hold about you and how we use it;</li>
          <li>correct anything wrong or incomplete;</li>
          <li>delete it, unless the law requires us to keep it;</li>
          <li>stop contacting you, or stop a particular use;</li>
          <li>give you a copy in a usable format;</li>
          <li>withdraw consent you gave earlier (this doesn&apos;t undo what we did before).</li>
        </ul>
        <p><b>To stop hearing from us</b>, reply &quot;stop&quot; to any message, tell us on a call, or email <Mail to={CONTACT_EMAIL} />. We act on it right away.</p>
        <p>We answer every request within 30 days, usually much sooner, and may first need to confirm it is you. If you are unhappy with our answer, you can complain to the Data Protection Board of India, or to your local data protection authority in the EU or UK. We&apos;d like the chance to fix it first.</p>
        <p>Under the Digital Personal Data Protection Act, you can also nominate someone to exercise these rights for you if you die or can no longer do so yourself.</p>
      </Sec>

      <Sec id="cookies">
        <p>This site sets no cookies and runs no analytics, ad pixels or session recording. Fonts are served from our own domain. To credit an enquiry to the page that brought it, the site keeps your referring website and landing page in your browser&apos;s session storage. It is not a cookie, holds nothing about who you are, and is cleared when you close the tab. If we ever add analytics, we will update this page first and ask for consent where the law requires it.</p>
      </Sec>

      <Sec id="children">
        <p>Our services are for businesses. We don&apos;t knowingly collect data from anyone under 18. If you think we have, tell us and we will delete it.</p>
      </Sec>

      <Sec id="changes">
        <p>When the way we handle data changes, we update this page and the date at the top. If a change is significant, we also tell clients and anyone we are in an open conversation with.</p>
      </Sec>

      <section className="lp legal" id="contact">
        <p className="mono">{num('contact')} / CONTACT</p>
        <h2 className="lp-h2">Questions, requests, complaints</h2>
        <p>Privacy questions go straight to the founders. We are also the people responsible for data protection at Aperture.</p>
        <div className="lp-work legal-contacts">
          <a href={`mailto:${CONTACT_EMAIL}`}><b>{CONTACT_EMAIL} <Arr d="ne" /></b><span>Studio inbox, reaches both founders</span></a>
          {founders.map((f) => (<a key={f.email} href={`mailto:${f.email}`}><b>{f.email} <Arr d="ne" /></b><span>{name(f.name)}, co-founder</span></a>))}
        </div>
        <p className="mono" style={{ marginTop: 24, opacity: 0.7 }}>APERTURE · {ADDRESS_LINE.toUpperCase()}</p>
      </section>
    </>
  );
}
