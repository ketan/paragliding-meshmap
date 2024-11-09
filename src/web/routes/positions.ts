import { Router } from 'express'
import { isProduction, parseDurationParam, parseSinceParam } from '#web/helpers'
import { AppDataSource } from '#config/data-source'
import { Transform, TransformCallback } from 'stream'
import { Meshmap } from '../../gen/meshmap-protobufs.js'
import Position from '#entity/position'
import PositionChunk = Meshmap.PositionChunk
import IPosition = Meshmap.IPosition

export const positionsRouter = Router()

const db = AppDataSource

positionsRouter.get('/positions/heatmap', async (req, res) => {
  const since = parseSinceParam(req, 'P7D')
  const duration = parseDurationParam(req)

  const positions = await Position.all(db, since, duration)
  if (isProduction) {
    res.header('cache-control', 'public,max-age=60')
  }
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Transfer-Encoding', 'chunked')

  const chunker = new PositionChunker(1000)
  chunker.pipe(res)
  for await (const pos of positions) {
    chunker.write(pos)
  }
  chunker.end()
})

class PositionChunker extends Transform {
  private chunkSize: number
  private positions: IPosition[] = []

  constructor(chunkSize: number) {
    super({ writableObjectMode: true, readableObjectMode: true })
    this.chunkSize = chunkSize
  }

  // Process each position object from the input stream
  _transform(position: { latitude: number; longitude: number }, _encoding: string, callback: TransformCallback) {
    // Add the position to the current chunk
    this.positions.push(position)

    // If we've reached the chunk size, serialize and push it to the output stream
    if (this.positions.length >= this.chunkSize) {
      const chunkData = PositionChunk.encode({ positions: this.positions }).finish()
      this.push(chunkData)
      this.positions = []
    }
    callback()
  }

  // Final chunk when the input is done
  _flush(callback: TransformCallback) {
    if (this.positions.length > 0) {
      const chunkData = PositionChunk.encode({ positions: this.positions }).finish()
      this.push(chunkData)
    }
    callback()
  }
}
