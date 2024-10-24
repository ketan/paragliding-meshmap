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
    'async-mqtt',
    'child_process',
    'commander',
    'compression',
    'connect-typeorm',
    'cookie-parser',
    'crypto',
    'csrf-csrf',
    'debug',
    'dotenv-flow/config',
    'escape-html',
    'express',
    'express-async-errors',
    'express-session',
    'express-static-gzip',
    'fs',
    'glob',
    'lodash',
    'luxon',
    'morgan',
    'newrelic',
    'node-hgt',
    'node:crypto',
    'os',
    'p-queue',
    'p-retry',
    'path',
    'pg-boss',
    'pluralize',
    'protobufjs/minimal.js',
    'reflect-metadata',
    'response-time',
    'ts-parse-database-url',
    'typeorm',
    'url',
    'uuid',
  ],
})
