// Fetches the official balloon flight status once and records it.
//
//   data/latest.json            the most recent check (not committed)
//   data/history/YYYY-MM-DD.json every distinct state seen that day (committed)
//
// Exits non-zero when the page can't be read or its layout changed, so the
// scheduled workflow shows up as failed instead of silently storing nothing.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseShmPage, stateSignature } from './lib/parse-shm.mjs';

export const SOURCE_URL = 'https://shmkapadokya.kapadokya.edu.tr/en/';
const USER_AGENT = 'cappadocia-balloons/0.1 (+https://github.com/cakmakkk/cappadocia-balloons)';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'data');

async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(value, null, 2) + '\n');
}

async function main() {
  const response = await fetch(SOURCE_URL, {
    headers: { 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`Status page returned HTTP ${response.status}`);

  const { sectors, secondary } = parseShmPage(await response.text());
  if (sectors.length === 0) throw new Error('No sectors found; the page layout may have changed');

  const checkedAt = new Date().toISOString();
  const snapshot = { checkedAt, source: SOURCE_URL, sectors, secondary };
  await writeJson(join(dataDir, 'latest.json'), snapshot);

  // File the state under the day it applies to, as published on the page.
  const day = sectors[0].window?.date ?? checkedAt.slice(0, 10);
  const historyPath = join(dataDir, 'history', `${day}.json`);
  const history = await readJson(historyPath, { date: day, states: [] });
  const previous = history.states.at(-1);

  if (previous && stateSignature(previous) === stateSignature(snapshot)) {
    console.log(`${checkedAt} unchanged (${sectors.map((s) => `${s.id}:${s.flag}`).join(' ')})`);
    return;
  }

  history.states.push({ firstSeenAt: checkedAt, sectors, secondary });
  await writeJson(historyPath, history);
  console.log(`${checkedAt} new state for ${day} (${sectors.map((s) => `${s.id}:${s.flag}`).join(' ')})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
