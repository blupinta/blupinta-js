// What the hooks read, kept once per provider: each answer by its key (an operation and its project), loaded when the
// first component asks for it, shared by every component that shows it, asked again on `refresh`. Read through
// `useSyncExternalStore`, so a component re-renders only when what it shows changes.

import type { BlupintaError } from '@blupinta/sdk/errors'

/** An answer as a component reads it */
export type Loaded<T> = {
  data: T | undefined
  error: BlupintaError | undefined
  isLoading: boolean
}

type Entry = {
  snapshot: Loaded<unknown>
  listeners: Set<() => void>
  /** stops what keeps the answer current (a watched home), when it is something that runs */
  stop: (() => void) | null
}

const IDLE: Loaded<never> = { data: undefined, error: undefined, isLoading: true }

/** How an answer is kept current: loaded once, or followed (it calls `set` each time it changes) and stopped */
export type Source<T> =
  | { kind: 'load'; load: () => Promise<T> }
  | { kind: 'follow'; follow: (set: (next: Partial<Loaded<T>>) => void) => () => void }

export function createAnswers() {
  const entries = new Map<string, Entry>()

  const entryOf = (key: string) => {
    let entry = entries.get(key)
    if (!entry) {
      entry = { snapshot: IDLE, listeners: new Set(), stop: null }
      entries.set(key, entry)
    }
    return entry
  }

  function set(key: string, next: Partial<Loaded<unknown>>) {
    const entry = entryOf(key)
    entry.snapshot = { ...entry.snapshot, ...next }
    for (const listener of entry.listeners) listener()
  }

  function start<T>(key: string, source: Source<T>) {
    const entry = entryOf(key)
    if (source.kind === 'follow') {
      entry.stop = source.follow((next) => set(key, next))
      return
    }
    set(key, { isLoading: true })
    source.load().then(
      (data) => set(key, { data, error: undefined, isLoading: false }),
      (error: BlupintaError) => set(key, { error, isLoading: false }),
    )
  }

  return {
    snapshot: <T>(key: string) => entryOf(key).snapshot as Loaded<T>,
    /** Listens to the answer `key`, starting it for its first listener; returns how to stop listening */
    subscribe<T>(key: string, source: Source<T>, listener: () => void) {
      const entry = entryOf(key)
      entry.listeners.add(listener)
      if (entry.listeners.size === 1 && (entry.snapshot === IDLE || source.kind === 'follow'))
        start(key, source)
      return () => {
        entry.listeners.delete(listener)
        // a followed answer stops when nobody shows it; a loaded one stays, for the next to read at once
        if (!entry.listeners.size && entry.stop) {
          entry.stop()
          entry.stop = null
        }
      }
    },
    refresh<T>(key: string, source: Source<T>) {
      start(key, source)
    },
  }
}

export type Answers = ReturnType<typeof createAnswers>
