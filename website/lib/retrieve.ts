import { chunks, Chunk } from './data';

const STOP = new Set('a an the is are do does you your we our of to for and or in on with how what who can i it me us about tell please have has was were be been that this they them their'.split(' '));
export const tok = (s: string) => s.toLowerCase().replace(/[^a-z0-9/ ]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w));

/** Keyword retrieval over the site's own content. Returns the best matches, strongest first. */
export function retrieve(q: string, limit = 3, min = 3): Chunk[] {
  const qt = tok(q);
  if (!qt.length) return [];
  return chunks
    .map((c) => {
      const body = tok(c.text + ' ' + c.title);
      const keys = tok(c.keys);
      let s = 0;
      for (const w of qt) { if (keys.includes(w)) s += 3; if (body.includes(w)) s += 1; }
      return { c, s };
    })
    .filter((x) => x.s >= min)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.c);
}
