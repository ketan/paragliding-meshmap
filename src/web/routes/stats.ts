import { Router } from 'express'
import { isProduction, parseDurationParam, parseSinceParam } from '#web/helpers'
import Position from '#entity/position'
import { AppDataSource } from '#config/data-source'

const db = AppDataSource

export const statsRouter = Router()

statsRouter.get('/positions-over-time', async (req, res) => {
  const since = parseSinceParam(req, 'P1M')
  const duration = parseDurationParam(req, 'P1M')

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(await Position.dailyPositionCount(db, since, duration))
})

statsRouter.get('/positions-by-node-id', async (req, res) => {
  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req, 'P7D')

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }

  res.json(await Position.countByNodeId(db, since, duration))
})

statsRouter.get('/positions-by-gateway-id', async (req, res) => {
  const since = parseSinceParam(req, 'P1D')
  const duration = parseDurationParam(req, 'P1D')

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.json(await Position.countByGatewayId(db, since, duration))
})
