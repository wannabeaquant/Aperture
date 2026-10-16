/** Arrow drawn as SVG so it looks identical on every device, never swapped for an emoji or a missing-glyph box. */
const paths: Record<string, string> = {
  ne: 'M6 18 L18 6 M8 6 H18 V16',
  se: 'M6 6 L18 18 M18 8 V18 H8',
  r: 'M4 12 H20 M13 5 L20 12 L13 19',
  l: 'M20 12 H4 M11 5 L4 12 L11 19',
  x: 'M5 5 L19 19 M19 5 L5 19',
};

export default function Arr({ d = 'ne' }: { d?: 'ne' | 'se' | 'r' | 'l' | 'x' }) {
  return (
    <svg className="arr" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
      <path d={paths[d]} />
    </svg>
  );
}
