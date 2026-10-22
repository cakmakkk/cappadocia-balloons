// The site is served from a sub-path on GitHub Pages (/cappadocia-balloons/)
// and may move to a domain root later, so every internal link goes through here.

import { DEFAULT_LOCALE, LOCALES, type Locale } from '../i18n/locales.ts';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** A page in a language, e.g. href('ko', '/history/') -> /cappadocia-balloons/ko/history/. */
export function href(locale: Locale, path = '/'): string {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${base}${prefix}${path}`;
}

/** A file in public/, e.g. asset('/favicon.svg'). */
export function asset(path: string): string {
  return `${base}${path}`;
}

export function absolute(locale: Locale, path: string, site: URL | undefined): string {
  return new URL(href(locale, path), site).href;
}

/** The same page in every language, for hreflang links and the sitemap. */
export function alternates(path: string, site: URL | undefined) {
  return LOCALES.map((locale) => ({ locale, url: absolute(locale.code, path, site) }));
}
