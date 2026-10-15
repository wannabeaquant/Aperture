import Link from 'next/link';
import { clients } from '@/lib/data';

/** Every client, as a logo where we have one and as a set wordmark where we do not. */
export default function LogoWall() {
  return (
    <div className="logos">
      {clients.map((c) => (
        <Link key={c.slug} href={`/work/${c.slug}`} data-cur="OPEN" aria-label={c.name}>
          {c.logo ? <img src={c.logo} alt={c.name} loading="lazy" className={c.logoClass} /> : <span className="wordmark">{c.name}</span>}
        </Link>
      ))}
    </div>
  );
}
