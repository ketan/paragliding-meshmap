import { ServiceEnvelope } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js'
import { PortNum } from '@buf/meshtastic_protobufs.bufbuild_es/meshtastic/portnums_pb.js'
import { AbortError } from 'p-retry'
import { decrypt } from './decryption.js'
import { CLIOptions } from './mqtt-cli.js'
import {
  createMapReports,
  createOrUpdateNeighborInfo,
  createOrUpdateNode,
  createOrUpdateTelemetryData,
  createOrUpdateTracerouteMessage,
  createOrUpdateWaypoint,
  createServiceEnvelope,
  saveTextMessage,
  updateMQTTStatus,
  updateNodeWithPosition,
} from './mqtt-orm.js'
import { ignorableProtobufError, toBigInt } from './utils.js'

export async function processMessage(cliOptions: CLIOptions, topic: string, payload: Buffer) {
  try {
    if (topic.includes('/stat/!')) {
      await handleNodeStatusMessage(topic, payload)
      return
    }
    if (topic.includes('/stat/')) {
      // ignore
      return
    }

    const envelope = ServiceEnvelope.fromBinary(payload)

    if (!envelope.packet) {
      return
    }

    const payloadVariant = decrypt(envelope.packet, cliOptions.decryptionKeys)
    if (payloadVariant) {
      envelope.packet.payloadVariant = payloadVariant
    }

    if (cliOptions.collectServiceEnvelopes) {
      await createServiceEnvelope(topic, payload, envelope)
    }

    if (envelope.packet.payloadVariant.case == 'decoded')
      switch (envelope.packet.payloadVariant.value.portnum) {
        case PortNum.TEXT_MESSAGE_APP:
          return await handleTextMessage(cliOptions, envelope)
        case PortNum.POSITION_APP:
          return await handlePositionMessage(cliOptions, envelope)
        case PortNum.NODEINFO_APP:
          return await handleNodeInfo(envelope)
        case PortNum.WAYPOINT_APP:
          return await handleWayPoint(cliOptions, envelope)
        case PortNum.NEIGHBORINFO_APP:
          return await handleNeighborInfo(cliOptions, envelope)
        case PortNum.TELEMETRY_APP:
          return await handleTelemetryMessage(envelope)
        case PortNum.TRACEROUTE_APP:
          return await handleTracerouteMessage(envelope)
        case PortNum.MAP_REPORT_APP:
          return await handleMapReport(cliOptions, envelope)
      }
  } catch (e) {
    if (!ignorableProtobufError(e)) {
      if (e instanceof AbortError) {
        throw e
      }
    }
    // logger.warn({ err: e, topic, payload }, `unable to process packet`)
  }
}

export async function handleNodeStatusMessage(topic: string, payload: Buffer) {
  const nodeIdHex = topic.split('/').at(-1)
  const nodeId = toBigInt(nodeIdHex)
  if (nodeId) {
    const mqttConnectionState = payload.toString()
    await updateMQTTStatus(nodeId, mqttConnectionState, new Date())
  }
}

export async function handleTextMessage(cliOptions: CLIOptions, envelope: ServiceEnvelope) {
  if (!cliOptions.collectTextMessages) {
    return
  }

  await saveTextMessage(envelope)
}

async function handlePositionMessage(cliOptions: CLIOptions, envelope: ServiceEnvelope) {
  await updateNodeWithPosition(envelope, cliOptions.collectPositions)
}

async function handleNodeInfo(envelope: ServiceEnvelope) {
  await createOrUpdateNode(envelope)
}

async function handleWayPoint(cliOptions: CLIOptions, envelope: ServiceEnvelope) {
  if (cliOptions.collectWaypoints) {
    await createOrUpdateWaypoint(envelope)
  }
}

async function handleNeighborInfo(cliOptions: CLIOptions, envelope: ServiceEnvelope) {
  await createOrUpdateNeighborInfo(envelope, cliOptions.collectNeighbourInfo)
}

async function handleTelemetryMessage(envelope: ServiceEnvelope) {
  await createOrUpdateTelemetryData(envelope)
}

async function handleTracerouteMessage(envelope: ServiceEnvelope) {
  await createOrUpdateTracerouteMessage(envelope)
}

async function handleMapReport(cliOptions: CLIOptions, envelope: ServiceEnvelope) {
  if (cliOptions.collectMapReports) {
    await createMapReports(envelope)
  }
}
