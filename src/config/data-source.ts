// load .env file
import 'dotenv/config'

// then load everything else
import { globSync } from 'glob'
import snakeCase from 'lodash/snakeCase.js'
import os from 'os'
import path from 'path'
import pluralize from 'pluralize'
import 'reflect-metadata'
import parseDatabaseUrl from 'ts-parse-database-url'
import { DataSource, DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm'
import { DataSourceOptions } from 'typeorm/browser'
import { fileURLToPath } from 'url'
// https://github.com/trancong12102/typeorm-naming-strategies/blob/master/src/postgres-naming.strategy.ts
class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    if (userSpecifiedName) {
      return userSpecifiedName
    }

    return snakeCase(pluralize.plural(targetName))
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(super.columnName(propertyName, customName, embeddedPrefixes))
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbConfig = parseDatabaseUrl.default(process.env.DB_URL || `sqlite:///${__dirname}/../../tmp/paragliding-meshmap.sqlite3`)
const dbConnectionOpts = { ...dbConfig, username: dbConfig.user }

let driver = dbConnectionOpts.driver
if (driver === 'postgresql') {
  driver = 'postgres'
}

if (driver === 'sqlite3') {
  driver = 'sqlite'
}

// remove driver
delete dbConnectionOpts.driver

// remove port if empty
if (!dbConnectionOpts.port) {
  delete dbConnectionOpts.driver
}

export const connString = <DataSourceOptions>{
  ...dbConnectionOpts,
  namingStrategy: new SnakeNamingStrategy(),
  type: driver,
  synchronize: false,
  logging: 'all',
  logger: 'debug',
  entities: globSync(`${__dirname}/../entity/**/*.{ts,js,tsx}`, { ignore: '**/base_type.{ts,js}' }),
  migrations: [`${__dirname}/../migration/*.ts`, `${__dirname}/../migration/*.js`],
  migrationsTransactionMode: 'each',
  subscribers: [],
  parseInt8: true, // https://github.com/typeorm/typeorm/issues/8583
}

export const dbConnectionConcurrency =
  connString.type === 'sqlite' || connString.type === 'better-sqlite3'
    ? 1
    : Number(process.env.DB_CONNECTION_CONCURRENCY) || os.cpus().length

console.log(`Using connection parameters`, connString)
console.log(`Using connection concurrency`, dbConnectionConcurrency)
export const AppDataSource = new DataSource(connString)

// import { BROADCAST_ADDR } from '#helpers/utils'
// import { sanitizeNumber } from '#mqtt/protobuf-to-dto'
// import { Prisma, PrismaClient } from '@prisma/client'
// import { DateTime, Duration } from 'luxon'

// export function createDB(purgeDataOlderThan: Duration, options?: Prisma.PrismaClientOptions) {
//   return new PrismaClient(options).$extends({
//     model: {
//       node: {
//         async outboundMessage(trx: Prisma.TransactionClient, tm: Pick<Prisma.TextMessagesCreateInput, 'text' | 'to' | 'from'>) {
//           const now = DateTime.now()
//           const senderNode =
//             (await trx.node.findFirst({ where: { nodeId: tm.from } })) ||
//             ({
//               nodeId: tm.from,
//             } as Prisma.NodeCreateInput)

//           if (!Array.isArray(senderNode.outbox)) {
//             senderNode.outbox = []
//           }

//           senderNode.outbox = (senderNode.outbox as PrismaJson.MessageOut[]).filter((msg) => {
//             return now.diff(DateTime.fromISO(msg.time)) < purgeDataOlderThan
//           })

//           senderNode.outbox.unshift({ to: tm.to, text: tm.text, time: now.toJSON() })

//           await Prisma.getExtensionContext(this).createOrUpdate(trx, senderNode)
//         },

//         async inboundMessage(trx: Prisma.TransactionClient, tm: Pick<Prisma.TextMessagesCreateInput, 'text' | 'to' | 'from'>) {
//           if (tm.to === BROADCAST_ADDR) {
//             return
//           }
//           const now = DateTime.now()
//           const receiverNode =
//             (await trx.node.findFirst({ where: { nodeId: tm.to } })) ||
//             ({
//               nodeId: tm.to,
//             } as Prisma.NodeCreateInput)

//           if (!Array.isArray(receiverNode.inbox)) {
//             receiverNode.inbox = []
//           }

//           receiverNode.inbox = (receiverNode.inbox as PrismaJson.MessageIn[]).filter((msg) => {
//             return now.diff(DateTime.fromISO(msg.time)) < purgeDataOlderThan
//           })

//           receiverNode.inbox.unshift({ from: tm.from, text: tm.text, time: now.toJSON() })

//           await Prisma.getExtensionContext(this).createOrUpdate(trx, receiverNode)
//         },

//         async updateMapReports(trx: Prisma.TransactionClient, mr: Prisma.MapReportCreateInput) {
//           await Prisma.getExtensionContext(this).createOrUpdate(trx, {
//             nodeId: mr.nodeId,
//             shortName: mr.shortName,
//             longName: mr.longName,
//             role: mr.role,
//             latitude: mr.latitude,
//             longitude: mr.longitude,
//             altitude: sanitizeNumber(mr.altitude),
//             firmwareVersion: mr.firmwareVersion,
//             region: mr.region,
//             modemPreset: mr.modemPreset,
//             hasDefaultChannel: mr.hasDefaultChannel,
//             positionPrecision: mr.positionPrecision,
//             numOnlineLocalNodes: mr.numOnlineLocalNodes,
//             positionUpdatedAt: new Date(),
//           })
//         },

//         async updateMQTTStatus(
//           trx: Prisma.TransactionClient,
//           nodeId: number,
//           mqttConnectionState: string,
//           mqttConnectionStateUpdatedAt: Date
//         ) {
//           await Prisma.getExtensionContext(this).createOrUpdate(trx, { nodeId: nodeId, mqttConnectionState, mqttConnectionStateUpdatedAt })
//         },

//         async updatePosition(trx: Prisma.TransactionClient, position: Prisma.PositionCreateInput) {
//           await Prisma.getExtensionContext(this).createOrUpdate(trx, {
//             nodeId: position.from,
//             positionUpdatedAt: new Date(),
//             latitude: sanitizeNumber(position.latitude), // unlikely that lat/lon/alt are exactly `0`
//             longitude: sanitizeNumber(position.longitude),
//             altitude: sanitizeNumber(position.altitude),
//           })
//         },

//         async updateDeviceMetrics(trx: Prisma.TransactionClient, dm: Prisma.DeviceMetricCreateInput) {
//           await Prisma.getExtensionContext(this).createOrUpdate(trx, {
//             nodeId: dm.nodeId,
//             batteryLevel: dm.batteryLevel,
//             voltage: dm.voltage,
//             airUtilTx: dm.airUtilTx,
//             channelUtilization: dm.channelUtilization,
//             uptimeSeconds: dm.uptimeSeconds,
//           })
//         },

//         async updateEnvironmentMetrics(trx: Prisma.TransactionClient, em: Prisma.EnvironmentMetricCreateInput) {
//           await Prisma.getExtensionContext(this).createOrUpdate(trx, {
//             nodeId: em.nodeId,
//             barometricPressure: em.barometricPressure,
//             relativeHumidity: em.relativeHumidity,
//             temperature: em.temperature,
//             voltage: em.voltage,
//           })
//         },

//         async updateNeighbors(trx: Prisma.TransactionClient, neighborInfo: Prisma.NeighbourInfoCreateInput) {
//           this.createOrUpdate(trx, {
//             nodeId: neighborInfo.nodeId,
//             neighbours: neighborInfo.neighbours,
//             neighboursUpdatedAt: new Date(),
//           })
//         },

//         createOrUpdate(trx: Prisma.TransactionClient, node: Prisma.NodeCreateInput) {
//           return trx.node.upsert({
//             create: { ...node },
//             update: { ...node },
//             where: { nodeId: node.nodeId },
//           })
//         },
//       },

//       deviceMetric: {
//         async findRecentSimilarMetric(trx: Prisma.TransactionClient, since: Date, dm: Prisma.DeviceMetricCreateInput) {
//           return await trx.deviceMetric.findFirst({
//             where: {
//               nodeId: dm.nodeId,
//               voltage: dm.voltage,
//               channelUtilization: dm.channelUtilization,
//               airUtilTx: dm.airUtilTx,
//               uptimeSeconds: dm.uptimeSeconds,
//               createdAt: {
//                 gte: since,
//               },
//             },
//           })
//         },
//       },

//       environmentMetric: {
//         async findRecentSimilarMetric(trx: Prisma.TransactionClient, since: Date, em: Prisma.EnvironmentMetricCreateInput) {
//           return await trx.environmentMetric.findFirst({
//             where: {
//               nodeId: em.nodeId,
//               temperature: em.temperature,
//               relativeHumidity: em.relativeHumidity,
//               barometricPressure: em.barometricPressure,
//               gasResistance: em.gasResistance,
//               voltage: em.voltage,
//               current: em.current,
//               iaq: em.iaq,
//               createdAt: {
//                 gte: since,
//               },
//             },
//           })
//         },
//       },

//       powerMetric: {
//         async findRecentSimilarMetric(trx: Prisma.TransactionClient, since: Date, pm: Prisma.PowerMetricCreateInput) {
//           return await trx.powerMetric.findFirst({
//             where: {
//               nodeId: pm.nodeId,
//               ch1Voltage: pm.ch1Voltage,
//               ch1Current: pm.ch1Current,
//               ch2Voltage: pm.ch2Voltage,
//               ch2Current: pm.ch2Current,
//               ch3Voltage: pm.ch3Voltage,
//               ch3Current: pm.ch3Current,
//               createdAt: {
//                 gte: since,
//               },
//             },
//           })
//         },
//       },

//       position: {
//         findRecentPosition(trx: Prisma.TransactionClient, since: Date, position: Prisma.PositionCreateInput) {
//           return trx.position.findFirst({
//             where: {
//               nodeId: position.nodeId,
//               packetId: position.packetId,
//               createdAt: {
//                 gte: since,
//               },
//             },
//           })
//         },
//       },
//     },
//   })
// }

// export type Database = ReturnType<typeof createDB>
