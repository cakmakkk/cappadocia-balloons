// Formats used on the official status page of the Kapadokya Slot Service
// Center, shared by the build-time parser (scripts/lib/parse-shm.mjs) and the
// live parser that runs in the browser (src/lib/parse-shm-dom.ts).
//
// Times on that page are UTC: the header says so, and the evening window
// ends at sunset in UTC (e.g. 14:55 UTC = 17:55 Türkiye time in October).

import type { Area, Flag, Window } from './status-core.ts';

/** The map script repeats each primary flag as a number. */
export const FLAG_BY_CODE: Record<number, Flag> = { 1: 'green', 2: 'yellow', 3: 'red' };

export function flagFromImage(src: string | null | undefined): Flag | null {
  const match = /flags\/(red|green|yellow)-flag/i.exec(src ?? '');
  return match ? (match[1].toLowerCase() as Flag) : null;
}

/** sectorA = 3; -> { A: 3 } */
export function flagCodes(html: string): Record<string, number> {
  const codes: Record<string, number> = {};
  for (const [, id, code] of html.matchAll(/sector([ABC])\s*=\s*(\d+)\s*;/g)) codes[id] = Number(code);
  return codes;
}

/** "22.10.2026 - 07:11" -> "2026-10-22T07:11:00Z" */
export function parseUpdatedAt(text: string | null | undefined): string | null {
  const match = /(\d{2})\.(\d{2})\.(\d{4})\s*-\s*(\d{2}):(\d{2})/.exec(text ?? '');
  if (!match) return null;
  const [, dd, mm, yyyy, hh, min] = match;
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:00Z`;
}

/** "22.10.2026 - 07:30 - 14:55" -> { date: "2026-10-22", start: "...Z", end: "...Z" } */
export function parseWindow(text: string | null | undefined): Window | null {
  const match = /(\d{2})\.(\d{2})\.(\d{4})\s*-\s*(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/.exec(text ?? '');
  if (!match) return null;
  const [, dd, mm, yyyy, h1, m1, h2, m2] = match;
  const date = `${yyyy}-${mm}-${dd}`;
  return { date, start: `${date}T${h1}:${m1}:00Z`, end: `${date}T${h2}:${m2}:00Z` };
}

export function clean(text: string | null | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

/** Everything that matters for "did the status change?"; ignores fetch time. */
export function stateSignature({ sectors, secondary }: { sectors: Area[]; secondary: Area[] }): string {
  const pick = ({ id, flag, updatedAt, window, message }: Area) => ({ id, flag, updatedAt, window, message });
  return JSON.stringify({ sectors: sectors.map(pick), secondary: secondary.map(pick) });
}
