#!/usr/bin/env node
// `blupinta-mcp`: the MCP server on standard input and output, for an agent to start. It reads as the person signed in
// with `blupinta login` (the CLI's tokens, in the system's keychain), or with `BLUPINTA_TOKEN`; `BLUPINTA_API` and
// `BLUPINTA_AUTH` name another server than Blupinta's.

import { clientOf } from '@blupinta/cli/context'
import { keychainStore, tokenStore } from '@blupinta/cli/credentials'
import { AUTH_ORIGIN } from '@blupinta/sdk/auth'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createBlupintaMcp } from './server'

const VERSION = '0.1.0'

const authOrigin = process.env.BLUPINTA_AUTH ?? AUTH_ORIGIN
const apiOrigin = process.env.BLUPINTA_API
const client = await clientOf({
  auth: { authOrigin, ...(apiOrigin && { resource: `${apiOrigin}/v1` }) },
  apiOrigin,
  credentials: process.env.BLUPINTA_TOKEN
    ? tokenStore(process.env.BLUPINTA_TOKEN)
    : keychainStore(authOrigin),
  // standard output is the protocol's: nothing else is written there
  out: { isJson: true, line: () => {}, result: () => {} },
  cwd: process.cwd(),
}).catch((e: unknown) => {
  console.error(`blupinta-mcp: ${e instanceof Error ? e.message : String(e)}`)
  process.exit(1)
})

await createBlupintaMcp(client, VERSION).connect(new StdioServerTransport())
