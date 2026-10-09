// What a component reads from Blupinta's API: a project, its versions, its home followed as it is saved. Each returns
// `{ data, error, isLoading }`, shared by every component that reads the same thing, and `refresh` to ask again.

import type { Answer } from '@blupinta/sdk'
import { type HomeStore, type SavedHome, watchHome } from '@blupinta/sdk/watch'
import { useCallback, useSyncExternalStore } from 'react'
import type { Loaded, Source } from './answers'
import { useBlupinta } from './provider'

/** The answer `key` from `source`, re-rendering when it changes */
function useAnswer<T>(key: string, source: Source<T>) {
  const { answers } = useBlupinta()
  // the source is made anew each render, but it is the same while its key is: the key alone says what it is
  // biome-ignore lint/correctness/useExhaustiveDependencies: a source is the same while its key is
  const subscribe = useCallback(
    (listener: () => void) => answers.subscribe(key, source, listener),
    [answers, key],
  )
  const loaded = useSyncExternalStore(
    subscribe,
    () => answers.snapshot<T>(key),
    () => answers.snapshot<T>(key),
  )
  return { ...loaded, refresh: () => answers.refresh(key, source) }
}

/** A project the person gave the app: its name, address, last version */
export function useProject(projectId: string): Loaded<Answer<'getProject'>> & { refresh: () => void } {
  const { client } = useBlupinta()
  return useAnswer(`project:${projectId}`, {
    kind: 'load',
    load: () => client.call('getProject', { path: { projectId } }),
  })
}

/** The project's saved versions, the newest first */
export function useRevisions(projectId: string): Loaded<Answer<'listRevisions'>> & { refresh: () => void } {
  const { client } = useBlupinta()
  return useAnswer(`revisions:${projectId}`, {
    kind: 'load',
    load: () => client.call('listRevisions', { path: { projectId } }),
  })
}

/**
 * The project's home, its last saved version, followed while a component shows it (`@blupinta/sdk/watch`): the copy
 * kept in `store` at once, then each version as it is saved
 */
export function useHome(projectId: string, options: { store?: HomeStore } = {}): Loaded<SavedHome> {
  const { client } = useBlupinta()
  const { refresh: _, ...loaded } = useAnswer<SavedHome>(`home:${projectId}`, {
    kind: 'follow',
    follow: (set) =>
      watchHome(client, projectId, {
        store: options.store,
        onHome: (data) => set({ data, error: undefined, isLoading: false }),
        onError: (error) => set({ error, isLoading: false }),
      }).stop,
  })
  return loaded
}
