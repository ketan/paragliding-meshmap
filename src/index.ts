// do this first
import 'dotenv/config'

//
import { AppDataSource } from '#config/data-source'
import Node from '#entity/node'
import Position from '#entity/position'
import { webCLIParse } from '#helpers/cli'
import { mqttProcessor } from '#mqtt/main'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createDatabase } from 'typeorm-extension'
import { connString } from '#config/conn-string'
const cliOptions = webCLIParse()

await createDatabase({ options: connString })
await AppDataSource.initialize()
await AppDataSource.runMigrations({ transaction: 'each' })

if (cliOptions.mqtt) {
  mqttProcessor(cliOptions)
}

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = express()

app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (!isDevelopment) {
  app.use(express.static(`${__dirname}/public`))
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

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Express server has started on port ${port}. Open http://localhost:${port}/ to see results`)
