// do this first
import 'newrelic'
// then dotenv
import 'dotenv-flow/config'

//
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import NeighbourInfo from '#entity/neighbour_info'
import Node from '#entity/node'
import Position from '#entity/position'
import TextMessage from '#entity/text_message'
import Traceroute from '#entity/traceroute'
import { webCLIParse } from '#helpers/cli'
import { BROADCAST_ADDR } from '#helpers/utils'
import { mqttProcessor } from '#mqtt/main'
import { DateTime, Duration } from 'luxon'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { NextFunction, Request, Response } from 'express'
import expressStaticGzip from 'express-static-gzip'
import responseTime from 'response-time'
import 'express-async-errors'
import { AppDataSource } from '#config/data-source'
import MapReport from '#entity/map_report'
import _ from 'lodash'
import { meshtastic } from './gen/meshtastic-protobufs.js'
import { createDeviceProfile } from '#helpers/create-device-profile'

const cliOptions = webCLIParse()

const db = await AppDataSource.initialize()

await AppDataSource.runMigrations({
  transaction: 'each',
})

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = express()
app.use(responseTime())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDevelopment) {
  app.use((await import('compression')).default())
}

function parseSinceParam(req: Request, defaultValue: string = `P30D`) {
  const since = typeof req.query.since === 'string' ? req.query.since : defaultValue
  return DateTime.now().minus(Duration.fromISO(since)).toJSDate()
}

class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function parseNodeIdParam(req: Request) {
  const nodeIdParam = req.params.nodeId

  const nodeId = Number(nodeIdParam)
  if (!isNaN(nodeId)) {
    return nodeId
  }

  throw new HttpError(400, `Invalid node ID ${nodeIdParam}`)
}

app.get('/api/nodes', async (_req, res) => {
  const allNodes = await Node.find(db)

  res.header('cache-control', 'public,max-age=60')
  res.json(allNodes)
})

app.get('/api/node/:nodeId/positions', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const [positions, mapReports] = await Promise.all([
    Position.forNode(db, nodeId, parseSinceParam(req, `PT12H`)),
    MapReport.forNode(db, nodeId, parseSinceParam(req, `PT12H`)),
  ])

  const response = [...positions, ...mapReports].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  res.header('cache-control', 'public,max-age=60')
  res.json(response)
})

app.get(`/api/node/:nodeId`, async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const node = await Node.findOne(db, { where: { nodeId } })
  if (node) {
    res.header('cache-control', 'public,max-age=60')
    res.json(node)
  } else {
    res.status(404).json({
      message: `Node with ID ${nodeId} not found!`,
    })
  }
})

app.get('/api/node/:nodeId/sent-messages', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  function parseTo(to: unknown): number | undefined {
    if (to === 'all') {
      return
    } else if (isNaN(Number(to))) {
      return BROADCAST_ADDR
    } else {
      return Number(to)
    }
  }

  const outgoingMessages = await TextMessage.outgoing(db, nodeId, parseTo(req.query.to), parseSinceParam(req))

  res.header('cache-control', 'public,max-age=60')
  res.json(outgoingMessages)
})

app.get('/api/node/:nodeId/device-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const deviceMetrics = await DeviceMetric.forNode(db, nodeId, parseSinceParam(req))

  res.header('cache-control', 'public,max-age=60')
  res.json(deviceMetrics)
})

app.get('/api/node/:nodeId/environment-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req)

  const environmentMetrics = await EnvironmentMetric.forNode(db, nodeId, since)

  res.header('cache-control', 'public,max-age=60')
  res.json(environmentMetrics)
})

app.get('/api/node/:nodeId/neighbour-infos', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const neighbours = await NeighbourInfo.forNode(db, nodeId, parseSinceParam(req))

  res.header('cache-control', 'public,max-age=60')
  res.json(neighbours)
})

app.get('/api/node/:nodeId/trace-routes', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const traceRoutes = await Traceroute.forNode(db, nodeId, parseSinceParam(req))

  res.header('cache-control', 'public,max-age=60')
  res.json(traceRoutes)
})

app.get('/api/hardware-models', async function (_req, res) {
  const hardwareModels = await Node.hardwareModels(db)

  res.header('cache-control', 'public,max-age=60')
  res.json(hardwareModels)
})

app.get('/api/device-config', async function (req, res) {
  const shortName = (req.query.shortName || '').toString()
  const longName = (req.query.shortName || '').toString()
  const skylinesId = (req.query.skylinesId || '').toString()

  if (_.isEmpty(shortName) || _.isEmpty(longName) || _.isEmpty(skylinesId)) {
    return res.status(400).json({
      message: `You must specify shortName, longName and skylinesId`,
    })
  }
  const dp = createDeviceProfile(shortName, longName, skylinesId)

  res.attachment(_.kebabCase(shortName) + '.cfg').send(meshtastic.DeviceProfile.encode(dp).finish())
})

if (!isDevelopment) {
  app.use(
    expressStaticGzip(`${__dirname}/public`, {
      serveStatic: {
        etag: true,
        setHeaders: (res, path) => {
          if (path.includes(`/assets/`)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000')
          } else if (path.endsWith(`/index.html`)) {
            res.setHeader('Cache-Control', 'public, max-age=60')
          }
        },
      },
    })
  )
  app.get('*', async (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.message,
    })
  }
  res.status(500).send('Internal server error')
})

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Meshmap server has started on port ${port}. Open http://localhost:${port}/ to see results`)

if (cliOptions.mqtt) {
  await mqttProcessor(db, cliOptions)
}
