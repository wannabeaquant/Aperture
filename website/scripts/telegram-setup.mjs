// Helper for setting up Telegram lead alerts. Never prints your bot token.
//
//   node scripts/telegram-setup.mjs          -> lists the chats that have messaged your bot (shows their chat ids)
//   node scripts/telegram-setup.mjs --test   -> sends a test alert to every chat id in TELEGRAM_CHAT_IDS
//
// Reads TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_IDS from .env.local (or the environment).
import { readFileSync, existsSync } from 'node:fs';

for (const f of ['.env.local', '.env']) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is not set. Put it in aperture-site/.env.local first (see the steps).');
  process.exit(1);
}
const api = (m, body) => fetch(`https://api.telegram.org/bot${token}/${m}`, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : undefined).then((r) => r.json());

const me = await api('getMe');
if (!me.ok) { console.error('Telegram rejected the token. Check you copied the whole token from BotFather.'); process.exit(1); }
console.log(`Bot found: @${me.result.username}\n`);

if (process.argv.includes('--test')) {
  const ids = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!ids.length) { console.error('TELEGRAM_CHAT_IDS is empty. Run this script without --test first and copy the ids.'); process.exit(1); }
  for (const id of ids) {
    const r = await api('sendMessage', { chat_id: id, text: 'Test alert from aperturecm.in. If you can read this, lead alerts will reach you.' });
    console.log(`${id}: ${r.ok ? 'delivered' : 'FAILED - ' + r.description}`);
  }
  process.exitCode = 0;
} else {

const u = await api('getUpdates');
const seen = new Map();
for (const upd of u.result || []) {
  const c = (upd.message || upd.channel_post || upd.my_chat_member || {}).chat;
  if (c) seen.set(c.id, c.title || [c.first_name, c.last_name].filter(Boolean).join(' ') || c.username || '(unnamed)');
}
if (!seen.size) {
  console.log('No chats yet. Open your bot in Telegram and press Start (or send /start in the group), then run this again.');
} else {
  console.log('Chats that have messaged your bot:');
  for (const [id, name] of seen) console.log(`  ${id}   ${name}`);
  console.log(`\nPut this in .env.local and in Vercel:\nTELEGRAM_CHAT_IDS=${[...seen.keys()].join(',')}`);
}
}
