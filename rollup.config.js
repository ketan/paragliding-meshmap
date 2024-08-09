import typescript from '@rollup/plugin-typescript'
import { globSync } from 'glob'
import path from 'path'
import { defineConfig } from 'rollup'
import { fileURLToPath } from 'url'

const inputs = Object.fromEntries(
  globSync('src/**/*.{ts,js,tsx}', { ignore: '**/*.d.ts' }).map((file) => [
    // This remove `src/` as well as the file extension from each
    // file, so e.g. src/nested/foo.js becomes nested/foo
    path.relative('src', file.slice(0, file.length - path.extname(file).length)),
    // This expands the relative paths to absolute paths, so e.g.
    // src/nested/foo becomes /project/src/nested/foo.js
    fileURLToPath(new URL(file, import.meta.url)),
  ])
)

export default defineConfig({
  input: inputs,
  output: {
    dir: './build',
    format: 'es',
    sourcemap: true,
    // chunkFileNames: '[name].js',
    preserveModules: true,
    preserveModulesRoot: 'src',
    // compact: true,
  },
  plugins: [
    typescript({
      tslib: './src/tslib.es6.js',
    }),
  ],
  cache: true,
  external: [
    'os',
    'typeorm',
    /lodash/,
    'pluralize',
    'reflect-metadata',
    'ts-parse-database-url',
    'glob',
    'async-mqtt',
    'body-parser',
    'commander',
    'crypto',
    'debug',
    'dotenv/config',
    'express',
    'luxon',
    'p-queue',
    'p-retry',
    'path',
    'protobufjs/minimal.js',
    'url',
    'compression',
  ],
})
