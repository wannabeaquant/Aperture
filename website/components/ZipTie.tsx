/** Industrial zip tie in SVG. The orange one is an Off-White signature. */
export default function ZipTie({ color = '#ff5a00', className = '', style }: { color?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} width="150" height="46" viewBox="0 0 150 46" fill="none" aria-hidden>
      <rect x="2" y="16" width="118" height="14" fill={color} stroke="#0a0a0a" strokeWidth="2.5" />
      {Array.from({ length: 11 }).map((_, i) => (<line key={i} x1={14 + i * 9.5} y1="16" x2={14 + i * 9.5} y2="30" stroke="#0a0a0a" strokeWidth="1.6" />))}
      <rect x="118" y="6" width="28" height="34" fill={color} stroke="#0a0a0a" strokeWidth="2.5" />
      <rect x="127" y="16" width="11" height="14" fill="#fff" stroke="#0a0a0a" strokeWidth="2" />
    </svg>
  );
}
