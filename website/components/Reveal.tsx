'use client';
import { useEffect, useRef, ReactNode } from 'react';

export function useIn<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold, rootMargin: '0px 0px -6% 0px' });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return ref;
}

export function Rv({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useIn<HTMLDivElement>();
  return <div ref={ref} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

/** Masked line reveal. lines are plain strings. */
export function Lines({ lines, className = '', as: Tag = 'h2', now = false }: { lines: string[]; className?: string; as?: 'h1' | 'h2' | 'h3' | 'p'; now?: boolean }) {
  const ref = useIn<HTMLElement>(0.2);
  useEffect(() => { if (now) requestAnimationFrame(() => ref.current?.classList.add('in')); }, [now, ref]);
  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (<span className="mk" key={i}><span style={{ transitionDelay: `${i * 80}ms` }}>{l}</span></span>))}
    </Tag>
  );
}
