import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  outputFileTracingRoot: root,
  async redirects() {
    // Directory crawlers look for an about page by name.
    return [{ source: '/about', destination: '/studio', permanent: true }, { source: '/about-us', destination: '/studio', permanent: true }, { source: '/process', destination: '/studio', permanent: true }];
  },
  async headers() {
    const rules = [{ source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
    // Preview and branch deployments must never be indexed.
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') rules.push({ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] });
    return rules;
  },
  webpack(config) { config.resolve.alias['@'] = root; return config; },
};
