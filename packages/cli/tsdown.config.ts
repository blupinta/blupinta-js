// The command as published, one file with its shebang, and its modules for whoever builds on them (the MCP server):
// the SDK and the keychain left dependencies
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    cli: 'src/cli.ts',
    context: 'src/context.ts',
    credentials: 'src/credentials.ts',
    'commands/account': 'src/commands/account.ts',
    'commands/homes': 'src/commands/homes.ts',
    'commands/projects': 'src/commands/projects.ts',
  },
  format: 'esm',
  dts: true,
  platform: 'node',
  fixedExtension: false,
  external: [/^@blupinta\//, '@napi-rs/keyring'],
})
