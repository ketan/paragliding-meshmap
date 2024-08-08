// do this first
import 'dotenv/config'

//
import { AppDataSource } from '#config/data-source'
import { webCLIParse } from '#helpers/cli'
import { BROADCAST_ADDR } from '#helpers/utils'
import { mqttProcessor } from '#mqtt/main'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { DateTime, Duration } from 'luxon'
import path from 'path'
import { fileURLToPath } from 'url'
import Node from '#entity/node'
import Position from '#entity/position'
import TextMessage from '#entity/text_message'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import NeighbourInfo from '#entity/neighbour_info'
import Traceroute from '#entity/traceroute'

const cliOptions = webCLIParse()

const db = await AppDataSource.initialize()

if (cliOptions.mqtt) {
  mqttProcessor(db, cliOptions)
}

// @ts-expect-error we're patching
BigInt.prototype.toJSON = function () {
  return Number(this.toString())
}

// @ts-expect-error we're patching
Prisma.Decimal.prototype.toJSON = function () {
  return Number(this.toString())
}

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = express()

app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDevelopment) {
  app.use((await import('compression')).default())
}

function parseSinceParam(req: Request, defaultValue: string = `P30D`) {
  const since = typeof req.query.since === 'string' ? req.query.since : defaultValue
  return DateTime.now().minus(Duration.fromISO(since)).toJSDate()
}

function parseNodeIdParam(req: Request) {
  const nodeIdQs = req.query.nodeId

  if (typeof nodeIdQs !== 'string') {
    return
  }

  const nodeId = Number(nodeIdQs)
  if (!isNaN(nodeId)) {
    return nodeId
  }
}

app.get('/api/nodes', async (_req: Request, res: Response) => {
  const allNodes = await Node.find(db)
  res.setHeader('cache-control', 'public,max-age=60')
  res.json(allNodes)
})

app.get('/api/positions/:nodeId', async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const since = parseSinceParam(req)
  const positions = await Position.forNode(db, nodeId, since)

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(positions)
})

app.get(`/api/node/:nodeId`, async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const node = Node.findOne(db, { where: { nodeId } })
  if (node) {
    res.setHeader('cache-control', 'public,max-age=60')
    res.json(node)
  } else {
    res.status(404).json({
      message: `Node with ID ${nodeId} not found!`,
    })
  }
})

app.get('/api/node/:nodeId/sent-messages', async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  function parseTo(to: any): number | undefined {
    if (to === 'all') {
      return
    } else if (isNaN(Number(to))) {
      return BROADCAST_ADDR
    } else {
      return Number(to)
    }
  }

  const outgoingMessages = await TextMessage.outgoing(db, nodeId, parseTo(req.query.to), parseSinceParam(req))

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(outgoingMessages)
})

app.get('/api/node/:nodeId/device-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const deviceMetrics = DeviceMetric.forNode(db, nodeId, parseSinceParam(req))

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(deviceMetrics)
})

app.get('/api/node/:nodeId/environment-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const since = parseSinceParam(req)

  const environmentMetrics = await EnvironmentMetric.forNode(db, nodeId, since)
  res.setHeader('cache-control', 'public,max-age=60')
  res.json(environmentMetrics)
})

app.get('/api/node/:nodeId/neighbour-infos', async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const neighbours = await NeighbourInfo.forNode(db, nodeId, parseSinceParam(req))

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(neighbours)
})

app.get('/api/node/:nodeId/trace-routes', async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const traceRoutes = await Traceroute.forNode(db, nodeId, parseSinceParam(req))

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(traceRoutes)
})

app.get(`/api/node/:nodeId/positions`, async (req, res) => {
  const nodeId = parseNodeIdParam(req)
  if (!nodeId) {
    return res.status(400).json({
      message: `Invalid node ID ${req.query.nodeId}`,
    })
  }

  const positions = await Position.forNode(db, nodeId, parseSinceParam(req))

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(positions)
})

app.get('/api/hardware-models', async function (_req: Request, res: Response) {
  const hardwareModels = await Node.hardwareModels(db)

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(hardwareModels)
})

if (!isDevelopment) {
  app.use(express.static(`${__dirname}/public`))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Express server has started on port ${port}. Open http://localhost:${port}/ to see results`)
