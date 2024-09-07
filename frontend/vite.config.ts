import { transform } from '@svgr/core'
import jsxPlugin from '@svgr/plugin-jsx'
import svgoPlugin from '@svgr/plugin-svgo'
import react from '@vitejs/plugin-react'
import * as child from 'child_process'
import { writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { globSync } from 'glob'
import _ from 'lodash'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, Plugin, transformWithEsbuild } from 'vite'
import injectHTML from 'vite-plugin-html-inject'
import Inspect from 'vite-plugin-inspect'
import viteCompression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commitHash = process.env.GIT_SHA || child.execSync('git rev-parse --short HEAD').toString()

interface SVGToReactOptions {}

function svgToReact(_options?: SVGToReactOptions): Plugin {
  function shouldProcessPath(path: string) {
    return path.endsWith('.svg')
  }

  return {
    name: 'svg-to-react-component',
    enforce: 'pre',

    async transform(code, id) {
      const [path, query] = id.split('?', 2)

      if (!shouldProcessPath(path)) {
        return
      }

      if (query === 'component') {
        const svg = await readFile(path, 'utf-8')

        const svgrPlugins = [svgoPlugin, jsxPlugin]

        const svgrCode = await transform(
          svg,
          {
            svgo: true,
          },
          {
            filePath: id,
            caller: {
              previousExport: null,
              defaultPlugins: svgrPlugins,
            },
          }
        )

        return await transformWithEsbuild(svgrCode, id, {
          loader: 'jsx',
        })
      }
    },
  }
}

function defineIconConstants(): Plugin {
  return {
    name: 'define-icon-constants',
    apply() {
      return true
    },
    enforce: 'pre',
    closeBundle() {
      const images = './src/assets/images/**/*.svg'

      const lines = ['// This file is generated by vite.config.ts']
      globSync(images).map((file) => {
        const name = path.basename(file, '.svg')
        const constant = `${_.upperFirst(_.camelCase(_.snakeCase(name)))}Icon`
        lines.push(`export { default as ${constant} } from '../../../../${file}?component'`)
      })
      lines.push('')

      const content = lines.join('\n')
      const target = './src/entrypoints/js/utils/icon-constants.ts'
      console.log(`Writing to ${target}`)
      writeFileSync(target, content)
    },
  } as Plugin
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    legacy({
      targets: ['last 2 versions and not dead, > 0.3%, Firefox ESR'],
      modernPolyfills: true,
    }),
    defineIconConstants(),
    react(),
    svgToReact(),
    injectHTML(),
    Inspect(),
    viteCompression(),
  ],

  define: {
    __GIT_SHA__: JSON.stringify(commitHash),
    __TRACKER_API_BASE_URL__: JSON.stringify('https://tracker.bircom.in'),
  },

  root: __dirname,
  build: {
    sourcemap: true,
    // assetsInlineLimit: 1024 * 1024, // 1024KiB
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
      input: [resolve(__dirname, `index.html`)],
    },
  },

  server: {
    proxy: {
      '/api': `https://tracker.bircom.in/api/`,
    },
  },
})
