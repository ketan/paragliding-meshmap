import { parseProtobuf, toBigInt } from '../helpers/utils.js'
import { decrypt } from './decryption.js'
import { MQTTCLIOptions } from '../helpers/cli.js'
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
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { DataSource } from 'typeorm'

export async function processMessage(db: DataSource, cliOptions: MQTTCLIOptions, topic: string, payload: Buffer) {
  if (topic.includes('/stat/!')) {
    await handleNodeStatusMessage(db, topic, payload)
    return
  }

  if (topic.includes('/stat/')) {
    // ignore
    return
  }

  const envelope = parseProtobuf(() => meshtastic.ServiceEnvelope.decode(payload))

  if (!envelope.packet) {
    return
  }

  const payloadVariant = decrypt(envelope.packet, cliOptions.decryptionKeys)
  if (payloadVariant) {
    envelope.packet.decoded = payloadVariant
  }

  if (cliOptions.collectServiceEnvelopes) {
    await createServiceEnvelope(db, topic, payload, envelope)
  }

  if (envelope.packet.decoded) {
    switch (envelope.packet.decoded.portnum) {
      case meshtastic.PortNum.TEXT_MESSAGE_APP:
        return await saveTextMessage(db, envelope)
      case meshtastic.PortNum.POSITION_APP:
        return await updateNodeWithPosition(db, envelope)
      case meshtastic.PortNum.NODEINFO_APP:
        return await createOrUpdateNode(db, envelope)
      case meshtastic.PortNum.WAYPOINT_APP:
        return await createOrUpdateWaypoint(db, envelope)
      case meshtastic.PortNum.NEIGHBORINFO_APP:
        return await createOrUpdateNeighborInfo(db, envelope)
      case meshtastic.PortNum.TELEMETRY_APP:
        return await createOrUpdateTelemetryData(db, envelope)
      case meshtastic.PortNum.TRACEROUTE_APP:
        return await createOrUpdateTracerouteMessage(db, envelope)
      case meshtastic.PortNum.MAP_REPORT_APP:
        return await createMapReports(db, envelope)
    }
  }
}

export async function handleNodeStatusMessage(db: DataSource, topic: string, payload: Buffer) {
  const nodeIdHex = topic.split('/').at(-1)
  const nodeId = toBigInt(nodeIdHex)
  if (nodeId) {
    const mqttConnectionState = payload.toString()
    await updateMQTTStatus(db, nodeId, mqttConnectionState, new Date())
  }
}
