// The server as published: the command with its shebang, and the server for whoever embeds it; dependencies left out
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { main: 'src/main.ts', server: 'src/server.ts' },
  format: 'esm',
  dts: true,
  platform: 'node',
  fixedExtension: false,
  external: [/^@blupinta\//, /^@modelcontextprotocol\//, 'zod'],
})
