# calendar-mate

An ultra-light, framework-agnostic drag-and-drop calendar for scheduling and
appointments. Bring your own UI — or use the native React binding.

- 🪶 **Tiny.** Zero runtime dependencies. Native `Date`, no date library.
- 🧩 **Framework-agnostic core** with a thin, optional React binding.
- 🔠 **TypeScript-native** with first-class generated types.
- 🌳 **Tree-shakeable** ESM + CJS, `sideEffects: false`.
- 🆓 **MIT** licensed.

> Status: **early scaffold.** The headless engine and React binding are in
> place; drag-and-drop and richer views are next.

## Install

```sh
pnpm add calendar-mate
# react binding also needs react as a peer dependency
pnpm add react
```

## Usage

### Framework-agnostic core

```ts
import { createCalendar } from 'calendar-mate';

const calendar = createCalendar({ weekStartsOn: 1 });

calendar.subscribe(() => render(calendar.getGrid()));
calendar.next(); // advance one month
```

### React

```tsx
import { useCalendar } from 'calendar-mate/react';

function Calendar() {
  const cal = useCalendar({ weekStartsOn: 1 });
  return (
    <div>
      <button onClick={cal.prev}>‹</button>
      <button onClick={cal.next}>›</button>
      <div className="grid">
        {cal.getGrid().map(({ date, inMonth }) => (
          <span key={+date} data-muted={!inMonth}>
            {date.getDate()}
          </span>
        ))}
      </div>
    </div>
  );
}
```

## Package layout

| Import                 | Contents                              | Deps                  |
| ---------------------- | ------------------------------------- | --------------------- |
| `calendar-mate`        | Headless core (store, grid, calendar) | none                  |
| `calendar-mate/react`  | `useCalendar` hook                    | `react` (peer, ≥18)   |

The React binding lives behind a separate subpath export, so non-React
consumers never download or bundle it.

## On bundle size

Size is a first-class feature, not an afterthought. Our goal is to keep the
**core as close to ~1 kB gzipped as practical**:

- **Zero runtime dependencies** and **native `Date`/`Intl`** — no date-fns,
  dayjs, or moment.
- **`react` is an optional peer dependency** — never bundled into the package
  or counted against the core size.
- **ESM-first + `sideEffects: false`** so bundlers drop anything you don't use.
- A **`size-limit` budget runs in CI** (`pnpm size`) and fails the build if we
  regress past the budget.

Honest caveat: a *full* drag-and-drop calendar with multiple views will land at
a few kB, not 1 kB — the engine math, hit-testing, and drag state cost real
bytes. We keep each feature in its own tree-shakeable module so you only pay
for what you import, and we publish the measured numbers below.

```sh
pnpm size      # check against the budget
pnpm size:why  # see what's contributing to the size
```

## Development

```sh
pnpm install
pnpm build       # tsup -> dist/ (esm + cjs + d.ts)
pnpm typecheck   # tsc --noEmit
pnpm size        # size-limit budget check
```

## License

[MIT](./LICENSE)
