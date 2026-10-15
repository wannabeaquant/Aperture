/** Split a name into at most two balanced lines, never inside a word, with the quotes attached. */
export function nameLines(name: string, quoted = true): string[] {
  const words = name.toUpperCase().split(' ');
  let lines: string[] = [name.toUpperCase()];
  if (words.length > 1 && name.length > 9) {
    let best = Infinity;
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(' ');
      const b = words.slice(i).join(' ');
      const m = Math.max(a.length, b.length);
      if (m < best) { best = m; lines = [a, b]; }
    }
  }
  if (quoted) { lines[0] = `"${lines[0]}`; lines[lines.length - 1] = `${lines[lines.length - 1]}"`; }
  return lines;
}
