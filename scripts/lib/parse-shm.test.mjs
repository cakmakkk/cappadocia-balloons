import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseShmPage, parseUpdatedAt, parseWindow, stateSignature } from './parse-shm.mjs';

// Mirrors the markup of the live page (trimmed to the parts the parser reads).
function sectorBlock(id, flag, label) {
  return `
    <div class="sector-div"><div class="row">
      <div class="col-md-6"><ul class="sector-list">
        <li class="sector sector-black"><h3>SECTOR ${id} ${label}</h3></li>
        <li class="icon"><img src="../assets/flags/${flag}-flag.png" class="img-responsive"></li>
      </ul></div>
      <div class="col-md-6"><p class="sector-text">Message for ${id}.</p></div>
      <div class="col-md-12"><ul class="sector-bottom-list float-left">
        <li><h4>Date and hour of update <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:05</h4></li>
        <li><h4>Relevant date and margin of hours <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:30 - 07:30</h4></li>
      </ul></div>
    </div></div>`;
}

function secondaryBlock(n, flag) {
  return `
    <div class="col-md-6"><div class="second-left">
      <h4 class="not-fly-black">${n}.AREA</h4>
      <img src="../assets/flags/${flag}-flag.png" class="img-responsive flag-img">
      <p class="second-info">Info for area ${n}.</p>
      <ul class="second-sector-bottom-list float-left">
        <li><h4>Date and hour of update <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:05</h4></li>
        <li><h4>Relevant date and margin of hours <span>:</span></h4></li>
        <li><h4>22.10.2026 - 03:30 - 07:30</h4></li>
      </ul>
    </div></div>`;
}

function page({ a, b, c }) {
  const code = { green: 1, yellow: 2, red: 3 };
  return `<html><body>
    ${sectorBlock('A', a, a === 'green' ? 'AVAILABLE' : 'NOT AVAILABLE')}
    ${sectorBlock('B', b, b === 'green' ? 'AVAILABLE' : 'NOT AVAILABLE')}
    ${sectorBlock('C', c, c === 'green' ? 'AVAILABLE' : 'NOT AVAILABLE')}
    ${secondaryBlock(2, 'red')}${secondaryBlock(3, 'green')}
    <script>
      sectorA = ${code[a]};
      sectorB = ${code[b]};
      sectorC = ${code[c]};
    </script>
  </body></html>`;
}

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
