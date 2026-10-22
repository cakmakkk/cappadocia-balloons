// Fetches the weather outlook for the coming mornings from Open-Meteo.
//
//   data/forecast.json              the latest outlook (not committed)
//   data/forecasts/YYYY-MM-DD.json   the outlook we gave the evening before
//                                    each morning, kept to check our record
//
// A failed forecast must never fail the status run, so this script always
// exits 0 and the site simply shows the outlook as unavailable.

import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { forecastUrl, summarizeMornings } from './lib/forecast.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');

// The record for a morning is written once, on the first run within this
// many hours of its window, which lands in the evening before.
const RECORD_HOURS_BEFORE = 10;

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(value, null, 2) + '\n');
}

async function main() {
  const response = await fetch(forecastUrl(), { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Open-Meteo returned HTTP ${response.status}`);

  const now = new Date();
  const mornings = summarizeMornings(await response.json(), now);
  await writeJson(join(dataDir, 'forecast.json'), { fetchedAt: now.toISOString(), source: 'open-meteo', mornings });

  const next = mornings.find((m) => Date.parse(m.window.start) > now.getTime());
  if (next && Date.parse(next.window.start) - now.getTime() <= RECORD_HOURS_BEFORE * 3_600_000) {
    const recordPath = join(dataDir, 'forecasts', `${next.date}.json`);
    if (!existsSync(recordPath)) {
      await writeJson(recordPath, { issuedAt: now.toISOString(), ...next });
      console.log(`recorded the outlook for ${next.date}: ${next.rating}`);
    }
  }

  console.log(mornings.map((m) => `${m.date}:${m.rating}`).join(' '));
}

main().catch((error) => {
  console.warn(`Forecast unavailable: ${error.message}`);
});
