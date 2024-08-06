import { Database } from '#config/data-source'
import { errLog } from '#helpers/logger'
import { parseProtobuf, secondsAgo } from '#helpers/utils'
import { Prisma } from '@prisma/client'
import debug from 'debug'
import { DateTime } from 'luxon'
import { AbortError } from 'p-retry'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { MQTTCLIOptions } from '../helpers/cli.js'
import {
  toDeviceMetric,
  toEnvironmentMetric,
  toMapReport,
  toNeighborInfo,
  toNode,
  toPosition,
  toPowerMetric,
  toServiceEnvelope,
  toTextMessage,
  toTraceroute,
  toWaypoint,
} from './protobuf-to-dto.js'

type Model =
  | 'node'
  | 'mapReport'
  | 'neighbourInfo'
  | 'deviceMetric'
  | 'environmentMetric'
  | 'powerMetric'
  | 'position'
  | 'serviceEnvelopes'
  | 'textMessages'
  | 'traceRoute'
  | 'waypoint'
type Models = Model[]

const models: Models = [
  'node',
  'mapReport',
  'neighbourInfo',
  'deviceMetric',
  'environmentMetric',
  'powerMetric',
  'position',
  'serviceEnvelopes',
  'textMessages',
  'traceRoute',
  'waypoint',
]

export async function dumpStats(db: Database, logger: debug.Debugger) {
  logger(`Starting record counts`)
  const counts: Record<string, number> = {}
  for (let index = 0; index < models.length; index++) {
    const eachModel = models[index]

    // @ts-expect-error We're duck typing here
    const count = await db[eachModel].count({ where: { id: { gte: 0 } } })

    counts[eachModel] = count
  }

  logger(`Record counts`, counts)
}

export async function purgeData(db: Database, cliOptions: MQTTCLIOptions, logger: debug.Debugger) {
  if (cliOptions.purgeDataOlderThan) {
    logger(`Counting before purging data`)
    await dumpStats(db, logger)
    logger(`Starting purge`)
    const purgeCutoff = DateTime.now().toLocal().minus(cliOptions.purgeDataOlderThan)
    await db.$transaction(async (trx) => {
      for (let index = 0; index < models.length; index++) {
        const eachModel = models[index]

        // @ts-expect-error We're duck typing here
        await trx[eachModel].deleteMany({
          where: {
            updatedAt: {
              lt: purgeCutoff.toJSDate(),
            },
          },
        })
      }
    })
    await dumpStats(db, logger)
    logger(`Next purge in ${cliOptions.purgeEvery.toHuman()}`)
  }
}

export async function updateMQTTStatus(db: Database, nodeId: number, mqttConnectionState: string, mqttConnectionStateUpdatedAt: Date) {
  await db.$transaction(async (trx) => {
    try {
      await trx.node.updateMQTTStatus(trx as unknown as Prisma.TransactionClient, nodeId, mqttConnectionState, mqttConnectionStateUpdatedAt)
    } catch (e) {
      errLog(`Unable to update mqtt status`, { err: e })
      throw e
    }
  })
}

export async function createServiceEnvelope(db: Database, mqttTopic: string, payload: Buffer, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet

  if (!packet) {
    return
  }

  const se = toServiceEnvelope(packet, payload, mqttTopic, envelope)

  await db.$transaction(async (trx) => {
    try {
      await trx.serviceEnvelopes.create({ data: se })
    } catch (e) {
      errLog(`Unable to create service envelope`, { err: e, mqttTopic, se, envelope })
      throw e
    }
  })
}

export async function saveTextMessage(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  if (!packet) {
    return
  }

  const tm = toTextMessage(envelope, packet)

  await db.$transaction(async (trx) => {
    try {
      await trx.node.outboundMessage(trx as unknown as Prisma.TransactionClient, tm)
      await trx.node.inboundMessage(trx as unknown as Prisma.TransactionClient, tm)
      await trx.textMessages.create({ data: tm })
    } catch (e) {
      errLog(`Unable to create text message`, { err: e, tm, envelope })
      throw e
    }
  })
}

export async function updateNodeWithPosition(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const position = parseProtobuf(() => meshtastic.Position.decode(payload))

  const newPosition = toPosition(packet, envelope, position)

  await db.$transaction(async (trx) => {
    try {
      if (newPosition.latitude != null && newPosition.longitude != null) {
        const recentPosition = await trx.position.findRecentPosition(
          trx as unknown as Prisma.TransactionClient,
          secondsAgo(15),
          newPosition
        )
        if (recentPosition) {
          return
        }
        await trx.position.create({ data: newPosition })
        await trx.node.updatePosition(trx as unknown as Prisma.TransactionClient, newPosition)
      }
    } catch (e) {
      errLog(`Unable to update node position`, { err: e, position, envelope })
      throw e
    }
  })
}

export async function createOrUpdateNode(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const user = parseProtobuf(() => meshtastic.User.decode(payload))
  const node = toNode(packet, user)

  // let node: Node | null
  await db.$transaction(async (trx) => {
    try {
      await trx.node.createOrUpdate(trx as unknown as Prisma.TransactionClient, node)
    } catch (e) {
      errLog(`Unable to update node`, { err: e, node, envelope })
      throw e
    }
  })
}

export async function createOrUpdateWaypoint(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const waypoint = parseProtobuf(() => meshtastic.Waypoint.decode(payload))

  const wp = toWaypoint(packet, waypoint, envelope)

  await db.$transaction(async (trx) => {
    try {
      return await trx.waypoint.create({ data: wp })
    } catch (e) {
      errLog(`Unable to create waypoint`, { err: e, waypoint, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateNeighborInfo(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const neighborInfo = parseProtobuf(() => meshtastic.NeighborInfo.decode(payload))

  const entity = toNeighborInfo(packet, neighborInfo)

  await db.$transaction(async (trx) => {
    try {
      await trx.neighbourInfo.create({ data: entity })
      return await trx.node.updateNeighbors(trx as unknown as Prisma.TransactionClient, entity)
    } catch (e) {
      errLog(`Unable to create neighborinfo`, { err: e, neighborInfo, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateTelemetryData(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const telemetry = parseProtobuf(() => meshtastic.Telemetry.decode(payload))

  if (!telemetry) {
    return
  }

  const nodeId = packet.from
  if (nodeId === null || nodeId === undefined) {
    return // nothing to capture, move on
  }

  await db.$transaction(async (trx) => {
    try {
      if (telemetry.variant === 'deviceMetrics') {
        const deviceMetric = toDeviceMetric(telemetry, nodeId)

        const recentSimilarMetric = await trx.deviceMetric.findRecentSimilarMetric(
          trx as unknown as Prisma.TransactionClient,
          secondsAgo(15),
          deviceMetric
        )
        if (recentSimilarMetric) {
          return
        }

        await trx.deviceMetric.create({ data: deviceMetric })
        await trx.node.updateDeviceMetrics(trx as unknown as Prisma.TransactionClient, deviceMetric)
      } else if (telemetry.variant === 'environmentMetrics') {
        const environmentMetric = toEnvironmentMetric(telemetry, nodeId)

        const recentSimilarMetric = await trx.environmentMetric.findRecentSimilarMetric(
          trx as unknown as Prisma.TransactionClient,
          secondsAgo(15),
          environmentMetric
        )
        if (recentSimilarMetric) {
          return
        }
        await trx.environmentMetric.create({ data: environmentMetric })
        return await trx.node.updateEnvironmentMetrics(trx as unknown as Prisma.TransactionClient, environmentMetric)
      } else if (telemetry.variant === 'powerMetrics') {
        const powerMetric = toPowerMetric(telemetry, nodeId)

        const recentSimilarMetric = await trx.powerMetric.findRecentSimilarMetric(
          trx as unknown as Prisma.TransactionClient,
          secondsAgo(15),
          powerMetric
        )

        if (recentSimilarMetric) {
          return
        }

        await trx.powerMetric.create({ data: powerMetric })
      }
    } catch (e) {
      errLog(`Unable to create telemetry data`, { err: e, nodeId, envelope })
      throw e
    }
  })
}

export async function createOrUpdateTracerouteMessage(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const rd = parseProtobuf(() => meshtastic.RouteDiscovery.decode(payload))

  const traceroute = toTraceroute(packet, rd, envelope)

  await db.$transaction(async (trx) => {
    try {
      await trx.traceRoute.create({ data: traceroute })
    } catch (e) {
      errLog(`Unable to save traceroute`, { err: e, traceroute, envelope })
      throw e
    }
  })
}

export async function createMapReports(db: Database, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const mr = parseProtobuf(() => meshtastic.MapReport.decode(payload))

  const mapReport = toMapReport(packet, mr)

  await db.$transaction(async (trx) => {
    try {
      await trx.mapReport.create({ data: mapReport })
      return trx.node.updateMapReports(trx as unknown as Prisma.TransactionClient, mapReport)
    } catch (e) {
      errLog(`Unable to save map report`, { err: e, mr, envelope })
      throw e
    }
  })
}
