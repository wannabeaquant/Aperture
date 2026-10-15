'use client';
import { useEffect, useRef } from 'react';

/**
 * Display text that is always sized to fit its container.
 * Lines never wrap and words are never split. The widest line is measured and the
 * font size is scaled so it fills the available width (capped at `max`), on every screen.
 * Quotation marks live inside the first and last line, so they can never drop onto a new line.
 */
export default function Fit({ lines, max = 240, min = 14, as: Tag = 'p', className = '', now = false }: {
  lines: string[]; max?: number; min?: number; as?: 'h1' | 'h2' | 'p'; className?: string; now?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const avail = el.clientWidth;
      if (!avail) return;
      el.style.fontSize = '100px';
      let widest = 0;
      el.querySelectorAll<HTMLElement>('.fit-t').forEach((t) => { widest = Math.max(widest, t.getBoundingClientRect().width); });
      if (!widest) return;
      const size = Math.max(min, Math.min(max, (100 * avail) / widest - 0.5));
      el.style.fontSize = `${size.toFixed(2)}px`;
      el.classList.add('fitted');
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.15 });
    if (now) requestAnimationFrame(() => el.classList.add('in')); else io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, [max, min, now, lines.join('|')]);

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={`fit ${className}`} style={{ fontSize: `min(${max}px, 9vw)` }}>
      {lines.map((l, i) => (
        <span className="mk" key={i}><span style={{ transitionDelay: `${i * 80}ms` }}><b className="fit-t">{l}</b></span></span>
      ))}
    </Tag>
  );
}
