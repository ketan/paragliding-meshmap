import { Router } from 'express'
import { isProduction, parseDurationParam, parseSinceParam } from '#web/helpers'
import { AppDataSource } from '#config/data-source'
import Position from '#entity/position'
import { Meshmap } from '../../gen/meshmap-protobufs.js'

export const positionsRouter = Router()

const db = AppDataSource

positionsRouter.get('/positions/heatmap', async (req, res) => {
  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req)

  const positions: Pick<Position, 'latitude' | 'longitude'>[] = await Position.all(db, since, duration)

  const buffer = Meshmap.encode(
    new Meshmap({
      positions: positions.map((pos) => new Meshmap.Position(pos)),
    })
  ).finish()

  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.setHeader('Content-Type', 'application/octet-stream')
  res.send(buffer)
})
