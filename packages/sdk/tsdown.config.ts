// The package as published: each entry bundled into dist/ with its declarations, `@blupinta/home` left a dependency
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    client: 'src/client.ts',
    auth: 'src/auth.ts',
    errors: 'src/errors.ts',
    watch: 'src/watch.ts',
    webhooks: 'src/webhooks.ts',
    types: 'src/generated/openapi.ts',
  },
  format: 'esm',
  dts: true,
  platform: 'neutral',
  external: ['@blupinta/home'],
})
