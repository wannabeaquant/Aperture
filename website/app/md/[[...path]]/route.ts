import { pageMarkdown } from '@/lib/markdown';
import { abs } from '@/lib/site';

export async function GET(_req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params;
  const p = '/' + (path || []).join('/');
  const md = pageMarkdown(p);
  if (!md) return new Response('Not found', { status: 404 });
  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: `<${abs(p === '/index' ? '/' : p)}>; rel="canonical"`,
      'X-Robots-Tag': 'noindex, follow',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
