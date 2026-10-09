// The package as published: its types bundled into dist/, with their declarations
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { home: 'src/generated/home.ts' },
  format: 'esm',
  dts: true,
  platform: 'neutral',
})
