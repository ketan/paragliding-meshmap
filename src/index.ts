// do this first
import 'dotenv/config'

//
import { AppDataSource } from '#config/data-source'
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
import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'

const cliOptions = webCLIParse()

const db = await AppDataSource.initialize()

await AppDataSource.runMigrations({
  transaction: 'each'
})

const environment = process.env.NODE_ENV || 'development'
const isDevelopment = environment === 'development'

const app = new Koa()
const router = new Router()
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (isDevelopment) {
  app.use((await import('koa-compress')).default())
}

function parseSinceParam(
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext & Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >,
  defaultValue: string = `P30D`
) {
  const since = typeof ctx.query.since === 'string' ? ctx.query.since : defaultValue
  return DateTime.now().minus(Duration.fromISO(since)).toJSDate()
}

function parseNodeIdParam(
  ctx: Koa.ParameterizedContext<
    Koa.DefaultState,
    Koa.DefaultContext & Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
    unknown
  >
) {
  const nodeIdParam = ctx.params.nodeId

  const nodeId = Number(nodeIdParam)
  if (!isNaN(nodeId)) {
    return nodeId
  }

  ctx.throw(400, `Invalid node ID ${nodeIdParam}`)
}

router.get('/api/nodes', async (ctx) => {
  const allNodes = await Node.find(db)

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = allNodes
})

router.get('/api/positions/:nodeId', async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const since = parseSinceParam(ctx)
  const positions = await Position.forNode(db, nodeId, since)

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = positions
})

router.get(`/api/node/:nodeId`, async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const node = await Node.findOne(db, { where: { nodeId } })
  if (node) {
    ctx.set('cache-control', 'public,max-age=60')
    ctx.body = node
  } else {
    ctx.status = 404
    ctx.body = {
      message: `Node with ID ${nodeId} not found!`,
    }
  }
})

router.get('/api/node/:nodeId/sent-messages', async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  function parseTo(to: any): number | undefined {
    if (to === 'all') {
      return
    } else if (isNaN(Number(to))) {
      return BROADCAST_ADDR
    } else {
      return Number(to)
    }
  }

  const outgoingMessages = await TextMessage.outgoing(db, nodeId, parseTo(ctx.query.to), parseSinceParam(ctx))

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = outgoingMessages
})

router.get('/api/node/:nodeId/device-metrics', async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const deviceMetrics = await DeviceMetric.forNode(db, nodeId, parseSinceParam(ctx))

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = deviceMetrics
})

router.get('/api/node/:nodeId/environment-metrics', async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const since = parseSinceParam(ctx)

  const environmentMetrics = await EnvironmentMetric.forNode(db, nodeId, since)

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = environmentMetrics
})

router.get('/api/node/:nodeId/neighbour-infos', async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const neighbours = await NeighbourInfo.forNode(db, nodeId, parseSinceParam(ctx))

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = neighbours
})

router.get('/api/node/:nodeId/trace-routes', async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const traceRoutes = await Traceroute.forNode(db, nodeId, parseSinceParam(ctx))

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = traceRoutes
})

router.get(`/api/node/:nodeId/positions`, async (ctx) => {
  const nodeId = parseNodeIdParam(ctx)

  const positions = await Position.forNode(db, nodeId, parseSinceParam(ctx))

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = positions
})

router.get('/api/hardware-models', async function (ctx) {
  const hardwareModels = await Node.hardwareModels(db)

  ctx.set('cache-control', 'public,max-age=60')
  ctx.body = hardwareModels
})

app.use(router.routes()).use(router.allowedMethods())

if (!isDevelopment) {
  app.use(serve(`${__dirname}/public`))
  router.get('*', (ctx) => {
    ctx.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}

const port = process.env.PORT || 3333
app.listen(port)

console.log(`Meshmap server has started on port ${port}. Open http://localhost:${port}/ to see results`)

if (cliOptions.mqtt) {
  await mqttProcessor(db, cliOptions)
}
