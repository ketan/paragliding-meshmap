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
import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope as ServiceEnvelopeProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Telemetry } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import debug from 'debug'
import compact from 'lodash/compact.js'
import { AbortError } from 'p-retry'
import { EntityManager } from 'typeorm'
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

export async function createServiceEnvelope(mqttTopic: string, payload: Buffer, envelope: ServiceEnvelopeProtobuf) {
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

export async function saveTextMessage(envelope: ServiceEnvelopeProtobuf) {
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

export async function updateNodeWithPosition(envelope: ServiceEnvelopeProtobuf) {
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

export async function createOrUpdateNode(envelope: ServiceEnvelopeProtobuf) {
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

export async function createOrUpdateWaypoint(envelope: ServiceEnvelopeProtobuf) {
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

export async function createOrUpdateNeighborInfo(envelope: ServiceEnvelopeProtobuf) {
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

export async function createOrUpdateTelemetryData(envelope: ServiceEnvelopeProtobuf) {
  const telemetry = parseProtobuf(() =>
    Telemetry.fromBinary((envelope.packet!.payloadVariant.value as Data).payload, { readUnknownFields: true })
  )

  if (!telemetry) {
    return
  }

  const nodeId = envelope.packet!.from

  let node: Node | null
  let metric: DeviceMetric | EnvironmentMetric | PowerMetric | undefined
  let recentSimilarMetric: DeviceMetric | EnvironmentMetric | PowerMetric | null
  await AppDataSource.transaction(async (trx) => {
    try {
      node = await findOrCreateNode(trx, nodeId)
      if (telemetry.variant.case == 'deviceMetrics') {
        metric = DeviceMetric.fromTelemetry(nodeId, telemetry.variant.value)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          node.updateDeviceMetrics(metric)
          await trx.save(compact([node, recentSimilarMetric ? null : metric]))
        }
      } else if (telemetry.variant.case == 'environmentMetrics') {
        metric = EnvironmentMetric.fromTelemetry(nodeId, telemetry.variant.value)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          node.updateEnvironmentMetrics(metric)
          await trx.save(compact([node, recentSimilarMetric ? null : metric]))
        }
      } else if (telemetry.variant.case == 'powerMetrics') {
        metric = PowerMetric.fromTelemetry(nodeId, telemetry.variant.value)
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

export async function createOrUpdateTracerouteMessage(envelope: ServiceEnvelopeProtobuf) {
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

export async function createMapReports(envelope: ServiceEnvelopeProtobuf) {
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
