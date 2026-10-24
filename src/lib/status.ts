// Build-time access to the status data written by scripts/fetch-status.mjs.
// The rules themselves live in status-core.ts.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SOURCE_URL, type DayHistory, type Snapshot } from './status-core.ts';

export * from './status-core.ts';

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
