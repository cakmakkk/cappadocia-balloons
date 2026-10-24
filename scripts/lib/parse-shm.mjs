// Parses the public status page of the Kapadokya Slot Service Center
// (https://shmkapadokya.kapadokya.edu.tr/en/), where the DGCA's daily
// flight suitability flags for hot air balloons are published.
//
// The page's formats live in src/lib/shm-format.ts, shared with the parser
// that runs in the browser (src/lib/parse-shm-dom.ts).

import * as cheerio from 'cheerio';
import {
  clean,
  FLAG_BY_CODE,
  flagCodes,
  flagFromImage,
  parseUpdatedAt,
  parseWindow,
} from '../../src/lib/shm-format.ts';

export { parseUpdatedAt, parseWindow, stateSignature } from '../../src/lib/shm-format.ts';

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
  const codes = flagCodes(html);

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
