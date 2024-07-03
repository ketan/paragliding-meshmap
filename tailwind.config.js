import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${__dirname}/frontend/index.html`, `${__dirname}/frontend/src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {},
  },
  plugins: [],
}
