// The package as published: each entry bundled into dist/ with its declarations, React and the SDK left dependencies
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { provider: 'src/provider.ts', hooks: 'src/hooks.ts', 'sign-in': 'src/useSignIn.ts' },
  format: 'esm',
  dts: true,
  platform: 'browser',
  external: ['react', 'react/jsx-runtime', /^@blupinta\//],
})
