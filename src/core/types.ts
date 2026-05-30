/**
 * A single calendar event. `data` carries arbitrary consumer payload and is
 * fully typed via the `TData` generic so callers keep their own shapes.
 */
export interface CalendarEvent<TData = unknown> {
  id: string;
  start: Date;
  end: Date;
  title?: string;
  data?: TData;
}
