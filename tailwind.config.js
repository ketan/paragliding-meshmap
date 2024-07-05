import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// because we're symlinked in a few places
const frontendDir = __dirname.endsWith('/frontend') ? frontendDir : `${__dirname}/frontend`

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${frontendDir}/index.html`, `${frontendDir}/src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {},
  },
  plugins: [],
}
