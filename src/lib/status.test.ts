import assert from 'node:assert/strict';
import { test } from 'node:test';
import { homeState, outcomeOf, sceneOf, type Area, type DayHistory, type Flag, type Snapshot } from './status.ts';

// Times are UTC; Türkiye is UTC+3. The morning window below is 06:30–10:30 local.
const MORNING = { date: '2026-10-23', start: '2026-10-23T03:30:00Z', end: '2026-10-23T07:30:00Z' };
const AFTERNOON = { date: '2026-10-23', start: '2026-10-23T07:30:00Z', end: '2026-10-23T14:55:00Z' };

function sectors(window: Area['window'], flags: [Flag, Flag, Flag]): Area[] {
  return (['A', 'B', 'C'] as const).map((id, i) => ({
    id,
    flag: flags[i],
    title: '',
    message: '',
    updatedAt: null,
    window,
  }));
}

function day(...states: Area[][]): DayHistory {
  return {
    date: '2026-10-23',
    states: states.map((s, i) => ({ firstSeenAt: `2026-10-23T0${i}:00:00Z`, sectors: s, secondary: [] })),
  };
}

function snapshot(areas: Area[]): Snapshot {
  return { checkedAt: '2026-10-23T08:00:00Z', source: '', sectors: areas, secondary: [] };
}

test('during the morning window the current flags decide', () => {
  const morning = sectors(MORNING, ['green', 'red', 'green']);
  const state = homeState(snapshot(morning), [day(morning)], new Date('2026-10-23T04:00:00Z'));
  assert.deepEqual(state, { kind: 'flying-now', window: MORNING, green: ['A', 'C'] });
  assert.equal(sceneOf(state), 'flying');
});

test('after the morning the page reports how the morning went, plus the later window', () => {
  const morningGreen = sectors(MORNING, ['green', 'green', 'red']);
  const afternoonRed = sectors(AFTERNOON, ['red', 'red', 'red']);
  const state = homeState(snapshot(afternoonRed), [day(morningGreen, afternoonRed)], new Date('2026-10-23T09:00:00Z'));
  assert.deepEqual(state, {
    kind: 'flew-this-morning',
    window: MORNING,
    green: ['A', 'B'],
    later: { window: AFTERNOON, green: [] },
  });
});

test('a green flag that later turned red still counts as a morning that flew', () => {
  const green = sectors(MORNING, ['green', 'red', 'red']);
  const red = sectors(MORNING, ['red', 'red', 'red']);
  assert.equal(outcomeOf(day(green, red)), 'flew');
  assert.equal(outcomeOf(day(red)), 'grounded');
  assert.equal(outcomeOf(day(sectors(AFTERNOON, ['red', 'red', 'red']))), 'not-recorded');
});

test('without a morning record the afternoon window is not mistaken for the morning', () => {
  const afternoonRed = sectors(AFTERNOON, ['red', 'red', 'red']);
  const state = homeState(snapshot(afternoonRed), [day(afternoonRed)], new Date('2026-10-23T20:00:00Z'));
  assert.equal(state.kind, 'morning-not-recorded');
  assert.equal(sceneOf(state), 'grounded');
});

test("yesterday's status means today's has not been published yet", () => {
  const yesterday = sectors({ ...AFTERNOON, date: '2026-10-22' }, ['red', 'red', 'red']);
  const state = homeState(snapshot(yesterday), [], new Date('2026-10-23T01:00:00Z'));
  assert.deepEqual(state, { kind: 'waiting', lastDate: '2026-10-22' });
  assert.equal(sceneOf(state), 'night');
});

test('no data at all', () => {
  assert.deepEqual(homeState(null, [], new Date()), { kind: 'no-data' });
});
