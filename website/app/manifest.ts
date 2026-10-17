import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aperture',
    short_name: 'Aperture',
    description: 'AI automation, voice agents, multi-agent systems, websites and apps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [{ src: '/icon-light.png', sizes: '256x256', type: 'image/png' }],
  };
}
