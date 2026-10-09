// Signing a person in from a page in the browser (the authorization code with PKCE, `@blupinta/sdk/auth`): `signIn()`
// sends them to auth.blupinta.app, and the page they come back to (the app's registered return address) finishes it by
// itself; the tokens are kept in the storage given (the browser's local storage by default) and refreshed before they
// expire. What the app does with them is its own: a client made with `token`, the person signed out with `signOut()`.

import {
  type AuthOptions,
  finishBrowserSignIn,
  startBrowserSignIn,
  type Tokens,
  tokenKeeper,
} from '@blupinta/sdk/auth'
import type { BlupintaError } from '@blupinta/sdk/errors'
import { useMemo, useSyncExternalStore } from 'react'

/** Where the tokens, and a sign-in under way, are kept between pages: the browser's `localStorage` is one */
export type TokenStorage = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

/** The little of the page this hook uses, named here so it builds without the DOM's types */
type Page = {
  location: { href: string; assign(url: string): void }
  history: { replaceState(data: null, unused: string, url: string): void }
  localStorage: TokenStorage
}
const page = () => globalThis as unknown as Page

export type SignInOptions = AuthOptions & {
  /** the app's client id, registered in Blupinta's settings (Developers) */
  clientId: string
  /** one of the return addresses registered with it: the page that finishes the sign-in */
  redirectUri: string
  /** what the app asks: `openid` and the API's scopes; `offline_access` keeps the person signed in */
  scope: string
  /** where the tokens are kept; the browser's local storage by default */
  storage?: TokenStorage
}

type State = { tokens: Tokens | null; error: BlupintaError | null; isFinishing: boolean }

/** One store per client id: every component signed in the same way sees the same person */
const stores = new Map<string, ReturnType<typeof createStore>>()

function createStore(options: SignInOptions) {
  const storage = options.storage ?? page().localStorage
  const tokensKey = `blupinta:${options.clientId}:tokens`
  const startedKey = `blupinta:${options.clientId}:sign-in`
  const read = (key: string) => {
    try {
      const text = storage.getItem(key)
      return text ? (JSON.parse(text) as unknown) : null
    } catch {
      return null
    }
  }
  let state: State = { tokens: read(tokensKey) as Tokens | null, error: null, isFinishing: false }
  const listeners = new Set<() => void>()
  let refreshing: Promise<string> | null = null
  const set = (next: Partial<State>) => {
    state = { ...state, ...next }
    for (const listener of listeners) listener()
  }
  const keep = (tokens: Tokens | null) => {
    if (tokens) storage.setItem(tokensKey, JSON.stringify(tokens))
    else storage.removeItem(tokensKey)
    set({ tokens })
  }

  /** Finishes a sign-in when this page is the one the person came back to, with the state this browser sent */
  function finishIfBack() {
    const started = read(startedKey) as { verifier: string; state: string } | null
    const here = new URL(page().location.href)
    if (!started || !here.searchParams.has('state') || here.searchParams.get('state') !== started.state)
      return
    storage.removeItem(startedKey)
    set({ isFinishing: true })
    finishBrowserSignIn({ ...options, callbackUrl: here.href, started })
      .then(
        (tokens) => keep(tokens),
        (error: BlupintaError) => set({ error }),
      )
      .finally(() => {
        set({ isFinishing: false })
        // the code and the state leave the address, so a reload doesn't try them again
        here.search = ''
        page().history.replaceState(null, '', here.href)
      })
  }

  return {
    get: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener)
      if (listeners.size === 1) finishIfBack()
      return () => listeners.delete(listener)
    },
    async signIn() {
      const started = await startBrowserSignIn(options)
      storage.setItem(startedKey, JSON.stringify({ verifier: started.verifier, state: started.state }))
      page().location.assign(started.url)
    },
    signOut: () => keep(null),
    /** The client's token, refreshed before it expires and kept again: one refresh for every request waiting */
    token: () => {
      const tokens = state.tokens
      if (!tokens) return Promise.reject(new Error('@blupinta/react: nobody is signed in'))
      refreshing ??= tokenKeeper({ ...options, tokens, onTokens: keep })().finally(() => {
        refreshing = null
      })
      return refreshing
    },
  }
}

/**
 * The person signed in to Blupinta in this browser: `tokens` (null when nobody is), `signIn()` and `signOut()`, and
 * `token` for `createClient`. The page at `redirectUri` finishes a sign-in as soon as it shows this hook
 */
export function useSignIn(options: SignInOptions) {
  let store = stores.get(options.clientId)
  if (!store) {
    store = createStore(options)
    stores.set(options.clientId, store)
  }
  const state = useSyncExternalStore(store.subscribe, store.get, store.get)
  const { signIn, signOut, token } = store
  return useMemo(() => ({ ...state, signIn, signOut, token }), [state, signIn, signOut, token])
}
