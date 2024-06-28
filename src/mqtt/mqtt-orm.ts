import { Data } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js'
import { ServiceEnvelope as ServiceEnvelopeProtobuf } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { Telemetry } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js'
import { AbortError } from 'p-retry'
import { ignorableProtobufError } from './utils.js'
import Node from '#entity/node'
import ServiceEnvelope from '#entity/service_envelope'
import TextMessage from '#entity/text_message'
import Position from '#entity/position'
import NeighbourInfo from '#entity/neighbour_info'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import PowerMetric from '#entity/power_metric'
import Traceroute from '#entity/traceroute'
import MapReport from '#entity/map_report'

export async function updateMQTTStatus(nodeId: number, mqttConnectionState: string, mqttConnectionStateUpdatedAt: Date) {
  let node: Node | null
  await db.transaction(async (trx) => {
    node = (await Node.findBy({ nodeId: nodeId }, { client: trx })) || new Node().merge({ nodeId: nodeId })
    try {
      node.updateMqttStatus(mqttConnectionState, mqttConnectionStateUpdatedAt)
      node.useTransaction(trx)
      await node.save()
    } catch (e) {
      logger.warn({ err: e, node }, `Unable to update mqtt status`)
      throw new AbortError(e)
    }
  })
}

export async function createServiceEnvelope(mqttTopic: string, payload: Buffer, envelope: ServiceEnvelopeProtobuf) {
  const se = ServiceEnvelope.fromPacket(mqttTopic, payload, envelope)
  await db.transaction(async (trx) => {
    try {
      se.useTransaction(trx)
      return await se.save()
    } catch (e) {
      logger.warn({ err: e, mqttTopic, se, envelope }, `Unable to create service envelope`)
      throw new AbortError(e)
    }
  })
}

export async function saveTextMessage(envelope: ServiceEnvelopeProtobuf) {
  const tm = TextMessage.fromPacket(envelope)
  await db.transaction(async (trx) => {
    try {
      tm.useTransaction(trx)
      return await tm.save()
    } catch (e) {
      logger.warn({ err: e, tm, envelope }, `Unable to create text message`)
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
  await db.transaction(async (trx) => {
    try {
      if (position.latitude != null && position.longitude != null) {
        try {
          node = await Node.findBy({ nodeId: nodeId }, { client: trx })
          if (!node) {
            node = new Node().merge({ nodeId: nodeId })
          }
          node.useTransaction(trx)
          node.updatePosition(position)
          await node.save()
        } catch (e) {
          throw new AbortError(e)
        }
      }

      if (savePosition) {
        position.useTransaction(trx)
        await position.saveIfNoSimilarRecentPosition(trx)
      }
    } catch (e) {
      logger.warn({ err: e, node, position, envelope }, `Unable to update node position`)
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
  await db.transaction(async (trx) => {
    try {
      node = (await Node.findBy({ nodeId: nodeId }, { client: trx })) || new Node().merge({ nodeId: nodeId })
      node.useTransaction(trx)
      node.merge(newNode.serialize({ fields: { omit: ['id'] } }))
      return await node.save()
    } catch (e) {
      logger.warn({ err: e, newNode, node, envelope }, `Unable to update node`)
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateWaypoint(envelope: ServiceEnvelopeProtobuf) {
  const waypoint = Waypoint.fromPacket(envelope)
  if (!waypoint) {
    return
  }

  await db.transaction(async (trx) => {
    try {
      return await waypoint.useTransaction(trx).save()
    } catch (e) {
      logger.warn({ err: e, waypoint, envelope }, `Unable to create waypoint`)
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
  await db.transaction(async (trx) => {
    try {
      node = (await Node.findBy({ nodeId: nodeId }, { client: trx })) || new Node().merge({ nodeId: nodeId })
      node.useTransaction(trx)
      node.updateNeighbors(neighborInfo.neighbours)
      await node.save()

      if (saveNeighborInfo) {
        neighborInfo.useTransaction(trx)
        await neighborInfo.save()
      }
    } catch (e) {
      logger.warn({ err: e, neighborInfo, envelope }, `Unable to create neighborinfo`)
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
      logger.warn({ err: e, envelope }, `Unable to parse telemetry`)
    }
  }

  if (!telemetry) {
    return
  }

  const nodeId = envelope.packet!.from

  let node: Node | null
  let metric: DeviceMetric | EnvironmentMetric | PowerMetric | undefined
  await db.transaction(async (trx) => {
    try {
      node = (await Node.findBy({ nodeId: nodeId }, { client: trx })) || new Node().merge({ nodeId: nodeId })
      node.useTransaction(trx)

      if (telemetry.variant.case == 'deviceMetrics') {
        metric = DeviceMetric.fromPacket(envelope)
        if (metric) {
          await metric.saveIfNoSimilarRecentMetric(trx)
          node.updateDeviceMetrics(metric)
        }
        await node.save()
      } else if (telemetry.variant.case == 'environmentMetrics') {
        metric = EnvironmentMetric.fromPacket(envelope)
        if (metric) {
          await metric.saveIfNoSimilarRecentMetric(trx)
          node.updateEnvironmentMetrics(metric)
        }
        await node.save()
      } else if (telemetry.variant.case == 'powerMetrics') {
        metric = PowerMetric.fromPacket(envelope)
        if (metric) {
          await metric.saveIfNoSimilarRecentMetric(trx)
        }
      }
    } catch (e) {
      logger.warn({ err: e, node, envelope, metric }, `Unable to create telemetry data`)
      throw new AbortError(e)
    }
  })
}

export async function createOrUpdateTracerouteMessage(envelope: ServiceEnvelopeProtobuf) {
  const traceroute = Traceroute.fromPacket(envelope)
  if (!traceroute) {
    return
  }

  await db.transaction(async (trx) => {
    try {
      traceroute.useTransaction(trx)
      await traceroute.save()
    } catch (e) {
      logger.warn({ err: e, traceroute, envelope }, `Unable to save traceroute`)
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

  await db.transaction(async (trx) => {
    try {
      node = (await Node.findBy({ nodeId: nodeId }, { client: trx })) || new Node().merge({ nodeId: nodeId })
      node.updateMapReports(mr)

      node.useTransaction(trx)
      mr.useTransaction(trx)

      await node.save()
      await mr.save()
    } catch (e) {
      logger.warn({ err: e, mr, node, envelope }, `Unable to save map report`)
      throw new AbortError(e)
    }
  })
}
