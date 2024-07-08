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
import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope as ServiceEnvelopeProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Telemetry } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import debug from 'debug'
import _ from 'lodash'
import { AbortError } from 'p-retry'
import { EntityManager } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { parseProtobuf, secondsAgo } from '../helpers/utils.js'
import { CLIOptions } from './mqtt-cli.js'


const logger = debug('meshmap:handler')

export async function purgeData(cliOptions: CLIOptions) {
  if (cliOptions.purgeNodesUnheardOlderThan) {
    await AppDataSource.transaction(async (trx) => {
      await Node.purge(cliOptions.purgeNodesUnheardOlderThan, trx)
      await DeviceMetric.purge(cliOptions.purgeDeviceMetricsOlderThan, trx)
      await EnvironmentMetric.purge(cliOptions.purgeEnvironmentMetricsOlderThan, trx)
      await PowerMetric.purge(cliOptions.purgePowerMetricsOlderThan, trx)
      await Position.purge(cliOptions.purgePositionsOlderThan, trx)
    })
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
      logger(`Unable to update mqtt status`, { err: e, node })
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
      logger(`Unable to create service envelope`, { err: e, mqttTopic, se, envelope })
      throw e
    }
  })
}

export async function saveTextMessage(envelope: ServiceEnvelopeProtobuf, collectTextMessages: boolean) {
  if (!collectTextMessages) {
    return
  }
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
      logger(`Unable to create text message`, { err: e, tm, envelope })
      throw e
    }
  })
}

export async function updateNodeWithPosition(envelope: ServiceEnvelopeProtobuf, savePosition: boolean) {
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
        node.updatePosition(position)
        await trx.save(node)
      }

      if (savePosition) {
        await position.saveIfNoSimilarRecentPosition(trx)
      }
    } catch (e) {
      logger(`Unable to update node position`, { err: e, node, position, envelope })
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
      logger(`Unable to update node`, { err: e, newNode, node, envelope })
      throw e
    }
  })
}

export async function createOrUpdateWaypoint(envelope: ServiceEnvelopeProtobuf, saveWaypoint: boolean) {
  if (!saveWaypoint) {
    return
  }
  const waypoint = Waypoint.fromPacket(envelope)
  if (!waypoint) {
    return
  }

  await AppDataSource.transaction(async (trx) => {
    try {
      return await trx.save(waypoint)
    } catch (e) {
      logger(`Unable to create waypoint`, { err: e, waypoint, envelope })
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateNeighborInfo(envelope: ServiceEnvelopeProtobuf, saveNeighborInfo: boolean) {
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
      await trx.save(_.compact([node, saveNeighborInfo ? neighborInfo : null]))
    } catch (e) {
      logger(`Unable to create neighborinfo`, { err: e, neighborInfo, envelope })
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
        metric = DeviceMetric.fromPacket(envelope)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          node.updateDeviceMetrics(metric)
          await trx.save(_.compact([node, recentSimilarMetric ? null : metric]))
        }
      } else if (telemetry.variant.case == 'environmentMetrics') {
        metric = EnvironmentMetric.fromPacket(envelope)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          node.updateEnvironmentMetrics(metric)
          await trx.save(_.compact([node, recentSimilarMetric ? null : metric]))
        }
      } else if (telemetry.variant.case == 'powerMetrics') {
        metric = PowerMetric.fromPacket(envelope)
        if (metric) {
          recentSimilarMetric = await metric.findRecentSimilarMetric(secondsAgo(15), trx)
          if (recentSimilarMetric) {
            return
          }

          await trx.save(_.compact([recentSimilarMetric ? null : metric]))
        }
      }
    } catch (e) {
      logger(`Unable to create telemetry data`, { err: e, node, envelope, metric })
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
      logger(`Unable to save traceroute`, { err: e, traceroute, envelope })
      throw e
    }
  })
}

export async function createMapReports(envelope: ServiceEnvelopeProtobuf, collectMapReports: boolean) {
  if (!collectMapReports) {
    return
  }
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
      logger(`Unable to save map report`, { err: e, mr, node, envelope })
      throw e
    }
  })
}

async function findOrCreateNode(trx: EntityManager, nodeId: number): Promise<Node> {
  return (await trx.findOne(Node, { where: { nodeId: nodeId } })) || trx.merge(Node, new Node(), { nodeId: nodeId })
}
