// Checks the built site in dist/ before it is deployed:
//   - every page's canonical link points to itself
//   - every page lists all language versions plus x-default
//   - every internal link leads to a file that exists
//   - no two pages share a title
//
// Run with the same SITE_URL and BASE_PATH as the build.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import * as cheerio from 'cheerio';
import { LOCALES } from '../src/i18n/locales.ts';

const dist = join(process.cwd(), 'dist');
const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');
const errors = [];

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

/** dist/ko/history/index.html -> https://site/base/ko/history/ */
function urlOf(file) {
  const path = relative(dist, file).split(sep).join('/');
  return new URL(`${base}/${path.replace(/(^|\/)index\.html$/, '$1')}`, site).href;
}

function fileFor(pathname) {
  const local = decodeURIComponent(pathname.slice(base.length));
  return local.endsWith('/') ? join(dist, local, 'index.html') : join(dist, local);
}

const titles = new Map();

for (const file of htmlFiles(dist)) {
  const $ = cheerio.load(readFileSync(file, 'utf8'));
  const url = urlOf(file);
  const page = relative(dist, file);
  const isNotFound = page === '404.html';

  if (!$('html').attr('lang')) errors.push(`${page}: missing <html lang>`);

  const canonical = $('link[rel="canonical"]').attr('href');
  if (!isNotFound && canonical !== url) errors.push(`${page}: canonical is ${canonical}, expected ${url}`);

  if (!isNotFound) {
    const hreflangs = $('link[rel="alternate"][hreflang]')
      .map((_, el) => $(el).attr('hreflang'))
      .get();
    const expected = [...LOCALES.map((l) => l.hreflang), 'x-default'];
    const missing = expected.filter((h) => !hreflangs.includes(h));
    if (missing.length > 0) errors.push(`${page}: missing hreflang ${missing.join(', ')}`);
    const self = $(`link[rel="alternate"][href="${url}"]`).length;
    if (self === 0) errors.push(`${page}: its own language version is not among the alternates`);
  }

  const title = $('title').text().trim();
  if (!title) errors.push(`${page}: empty <title>`);
  titles.set(title, [...(titles.get(title) ?? []), page]);

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const target = new URL(href, url);
    if (target.origin !== new URL(site).origin || !target.pathname.startsWith(`${base}/`)) return;
    if (!existsSync(fileFor(target.pathname))) errors.push(`${page}: broken link ${href}`);
  });
}

for (const [title, pages] of titles) {
  if (pages.length > 1) errors.push(`duplicate title "${title}" on ${pages.join(', ')}`);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) in dist/`);
  process.exit(1);
}
console.log(`dist/ looks good: ${htmlFiles(dist).length} pages checked`);
