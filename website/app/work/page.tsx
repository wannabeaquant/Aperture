import type { Metadata } from 'next';
import Poster from '@/components/Poster';
import Tape from '@/components/Tape';
import Fit from '@/components/Fit';
import JsonLd from '@/components/JsonLd';
import { workGraph } from '@/lib/schema';
import { clients, featured, rest } from '@/lib/data';

export const metadata: Metadata = { title: 'Client Work: AI Systems, Websites and Apps', description: 'What Aperture has built for AI, finance, education, property, interiors and operations teams: AI products, voice agents, CRMs, websites and apps.', alternates: { canonical: '/work' } };

export default function Work() {
  return (
    <>
      <JsonLd data={workGraph()} />
      <div className="fig mono"><span>(02) WORK</span><span>{clients.length} CLIENTS</span></div>
      <div style={{ padding: 'clamp(28px,5vw,72px) var(--pad) clamp(28px,4vw,56px)' }}>
        <Fit as="h1" now className="mega" max={260} lines={['"WORK"']} />
      </div>
      <Tape />
      <div className="posters" style={{ borderTop: '2px solid var(--k)' }}>
        <Poster c={featured[0]} span="span-7" />
        <Poster c={featured[1]} span="span-5" tie />
        <Poster c={featured[2]} span="span-4" />
        <Poster c={featured[3]} span="span-4" />
        <Poster c={featured[4]} span="span-4" />
        {rest.map((c, i) => (<Poster key={c.slug} c={c} span={rest.length % 3 === 1 && i === rest.length - 1 ? 'span-12' : rest.length % 3 === 2 && i >= rest.length - 2 ? 'span-6' : 'span-4'} compact />))}
      </div>
    </>
  );
}
