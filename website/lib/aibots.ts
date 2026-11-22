// AI crawler and assistant detection, plus a fire-and-forget visit log (Cloudflare D1 over HTTP).
// Search indexers (Googlebot, Bingbot, Applebot) are logged but always get the normal HTML page.

type Bot = { name: string; re: RegExp; kind: 'assistant' | 'ai-crawler' | 'search' };

export const BOTS: Bot[] = [
  { name: 'ChatGPT-User', re: /ChatGPT-User/i, kind: 'assistant' },
  { name: 'OAI-SearchBot', re: /OAI-SearchBot/i, kind: 'assistant' },
  { name: 'GPTBot', re: /GPTBot/i, kind: 'ai-crawler' },
  { name: 'Claude-User', re: /Claude-User/i, kind: 'assistant' },
  { name: 'Claude-SearchBot', re: /Claude-SearchBot/i, kind: 'assistant' },
  { name: 'ClaudeBot', re: /ClaudeBot|anthropic-ai/i, kind: 'ai-crawler' },
  { name: 'Perplexity-User', re: /Perplexity-User/i, kind: 'assistant' },
  { name: 'PerplexityBot', re: /PerplexityBot/i, kind: 'assistant' },
  { name: 'MistralAI-User', re: /MistralAI-User/i, kind: 'assistant' },
  { name: 'DuckAssistBot', re: /DuckAssistBot/i, kind: 'assistant' },
  { name: 'YouBot', re: /YouBot/i, kind: 'assistant' },
  { name: 'meta-externalfetcher', re: /meta-externalfetcher/i, kind: 'assistant' },
  { name: 'meta-externalagent', re: /meta-externalagent|FacebookBot/i, kind: 'ai-crawler' },
  { name: 'Amazonbot', re: /Amazonbot/i, kind: 'ai-crawler' },
  { name: 'Bytespider', re: /Bytespider/i, kind: 'ai-crawler' },
  { name: 'CCBot', re: /CCBot/i, kind: 'ai-crawler' },
  { name: 'cohere-ai', re: /cohere-ai|cohere-training/i, kind: 'ai-crawler' },
  { name: 'DeepSeekBot', re: /DeepSeek/i, kind: 'ai-crawler' },
  { name: 'Google-CloudVertexBot', re: /Google-CloudVertexBot/i, kind: 'ai-crawler' },
  { name: 'GoogleOther', re: /GoogleOther/i, kind: 'search' },
  { name: 'Googlebot', re: /Googlebot|Google-InspectionTool/i, kind: 'search' },
  { name: 'Bingbot', re: /bingbot|BingPreview/i, kind: 'search' },
  { name: 'Applebot', re: /Applebot/i, kind: 'search' },
  { name: 'DuckDuckBot', re: /DuckDuckBot/i, kind: 'search' },
  { name: 'YandexBot', re: /YandexBot/i, kind: 'search' },
];

export type Hit = { bot: string; kind: string };

/** Named bot, or a "suspect" browser: Chrome older than v100 is almost never a person in 2026 (Ramp saw DeepSeek pose as 2017 Chrome). */
export function classify(ua: string): Hit | null {
  const b = BOTS.find((x) => x.re.test(ua));
  if (b) return { bot: b.name, kind: b.kind };
  const m = ua.match(/Chrome\/(\d+)\./);
  if (m && Number(m[1]) < 100 && !/Android/i.test(ua)) return { bot: `old-chrome-${m[1]}`, kind: 'suspect' };
  if (!ua || /python-requests|httpx|aiohttp|node-fetch|axios|curl|Go-http-client|Scrapy|HeadlessChrome/i.test(ua)) return { bot: ua ? ua.split(/[\s/]/)[0] : 'no-ua', kind: 'script' };
  return null;
}

/** AI assistants and AI crawlers get the Markdown version; search indexers never do. */
export const wantsMarkdown = (h: Hit | null) => !!h && (h.kind === 'assistant' || h.kind === 'ai-crawler');

export function logHit(env: { account?: string; token?: string; db?: string }, row: { host: string; path: string; ua: string; country: string; hit: Hit }) {
  if (!env.account || !env.token || !env.db) return Promise.resolve();
  const sql = 'INSERT INTO hits (ts, host, path, bot, ua, country, kind) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [new Date().toISOString(), row.host, row.path.slice(0, 300), row.hit.bot, row.ua.slice(0, 300), row.country, row.hit.kind];
  return fetch(`https://api.cloudflare.com/client/v4/accounts/${env.account}/d1/database/${env.db}/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql, params }),
  }).then(() => undefined, () => undefined);
}
