import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { classify, logHit, wantsMarkdown } from '@/lib/aibots';

const HAS_MD = /^\/(?:services|work|studio|contact|services\/[^/]+|work\/[^/]+)?$/;
const mdTarget = (p: string) => `/md${p === '/' ? '' : p}`;

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const host = (req.headers.get('host') || '').split(':')[0].toLowerCase();
  const ua = req.headers.get('user-agent') || '';
  const hit = classify(ua);
  const pathname = req.nextUrl.pathname;
  const prod = host.endsWith('aperturecm.in');

  // Record every AI and search bot visit (who is really reading the site).
  if (hit && prod) {
    event.waitUntil(logHit(
      { account: process.env.CF_ACCOUNT_ID, token: process.env.CF_API_TOKEN, db: process.env.AIBOTS_DB },
      { host, path: pathname, ua, country: req.headers.get('x-vercel-ip-country') || '', hit },
    ));
  }

  // Markdown version: /page.md (homepage /index.md).
  const md = pathname.match(/^(.*)\.md$/);
  if (md) {
    const p = md[1] === '/index' ? '/' : md[1];
    return HAS_MD.test(p) ? NextResponse.rewrite(new URL(mdTarget(p), req.url)) : NextResponse.next();
  }
  const path = pathname.replace(/\/$/, '') || '/';
  if (HAS_MD.test(path)) {
    // Same content as Markdown for AI assistants and clients that ask for it. Search indexers always get HTML.
    const asksMd = (req.headers.get('accept') || '').includes('text/markdown');
    if (asksMd || wantsMarkdown(hit)) {
      const res = NextResponse.rewrite(new URL(mdTarget(path), req.url));
      res.headers.set('Vary', 'User-Agent, Accept');
      return res;
    }
  }
  if (pathname.startsWith('/md/') || pathname === '/md') {
    const u = req.nextUrl.clone(); u.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(u, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/|api/|favicon|img/|logos/|.*\\.(?:png|jpe?g|svg|ico|webp|gif|css|js|woff2?)$).*)'] };
