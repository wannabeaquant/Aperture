import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Search and answer-engine bots, plus the bots that fetch a page when a person asks an AI about it.
// A bot that matches its own group ignores the '*' group, so each group repeats the /api/ rule.
const bots = [
  'Googlebot', 'Bingbot', 'Applebot',
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: bots, allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
