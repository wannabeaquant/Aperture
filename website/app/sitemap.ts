import type { MetadataRoute } from 'next';
import { clients } from '@/lib/data';
import { abs } from '@/lib/site';

// Bump this date only when page content really changes: Google and Bing ignore lastmod once it proves unreliable.
const UPDATED = new Date('2026-10-17');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: abs('/'), lastModified: UPDATED },
    { url: abs('/work'), lastModified: UPDATED },
    { url: abs('/services'), lastModified: UPDATED },
    { url: abs('/studio'), lastModified: UPDATED },
    { url: abs('/contact'), lastModified: UPDATED },
    ...clients.map((c) => ({ url: abs(`/work/${c.slug}`), lastModified: UPDATED })),
  ];
}
