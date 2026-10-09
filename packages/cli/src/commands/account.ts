// Signing in and out: `login` connects the CLI with the device flow (a code typed in the browser, the projects chosen
// there), `logout` forgets the tokens, `whoami` says who is signed in, from the ID token kept at sign-in.

import { startDeviceSignIn } from '@blupinta/sdk/auth'
import { CLI_CLIENT_ID, CLI_SCOPE, type Context } from '../context'

/** The claims of an ID token, read without checking it: it came straight from the sign-in, over HTTPS */
function claimsOf(idToken: string | null): { email?: string; name?: string; sub?: string } {
  const payload = idToken?.split('.')[1]
  if (!payload) return {}
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return {}
  }
}

export async function login(context: Context) {
  const signIn = await startDeviceSignIn({ ...context.auth, clientId: CLI_CLIENT_ID, scope: CLI_SCOPE })
  context.out.line(`Open ${signIn.verificationUri} and type the code ${signIn.userCode}`)
  context.out.line('Waiting for you to allow it…')
  const tokens = await signIn.tokens()
  await context.credentials.save(tokens)
  const who = claimsOf(tokens.idToken)
  context.out.line(`Signed in as ${who.email ?? who.name ?? 'you'}`)
  context.out.result({ email: who.email ?? null, name: who.name ?? null })
}

export async function logout(context: Context) {
  await context.credentials.clear()
  context.out.line('Signed out: the tokens are forgotten on this computer')
  context.out.result({ signedOut: true })
}

export async function whoami(context: Context) {
  const tokens = await context.credentials.load()
  if (!tokens) {
    context.out.line('Not signed in: run `blupinta login`')
    context.out.result({ signedIn: false })
    return
  }
  const who = claimsOf(tokens.idToken)
  context.out.line(who.name ? `${who.name} <${who.email}>` : (who.email ?? 'signed in'))
  context.out.result({ signedIn: true, email: who.email ?? null, name: who.name ?? null })
}
