import Link from 'next/link';
import type { Client } from '@/lib/data';
import Fit from './Fit';
import { nameLines } from '@/lib/lines';
import ZipTie from './ZipTie';
import { Rv } from './Reveal';

/** A client as a poster: the quoted name, a sector tag and one plain sentence about what we built. */
export default function Poster({ c, span, tie = false, compact = false }: { c: Client; span: string; tie?: boolean; compact?: boolean }) {
  return (
    <Rv className={span}>
      <Link href={`/work/${c.slug}`} className={`poster ${compact ? 'compact' : ''}`} data-cur="OPEN" style={{ background: c.bg, color: c.fg, height: '100%' }}>
        <div className="p-top">
          <span className="mono">{c.no} / {c.sector}</span>
          <span className="p-arrow">︎</span>
        </div>
        {tie && <ZipTie style={{ position: 'absolute', right: -14, top: '30%', transform: 'rotate(-18deg)' }} />}
        <Fit className="num" lines={nameLines(c.name)} max={compact ? 120 : 190} now />
        <p className="p-line">{c.line}</p>
      </Link>
    </Rv>
  );
}
