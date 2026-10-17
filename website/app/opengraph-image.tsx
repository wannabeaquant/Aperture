import { ImageResponse } from 'next/og';

export const alt = 'Aperture. AI automation, voice agents and app development studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FF5A00', color: '#0A0A0A', padding: 64, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 900, letterSpacing: 2 }}>APERTURE / APERTURECM.IN</div>
        <div style={{ display: 'flex', fontSize: 112, fontWeight: 900, lineHeight: 0.95, letterSpacing: -4 }}>"THE THING BEHIND THE THING"</div>
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>AI automation, voice agents, multi-agent systems, websites and apps.</div>
      </div>
    ),
    size,
  );
}
