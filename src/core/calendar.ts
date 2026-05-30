import { createStore, type Store } from './store';
import { getMonthGrid, type GridDay, type MonthGridOptions } from './grid';
import type { CalendarEvent } from './types';

export interface CalendarState<TData = unknown> {
  /** Any date within the month currently in view. */
  viewDate: Date;
  events: CalendarEvent<TData>[];
}

export interface CalendarOptions<TData = unknown> extends MonthGridOptions {
  viewDate?: Date;
  events?: CalendarEvent<TData>[];
}

export interface Calendar<TData = unknown> extends Store<CalendarState<TData>> {
  /** The current month rendered as a 42-cell grid. */
  getGrid: () => GridDay[];
  /** Move the view to the next month. */
  next: () => void;
  /** Move the view to the previous month. */
  prev: () => void;
}

/**
 * Create a headless calendar instance. This is the framework-agnostic heart of
 * calendar-mate — bindings (e.g. `calendar-mate/react`) wrap it for rendering,
 * but it works standalone with any UI layer.
 */
export function createCalendar<TData = unknown>(
  options: CalendarOptions<TData> = {},
): Calendar<TData> {
  const store = createStore<CalendarState<TData>>({
    viewDate: options.viewDate ?? new Date(),
    events: options.events ?? [],
  });

  const shiftMonth = (delta: number) =>
    store.set((state) => ({
      viewDate: new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + delta, 1),
    }));

  return {
    ...store,
    getGrid: () => getMonthGrid(store.get().viewDate, options),
    next: () => shiftMonth(1),
    prev: () => shiftMonth(-1),
  };
}
