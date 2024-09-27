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
import { BROADCAST_ADDR } from '#helpers/utils'
import { DateTime, Duration } from 'luxon'
import path from 'path'
import { fileURLToPath } from 'url'
import express, { NextFunction, Request, Response } from 'express'
import expressStaticGzip from 'express-static-gzip'
import responseTime from 'response-time'
import 'express-async-errors'
import MapReport from '#entity/map_report'
import _ from 'lodash'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { createDeviceProfile } from '#helpers/create-device-profile'
import { AppDataSource } from '#config/data-source'
import { errLog } from '#helpers/logger'

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const db = AppDataSource

export const app = express()
app.use(responseTime())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDevelopment) {
  app.use((await import('morgan')).default('dev'))
  app.use((await import('compression')).default())
}

function parseSinceParam(req: Request, defaultValue: string = `P30D`) {
  const since = typeof req.query.since === 'string' ? req.query.since : defaultValue
  return DateTime.now().minus(Duration.fromISO(since)).toJSDate()
}

function parseDurationParam(req: Request, defaultValue: string = `PT0S`) {
  const duration = typeof req.query.duration === 'string' ? req.query.duration : defaultValue
  return Duration.fromISO(duration)
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

  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req)

  const deviceMetrics = await DeviceMetric.forNode(db, nodeId, since, duration)

  res.header('cache-control', 'public,max-age=60')
  res.json(deviceMetrics)
})

app.get('/api/node/:nodeId/environment-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req)

  const environmentMetrics = await EnvironmentMetric.forNode(db, nodeId, since, duration)

  res.header('cache-control', 'public,max-age=60')
  res.json(environmentMetrics)
})

app.get('/api/node/:nodeId/neighbour-infos', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req)
  const neighbours = await NeighbourInfo.forNode(db, nodeId, since)

  res.header('cache-control', 'public,max-age=60')
  res.json(neighbours)
})

app.get('/api/node/:nodeId/trace-routes', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req)
  const duration = parseDurationParam(req)

  const traceRoutes = await Traceroute.forNode(db, nodeId, since, duration)

  res.header('cache-control', 'public,max-age=60')
  res.json(traceRoutes)
})

app.get('/api/hardware-models', async function (_req, res) {
  const hardwareModels = await Node.hardwareModels(db)

  res.header('cache-control', 'public,max-age=60')
  res.json(hardwareModels)
})

app.get('/api/health-check', async (_req, res) => {
  try {
    await db.query('SELECT 1+1')
    res.status(200).json({ status: 'ok' })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
})

app.get('/api/device-config', async function (req, res) {
  const shortName = (req.query.shortName || '').toString().trim()
  const longName = (req.query.longName || '').toString().trim()

  const errors = []

  if (shortName.length < 2 || shortName.length > 4) {
    errors.push('Short name must be between 2 and 4 characters')
  }

  if (longName.length < 5 || longName.length > 12) {
    errors.push('Long name must be between 5 and 12 characters')
  }

  if (errors.length > 0) {
    return res.status(400).json({ messages: errors })
  }

  const dp = createDeviceProfile(shortName, longName)

  res.attachment(_.kebabCase(shortName) + '.cfg').send(meshtastic.DeviceProfile.encode(dp).finish())
})
if (!isDevelopment) {
  app.use(
    expressStaticGzip(`${__dirname}/../public`, {
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
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  })
}

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  errLog('HTTP error', { err, url: req.url, method: req.method, body: req.body, headers: req.headers })
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.message,
    })
  }
  res.status(500).send('Internal server error')
})
