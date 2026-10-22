// Build-time access to the weather outlook written by scripts/fetch-forecast.mjs.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { outcomeOf, type DayHistory } from './status.ts';

export type Rating = 'good' | 'borderline' | 'poor';

export interface Morning {
  date: string;
  sunrise: string;
  window: { start: string; end: string };
  maxWind: number;
  maxGust: number;
  minVisibility: number | null;
  precipitation: number;
  codes: number[];
  rating: Rating;
}

export interface Forecast {
  fetchedAt: string;
  mornings: Morning[];
}

const dataDir = join(process.cwd(), 'data');

export function loadForecast(): Forecast | null {
  const path = join(dataDir, 'forecast.json');
  return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as Forecast) : null;
}

/** The outlooks we published the evening before each morning. */
export function loadForecastRecords(dir = join(dataDir, 'forecasts')): Morning[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(readFileSync(join(dir, name), 'utf8')) as Morning);
}

/** How often balloons actually flew after we said a morning "looks good". */
export function trackRecord(records: Morning[], history: DayHistory[]) {
  const outcomes = new Map(history.map((day) => [day.date, outcomeOf(day)]));
  const good = records.filter((r) => r.rating === 'good' && outcomes.get(r.date) !== 'not-recorded' && outcomes.has(r.date));
  return { goodMornings: good.length, flew: good.filter((r) => outcomes.get(r.date) === 'flew').length };
}

/** Below this many checked mornings the track record isn't worth showing. */
export const MIN_TRACK_RECORD = 10;
