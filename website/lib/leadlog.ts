// Logs one inbound event (form lead or contact click) to Cloudflare D1 for the monthly scorecard. No names, numbers or emails.
export type LeadRow = { kind: string; page: string; src: string; services?: string; askedHuman?: boolean; delivered?: number };

function parseSrc(src: string): { ref: string; landing: string } {
  try {
    const o = JSON.parse(src || '{}');
    return { ref: String(o.r || '').slice(0, 80), landing: String(o.l || '').slice(0, 120) };
  } catch {
    return { ref: '', landing: '' };
  }
}

export function logLead(row: LeadRow): Promise<void> {
  const account = process.env.CF_ACCOUNT_ID, token = process.env.CF_API_TOKEN, db = process.env.AIBOTS_DB;
  if (!account || !token || !db) return Promise.resolve();
  const { ref, landing } = parseSrc(row.src);
  const sql = 'INSERT INTO leads (ts, kind, page, landing, referrer, services, asked_human, delivered) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [new Date().toISOString(), row.kind.slice(0, 30), row.page.slice(0, 120), landing, ref, (row.services || '').slice(0, 160), row.askedHuman ? 1 : 0, row.delivered ?? null];
  return fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${db}/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql, params }),
  }).then(() => undefined, () => undefined);
}

export const sourceLine = (src: string) => {
  const { ref, landing } = parseSrc(src);
  return ref || landing ? `Came from: ${ref || 'direct'}${landing ? `, landed on ${landing}` : ''}` : '';
};
