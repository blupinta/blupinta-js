// What every command of the CLI works with: where the API and the sign-in are, the person's tokens and where they are
// kept, the folder it works in, and how it speaks (for people, or JSON for scripts and agents).

import { createClient } from '@blupinta/sdk'
import { type AuthOptions, type Tokens, tokenKeeper } from '@blupinta/sdk/auth'
import { BlupintaError } from '@blupinta/sdk/errors'

/** The CLI's own client at auth.blupinta.app: Blupinta's, public, the device flow (docs: the CLI) */
export const CLI_CLIENT_ID = 'cli'

/** What the CLI asks to be allowed: reading and writing the projects the person chooses */
export const CLI_SCOPE = 'openid email profile offline_access projects:read projects:write projects:create'

/** Where the person's tokens are kept between runs */
export type CredentialStore = {
  load(): Tokens | null | Promise<Tokens | null>
  save(tokens: Tokens): void | Promise<void>
  clear(): void | Promise<void>
}

/** How a command speaks: lines for people, or one JSON value for a script */
export type Output = {
  isJson: boolean
  /** a line for people; nothing in JSON mode */
  line(text: string): void
  /** the command's result: JSON in JSON mode, else nothing (its lines said it) */
  result(value: unknown): void
}

export type Context = {
  auth: AuthOptions
  /** where the API is; Blupinta's by default */
  apiOrigin?: string
  credentials: CredentialStore
  out: Output
  /** the folder relative paths are read from */
  cwd: string
  fetch?: typeof fetch
}

/** The API's client, as the person signed in with `blupinta login` (its token refreshed and kept again) */
export async function clientOf(context: Context) {
  const tokens = await context.credentials.load()
  if (!tokens)
    throw new BlupintaError(401, 'unauthenticated', { problems: ['not signed in: run `blupinta login`'] })
  return createClient({
    baseUrl: context.apiOrigin,
    fetch: context.fetch,
    token: tokenKeeper({
      ...context.auth,
      clientId: CLI_CLIENT_ID,
      tokens,
      onTokens: (fresh) => context.credentials.save(fresh),
    }),
  })
}
