import { AppDataSource } from '#config/data-source'
import { BaseType } from '#entity/base_type'
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
import { errLog } from '#helpers/logger'
import { parseProtobuf, secondsAgo } from '#helpers/utils'
import debug from 'debug'
import compact from 'lodash/compact.js'
import { AbortError } from 'p-retry'
import { EntityManager } from 'typeorm'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { MQTTCLIOptions } from '../helpers/cli.js'

export async function dumpStats(logger: debug.Debugger) {
  const entityTypes = Array.from(AppDataSource.entityMetadatasMap.keys())

  const counts: Record<string, number> = {}

  for (let index = 0; index < entityTypes.length; index++) {
    const entity = entityTypes[index]
    if (entity === BaseType) {
      continue
    }

    const repo = AppDataSource.manager.getRepository(entity)
    const count = await AppDataSource.manager.count(entity)

    counts[repo.metadata.name] = count
  }

  logger(`Record counts`, counts)
}
export async function purgeData(cliOptions: MQTTCLIOptions, logger: debug.Debugger) {
  if (cliOptions.purgeDataOlderThan) {
    await dumpStats(logger)
    logger(`Purging data now`)
    await AppDataSource.transaction(async (trx) => {
      await DeviceMetric.purge(cliOptions.purgeDataOlderThan, trx)
      await EnvironmentMetric.purge(cliOptions.purgeDataOlderThan, trx)
      await MapReport.purge(cliOptions.purgeDataOlderThan, trx)
      await NeighbourInfo.purge(cliOptions.purgeDataOlderThan, trx)
      await Node.purge(cliOptions.purgeDataOlderThan, trx)
      await Position.purge(cliOptions.purgeDataOlderThan, trx)
      await PowerMetric.purge(cliOptions.purgeDataOlderThan, trx)
      await ServiceEnvelope.purge(cliOptions.purgeDataOlderThan, trx)
      await TextMessage.purge(cliOptions.purgeDataOlderThan, trx)
      await Traceroute.purge(cliOptions.purgeDataOlderThan, trx)
      await Waypoint.purge(cliOptions.purgeDataOlderThan, trx)
    })
    await dumpStats(logger)
    logger(`Next purge in ${cliOptions.purgeEvery.toHuman()}`)
  }
}

export async function updateMQTTStatus(nodeId: number, mqttConnectionState: string, mqttConnectionStateUpdatedAt: Date) {
  let node: Node | null

  await AppDataSource.transaction(async (trx) => {
    node = await findOrCreateNode(trx, nodeId)
    try {
      node.updateMqttStatus(mqttConnectionState, mqttConnectionStateUpdatedAt)
      await trx.save(node)
    } catch (e) {
      errLog(`Unable to update mqtt status`, { err: e, node })
      throw e
    }
  })
}

export async function createServiceEnvelope(mqttTopic: string, payload: Buffer, envelope: meshtastic.ServiceEnvelope) {
  const se = ServiceEnvelope.fromPacket(mqttTopic, payload, envelope)
  await AppDataSource.transaction(async (trx) => {
    try {
      return await trx.save(se)
    } catch (e) {
      errLog(`Unable to create service envelope`, { err: e, mqttTopic, se, envelope })
      throw e
    }
  })
}

export async function saveTextMessage(envelope: meshtastic.ServiceEnvelope) {
  const tm = TextMessage.fromPacket(envelope)
  if (!tm) {
    return
  }
  await AppDataSource.transaction(async (trx) => {
    try {
      const senderNode = await findOrCreateNode(trx, tm.from)
      const receiverNode = await findOrCreateNode(trx, tm.to)

      senderNode.outboundMessage(tm)
      receiverNode.inboundMessage(tm)

      return await trx.save([tm, senderNode, receiverNode])
    } catch (e) {
      errLog(`Unable to create text message`, { err: e, tm, envelope })
      throw e
    }
  })
}

export async function updateNodeWithPosition(envelope: meshtastic.ServiceEnvelope) {
  const position = Position.fromPacket(envelope)
  if (!position) {
    return
  }

  const nodeId = position.from
  let node: Node | null

  await AppDataSource.transaction(async (trx) => {
    try {
      if (position.latitude != null && position.longitude != null) {
        node = await findOrCreateNode(trx, nodeId)
        const recentPosition = await position.findRecentPosition(secondsAgo(15), trx)
        if (recentPosition) {
          return
        }
        node.updatePosition(position)
        await trx.save([node, position])
      }
    } catch (e) {
      errLog(`Unable to update node position`, { err: e, node, position, envelope })
      throw e
    }
  })
}

export async function createOrUpdateNode(envelope: meshtastic.ServiceEnvelope) {
  const newNode = Node.fromPacket(envelope)
  if (!newNode) {
    return
  }

  const nodeId = newNode.nodeId
  let node: Node | null
  await AppDataSource.transaction(async (trx) => {
    try {
      node = await findOrCreateNode(trx, nodeId)
      trx.merge(Node, node, newNode)
      return await trx.save(node)
    } catch (e) {
      errLog(`Unable to update node`, { err: e, newNode, node, envelope })
      throw e
    }
  })
}

export async function createOrUpdateWaypoint(envelope: meshtastic.ServiceEnvelope) {
  const waypoint = Waypoint.fromPacket(envelope)
  if (!waypoint) {
    return
  }

  await AppDataSource.transaction(async (trx) => {
    try {
      return await trx.save(waypoint)
    } catch (e) {
      errLog(`Unable to create waypoint`, { err: e, waypoint, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateNeighborInfo(envelope: meshtastic.ServiceEnvelope) {
  const neighborInfo = NeighbourInfo.fromPacket(envelope)
  if (!neighborInfo) {
    return
  }

  const nodeId = neighborInfo.nodeId
  let node: Node | null
  await AppDataSource.transaction(async (trx) => {
    try {
      node = await findOrCreateNode(trx, nodeId)
      node.updateNeighbors(neighborInfo.neighbours)
      await trx.save([node, neighborInfo])
    } catch (e) {
      errLog(`Unable to create neighborinfo`, { err: e, neighborInfo, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateTelemetryData(envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const telemetry = parseProtobuf(() => meshtastic.Telemetry.decode(payload))

  if (!telemetry) {
    return
  }

  const nodeId = packet.from!

  let node: Node | null
  let metric: DeviceMetric | EnvironmentMetric | PowerMetric | undefined
  let recentSimilarMetric: DeviceMetric | EnvironmentMetric | PowerMetric | null
  await AppDataSource.transaction(async (trx) => {
    try {
      node = await findOrCreateNode(trx, nodeId)
      if (telemetry.variant == 'deviceMetrics') {
        metric = DeviceMetric.fromTelemetry(nodeId, telemetry.deviceMetrics!)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          node.updateDeviceMetrics(metric)
          await trx.save(compact([node, recentSimilarMetric ? null : metric]))
        }
      } else if (telemetry.variant == 'environmentMetrics') {
        metric = EnvironmentMetric.fromTelemetry(nodeId, telemetry.environmentMetrics!)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          node.updateEnvironmentMetrics(metric)
          await trx.save(compact([node, recentSimilarMetric ? null : metric]))
        }
      } else if (telemetry.variant == 'powerMetrics') {
        metric = PowerMetric.fromTelemetry(nodeId, telemetry.powerMetrics!)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          await trx.save(compact([recentSimilarMetric ? null : metric]))
        }
      }
    } catch (e) {
      errLog(`Unable to create telemetry data`, { err: e, node, envelope, metric })
      throw e
    }
  })
}

export async function createOrUpdateTracerouteMessage(envelope: meshtastic.ServiceEnvelope) {
  const traceroute = Traceroute.fromPacket(envelope)
  if (!traceroute) {
    return
  }

  await AppDataSource.transaction(async (trx) => {
    try {
      await trx.save(traceroute)
    } catch (e) {
      errLog(`Unable to save traceroute`, { err: e, traceroute, envelope })
      throw e
    }
  })
}

export async function createMapReports(envelope: meshtastic.ServiceEnvelope) {
  const mr = MapReport.fromPacket(envelope)
  if (!mr) {
    return
  }

  const nodeId = mr.nodeId
  let node: Node | null

  await AppDataSource.transaction(async (trx) => {
    try {
      node = await findOrCreateNode(trx, nodeId)
      node.updateMapReports(mr)

      await trx.save([node, mr])
    } catch (e) {
      errLog(`Unable to save map report`, { err: e, mr, node, envelope })
      throw e
    }
  })
}

async function findOrCreateNode(trx: EntityManager, nodeId: number): Promise<Node> {
  return (await trx.findOne(Node, { where: { nodeId: nodeId } })) || trx.merge(Node, new Node(), { nodeId: nodeId })
}
