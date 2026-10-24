import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseShmPage, parseUpdatedAt, parseWindow, stateSignature } from './parse-shm.mjs';
import { page } from './shm-fixture.mjs';

test('reads flags, messages and UTC times for every sector', () => {
  const { sectors, secondary } = parseShmPage(page({ a: 'green', b: 'yellow', c: 'red' }));

  assert.deepEqual(
    sectors.map((s) => [s.id, s.flag, s.code]),
    [['A', 'green', 1], ['B', 'yellow', 2], ['C', 'red', 3]],
  );
  assert.equal(sectors[0].message, 'Message for A.');
  assert.equal(sectors[0].updatedAt, '2026-10-22T03:05:00Z');
  assert.deepEqual(sectors[0].window, {
    date: '2026-10-22',
    start: '2026-10-22T03:30:00Z',
    end: '2026-10-22T07:30:00Z',
  });

  assert.deepEqual(secondary.map((s) => [s.id, s.flag]), [['2', 'red'], ['3', 'green']]);
});

test('falls back to the map script code when the flag image is unrecognised', () => {
  const html = page({ a: 'red', b: 'red', c: 'red' }).replace('flags/red-flag.png', 'flags/new-icon.png');
  assert.equal(parseShmPage(html).sectors[0].flag, 'red');
});

test('returns no sectors for an unrelated page', () => {
  assert.deepEqual(parseShmPage('<html><body>Maintenance</body></html>').sectors, []);
});

test('signature changes with the flag but not with fetch time', () => {
  const red = parseShmPage(page({ a: 'red', b: 'red', c: 'red' }));
  const green = parseShmPage(page({ a: 'green', b: 'red', c: 'red' }));
  assert.equal(stateSignature({ ...red, checkedAt: 'x' }), stateSignature({ ...red, checkedAt: 'y' }));
  assert.notEqual(stateSignature(red), stateSignature(green));
});

test('date helpers reject malformed input', () => {
  assert.equal(parseUpdatedAt('soon'), null);
  assert.equal(parseWindow('22.10.2026 - 07:30'), null);
});
