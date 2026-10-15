import { founders } from './data';

/** Normalise a visitor-typed number to digits with country code (assumes India for 10 digits). */
export function normalisePhone(raw: string): string | null {
  const d = raw.replace(/[^\d]/g, '');
  if (d.length === 10) return `91${d}`;
  if (d.length >= 11 && d.length <= 15) return d;
  return null;
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

export function waLink(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export const starter = 'Hi Aperture, I came across your site. I would like to talk about ';

export const founderLinks = founders.map((f) => ({ ...f, first: f.name.split(' ')[0][0] + f.name.split(' ')[0].slice(1).toLowerCase() }));

/** The services the intake can map to. The assistant is only allowed to pick from this list. */
export const serviceNames = [
  'Voice agents', 'AI automation', 'AI workflows', 'AI agents', 'Multi-agent systems', 'Chat and WhatsApp bots',
  'Websites', 'Web and mobile apps', 'CRM and internal tools', 'Integrations and APIs', 'Data and dashboards',
];

const keywordMap: [RegExp, string][] = [
  [/\bvoice\b|\bcalls?\b|\bphone\b|\bivr\b|dialer|calling/i, 'Voice agents'],
  [/whatsapp|chat ?bots?|\bbots?\b|instagram|\bdms?\b/i, 'Chat and WhatsApp bots'],
  [/automat|follow.?up|data entry|\breports?\b|manual|spreadsheet/i, 'AI automation'],
  [/workflow|qualif|\bleads?\b|approval|pipeline/i, 'AI workflows'],
  [/multi.?agent|agents? (that|which)|orchestrat/i, 'Multi-agent systems'],
  [/\bagents?\b/i, 'AI agents'],
  [/website|landing|\bsite\b|web ?page/i, 'Websites'],
  [/\bapps?\b|mobile|portal|admin panel/i, 'Web and mobile apps'],
  [/\bcrm\b|internal tool|\berp\b|\bops\b|operations|\bqa\b|incentive/i, 'CRM and internal tools'],
  [/integrat|\bapis?\b|zapier|connect|\bsync\b/i, 'Integrations and APIs'],
  [/dashboard|analytics|reporting|\bdata\b/i, 'Data and dashboards'],
];

/** Offline fallback when no LLM key is set: map free text to our services. */
export function keywordAssist(text: string) {
  const found: string[] = [];
  for (const [re, name] of keywordMap) if (re.test(text) && !found.includes(name)) found.push(name);
  const services = found.slice(0, 3);
  const summary = text.trim().length > 0
    ? `Looking for help with: ${text.trim().replace(/\s+/g, ' ').slice(0, 160)}${text.length > 160 ? '...' : ''}`
    : 'Would like to talk about a project.';
  return { summary, services, question: '' };
}
