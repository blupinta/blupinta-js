// Signing a person in at auth.blupinta.app (OAuth 2.1, OpenID Connect) to get the tokens `/v1` takes: the device flow
// for a screen without a keyboard (the person types a code on their phone), the authorization code with PKCE for an app
// with a browser, and refreshing a token before it expires. Only requests to the sign-in's own endpoints: no secret is
// ever held, a public client proves itself with PKCE.

import { BlupintaError } from './errors'

export const AUTH_ORIGIN = 'https://auth.blupinta.app'
/** The resource `/v1`'s tokens are for (RFC 8707) */
export const API_RESOURCE = 'https://api.blupinta.app/v1'
/** Blupinta's own client for a device that connects without registering: the person names it at consent */
export const DEVICE_CLIENT_ID = 'device'

/** Where the sign-in is, and how requests reach it */
export type AuthOptions = {
  /** auth.blupinta.app by default */
  authOrigin?: string
  /** the API's resource the tokens are for; `/v1` by default */
  resource?: string
  fetch?: typeof fetch
}

/** What the sign-in gives the app */
export type Tokens = {
  accessToken: string
  /** when the app asked `offline_access`: how it gets the next access token without the person */
  refreshToken: string | null
  /** when the access token stops working, in milliseconds since 1970 */
  expiresAt: number
  scope: string
  /** who signed in, as OpenID Connect's ID token says it (its claims: `email`, `name`), when `openid` was asked */
  idToken: string | null
}

type TokenAnswer = {
  access_token?: string
  refresh_token?: string
  id_token?: string
  expires_in?: number
  scope?: string
  error?: string
  error_description?: string
  interval?: number
}

const endpoint = (options: AuthOptions, path: string) => new URL(path, options.authOrigin ?? AUTH_ORIGIN)

/** A form posted to one of the sign-in's endpoints, its JSON answer read whatever its status */
async function post(options: AuthOptions, path: string, fields: Record<string, string>) {
  const send = options.fetch ?? globalThis.fetch
  let response: Response
  try {
    response = await send(endpoint(options, path), {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
      body: new URLSearchParams(fields).toString(),
    })
  } catch (e) {
    throw new BlupintaError(0, 'network', { problems: [e instanceof Error ? e.message : String(e)] })
  }
  return { status: response.status, answer: (await response.json().catch(() => ({}))) as TokenAnswer }
}

/** An OAuth refusal as the SDK's error: its OAuth code and description among the problems */
const refusal = (status: number, answer: TokenAnswer) =>
  new BlupintaError(status, status === 401 ? 'unauthenticated' : 'forbidden', {
    problems: [[answer.error, answer.error_description].filter(Boolean).join(': ')],
  })

function tokensOf(answer: TokenAnswer, now = Date.now()): Tokens {
  if (!answer.access_token) throw new BlupintaError(500, 'server_error', { problems: ['no access token'] })
  return {
    accessToken: answer.access_token,
    refreshToken: answer.refresh_token ?? null,
    expiresAt: now + (answer.expires_in ?? 0) * 1000,
    scope: answer.scope ?? '',
    idToken: answer.id_token ?? null,
  }
}

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(signal.reason)
    })
  })

/** A device being connected: what to show the person, and how to wait for them */
export type DeviceSignIn = {
  /** the code the person types (`BCDF-GHJK`) */
  userCode: string
  /** where they type it */
  verificationUri: string
  /** the same, the code already in it: for a QR code */
  verificationUriComplete: string
  /** when the code stops working, in milliseconds since 1970 */
  expiresAt: number
  /** Waits until the person allows the device (its tokens), refuses, or the code expires (a `BlupintaError`) */
  tokens(options?: { signal?: AbortSignal }): Promise<Tokens>
}

/**
 * Starts connecting a device with the device flow (RFC 8628): show `userCode` and `verificationUri`, then wait on
 * `tokens()`. `scope` is what the app asks, `openid` and the API's scopes (`projects:read`…); `offline_access` keeps it
 * connected
 */
export async function startDeviceSignIn(
  options: AuthOptions & { scope: string; clientId?: string },
): Promise<DeviceSignIn> {
  const clientId = options.clientId ?? DEVICE_CLIENT_ID
  const { status, answer } = await post(options, '/oidc/device/auth', {
    client_id: clientId,
    scope: options.scope,
    resource: options.resource ?? API_RESOURCE,
  })
  const asked = answer as TokenAnswer & {
    device_code?: string
    user_code?: string
    verification_uri?: string
    verification_uri_complete?: string
    expires_in?: number
  }
  if (status !== 200 || !asked.device_code || !asked.user_code) throw refusal(status, answer)
  const deviceCode = asked.device_code
  const expiresAt = Date.now() + (asked.expires_in ?? 600) * 1000
  return {
    userCode: asked.user_code,
    verificationUri: asked.verification_uri ?? endpoint(options, '/device').href,
    verificationUriComplete: asked.verification_uri_complete ?? asked.verification_uri ?? '',
    expiresAt,
    async tokens({ signal } = {}) {
      let interval = (asked.interval ?? 5) * 1000
      while (Date.now() < expiresAt) {
        await wait(interval, signal)
        const polled = await post(options, '/oidc/token', {
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
          device_code: deviceCode,
          client_id: clientId,
        })
        if (polled.status === 200) return tokensOf(polled.answer)
        if (polled.answer.error === 'authorization_pending') continue
        // asked to wait longer between tries (RFC 8628 §3.5)
        if (polled.answer.error === 'slow_down') interval += 5000
        else throw refusal(polled.status, polled.answer)
      }
      throw new BlupintaError(400, 'forbidden', { problems: ['expired_token: the code expired'] })
    },
  }
}

const base64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

const randomText = () => base64Url(globalThis.crypto.getRandomValues(new Uint8Array(32)))

/** A browser sign-in begun: where to send the person, and what to keep until they come back */
export type BrowserSignIn = {
  url: string
  /** the PKCE verifier, kept (in the session's storage) until `finishBrowserSignIn` */
  verifier: string
  /** the state sent, checked when the person comes back */
  state: string
}

/**
 * Begins signing a person in from an app with a browser: the authorization code with PKCE (S256). Send them to `url`;
 * they come back to `redirectUri` (one the app registered) with a code `finishBrowserSignIn` turns into tokens
 */
export async function startBrowserSignIn(
  options: AuthOptions & { clientId: string; redirectUri: string; scope: string },
): Promise<BrowserSignIn> {
  const verifier = randomText()
  const state = randomText()
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
  const url = endpoint(options, '/oidc/authorize')
  for (const [name, value] of Object.entries({
    client_id: options.clientId,
    response_type: 'code',
    redirect_uri: options.redirectUri,
    scope: options.scope,
    resource: options.resource ?? API_RESOURCE,
    state,
    code_challenge: base64Url(new Uint8Array(digest)),
    code_challenge_method: 'S256',
  }))
    url.searchParams.set(name, value)
  return { url: url.href, verifier, state }
}

/** Ends a browser sign-in at the address the person came back to: the tokens, or why there are none */
export async function finishBrowserSignIn(
  options: AuthOptions & {
    clientId: string
    redirectUri: string
    /** the address the person came back to, with its `code` and `state` */
    callbackUrl: string
    /** what `startBrowserSignIn` gave */
    started: Pick<BrowserSignIn, 'verifier' | 'state'>
  },
): Promise<Tokens> {
  const back = new URL(options.callbackUrl)
  const error = back.searchParams.get('error')
  if (error)
    throw refusal(403, { error, error_description: back.searchParams.get('error_description') ?? '' })
  if (back.searchParams.get('state') !== options.started.state)
    throw new BlupintaError(400, 'forbidden', { problems: ['the state came back different: start again'] })
  const { status, answer } = await post(options, '/oidc/token', {
    grant_type: 'authorization_code',
    code: back.searchParams.get('code') ?? '',
    redirect_uri: options.redirectUri,
    client_id: options.clientId,
    code_verifier: options.started.verifier,
  })
  if (status !== 200) throw refusal(status, answer)
  return tokensOf(answer)
}

/** New tokens from a refresh token, for an app that asked `offline_access` */
export async function refreshTokens(
  options: AuthOptions & { clientId: string; refreshToken: string },
): Promise<Tokens> {
  const { status, answer } = await post(options, '/oidc/token', {
    grant_type: 'refresh_token',
    refresh_token: options.refreshToken,
    client_id: options.clientId,
  })
  if (status !== 200) throw refusal(status, answer)
  const tokens = tokensOf(answer)
  // a refresh token may be given once: the old one goes on when none comes back
  return { ...tokens, refreshToken: tokens.refreshToken ?? options.refreshToken }
}

/**
 * The client's `token`: the access token while it lasts, refreshed a minute before it expires, the new tokens handed
 * to `onTokens` to keep (they replace the old ones, a refresh token included)
 */
export function tokenKeeper(
  options: AuthOptions & {
    clientId: string
    tokens: Tokens
    onTokens?: (tokens: Tokens) => void | Promise<void>
  },
) {
  let tokens = options.tokens
  let refreshing: Promise<Tokens> | null = null
  return async () => {
    if (tokens.expiresAt - Date.now() > 60_000) return tokens.accessToken
    const refreshToken = tokens.refreshToken
    if (!refreshToken) return tokens.accessToken
    // one refresh for every request waiting on it, the new tokens kept once
    refreshing ??= refreshTokens({ ...options, refreshToken })
      .then(async (fresh) => {
        tokens = fresh
        await options.onTokens?.(fresh)
        return fresh
      })
      .finally(() => {
        refreshing = null
      })
    return (await refreshing).accessToken
  }
}
