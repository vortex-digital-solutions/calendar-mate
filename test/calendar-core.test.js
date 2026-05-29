const test = require('node:test');
const assert = require('node:assert/strict');
const { createCalendarStore } = require('../index');

test('adds and lists appointments', () => {
  const store = createCalendarStore();
  store.add({ id: 'a1', start: 100, end: 130 });

  assert.deepEqual(store.list(), [{ id: 'a1', start: 100, end: 130 }]);
});

test('add requires id, start, and end fields', () => {
  const store = createCalendarStore();

  for (const appointment of [
    { start: 100, end: 130 },
    { id: 'a1', end: 130 },
    { id: 'a1', start: 100 }
  ]) {
    assert.throws(() => store.add(appointment), {
      name: 'TypeError',
      message: 'appointment must include id, start, and end'
    });
  }
});

test('moves appointment by id (drag-and-drop primitive)', () => {
  const store = createCalendarStore([{ id: 'a1', start: 100, end: 130 }]);
  const moved = store.move('a1', { start: 200, end: 230 });

  assert.deepEqual(moved, { id: 'a1', start: 200, end: 230 });
  assert.deepEqual(store.list(), [{ id: 'a1', start: 200, end: 230 }]);
});

test('move returns null when id is not found', () => {
  const store = createCalendarStore();

  assert.equal(store.move('missing', { start: 200 }), null);
});

test('move preserves required fields', () => {
  const store = createCalendarStore([{ id: 'a1', start: 100, end: 130 }]);

  assert.throws(() => store.move('a1', { id: undefined }), {
    name: 'TypeError',
    message: 'appointment must include id, start, and end'
  });
});

test('removes appointments', () => {
  const store = createCalendarStore([{ id: 'a1', start: 100, end: 130 }]);

  assert.equal(store.remove('a1'), true);
  assert.deepEqual(store.list(), []);
});

test('remove returns false when id is not found', () => {
  const store = createCalendarStore();

  assert.equal(store.remove('missing'), false);
});
