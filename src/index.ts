import { AppDataSource } from '#config/data-source'
import Node from '#entity/node'
import Position from '#entity/position'
import bodyParser from 'body-parser'

import express, { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

await AppDataSource.initialize()

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = express()

app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (!isDevelopment) {
  app.use(express.static(`${__dirname}/../frontend/dist`))
}

app.get('/api/nodes', async (_req: Request, res: Response) => {
  res.setHeader('cache-control', 'max-age=60')
  res.json(await AppDataSource.manager.find(Node))
})

app.get('/api/positions/:nodeId', async (req, res) => {
  res.setHeader('cache-control', 'max-age=60')
  const nodeId = req.params.nodeId
  const positions = await Position.positionsForNode(nodeId)
  if (positions) {
    res.json(positions)
  } else {
    res.status(404).json({
      message: `Node with ID ${nodeId} not found!`,
    })
  }
})

app.get('/api/hardware-models', async function (_req: Request, res: Response) {
  const models = await Node.hardwareModels(AppDataSource.manager)
  res.setHeader('cache-control', 'max-age=60')
  res.json(models)
})

app.listen(3333)

console.log('Express server has started on port 3333. Open http://localhost:3333/ to see results')
