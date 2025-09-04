import { transform } from '@svgr/core'
import jsxPlugin from '@svgr/plugin-jsx'
import svgoPlugin from '@svgr/plugin-svgo'
import react from '@vitejs/plugin-react-swc'
import * as child from 'child_process'
import { readFile } from 'fs/promises'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, Plugin, transformWithEsbuild } from 'vite'
import Inspect from 'vite-plugin-inspect'
import viteCompression from 'vite-plugin-compression'
import { runtimeEnvScript } from 'vite-runtime-env-script-plugin'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commitHash = process.env.GIT_SHA || child.execSync('git rev-parse --short HEAD').toString().trim()

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    runtimeEnvScript({
      variables: ['GOOGLE_CLIENT_ID'],
    }),
    react(),
    svgToReact(),
    Inspect({
      build: true,
      outputDir: `${__dirname}/../tmp/vite-inspect`,
    }),
    viteCompression(),
  ],

  define: {
    __GIT_SHA__: JSON.stringify(commitHash),
    __TRACKER_API_BASE_URL__: JSON.stringify(''),
  },

  root: __dirname,
  cacheDir: `${__dirname}/../tmp/vite-cache`,

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
      input: [resolve(__dirname, `index.html`), resolve(__dirname, `stats.html`), resolve(__dirname, `users.html`)],
    },
  },

  server: {
    allowedHosts: true,
    proxy: {
      '/api': `http://localhost:3333/`,
      '/auth': `http://localhost:3333/`,
    },
  },
})
