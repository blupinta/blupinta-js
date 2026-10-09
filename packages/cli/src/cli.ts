#!/usr/bin/env node
// `blupinta`, the command line of Blupinta's public API (the guide's CLI page): each command a function of
// src/commands, given the context this file builds from the arguments and the environment. `--json` makes it speak
// JSON for scripts and agents; a refusal ends it with 1 and the API's reason.

import { parseArgs } from 'node:util'
import { AUTH_ORIGIN } from '@blupinta/sdk/auth'
import { isBlupintaError } from '@blupinta/sdk/errors'
import { login, logout, whoami } from './commands/account'
import { check, watch } from './commands/homes'
import { exportProject, projects, pull, push } from './commands/projects'
import type { Context, Output } from './context'
import { keychainStore, tokenStore } from './credentials'

const HELP = `blupinta: Blupinta's public API from the command line

  blupinta login                       connect the CLI (a code typed in your browser)
  blupinta logout                      forget the tokens on this computer
  blupinta whoami                      who is signed in
  blupinta projects                    the projects you gave the CLI
  blupinta pull <project> [--revision n] [--dir folder]
                                       the home and its files into a folder
  blupinta push [--dir folder] -m "…"  the folder's home saved as a new version
  blupinta check [home.json]           Blupinta's checks on a home file
  blupinta watch <project> [--dir folder] [--exec command]
                                       follow the saved versions
  blupinta export <project> [--out file.zip]
                                       every version as a zip

  --json   speak JSON (scripts, agents)
  BLUPINTA_TOKEN  an access token to use instead of signing in (CI)
  BLUPINTA_API, BLUPINTA_AUTH  another server than Blupinta's
`

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    json: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
    revision: { type: 'string' },
    dir: { type: 'string' },
    out: { type: 'string' },
    exec: { type: 'string' },
    message: { type: 'string', short: 'm' },
  },
})

const isJson = values.json ?? false
const out: Output = {
  isJson,
  line: (text) => {
    if (!isJson) console.log(text)
  },
  result: (value) => {
    if (isJson) console.log(JSON.stringify(value))
  },
}
const authOrigin = process.env.BLUPINTA_AUTH ?? AUTH_ORIGIN
const apiOrigin = process.env.BLUPINTA_API
const context: Context = {
  auth: { authOrigin, ...(apiOrigin && { resource: `${apiOrigin}/v1` }) },
  apiOrigin,
  credentials: process.env.BLUPINTA_TOKEN
    ? tokenStore(process.env.BLUPINTA_TOKEN)
    : keychainStore(authOrigin),
  out,
  cwd: process.cwd(),
}

async function main(command: string | undefined, argument: string | undefined) {
  const revision = values.revision ? Number(values.revision) : undefined
  switch (command) {
    case 'login':
      return login(context)
    case 'logout':
      return logout(context)
    case 'whoami':
      return whoami(context)
    case 'projects':
      return projects(context)
    case 'pull':
      return pull(context, argument, { revision, dir: values.dir })
    case 'push':
      return push(context, { message: values.message, dir: values.dir })
    case 'check':
      if (!(await check(context, argument))) process.exitCode = 1
      return
    case 'watch': {
      const stopping = new AbortController()
      process.once('SIGINT', () => stopping.abort())
      return watch(context, argument, { dir: values.dir, exec: values.exec, signal: stopping.signal })
    }
    case 'export':
      return exportProject(context, argument, { out: values.out })
    default:
      console.log(HELP)
      if (command && !values.help) process.exitCode = 1
  }
}

main(positionals[0], positionals[1]).catch((e: unknown) => {
  const reason = isBlupintaError(e)
    ? e.problems.join('; ') || e.code
    : e instanceof Error
      ? e.message
      : String(e)
  if (isJson) console.log(JSON.stringify({ error: isBlupintaError(e) ? e.code : 'failed', reason }))
  else console.error(`blupinta: ${reason}`)
  process.exitCode = 1
})
