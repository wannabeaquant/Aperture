import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Smooth from '@/components/Smooth';
import Cursor from '@/components/Cursor';
import Palette from '@/components/Palette';
import Concierge from '@/components/Concierge';

const sans = Archivo({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700', '800', '900'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aperturecm.in'),
  title: { default: 'Aperture. AI systems that work.', template: '%s / Aperture' },
  description: 'Aperture builds voice agents, AI automation, operating software and apps for agencies, BPOs and product teams. Two founders, both on the work.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
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
