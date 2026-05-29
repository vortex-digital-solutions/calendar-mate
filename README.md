# calendar-mate

Tiny, framework-agnostic calendar core for appointment scheduling.

## Goals

- Barebones Node package
- Zero runtime dependencies
- Small API that can be wrapped by any UI framework (React, Vue, Svelte, plain DOM)

## API

```js
const { createCalendarStore } = require('calendar-mate');

const calendar = createCalendarStore();
calendar.add({ id: 'a1', start: 100, end: 130, title: 'Visit' });
calendar.move('a1', { start: 200, end: 230 }); // drag-and-drop primitive
calendar.list();
calendar.remove('a1');
```
