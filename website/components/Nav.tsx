'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [['Work', '/work'], ['Services', '/services'], ['Studio', '/studio'], ['Contact', '/contact']];

export default function Nav() {
  const path = usePathname();
  const [hide, setHide] = useState(false);
  useEffect(() => {
    let last = 0;
    const on = () => { const y = window.scrollY; setHide(y > 200 && y > last); last = y; };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`nav ${hide ? 'hide' : ''}`}>
      <div className="nav-in">
        <Link href="/" className="brand" aria-label="Aperture home"><span className="markimg" style={{ width: 26, height: 26 }} />Aperture</Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([l, h]) => (<Link key={h} href={h} aria-current={path.startsWith(h) ? 'page' : undefined}>{l}</Link>))}
        </nav>
        <div className="nav-r">
          <button className="kbd" onClick={() => window.dispatchEvent(new Event('aperture:palette'))} aria-label="Open search">CTRL K</button>
          <Link href="/contact" className="pill">Talk to us ↗</Link>
        </div>
      </div>
    </header>
  );
}
