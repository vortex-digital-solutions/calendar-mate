const test = require('node:test');
const assert = require('node:assert/strict');
const { createCalendarStore } = require('../index');

test('adds and lists appointments', () => {
  const store = createCalendarStore();
  store.add({ id: 'a1', start: 100, end: 130 });

  assert.deepEqual(store.list(), [{ id: 'a1', start: 100, end: 130 }]);
});

test('moves appointment by id (drag-and-drop primitive)', () => {
  const store = createCalendarStore([{ id: 'a1', start: 100, end: 130 }]);
  const moved = store.move('a1', { start: 200, end: 230 });

  assert.deepEqual(moved, { id: 'a1', start: 200, end: 230 });
  assert.deepEqual(store.list(), [{ id: 'a1', start: 200, end: 230 }]);
});

test('removes appointments', () => {
  const store = createCalendarStore([{ id: 'a1', start: 100, end: 130 }]);

  assert.equal(store.remove('a1'), true);
  assert.deepEqual(store.list(), []);
});
