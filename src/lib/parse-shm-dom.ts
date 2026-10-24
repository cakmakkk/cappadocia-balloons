// The browser twin of scripts/lib/parse-shm.mjs: reads the official status
// page with the DOM instead of cheerio, so a visitor's browser can read the
// flags live (the page allows cross-origin requests). Kept in step with the
// build-time parser by src/lib/parse-shm-dom.test.ts.

import { clean, FLAG_BY_CODE, flagCodes, flagFromImage, parseUpdatedAt, parseWindow } from './shm-format.ts';
import type { Area } from './status-core.ts';

// The four <h4>s under each block are: label, update time, label, window.
function readTimes(list: Element | null) {
  const values = [...(list?.querySelectorAll('h4') ?? [])].map((h4) => clean(h4.textContent));
  return { updatedAt: parseUpdatedAt(values[1]), window: parseWindow(values[3]) };
}

export function parseShmDocument(doc: Document, html: string): { sectors: Area[]; secondary: Area[] } {
  const codes = flagCodes(html);

  const sectors = [...doc.querySelectorAll('.sector-div')].flatMap((block): Area[] => {
    const title = clean(block.querySelector('h3')?.textContent);
    const id = /SECTOR\s+([A-Z])/i.exec(title)?.[1]?.toUpperCase();
    if (!id) return [];
    const flag = flagFromImage(block.querySelector('li.icon img')?.getAttribute('src')) ?? FLAG_BY_CODE[codes[id]] ?? 'unknown';
    return [
      {
        id,
        flag,
        title,
        message: clean(block.querySelector('.sector-text')?.textContent),
        ...readTimes(block.querySelector('.sector-bottom-list')),
      },
    ];
  });

  const secondary = [...doc.querySelectorAll('.second-left')].flatMap((block): Area[] => {
    const title = clean(block.querySelector('h4')?.textContent);
    const match = /(\d+)\s*\.\s*AREA|(\d+)\s*\.\s*BÖLGE/i.exec(title);
    if (!match) return [];
    return [
      {
        id: match[1] ?? match[2],
        flag: flagFromImage(block.querySelector('img.flag-img')?.getAttribute('src')) ?? 'unknown',
        title,
        message: clean(block.querySelector('.second-info')?.textContent),
        ...readTimes(block.querySelector('.second-sector-bottom-list')),
      },
    ];
  });

  return { sectors, secondary };
}
