export type Listener = () => void;

/**
 * Minimal observable store. Framework-agnostic on purpose: every binding
 * (React, Vue, Svelte, vanilla) can drive UI off `subscribe` + `get`.
 */
export interface Store<T> {
  get: () => T;
  set: (next: Partial<T> | ((prev: T) => Partial<T>)) => void;
  subscribe: (listener: Listener) => () => void;
}

export function createStore<T extends object>(initial: T): Store<T> {
  let state = initial;
  const listeners = new Set<Listener>();

  return {
    get: () => state,
    set: (next) => {
      const patch = typeof next === 'function' ? next(state) : next;
      state = { ...state, ...patch };
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
