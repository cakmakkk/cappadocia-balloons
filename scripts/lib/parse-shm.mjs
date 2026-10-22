// Parses the public status page of the Kapadokya Slot Service Center
// (https://shmkapadokya.kapadokya.edu.tr/en/), where the DGCA's daily
// flight suitability flags for hot air balloons are published.
//
// Times on that page are UTC: the header says so, and the evening window
// ends at sunset in UTC (e.g. 14:55 UTC = 17:55 Türkiye time in October).

import * as cheerio from 'cheerio';

const FLAG_BY_CODE = { 1: 'green', 2: 'yellow', 3: 'red' };

function flagFromImage(src) {
  const match = /flags\/(red|green|yellow)-flag/i.exec(src ?? '');
  return match ? match[1].toLowerCase() : null;
}

// "22.10.2026 - 07:11" -> "2026-10-22T07:11:00Z"
export function parseUpdatedAt(text) {
  const match = /(\d{2})\.(\d{2})\.(\d{4})\s*-\s*(\d{2}):(\d{2})/.exec(text ?? '');
  if (!match) return null;
  const [, dd, mm, yyyy, hh, min] = match;
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:00Z`;
}

// "22.10.2026 - 07:30 - 14:55" -> { date: "2026-10-22", start: "...Z", end: "...Z" }
export function parseWindow(text) {
  const match = /(\d{2})\.(\d{2})\.(\d{4})\s*-\s*(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/.exec(text ?? '');
  if (!match) return null;
  const [, dd, mm, yyyy, h1, m1, h2, m2] = match;
  const date = `${yyyy}-${mm}-${dd}`;
  return { date, start: `${date}T${h1}:${m1}:00Z`, end: `${date}T${h2}:${m2}:00Z` };
}

function clean(text) {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

// The four <h4>s under each block are: label, update time, label, window.
function readTimes($, list) {
  const values = list.find('h4').map((_, el) => clean($(el).text())).get();
  return {
    updatedAt: parseUpdatedAt(values[1]),
    window: parseWindow(values[3]),
    raw: { updatedAt: values[1] ?? null, window: values[3] ?? null },
  };
}

export function parseShmPage(html) {
  const $ = cheerio.load(html);

  // The map script repeats each primary flag as a number (1 green, 2 yellow, 3 red).
  const codes = {};
  for (const [, id, code] of html.matchAll(/sector([ABC])\s*=\s*(\d+)\s*;/g)) {
    codes[id] = Number(code);
  }

  const sectors = $('.sector-div')
    .map((_, el) => {
      const block = $(el);
      const title = clean(block.find('h3').first().text());
      const id = /SECTOR\s+([A-Z])/i.exec(title)?.[1]?.toUpperCase();
      if (!id) return null;
      const flag =
        flagFromImage(block.find('li.icon img').attr('src')) ?? FLAG_BY_CODE[codes[id]] ?? 'unknown';
      return {
        id,
        flag,
        code: codes[id] ?? null,
        title,
        message: clean(block.find('.sector-text').text()),
        ...readTimes($, block.find('.sector-bottom-list')),
      };
    })
    .get()
    .filter(Boolean);

  const secondary = $('.second-left')
    .map((_, el) => {
      const block = $(el);
      const title = clean(block.find('h4').first().text());
      const id = /(\d+)\s*\.\s*AREA|(\d+)\s*\.\s*BÖLGE/i.exec(title);
      if (!id) return null;
      return {
        id: id[1] ?? id[2],
        flag: flagFromImage(block.find('img.flag-img').attr('src')) ?? 'unknown',
        title,
        message: clean(block.find('.second-info').text()),
        ...readTimes($, block.find('.second-sector-bottom-list')),
      };
    })
    .get()
    .filter(Boolean);

  return { sectors, secondary };
}

// Everything that matters for "did the status change?"; ignores fetch time.
export function stateSignature({ sectors, secondary }) {
  const pick = ({ id, flag, updatedAt, window, message }) => ({ id, flag, updatedAt, window, message });
  return JSON.stringify({ sectors: sectors.map(pick), secondary: secondary.map(pick) });
}
