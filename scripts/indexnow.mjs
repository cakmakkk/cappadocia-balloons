// Tells IndexNow search engines (Bing, Yandex, Naver, Seznam and others)
// that the pages in the live sitemap have changed. Run after a deploy that
// changed content, not on every status update.
//
//   PAGE_URL=https://cakmakkk.github.io/cappadocia-balloons/ node scripts/indexnow.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pageUrl = process.env.PAGE_URL;
if (!pageUrl) throw new Error('PAGE_URL is required');

// The key is the name (and content) of the .txt file in public/.
const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const keyFile = readdirSync(publicDir).find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error('No IndexNow key file in public/');
const key = readFileSync(join(publicDir, keyFile), 'utf8').trim();

const sitemap = await (await fetch(new URL('sitemap.xml', pageUrl))).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error('The sitemap lists no URLs');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(pageUrl).host, key, keyLocation: new URL(keyFile, pageUrl).href, urlList }),
});

// 200 and 202 both mean accepted.
console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`);
if (!response.ok) {
  console.log(await response.text());
  process.exit(1);
}
