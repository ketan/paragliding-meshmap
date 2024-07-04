import bodyParser from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import { fileURLToPath } from 'url'
import ViteExpress from 'vite-express'
import { AppDataSource } from './data-source.js'
import Node from './entity/node.js'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await AppDataSource.initialize()

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = express()
// if (!isDevelopment) {
app.use(compression())
// }

app.use(bodyParser.json())

if (!isDevelopment) {
  app.use(express.static('dist'))
}

app.get('/api/nodes', async function (_req: Request, res: Response) {
  res.setHeader('cache-control', 'max-age=60')
  res.json(await AppDataSource.manager.find(Node))
})

app.get('/api/hardware-models', async function (_req: Request, res: Response) {
  const models = await Node.hardwareModels(AppDataSource.manager)
  res.setHeader('cache-control', 'max-age=60')
  res.json(models)
})

const server = app.listen(3333)

if (isDevelopment) {
  ViteExpress.config({
    viteConfigFile: `${__dirname}/../frontend/vite.config.ts`,
    verbosity: ViteExpress.Verbosity.Normal,
  })
} else {
  ViteExpress.config({
    inlineViteConfig: {
      base: '/',
      build: { outDir: 'frontend/dist' },
    },
  })
}

ViteExpress.bind(app, server)
console.log('Express server has started on port 3333. Open http://localhost:3333/ to see results')
