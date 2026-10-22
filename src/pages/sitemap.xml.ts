// Every page in every language, each listing its language versions.

import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '../i18n/locales.ts';
import { docsIn, slugOf } from '../lib/docs.ts';
import { loadForecast } from '../lib/forecast.ts';
import { absolute } from '../lib/paths.ts';
import { loadHistory, loadLatest } from '../lib/status.ts';

interface Page {
  path: string;
  lastmod: (locale: Locale) => Promise<string | undefined> | string | undefined;
}

export const GET: APIRoute = async ({ site }) => {
  const history = loadHistory();
  const latest = loadLatest(history);
  const lastChange = history[0]?.states.at(-1)?.firstSeenAt;
  const forecast = loadForecast();

  const docDate = async (locale: Locale, slug: string) =>
    (await docsIn(locale)).find((d) => slugOf(d) === slug)?.data.updated.toISOString().slice(0, 10);
  const guideSlugs = (await docsIn(DEFAULT_LOCALE, 'guide')).map(slugOf);

  const pages: Page[] = [
    { path: '/', lastmod: () => latest?.checkedAt },
    { path: '/tomorrow/', lastmod: () => forecast?.fetchedAt },
    { path: '/history/', lastmod: () => lastChange },
    { path: '/guides/', lastmod: async (l) => (await Promise.all(guideSlugs.map((s) => docDate(l, s)))).sort().at(-1) },
    ...guideSlugs.map((slug) => ({ path: `/guides/${slug}/`, lastmod: (l: Locale) => docDate(l, slug) })),
    { path: '/about/', lastmod: (l) => docDate(l, 'about') },
  ];

  const entries: string[] = [];
  for (const page of pages) {
    const links = [
      ...LOCALES.map((l) => `<xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${absolute(l.code, page.path, site)}"/>`),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(DEFAULT_LOCALE, page.path, site)}"/>`,
    ].join('');
    for (const locale of LOCALES) {
      const lastmod = await page.lastmod(locale.code);
      entries.push(
        `<url><loc>${absolute(locale.code, page.path, site)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${links}</url>`,
      );
    }
  }

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
