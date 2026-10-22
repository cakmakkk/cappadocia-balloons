// Every language the site is published in. English lives at the root; the
// others under /<code>/ (e.g. /ko/history/).

export const LOCALES = [
  { code: 'en', hreflang: 'en', intl: 'en-GB', og: 'en_GB', name: 'English' },
  { code: 'tr', hreflang: 'tr', intl: 'tr-TR', og: 'tr_TR', name: 'Türkçe' },
  { code: 'es', hreflang: 'es', intl: 'es-ES', og: 'es_ES', name: 'Español' },
  { code: 'it', hreflang: 'it', intl: 'it-IT', og: 'it_IT', name: 'Italiano' },
  { code: 'de', hreflang: 'de', intl: 'de-DE', og: 'de_DE', name: 'Deutsch' },
  { code: 'pt', hreflang: 'pt-BR', intl: 'pt-BR', og: 'pt_BR', name: 'Português' },
  { code: 'ru', hreflang: 'ru', intl: 'ru-RU', og: 'ru_RU', name: 'Русский' },
  { code: 'ko', hreflang: 'ko', intl: 'ko-KR', og: 'ko_KR', name: '한국어' },
  { code: 'ja', hreflang: 'ja', intl: 'ja-JP', og: 'ja_JP', name: '日本語' },
  { code: 'zh', hreflang: 'zh-Hans', intl: 'zh-CN', og: 'zh_CN', name: '简体中文' },
] as const;

export type Locale = (typeof LOCALES)[number]['code'];
export type LocaleInfo = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function localeInfo(code: Locale): LocaleInfo {
  return LOCALES.find((locale) => locale.code === code)!;
}

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.some((locale) => locale.code === value);
}

/** getStaticPaths for pages under src/pages/[locale]/. */
export function otherLocalePaths() {
  return LOCALES.filter((locale) => locale.code !== DEFAULT_LOCALE).map((locale) => ({
    params: { locale: locale.code },
  }));
}
