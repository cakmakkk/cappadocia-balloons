import assert from 'node:assert/strict';
import { test } from 'node:test';
import { morningWindow, rate, summarizeMornings } from './forecast.mjs';

const calm = { maxWind: 6, maxGust: 11, minVisibility: 40000, precipitation: 0, codes: [0, 1] };

test('calm, clear mornings look good', () => {
  assert.equal(rate(calm), 'good');
});

test('strong gusts, fog or thunder change the outlook', () => {
  assert.equal(rate({ ...calm, maxGust: 25 }), 'borderline');
  assert.equal(rate({ ...calm, maxGust: 35 }), 'poor');
  assert.equal(rate({ ...calm, codes: [45] }), 'borderline');
  assert.equal(rate({ ...calm, codes: [95] }), 'poor');
  assert.equal(rate({ ...calm, minVisibility: 500 }), 'poor');
  assert.equal(rate({ ...calm, minVisibility: null }), 'good');
});

test('the window runs from 30 minutes before sunrise to 2 hours after', () => {
  assert.deepEqual(morningWindow('2026-10-23T03:57:00Z'), {
    start: '2026-10-23T03:27:00.000Z',
    end: '2026-10-23T05:57:00.000Z',
  });
});

test('summarizes each upcoming morning from hourly data', () => {
  const hourTimes = ['2026-10-23T02:00', '2026-10-23T03:00', '2026-10-23T04:00', '2026-10-23T05:00', '2026-10-23T06:00'];
  const api = {
    daily: { time: ['2026-10-23'], sunrise: ['2026-10-23T03:57'] },
    hourly: {
      time: hourTimes,
      // 02:00 and 06:00 fall outside the 03:27–05:57 window and must be ignored.
      wind_speed_10m: [40, 6, 8, 10, 40],
      wind_gusts_10m: [60, 11, 14, 18, 60],
      visibility: [100, 30000, 25000, 20000, 100],
      precipitation: [5, 0, 0, 0.1, 5],
      weather_code: [95, 0, 1, 2, 95],
    },
  };

  const [morning] = summarizeMornings(api, new Date('2026-10-22T18:00:00Z'));
  assert.equal(morning.date, '2026-10-23');
  assert.equal(morning.maxWind, 10);
  assert.equal(morning.maxGust, 18);
  assert.equal(morning.minVisibility, 20000);
  assert.equal(morning.precipitation, 0.1);
  assert.equal(morning.rating, 'good');

  assert.deepEqual(summarizeMornings(api, new Date('2026-10-23T07:00:00Z')), []);
});
