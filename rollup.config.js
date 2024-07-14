import typescript from '@rollup/plugin-typescript'
import path from 'path'
import { defineConfig } from 'rollup'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default defineConfig({
  input: ['./src/index.ts', './src/mqtt.ts'],
  output: {
    dir: './build',
    format: 'es',
    sourcemap: true,
    chunkFileNames: '[name].js',
    preserveModules: true,
    preserveModulesRoot: 'src',
    compact: true,
  },
  plugins: [typescript()],
  cache: true,
  external: [
    'async-mqtt',
    'body-parser',
    'commander',
    'crypto',
    'debug',
    'express',
    'luxon',
    'p-queue',
    'p-retry',
    'path',
    'pluralize',
    'reflect-metadata',
    'ts-parse-database-url',
    'typeorm',
    'url',
    /@buf\/meshtastic_protobufs\.bufbuild_es\/meshtastic\/.*/,
    /dotenv\/.*/,
    /lodash\/.*/,
  ],
})
