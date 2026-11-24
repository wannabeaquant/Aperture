import { founders } from './data';

export const SITE_URL = 'https://www.aperturecm.in';
export const SITE_NAME = 'Aperture';
export const SITE_DESC = 'Aperture is an AI automation studio in Gurugram, India. We build voice agents, AI agents, multi-agent systems, websites and apps. Automations ship in 2-3 days, websites in 4-5.';

/** Profiles we have confirmed ownership of. Add LinkedIn, GitHub, X, Clutch and the like here once they exist, and they flow into the schema automatically. */
export const SAME_AS: string[] = [
  'https://www.goodfirms.co/company/aperture',
  'https://www.cofounderbase.com/agency/aperturecm-in/',
];

/** One name, address and phone everywhere (Google Business Profile, Clutch, directories). Keep identical. */
// Service-area business: no public street address (matches the Google Business Profile).
export const ADDRESS = { city: 'Gurugram', region: 'Haryana', country: 'IN' };
export const ADDRESS_LINE = `${ADDRESS.city}, ${ADDRESS.region}, India`;
/** Business inbox on our own domain (Forward Email alias, confirmed working 22 Nov 2026). */
export const CONTACT_EMAIL = 'info@aperturecm.in';
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/aperture_inc/30min';

export const abs = (p = '/') => `${SITE_URL}${p === '/' ? '' : p}`;

const title = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export const people = founders.map((f) => ({
  id: `${SITE_URL}/#${f.name.split(' ')[0].toLowerCase()}`,
  name: title(f.name),
  email: f.email,
  phone: `+${f.phone}`,
}));
