import { Router } from 'express'
import { BROADCAST_ADDR } from '#helpers/utils'
import Position from '#entity/position'
import TextMessage from '#entity/text_message'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import NeighbourInfo from '#entity/neighbour_info'
import Traceroute from '#entity/traceroute'
import { isProduction, parseDurationParam, parseNodeIdParam, parseSinceParam } from '#web/helpers'
import { AppDataSource } from '#config/data-source'
import Node from '#entity/node'

const db = AppDataSource

export const nodeRouter = Router()

nodeRouter.get('/nodes', async (_req, res) => {
  const allNodes = await Node.find(db)

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(allNodes)
})

nodeRouter.get('/node/:nodeId/positions', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const positions = await Position.forNode(db, nodeId, parseSinceParam(req, `PT12H`))

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(positions)
})

nodeRouter.get(`/api/node/:nodeId`, async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const node = await Node.findOne(db, { where: { nodeId } })
  if (node) {
    if (isProduction) {
      res.header('cache-control', 'public,max-age=60')
    }
    res.json(node)
  } else {
    res.status(404).json({
      message: `Node with ID ${nodeId} not found!`,
    })
  }
})

nodeRouter.get('/node/:nodeId/sent-messages', async (req, res) => {
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

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(outgoingMessages)
})

nodeRouter.get('/node/:nodeId/device-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req)

  const deviceMetrics = await DeviceMetric.forNode(db, nodeId, since, duration)

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(deviceMetrics)
})

nodeRouter.get('/node/:nodeId/environment-metrics', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req)

  const environmentMetrics = await EnvironmentMetric.forNode(db, nodeId, since, duration)

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(environmentMetrics)
})

nodeRouter.get('/node/:nodeId/neighbour-infos', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req)
  const neighbours = await NeighbourInfo.forNode(db, nodeId, since)

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(neighbours)
})

nodeRouter.get('/node/:nodeId/trace-routes', async (req, res) => {
  const nodeId = parseNodeIdParam(req)

  const since = parseSinceParam(req)
  const duration = parseDurationParam(req)

  const traceRoutes = await Traceroute.forNode(db, nodeId, since, duration)

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(traceRoutes)
})
