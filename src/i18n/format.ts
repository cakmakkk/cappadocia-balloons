// Dates, times and lists in each language. Times are always Türkiye time.

import { TIME_ZONE } from '../lib/status-core.ts';
import { localeInfo, type Locale } from './locales.ts';

const intl = (locale: Locale) => localeInfo(locale).intl;

export function time(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(intl(locale), {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(iso));
}

export function timeRange(locale: Locale, start: string, end: string): string {
  return `${time(locale, start)}–${time(locale, end)}`;
}

/** A calendar day (YYYY-MM-DD), e.g. "Friday 23 October". */
export function longDate(locale: Locale, isoDate: string, withYear = false): string {
  return new Intl.DateTimeFormat(intl(locale), {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    ...(withYear && { year: 'numeric' }),
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** A calendar day without the weekday, e.g. "23 October 2026", to sit inside a sentence. */
export function fullDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(intl(locale), { timeZone: 'UTC', dateStyle: 'long' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

/** A calendar day in a few characters, for compact strips: "Fri 23". */
export function shortDay(locale: Locale, isoDate: string): { weekday: string; day: string } {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return {
    weekday: new Intl.DateTimeFormat(intl(locale), { timeZone: 'UTC', weekday: 'short' }).format(date),
    day: new Intl.DateTimeFormat(intl(locale), { timeZone: 'UTC', day: 'numeric' }).format(date),
  };
}

export function list(locale: Locale, items: string[]): string {
  return new Intl.ListFormat(intl(locale), { type: 'conjunction' }).format(items);
}

/** A run of short details, e.g. "wind 7 km/h, gusts 12 km/h" (Japanese and Chinese use "、"). */
export function details(locale: Locale, items: string[]): string {
  return items.join(locale === 'ja' || locale === 'zh' ? '、' : ', ');
}

export function number(locale: Locale, value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat(intl(locale), { maximumFractionDigits }).format(value);
}
