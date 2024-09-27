import { errLog } from '#helpers/logger'
import { parseProtobuf } from '#helpers/utils'
import debug from 'debug'
import { AbortError } from 'p-retry'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { MQTTCLIOptions } from '#helpers/cli'
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
import { DataSource } from 'typeorm'
import Node from '#entity/node'
import { DateTime, Duration } from 'luxon'
import { ENTITY_TYPES } from '#helpers/entity-types'

export async function dumpStats(db: DataSource, logger: debug.Debugger) {
  const response = await db.query<
    {
      relname: string
      n_live_tup: bigint
      n_dead_tup: bigint
    }[]
  >(`SELECT relname, n_live_tup, n_dead_tup
     FROM pg_stat_user_tables`)
  logger(`Record count (estimates)`, response)
}

export async function purgeData(db: DataSource, cliOptions: MQTTCLIOptions, logger: debug.Debugger) {
  if (cliOptions.purgeDataOlderThan) {
    logger(`Counting before purging data`)
    await dumpStats(db, logger)
    logger(`Starting purge`)

    for (const klass of ENTITY_TYPES) {
      await db.transaction(async (trx) => {
        logger(`Purging ${klass.name}`)
        const deletedRecords = await klass.purge(cliOptions.purgeDataOlderThan, trx)
        if (deletedRecords.affected && deletedRecords?.affected > 0) {
          logger(`Purged ${deletedRecords?.affected} records from ${klass.name}`)
        }
      })
    }

    await dumpStats(db, logger)
    logger(`Next purge in ${cliOptions.purgeEvery.toHuman()}`)
  }
}

export async function createServiceEnvelope(db: DataSource, mqttTopic: string, payload: Buffer, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet

  if (!packet) {
    return
  }

  const se = toServiceEnvelope(payload, mqttTopic, envelope)

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      await trx.save(se, { reload: false })
    } catch (e) {
      errLog(`Unable to create service envelope`, { err: e, mqttTopic, se, envelope })
      throw e
    }
  })
}

export async function saveTextMessage(
  db: DataSource,
  envelope: meshtastic.ServiceEnvelope,
  purgeOlderThan: Duration,
  dedupeDuration: Duration
) {
  const tm = toTextMessage(envelope)

  if (!tm) {
    return
  }

  await db.transaction(async (trx) => {
    try {
      const recentSimilarMessage = await tm.findRecentSimilarMessage(trx, DateTime.now().minus(dedupeDuration).toJSDate())

      if (recentSimilarMessage) {
        return
      }

      const [from, to] = await Promise.all([Node.findOrBuild(trx, tm.from), Node.findOrBuild(trx, tm.to)])
      await trx.save(tm)

      await from.outboundMessage(tm, purgeOlderThan)
      to.inboundMessage(tm, purgeOlderThan)

      await trx.save([from, to], { reload: false })
    } catch (e) {
      errLog(`Unable to create text message`, { err: e, tm, envelope })
      throw e
    }
  })
}

export async function updateNodeWithPosition(db: DataSource, envelope: meshtastic.ServiceEnvelope, dedupeDuration: Duration) {
  const newPosition = toPosition(envelope)

  if (!newPosition) {
    return
  }

  await db.transaction(async (trx) => {
    try {
      if (newPosition.latitude != null && newPosition.longitude != null) {
        const recentPosition = await newPosition.findRecentPosition(trx, DateTime.now().minus(dedupeDuration).toJSDate())
        if (recentPosition) {
          return
        }

        await trx.save(newPosition, { reload: false })
        await Node.updatePosition(trx, newPosition)
      }
    } catch (e) {
      errLog(`Unable to update node position`, { err: e, newPosition, envelope })
      throw e
    }
  })
}

export async function createOrUpdateNode(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const node = toNode(envelope)
  if (!node) {
    return
  }

  await db.transaction(async (trx) => {
    try {
      await node.createOrUpdate(trx)
    } catch (e) {
      errLog(`Unable to update node`, { err: e, node, envelope })
      throw e
    }
  })
}

export async function createOrUpdateWaypoint(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const waypoint = parseProtobuf(() => meshtastic.Waypoint.decode(payload))

  const wp = toWaypoint(packet, waypoint, envelope)

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      return await trx.save(wp, { reload: false })
    } catch (e) {
      errLog(`Unable to create waypoint`, { err: e, waypoint, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateNeighborInfo(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const entity = toNeighborInfo(envelope)
  if (!entity) {
    return
  }

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      return await Promise.all([trx.save(entity, { reload: false }), Node.updateNeighbors(trx, entity)])
    } catch (e) {
      errLog(`Unable to create neighborinfo`, { err: e, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateTelemetryData(db: DataSource, envelope: meshtastic.ServiceEnvelope, dedupeDuration: Duration) {
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

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      if (telemetry.variant === 'deviceMetrics') {
        const deviceMetric = toDeviceMetric(telemetry, nodeId)

        const recentSimilarMetric = await deviceMetric.findRecentSimilarMetric(trx, DateTime.now().minus(dedupeDuration).toJSDate())

        if (recentSimilarMetric) {
          return
        }

        await Promise.all([trx.save(deviceMetric, { reload: false }), Node.updateDeviceMetrics(trx, deviceMetric)])
      } else if (telemetry.variant === 'environmentMetrics') {
        const environmentMetric = toEnvironmentMetric(telemetry, nodeId)

        const recentSimilarMetric = await environmentMetric.findRecentSimilarMetric(trx, DateTime.now().minus(dedupeDuration).toJSDate())
        if (recentSimilarMetric) {
          return
        }

        await Promise.all([trx.save(environmentMetric, { reload: false }), Node.updateEnvironmentMetrics(trx, environmentMetric)])
      } else if (telemetry.variant === 'powerMetrics') {
        const powerMetric = toPowerMetric(telemetry, nodeId)

        const recentSimilarMetric = await powerMetric.findRecentSimilarMetric(trx, DateTime.now().minus(dedupeDuration).toJSDate())

        if (recentSimilarMetric) {
          return
        }

        await trx.save(powerMetric, { reload: false })
      }
    } catch (e) {
      errLog(`Unable to create telemetry data`, { err: e, nodeId, envelope })
      throw e
    }
  })
}

export async function createOrUpdateTracerouteMessage(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const rd = parseProtobuf(() => meshtastic.RouteDiscovery.decode(payload))

  const traceroute = toTraceroute(packet, rd, envelope)

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      await trx.save(traceroute, { reload: false })
    } catch (e) {
      errLog(`Unable to save traceroute`, { err: e, traceroute, envelope })
      throw e
    }
  })
}

export async function createMapReports(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const mapReport = toMapReport(envelope)
  if (!mapReport) {
    return
  }

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      return await Promise.all([trx.save(mapReport, { reload: false }), Node.updateMapReports(trx, mapReport)])
    } catch (e) {
      errLog(`Unable to save map report`, { err: e, mapReport, envelope })
      throw e
    }
  })
}
