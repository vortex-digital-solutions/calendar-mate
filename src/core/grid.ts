export interface MonthGridOptions {
  /** First day of the week. 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: 0 | 1;
}

export interface GridDay {
  date: Date;
  /** False for leading/trailing days that belong to the adjacent month. */
  inMonth: boolean;
}

/**
 * Build a stable 6×7 (42-cell) month grid using native `Date` only — no date
 * library. Always returns 42 days so layouts never reflow between months.
 */
export function getMonthGrid(month: Date, options: MonthGridOptions = {}): GridDay[] {
  const weekStartsOn = options.weekStartsOn ?? 0;
  const year = month.getFullYear();
  const m = month.getMonth();

  const firstWeekday = new Date(year, m, 1).getDay();
  const offset = (firstWeekday - weekStartsOn + 7) % 7;

  const days: GridDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(year, m, 1 - offset + i);
    days.push({ date, inMonth: date.getMonth() === m });
  }
  return days;
}
