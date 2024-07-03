import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputDir = path.resolve(__dirname, 'dist')

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('webpack').Configuration} */
export default {
  mode: 'development',
  entry: './public/assets/js/index.ts',
  output: {
    path: outputDir,
    filename: isProduction ? '[name]-[contenthash].js' : '[name].js',
  },
  devServer: {
    // hmr: true,
    static: outputDir,
    liveReload: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash].css', chunkFilename: '[id]-[contenthash].css', ignoreOrder: true }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
              importLoaders: 2,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ejs)$/i,

        type: 'asset/inline',
      },
      {
        test: /\.(ejs)$/i,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
}
