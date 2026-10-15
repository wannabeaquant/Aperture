import { tape } from '@/lib/data';

export default function Tape({ rev = false }: { rev?: boolean }) {
  const row = tape.map((t) => <span key={t}>{t}</span>);
  return (
    <div className="tape-wrap" aria-hidden>
      <div className={`tape ${rev ? 'rev' : ''}`}>
        <div className="tape-track">{row}{row}</div>
        <div className="tape-track" aria-hidden>{row}{row}</div>
      </div>
    </div>
  );
}
