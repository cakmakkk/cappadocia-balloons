// Build-time access to the status data written by scripts/fetch-status.mjs.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type Flag = 'green' | 'yellow' | 'red' | 'unknown';

export interface Window {
  date: string;
  start: string;
  end: string;
}

export interface Area {
  id: string;
  flag: Flag;
  title: string;
  message: string;
  updatedAt: string | null;
  window: Window | null;
}

export interface Snapshot {
  checkedAt: string;
  source: string;
  sectors: Area[];
  secondary: Area[];
}

export interface DayHistory {
  date: string;
  states: { firstSeenAt: string; sectors: Area[]; secondary: Area[] }[];
}

export const SOURCE_URL = 'https://shmkapadokya.kapadokya.edu.tr/en/';
export const TIME_ZONE = 'Europe/Istanbul';

const dataDir = join(process.cwd(), 'data');

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

/** Days with recorded states, newest first. */
export function loadHistory(): DayHistory[] {
  const dir = join(dataDir, 'history');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .reverse()
    .map((name) => readJson<DayHistory>(join(dir, name)));
}

/** The latest check; falls back to the newest recorded state when latest.json isn't present. */
export function loadLatest(history = loadHistory()): Snapshot | null {
  const latestPath = join(dataDir, 'latest.json');
  if (existsSync(latestPath)) return readJson<Snapshot>(latestPath);
  const state = history[0]?.states.at(-1);
  return state ? { checkedAt: state.firstSeenAt, source: SOURCE_URL, ...state } : null;
}

/** Green anywhere means take-off is allowed there; red and yellow both mean no take-off. */
export function isCleared(areas: Area[]): boolean {
  return areas.some((area) => area.flag === 'green');
}

export type Phase = 'active' | 'ended' | 'not-yet-published';

/** Where `now` sits relative to the window the latest status applies to. */
export function phaseOf(snapshot: Snapshot, now: Date): Phase {
  const window = snapshot.sectors[0]?.window;
  if (!window) return 'not-yet-published';
  if (window.date < localDate(now)) return 'not-yet-published';
  return now.getTime() > Date.parse(window.end) ? 'ended' : 'active';
}

/** Distinct primary-area windows recorded on a day, each with the flags it carried. */
export function windowsOf(day: DayHistory) {
  const byWindow = new Map<string, { window: Window; flags: Map<string, Flag> }>();
  for (const state of day.states) {
    for (const sector of state.sectors) {
      if (!sector.window) continue;
      const key = `${sector.window.start}/${sector.window.end}`;
      const entry = byWindow.get(key) ?? { window: sector.window, flags: new Map() };
      // A later state for the same window replaces the earlier flag.
      entry.flags.set(sector.id, sector.flag);
      byWindow.set(key, entry);
    }
  }
  return [...byWindow.values()].sort((a, b) => a.window.start.localeCompare(b.window.start));
}

export function localDate(date: Date): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(date);
}

export function localTime(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function utcTime(iso: string): string {
  return iso.slice(11, 16);
}

export function longDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export const FLAG_LABEL: Record<Flag, string> = {
  green: 'Green flag',
  yellow: 'Yellow flag',
  red: 'Red flag',
  unknown: 'Unknown',
};
