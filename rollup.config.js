import commonjs from '@rollup/plugin-commonjs'
import html from '@rollup/plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
// import postcss from 'postcss'
import { defineConfig } from 'rollup'
import livereload from 'rollup-plugin-livereload'
import tailwindcss from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import imageInliner from 'postcss-url'
import path from 'path'
import scss from 'rollup-plugin-scss'
import AtImport from 'postcss-import'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  input: ['./public/assets/js/index.ts'],
  watch: {
    include: 'public/**/*.*',
  },
  output: [
    {
      dir: 'dist',
      format: 'iife',
      sourcemap: true,
      assetFileNames: isProduction ? 'assets/[name]-[hash][extname]' : 'assets/[name][extname]',
    },
  ],
  preserveEntrySignatures: false,

  plugins: [
    resolve({ browser: true }),

    commonjs({
      sourceMap: true,
    }),

    typescript({
      tsconfig: './public/tsconfig.json',
      outDir: 'dist/js',
    }),

    postcss({
      // extract: true,
      modules: false,
      autoModules: false,
      // modules: true,
      // autoModules: true,
      // namedExports: true,
      plugins: [tailwindcss(tailwindConfig), autoprefixer()],
    }),
    scss({
      name: 'index.css',
      processor: () =>
        postcss([
          tailwindcss(tailwindConfig),
          imageInliner(),
          autoprefixer({
            url: 'inline',
          }),
        ]),
    }),
    html({
      title: 'Paragliding Meshtastic Map',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          charset: 'utf-8',
        },
      ],
    }),
    copy({
      targets: [
        {
          src: ['static/*'],
          dest: 'public',
        },
        {
          src: ['assets/*'],
          dest: 'public',
        },
      ],
    }),

    livereload(),
  ],
})
