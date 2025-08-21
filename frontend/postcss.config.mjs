import postcssUrl from 'postcss-url'
import tailwindcss from '@tailwindcss/postcss'
/** @type {import('postcss-load-config').Config} */
export default {
  plugins: [
    postcssUrl({
      url: 'inline',
    }),
    tailwindcss(),
  ],
}
