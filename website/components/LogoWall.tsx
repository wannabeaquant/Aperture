import Link from 'next/link';
import { clients } from '@/lib/data';

/** Every client, as a logo where we have one and as a set wordmark where we do not. */
export default function LogoWall() {
  return (
    <div className="logos">
      {clients.map((c) => (
        <Link key={c.slug} href={`/work/${c.slug}`} data-cur="OPEN" aria-label={c.name}>
          {c.wordmark === 'aigtm' ? <span className="aigtm" aria-label={c.name}><b>AIGTM</b><i>Channel</i></span> : c.logo ? (<span className="lg-pair"><img src={c.logo} alt={c.name} loading="lazy" className={c.logoClass} />{c.logoText && <b className="lg-text">{c.logoText}</b>}</span>) : <span className="wordmark">{c.name}</span>}
        </Link>
      ))}
    </div>
  );
}
