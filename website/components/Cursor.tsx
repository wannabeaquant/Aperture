'use client';
import { useEffect, useRef } from 'react';

/** Crosshair cursor with an optional label from data-cur on the hovered element. */
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const lab = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = (e.target as HTMLElement)?.closest?.('[data-cur]') as HTMLElement | null;
      el.current?.classList.toggle('lbl', !!t);
      if (lab.current) lab.current.textContent = t?.dataset.cur || '';
    };
    const loop = () => {
      x += (tx - x) * 0.35; y += (ty - y) * 0.35;
      if (el.current) el.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); document.body.classList.remove('hascur'); };
  }, []);
  return <div ref={el} className="cur" aria-hidden><i /><i /><b ref={lab} /></div>;
}
