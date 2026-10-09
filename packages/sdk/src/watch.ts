// Following a project's home as it is saved (the guide: https://docs.blupinta.app/reference/public-api/): the last copy
// kept shown at once, then the saved version asked with its ETag (nothing comes back when it hasn't changed), then the
// project's events, which say when a new version is saved; the stream reopened when it drops, a fresh token each time.
// What a dashboard on a wall needs to show its house even while the network is away.

import type { Answer, Client } from './client'
import { BlupintaError, isBlupintaError } from './errors'

/** The home as `getHome` answers it: the last saved version, with its number */
export type SavedHome = Answer<'getHome'>

/** A copy of the home kept on the device, with the ETag it came with */
export type KeptHome = { home: SavedHome; etag: string | null }

/** Where the copy is kept between runs (a file, the browser's storage, a database): one per project */
export type HomeStore = {
  load(projectId: string): KeptHome | null | Promise<KeptHome | null>
  save(projectId: string, kept: KeptHome): void | Promise<void>
}

/** A store in memory: the copy lasts as long as the process */
export function memoryHomeStore(): HomeStore {
  const kept = new Map<string, KeptHome>()
  return {
    load: (projectId) => kept.get(projectId) ?? null,
    save: (projectId, home) => void kept.set(projectId, home),
  }
}

export type WatchOptions = {
  /** called with each version of the home: the kept one first, if any, then every new one saved */
  onHome: (home: SavedHome) => void
  /** called when something fails; the watch goes on, unless the app lost the project (`forbidden`, `not_found`) */
  onError?: (error: BlupintaError) => void
  store?: HomeStore
  /** stops the watch, as `stop()` does */
  signal?: AbortSignal
}

const MOST_WAIT = 60_000

const waitFor = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      resolve()
    })
  })

/** The events of a stream as they come: each one's name and data */
async function* eventsOf(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder()
  let text = ''
  for await (const chunk of body as unknown as AsyncIterable<Uint8Array>) {
    text += decoder.decode(chunk, { stream: true })
    let end = text.indexOf('\n\n')
    while (end >= 0) {
      const block = text.slice(0, end)
      text = text.slice(end + 2)
      end = text.indexOf('\n\n')
      const lines = block.split('\n')
      const event = lines.find((l) => l.startsWith('event: '))?.slice(7)
      if (event) yield { event, data: lines.find((l) => l.startsWith('data: '))?.slice(6) ?? '' }
    }
  }
}

/** Whether the app may no longer read the project: watching it any longer is pointless */
const isGone = (e: unknown) =>
  isBlupintaError(e, 'forbidden') || isBlupintaError(e, 'not_found') || isBlupintaError(e, 'unauthenticated')

/**
 * Follows the home of the project `projectId`: `onHome` with each version, until `stop()` (or the signal) or until the
 * app loses the project. A stream that drops is opened again after 1 s, doubling to a minute. Returns how to stop
 */
export function watchHome(client: Client, projectId: string, options: WatchOptions) {
  const stopping = new AbortController()
  options.signal?.addEventListener('abort', () => stopping.abort())
  const signal = stopping.signal
  const store = options.store
  let kept: KeptHome | null = null

  const failed = (e: unknown) =>
    options.onError?.(isBlupintaError(e) ? e : new BlupintaError(0, 'network', { problems: [String(e)] }))

  /** The saved version, unless it is the one kept */
  async function refresh() {
    const changed = await client.callIfChanged('getHome', kept?.etag ?? null, { path: { projectId }, signal })
    if (!changed) return
    kept = { home: changed.data, etag: changed.etag }
    await store?.save(projectId, kept)
    options.onHome(kept.home)
  }

  async function run() {
    kept = (await store?.load(projectId)) ?? null
    if (kept) options.onHome(kept.home)
    let wait = 1000
    while (!signal.aborted) {
      try {
        await refresh()
        const response = await client.response('projectEvents', { path: { projectId }, signal })
        if (!response.body) throw new BlupintaError(0, 'network', { problems: ['the stream has no body'] })
        wait = 1000
        for await (const { event } of eventsOf(response.body)) {
          if (event === 'revision.saved') await refresh()
          if (event === 'access.revoked')
            throw new BlupintaError(403, 'forbidden', { problems: ['access.revoked'] })
          // `token.expired`: the stream ends, and opens again with a fresh token
        }
      } catch (e) {
        if (signal.aborted) return
        failed(e)
        if (isGone(e)) return
        await waitFor(wait, signal)
        wait = Math.min(wait * 2, MOST_WAIT)
      }
    }
  }

  void run()
  return { stop: () => stopping.abort() }
}
