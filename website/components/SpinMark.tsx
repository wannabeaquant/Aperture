'use client';
import { useEffect, useRef } from 'react';

/** The real shutter mark. It turns with scroll, like a shutter being set. */
export default function SpinMark({ size = '100%' }: { size?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { if (ref.current) ref.current.style.transform = `rotate(${Math.min(window.scrollY, 3000) * 0.12}deg)`; });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return <span ref={ref} className="markimg" style={{ width: size, height: size, willChange: 'transform' }} />;
}
