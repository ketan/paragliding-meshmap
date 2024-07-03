import bodyParser from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source.js'
import Node from './entity/node.js'
import ViteExpress from 'vite-express'

await AppDataSource.initialize()

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = express()
if (!isDevelopment) {
  app.use(compression())
}

app.use(bodyParser.json())

if (!isDevelopment) {
  app.use(express.static('dist'))
}

app.get('/api/nodes', async function (_req: Request, res: Response) {
  res.json(await AppDataSource.manager.find(Node))
})

app.get('/api/hardware-models', async function (_req: Request, res: Response) {
  res.json(await Node.hardwareModels(AppDataSource.manager))
})

const server = app.listen(3333)

if (!isDevelopment) {
  ViteExpress.config({
    inlineViteConfig: {
      base: '/',
      build: { outDir: 'frontend/dist' },
    },
  })
}

ViteExpress.bind(app, server)
console.log('Express server has started on port 3333. Open http://localhost:3333/ to see results')
