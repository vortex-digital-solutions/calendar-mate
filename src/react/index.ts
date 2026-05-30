import { useMemo, useSyncExternalStore } from "react";
import {
  createCalendar,
  type Calendar,
  type CalendarOptions,
  type CalendarState,
} from "../core/calendar";

/**
 * React binding for calendar-mate. Creates a calendar instance scoped to the
 * component and subscribes to it via `useSyncExternalStore`, so the component
 * re-renders on every state change with zero extra dependencies.
 *
 * `options` is read once on mount (like `useState`'s initializer).
 */
export function useCalendar<TData = unknown>(
  options: CalendarOptions<TData> = {},
): Calendar<TData> & { state: CalendarState<TData> } {
  const calendar = useMemo(() => createCalendar<TData>(options), []);
  const state = useSyncExternalStore(
    calendar.subscribe,
    calendar.get,
    calendar.get,
  );
  return { ...calendar, state };
}

export type {
  Calendar,
  CalendarOptions,
  CalendarState,
} from "../core/calendar";
export type { GridDay } from "../core/grid";
export type { CalendarEvent } from "../core/types";
