import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Smooth from '@/components/Smooth';
import Cursor from '@/components/Cursor';
import Palette from '@/components/Palette';
import Concierge from '@/components/Concierge';
import JsonLd from '@/components/JsonLd';
import { siteGraph } from '@/lib/schema';
import { SITE_DESC } from '@/lib/site';

const sans = Archivo({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700', '800', '900'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aperturecm.in'),
  title: { default: 'Aperture | AI Automation, Voice Agents and App Development Studio', template: '%s / Aperture' },
  description: SITE_DESC,
  applicationName: 'Aperture',
  authors: [{ name: 'Atharva Singh' }, { name: 'Sanidhya Shishodia' }],
  creator: 'Aperture',
  publisher: 'Aperture',
  alternates: { canonical: '/' },
  verification: { other: { 'msvalidate.01': '58817702CB0E52770E2163C72BB90151' } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  openGraph: { type: 'website', siteName: 'Aperture', locale: 'en_IN', url: '/', title: 'Aperture | AI Automation, Voice Agents and App Development Studio', description: SITE_DESC },
  twitter: { card: 'summary_large_image', title: 'Aperture | AI Automation, Voice Agents and App Development Studio', description: SITE_DESC },
  icons: {
    icon: [
      { url: '/icon-light.png', type: 'image/png', sizes: '256x256', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', type: 'image/png', sizes: '256x256', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={siteGraph()} />
        <Smooth />
        <Cursor />
        <Nav />
        <main style={{ paddingTop: 56 }}>{children}</main>
        <Footer />
        <Palette />
        <Concierge />
      </body>
    </html>
  );
}
