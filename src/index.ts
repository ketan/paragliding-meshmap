// do this first
import 'dotenv/config'

//
import { createDB, Database } from '#config/data-source'
import { webCLIParse } from '#helpers/cli'
import { BROADCAST_ADDR } from '#helpers/utils'
import { mqttProcessor } from '#mqtt/main'
import { Prisma } from '@prisma/client'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { DateTime, Duration } from 'luxon'
import path from 'path'
import { fileURLToPath } from 'url'

const cliOptions = webCLIParse()

const db: Database = createDB(cliOptions.purgeDataOlderThan)

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

if (!isDevelopment) {
  app.use(express.static(`${__dirname}/public`))
}

app.get('/api/nodes', async (_req: Request, res: Response) => {
  res.setHeader('cache-control', 'public,max-age=60')
  const allNodes = await db.node.findMany()
  res.json(allNodes)
})

app.get('/api/positions/:nodeId', async (req, res) => {
  const nodeId = req.params.nodeId
  const positions = await db.position.findMany({
    where: {
      nodeId: Number(nodeId),
      createdAt: {
        gte: DateTime.now().minus(Duration.fromISO('P1D')).toJSDate(),
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  if (positions.length > 0) {
    res.setHeader('cache-control', 'public,max-age=60')
    res.json(positions)
  } else {
    res.status(404).json({
      message: `Node with ID ${nodeId} not found!`,
    })
  }
})

app.get(`/api/node/:nodeId`, async (req, res) => {
  const nodeId = req.params.nodeId
  const node = await db.node.findFirst({ where: { nodeId: Number(nodeId) } })
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
  function parseTo(to: string | import('qs').ParsedQs | string[] | import('qs').ParsedQs[] | undefined): number | undefined {
    if (to === 'all') {
      return
    } else if (isNaN(Number(to))) {
      return BROADCAST_ADDR
    } else {
      return Number(to)
    }
  }
  res.setHeader('cache-control', 'public,max-age=60')
  const nodeId = Number(req.params.nodeId)
  const since = typeof req.query.since === 'string' ? req.query.since : `P1D`

  const outgoingMessages = await db.textMessages.findMany({
    select: {
      id: true,
      from: true,
      to: true,
      text: true,
      createdAt: true,
    },
    where: {
      from: nodeId,
      to: parseTo(req.query.to),
      createdAt: {
        gte: DateTime.now().minus(Duration.fromISO(since)).toJSDate(),
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  res.json(outgoingMessages)
})

app.get('/api/hardware-models', async function (_req: Request, res: Response) {
  const hardwareModels = await db.node.groupBy({
    by: ['hardwareModel'],
    orderBy: {
      _count: {
        hardwareModel: 'desc',
      },
    },
    _count: {
      hardwareModel: true,
    },
  })

  res.setHeader('cache-control', 'public,max-age=60')
  res.json(hardwareModels)
})

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Express server has started on port ${port}. Open http://localhost:${port}/ to see results`)
