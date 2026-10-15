'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
export default function Smooth() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let id = 0; const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf); }; id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, []);
  return null;
}
