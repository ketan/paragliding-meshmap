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
  plugins: [typescript({})],
  cache: true,
  external: [
    'async-mqtt',
    'morgan-body',
    'cron',
    'commander',
    'compression',
    'connect-flash',
    'connect-typeorm',
    'cookie-parser',
    'crypto',
    'csrf-csrf',
    'debug',
    'dotenv-flow/config',
    'escape-html',
    'express-async-errors',
    'express-session',
    'express-static-gzip',
    'express',
    'file-type',
    'formidable',
    'fs',
    'glob',
    'lodash',
    'luxon',
    'morgan',
    'newrelic',
    'node-hgt',
    'node:child_process',
    'node:crypto',
    'nodemailer',
    'os',
    'p-queue',
    'p-retry',
    'passport-google-oauth20',
    'passport-google-one-tap',
    'passport-magic-login',
    'passport',
    'path',
    'pg-boss',
    'pg-connection-string',
    'pluralize',
    'protobufjs/minimal.js',
    'reflect-metadata',
    'response-time',
    'stream',
    'typeorm',
    'url',
    'uuid',
  ],
})
