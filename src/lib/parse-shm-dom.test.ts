import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DOMParser } from 'linkedom';
import { parseShmPage } from '../../scripts/lib/parse-shm.mjs';
import { page } from '../../scripts/lib/shm-fixture.mjs';
import { parseShmDocument } from './parse-shm-dom.ts';

// The build-time parser also keeps the map code and raw strings; the live one doesn't need them.
function withoutExtras(area: Record<string, unknown>) {
  const { code: _code, raw: _raw, ...rest } = area;
  return rest;
}

function parseLive(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html') as unknown as Document;
  return parseShmDocument(doc, html);
}

for (const flags of [
  { a: 'green', b: 'yellow', c: 'red' },
  { a: 'red', b: 'red', c: 'red' },
  { a: 'green', b: 'green', c: 'green' },
]) {
  test(`the browser parser reads the same as the build-time parser (${Object.values(flags).join(', ')})`, () => {
    const html = page(flags);
    const build = parseShmPage(html);
    const live = parseLive(html);
    assert.deepEqual(live.sectors, build.sectors.map(withoutExtras));
    assert.deepEqual(live.secondary, build.secondary.map(withoutExtras));
  });
}

test('the browser parser falls back to the map script when the flag image is unknown', () => {
  const html = page({ a: 'red', b: 'red', c: 'red' }).replace('flags/red-flag.png', 'flags/new-icon.png');
  assert.equal(parseLive(html).sectors[0].flag, 'red');
});

test('the browser parser finds no sectors on an unrelated page', () => {
  assert.deepEqual(parseLive('<html><body>Maintenance</body></html>').sectors, []);
});
