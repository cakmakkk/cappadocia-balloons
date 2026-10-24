// Turns the home page state into words, for the status card and the page's
// meta description.

import { list, time, timeRange } from '../i18n/format.ts';
import { messages } from '../i18n/index.ts';
import type { Locale } from '../i18n/locales.ts';
import type { HomeState } from './status.ts';

export interface StatusText {
  tone: 'go' | 'stop' | 'wait';
  headline: string;
  detail: string;
  /** How the rest of the day looks, once the morning window is over. */
  later: string | null;
}

export function describe(locale: Locale, state: HomeState, sunrise: string): StatusText {
  const t = messages(locale);
  const s = t.home.status;
  const range = (w: { start: string; end: string }) => timeRange(locale, w.start, w.end);
  const areas = (green: string[]) =>
    green.length === 3 ? t.areas.all : t.areas.some(list(locale, green), green.length);
  const laterText = (later: { window: { start: string; end: string }; green: string[] } | null) =>
    later ? t.home.laterWindow(range(later.window), later.green.length > 0) : null;

  switch (state.kind) {
    case 'flying-now':
      return { tone: 'go', headline: s.flyingNow.headline, detail: s.flyingNow.detail(areas(state.green), range(state.window)), later: null };
    case 'grounded-now':
      return { tone: 'stop', headline: s.groundedNow.headline, detail: s.groundedNow.detail(range(state.window)), later: null };
    case 'flew-this-morning':
      return {
        tone: 'go',
        headline: s.flewThisMorning.headline,
        detail: s.flewThisMorning.detail(areas(state.green), range(state.window)),
        later: laterText(state.later),
      };
    case 'grounded-this-morning':
      return {
        tone: 'stop',
        headline: s.groundedThisMorning.headline,
        detail: s.groundedThisMorning.detail(range(state.window)),
        later: laterText(state.later),
      };
    case 'morning-not-recorded':
      return { tone: 'wait', headline: s.morningNotRecorded.headline, detail: s.morningNotRecorded.detail, later: laterText(state.later) };
    case 'waiting':
      return { tone: 'wait', headline: s.waiting.headline, detail: s.waiting.detail(time(locale, sunrise)), later: null };
    default:
      return { tone: 'wait', headline: s.noData.headline, detail: s.noData.detail, later: null };
  }
}
