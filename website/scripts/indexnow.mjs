// After a deploy, tells Bing (and other IndexNow engines) which URLs to recrawl.
// Usage: node scripts/indexnow.mjs   (reads the live sitemap, so deploy first)
const host = 'aperturecm.in';
const key = 'd1972aae9aafd6c31ffd678487336ace';
const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(res.status, res.statusText, urlList.length + ' urls');
