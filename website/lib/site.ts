import { founders } from './data';

export const SITE_URL = 'https://www.aperturecm.in';
export const SITE_NAME = 'Aperture';
export const SITE_DESC = 'Aperture is an AI automation studio. We build voice agents, multi-agent systems, websites and apps. Automations ship in 2-3 days, websites in 4-5.';

/** Profiles we have confirmed ownership of. Add LinkedIn, GitHub, X, Clutch and the like here once they exist, and they flow into the schema automatically. */
export const SAME_AS: string[] = [];

export const abs = (p = '/') => `${SITE_URL}${p === '/' ? '' : p}`;

const title = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export const people = founders.map((f) => ({
  id: `${SITE_URL}/#${f.name.split(' ')[0].toLowerCase()}`,
  name: title(f.name),
  email: f.email,
  phone: `+${f.phone}`,
}));
