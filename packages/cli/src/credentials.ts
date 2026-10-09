// Where the CLI keeps the person's tokens: the system's keychain (macOS Keychain, Windows Credential Manager, the
// Secret Service on Linux), one entry per sign-in server; never a file. On a machine without one (a CI runner),
// `BLUPINTA_TOKEN` gives an access token instead, used as it is.

import type { Tokens } from '@blupinta/sdk/auth'
import { BlupintaError } from '@blupinta/sdk/errors'
import { Entry } from '@napi-rs/keyring'
import type { CredentialStore } from './context'

const SERVICE = 'blupinta'

/** The tokens of the sign-in at `authOrigin`, in the system's keychain */
export function keychainStore(authOrigin: string): CredentialStore {
  const entry = () => {
    try {
      return new Entry(SERVICE, authOrigin)
    } catch (e) {
      throw new BlupintaError(0, 'network', {
        problems: [`no keychain on this machine (${String(e)}): set BLUPINTA_TOKEN instead`],
      })
    }
  }
  return {
    load() {
      const text = entry().getPassword()
      return text ? (JSON.parse(text) as Tokens) : null
    },
    save: (tokens) => entry().setPassword(JSON.stringify(tokens)),
    clear: () => void entry().deletePassword(),
  }
}

/** An access token given by the environment: used until it expires, never refreshed nor kept */
export function tokenStore(accessToken: string): CredentialStore {
  const tokens: Tokens = {
    accessToken,
    refreshToken: null,
    expiresAt: Number.MAX_SAFE_INTEGER,
    scope: '',
    idToken: null,
  }
  return { load: () => tokens, save: () => {}, clear: () => {} }
}
