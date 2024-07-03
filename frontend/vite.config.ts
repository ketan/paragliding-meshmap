import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  // publicDir: `${__dirname}/public`,
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        'index': resolve(__dirname, `index.html`)
      },
    },
    // assetsInlineLimit: 1024 * 100, // 100KiB
  },
})
