import preact from '@preact/preset-vite'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  root: __dirname,
  // publicDir: `${__dirname}/public`,
  build: {
    sourcemap: true,
    assetsInlineLimit: 1024 * 1024, // 1024KiB
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
})
