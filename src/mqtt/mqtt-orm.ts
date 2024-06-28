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
import { AbortError } from 'p-retry'
import { EntityManager } from 'typeorm'
import { AppDataSource } from '../data-source.js'
import { ignorableProtobufError } from './utils.js'

const logger = debug('meshmap:handler')

export async function updateMQTTStatus(nodeId: number, mqttConnectionState: string, mqttConnectionStateUpdatedAt: Date) {
  let node: Node | null

  await AppDataSource.transaction(async (trx) => {
    node = await findOrCreateNode(trx, nodeId)
    try {
      node.updateMqttStatus(mqttConnectionState, mqttConnectionStateUpdatedAt)
      await trx.save(node)
    } catch (e) {
      logger({ err: e, node }, `Unable to update mqtt status`)
      throw new AbortError(e)
    }
  })
}

export async function createServiceEnvelope(mqttTopic: string, payload: Buffer, envelope: ServiceEnvelopeProtobuf) {
  const se = ServiceEnvelope.fromPacket(mqttTopic, payload, envelope)
  await AppDataSource.transaction(async (trx) => {
    try {
      return await trx.save(se)
    } catch (e) {
      logger({ err: e, mqttTopic, se, envelope }, `Unable to create service envelope`)
      throw new AbortError(e)
    }
  })
}

export async function saveTextMessage(envelope: ServiceEnvelopeProtobuf) {
  const tm = TextMessage.fromPacket(envelope)
  await AppDataSource.transaction(async (trx) => {
    try {
      return await trx.save(tm)
    } catch (e) {
      logger({ err: e, tm, envelope }, `Unable to create text message`)
      throw new AbortError(e)
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
        try {
          node = await findOrCreateNode(trx, nodeId)

          node.updatePosition(position)
          await trx.save(node)
        } catch (e) {
          throw new AbortError(e)
        }
      }

      if (savePosition) {
        await position.saveIfNoSimilarRecentPosition(trx)
      }
    } catch (e) {
      logger({ err: e, node, position, envelope }, `Unable to update node position`)
      throw new AbortError(e)
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
      logger({ err: e, newNode, node, envelope }, `Unable to update node`)
      throw new AbortError(e)
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
      logger({ err: e, waypoint, envelope }, `Unable to create waypoint`)
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
      await trx.save(node)

      if (saveNeighborInfo) {
        await trx.save(neighborInfo)
      }
    } catch (e) {
      logger({ err: e, neighborInfo, envelope }, `Unable to create neighborinfo`)
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateTelemetryData(envelope: ServiceEnvelopeProtobuf) {
  let telemetry
  try {
    telemetry = Telemetry.fromBinary((envelope.packet!.payloadVariant.value as Data).payload)
  } catch (e) {
    if (!ignorableProtobufError(e)) {
      logger({ err: e, envelope }, `Unable to parse telemetry`)
    }
  }

  if (!telemetry) {
    return
  }

  const nodeId = envelope.packet!.from

  let node: Node | null
  let metric: DeviceMetric | EnvironmentMetric | PowerMetric | undefined
  await AppDataSource.transaction(async (trx) => {
    try {
      node = await findOrCreateNode(trx, nodeId)

      if (telemetry.variant.case == 'deviceMetrics') {
        metric = DeviceMetric.fromPacket(envelope)
        if (metric) {
          await metric.saveIfNoSimilarRecentMetric(trx)
          node.updateDeviceMetrics(metric)
        }
        await trx.save(node)
      } else if (telemetry.variant.case == 'environmentMetrics') {
        metric = EnvironmentMetric.fromPacket(envelope)
        if (metric) {
          await metric.saveIfNoSimilarRecentMetric(trx)
          node.updateEnvironmentMetrics(metric)
        }
        await trx.save(node)
      } else if (telemetry.variant.case == 'powerMetrics') {
        metric = PowerMetric.fromPacket(envelope)
        if (metric) {
          await metric.saveIfNoSimilarRecentMetric(trx)
        }
      }
    } catch (e) {
      logger({ err: e, node, envelope, metric }, `Unable to create telemetry data`)
      throw new AbortError(e)
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
      logger({ err: e, traceroute, envelope }, `Unable to save traceroute`)
      throw new AbortError(e)
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

      await trx.save(node)
      await trx.save(mr)
    } catch (e) {
      logger({ err: e, mr, node, envelope }, `Unable to save map report`)
      throw new AbortError(e)
    }
  })
}

async function findOrCreateNode(trx: EntityManager, nodeId: number): Promise<Node> {
  return (await trx.findOne(Node, { where: { nodeId: nodeId } })) || trx.merge(Node, new Node(), { nodeId: nodeId })
}
