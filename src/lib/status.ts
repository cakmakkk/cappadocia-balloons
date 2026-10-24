// Build-time access to the status data written by scripts/fetch-status.mjs,
// and the rules that turn it into "what's happening today".

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { sunriseOn } from './sun.ts';

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
export function loadHistory(dir = join(dataDir, 'history')): DayHistory[] {
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

/** Green means take-off is allowed there; red and yellow both mean no take-off. */
export function greenSectors(areas: Area[]): string[] {
  return areas.filter((area) => area.flag === 'green').map((area) => area.id);
}

export interface WindowRecord {
  window: Window;
  /** The latest flag seen for each sector during this window. */
  flags: Map<string, Flag>;
  /** Sectors that had a green flag at any point during this window. */
  everGreen: Set<string>;
}

/** Distinct primary-area windows recorded on a day, in time order. */
export function windowsOf(day: DayHistory): WindowRecord[] {
  const byWindow = new Map<string, WindowRecord>();
  for (const state of day.states) {
    for (const sector of state.sectors) {
      if (!sector.window) continue;
      const key = `${sector.window.start}/${sector.window.end}`;
      const record = byWindow.get(key) ?? { window: sector.window, flags: new Map(), everGreen: new Set() };
      record.flags.set(sector.id, sector.flag);
      if (sector.flag === 'green') record.everGreen.add(sector.id);
      byWindow.set(key, record);
    }
  }
  return [...byWindow.values()].sort((a, b) => a.window.start.localeCompare(b.window.start));
}

export interface OfficialUpdate {
  /** When the Slot Service Center set these flags (falls back to when we first saw them). */
  at: string;
  window: Window | null;
  flags: { id: string; flag: Flag }[];
}

/** Each distinct decision published on a day, oldest first. */
export function officialUpdates(day: DayHistory): OfficialUpdate[] {
  const seen = new Set<string>();
  const updates: OfficialUpdate[] = [];
  for (const state of day.states) {
    const first = state.sectors[0];
    const at = first?.updatedAt ?? state.firstSeenAt;
    const key = `${at}/${first?.window?.start}/${state.sectors.map((s) => s.flag).join()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    updates.push({ at, window: first?.window ?? null, flags: state.sectors.map(({ id, flag }) => ({ id, flag })) });
  }
  return updates.sort((a, b) => a.at.localeCompare(b.at));
}

export function localDate(date: Date): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(date);
}

/**
 * The morning flight window opens around sunrise (e.g. 06:25 for a 06:57 sunrise);
 * the next one usually starts mid-morning, so anything opening more than an
 * hour after sunrise is not the morning flight.
 */
export function isMorningWindow(window: Window): boolean {
  return Date.parse(window.start) <= Date.parse(sunriseOn(window.date)) + 60 * 60_000;
}

export function morningOf(windows: WindowRecord[]): WindowRecord | undefined {
  return windows.find((record) => isMorningWindow(record.window));
}

export type DayOutcome = 'flew' | 'grounded' | 'not-recorded';

export function outcomeOf(day: DayHistory): DayOutcome {
  const morning = morningOf(windowsOf(day));
  if (!morning) return 'not-recorded';
  return morning.everGreen.size > 0 ? 'flew' : 'grounded';
}

export interface LaterWindow {
  window: Window;
  green: string[];
}

export type HomeState =
  | { kind: 'no-data' }
  | { kind: 'waiting'; lastDate: string }
  | { kind: 'flying-now' | 'grounded-now'; window: Window; green: string[] }
  | { kind: 'flew-this-morning' | 'grounded-this-morning'; window: Window; green: string[]; later: LaterWindow | null }
  | { kind: 'morning-not-recorded'; later: LaterWindow };

/** What the home page should say at `now`. */
export function homeState(latest: Snapshot | null, history: DayHistory[], now: Date): HomeState {
  const current = latest?.sectors[0]?.window;
  if (!latest || !current) return { kind: 'no-data' };

  const today = localDate(now);
  if (current.date < today) return { kind: 'waiting', lastDate: current.date };

  const currentGreen = greenSectors(latest.sectors);
  const isCurrent = (window: Window) => window.start === current.start && window.end === current.end;
  const day = history.find((entry) => entry.date === today);
  const morning = day ? morningOf(windowsOf(day)) : undefined;

  if (morning && now.getTime() <= Date.parse(morning.window.end)) {
    const green = isCurrent(morning.window) ? currentGreen : [...morning.everGreen].sort();
    return { kind: green.length > 0 ? 'flying-now' : 'grounded-now', window: morning.window, green };
  }

  if (morning) {
    const green = [...morning.everGreen].sort();
    const later = isCurrent(morning.window) ? null : { window: current, green: currentGreen };
    return { kind: green.length > 0 ? 'flew-this-morning' : 'grounded-this-morning', window: morning.window, green, later };
  }

  // Nothing recorded for this morning (for example on the first day of records).
  if (isMorningWindow(current) && now.getTime() <= Date.parse(current.end)) {
    return { kind: currentGreen.length > 0 ? 'flying-now' : 'grounded-now', window: current, green: currentGreen };
  }
  return { kind: 'morning-not-recorded', later: { window: current, green: currentGreen } };
}

export type Scene = 'flying' | 'grounded' | 'night';

export function sceneOf(state: HomeState): Scene {
  switch (state.kind) {
    case 'flying-now':
    case 'flew-this-morning':
      return 'flying';
    case 'grounded-now':
    case 'grounded-this-morning':
      return 'grounded';
    case 'morning-not-recorded':
      return state.later.green.length > 0 ? 'flying' : 'grounded';
    default:
      return 'night';
  }
}
