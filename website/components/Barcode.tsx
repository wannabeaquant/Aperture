export default function Barcode({ seed = 7, h = 44, w = 170 }: { seed?: number; h?: number; w?: number }) {
  let x = 0;
  const bars: { x: number; w: number }[] = [];
  let s = seed;
  while (x < w) {
    s = (s * 9301 + 49297) % 233280;
    const bw = 1 + (s % 4);
    if ((s >> 3) % 2 === 0) bars.push({ x, w: bw });
    x += bw + 1;
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      {bars.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height={h} fill="currentColor" />)}
    </svg>
  );
}
