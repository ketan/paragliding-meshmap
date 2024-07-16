import react from '@vitejs/plugin-react'
import * as child from 'child_process'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const commitHash = child.execSync('git rev-parse --short HEAD').toString()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()],

  define: {
    __GIT_SHA__: JSON.stringify(commitHash),
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
      input: {
        index: resolve(__dirname, `index.html`),
      },
    },
  },

  server: {
    proxy: {
      '/api': `http://localhost:3333/`,
    },
  },
})
