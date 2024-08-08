import { errLog } from '#helpers/logger'
import { parseProtobuf, secondsAgo } from '#helpers/utils'
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
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import MapReport from '#entity/map_report'
import NeighbourInfo from '#entity/neighbour_info'
import Node from '#entity/node'
import Position from '#entity/position'
import PowerMetric from '#entity/power_metric'
import ServiceEnvelope from '#entity/service_envelope'
import TextMessage from '#entity/text_message'
import Traceroute from '#entity/traceroute'
import Waypoint from '#entity/waypoint'

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

    const klasses = [
      DeviceMetric,
      EnvironmentMetric,
      MapReport,
      NeighbourInfo,
      Node,
      Position,
      PowerMetric,
      ServiceEnvelope,
      TextMessage,
      Traceroute,
      Waypoint,
    ]

    for (const klass of klasses) {
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

export async function updateMQTTStatus(db: DataSource, nodeId: number, mqttConnectionState: string, mqttConnectionStateUpdatedAt: Date) {
  await db.transaction(async (trx) => {
    try {
      await Node.updateMqttStatus(trx, nodeId, mqttConnectionState, mqttConnectionStateUpdatedAt)
    } catch (e) {
      errLog(`Unable to update mqtt status`, { err: e })
      throw e
    }
  })
}

export async function createServiceEnvelope(db: DataSource, mqttTopic: string, payload: Buffer, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet

  if (!packet) {
    return
  }

  const se = toServiceEnvelope(packet, payload, mqttTopic, envelope)

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      await trx.save(se, { reload: false })
    } catch (e) {
      errLog(`Unable to create service envelope`, { err: e, mqttTopic, se, envelope })
      throw e
    }
  })
}

export async function saveTextMessage(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  if (!packet) {
    return
  }

  const tm = toTextMessage(envelope, packet)

  await db.transaction(async (trx) => {
    try {
      let [from, to] = await Promise.all([
        trx.findOne(Node, { where: { nodeId: tm.from } }),
        trx.findOne(Node, { where: { nodeId: tm.to } }),
      ])

      from ||= new Node()
      to ||= new Node()

      from.outboundMessage(tm)
      to.inboundMessage(tm)

      await trx.save([from, to, tm], { reload: false })
    } catch (e) {
      errLog(`Unable to create text message`, { err: e, tm, envelope })
      throw e
    }
  })
}

export async function updateNodeWithPosition(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const position = parseProtobuf(() => meshtastic.Position.decode(payload))

  const newPosition = toPosition(packet, envelope, position)

  await db.transaction(async (trx) => {
    try {
      if (newPosition.latitude != null && newPosition.longitude != null) {
        const recentPosition = await newPosition.findRecentPosition(secondsAgo(15), trx)
        if (recentPosition) {
          return
        }

        await trx.save(newPosition, { reload: false })
        await Node.updatePosition(trx, newPosition)
      }
    } catch (e) {
      errLog(`Unable to update node position`, { err: e, position, envelope })
      throw e
    }
  })
}

export async function createOrUpdateNode(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const user = parseProtobuf(() => meshtastic.User.decode(payload))
  const node = toNode(packet, user)

  // let node: Node | null
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
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const neighborInfo = parseProtobuf(() => meshtastic.NeighborInfo.decode(payload))

  const entity = toNeighborInfo(packet, neighborInfo)

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      return await Promise.all([trx.save(neighborInfo, { reload: false }), Node.updateNeighbors(trx, entity)])
    } catch (e) {
      errLog(`Unable to create neighborinfo`, { err: e, neighborInfo, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateTelemetryData(db: DataSource, envelope: meshtastic.ServiceEnvelope) {
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

        const recentSimilarMetric = await deviceMetric.findRecentSimilarMetric(trx, secondsAgo(15))

        if (recentSimilarMetric) {
          return
        }

        await Promise.all([trx.save(deviceMetric, { reload: false }), Node.updateDeviceMetrics(trx, deviceMetric)])
      } else if (telemetry.variant === 'environmentMetrics') {
        const environmentMetric = toEnvironmentMetric(telemetry, nodeId)

        const recentSimilarMetric = await environmentMetric.findRecentSimilarMetric(trx, secondsAgo(15))
        if (recentSimilarMetric) {
          return
        }

        await Promise.all([trx.save(environmentMetric, { reload: false }), Node.updateEnvironmentMetrics(trx, environmentMetric)])
      } else if (telemetry.variant === 'powerMetrics') {
        const powerMetric = toPowerMetric(telemetry, nodeId)

        const recentSimilarMetric = await powerMetric.findRecentSimilarMetric(trx, secondsAgo(15))

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
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const mr = parseProtobuf(() => meshtastic.MapReport.decode(payload))

  const mapReport = toMapReport(packet, mr)

  await db.transaction('READ UNCOMMITTED', async (trx) => {
    try {
      return await Promise.all([trx.save(mapReport, { reload: false }), Node.updateMapReports(trx, mapReport)])
    } catch (e) {
      errLog(`Unable to save map report`, { err: e, mr, envelope })
      throw e
    }
  })
}
