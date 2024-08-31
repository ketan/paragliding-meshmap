import { parseProtobuf, toBigInt } from '#helpers/utils'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import Node from '#entity/node'
import DeviceMetric from '#entity/device_metric'
import EnvironmentMetric from '#entity/environment_metric'
import MapReport from '#entity/map_report'
import NeighbourInfo from '#entity/neighbour_info'
import ServiceEnvelope from '#entity/service_envelope'
import TextMessage from '#entity/text_message'
import Traceroute from '#entity/traceroute'
import Waypoint from '#entity/waypoint'
import PowerMetric from '#entity/power_metric'
import Position from '#entity/position'
import { decodeLog } from '#helpers/logger'

export function toServiceEnvelope(payload: Buffer, mqttTopic: string, envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet!

  const serviceEnvelope = new ServiceEnvelope({
    from: packet.from!,
    to: packet.to!,

    protobuf: payload,
    mqttTopic: mqttTopic,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),
  })
  decodeLog(serviceEnvelope)
  return serviceEnvelope
}

export function toTextMessage(envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  if (!packet) {
    return
  }

  const textMessage = new TextMessage({
    channelId: envelope.channelId,
    channel: packet.channel!,
    from: packet.from!,
    to: packet.to!,
    packetId: packet.id!,
    text: packet!.decoded!.payload!.toString(),
    wantResponse: packet.wantAck,
    gatewayId: toBigInt(envelope.gatewayId),
    hopLimit: packet.hopLimit!,
    rxRssi: packet.rxRssi!,
    rxSnr: packet.rxSnr!,
    rxTime: packet.rxTime!,
  })
  decodeLog(textMessage)
  return textMessage
}

export function toPosition(envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  if (!packet) {
    return
  }

  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const positionPB = parseProtobuf(() => meshtastic.Position.decode(payload))

  const position = new Position({
    nodeId: packet.from!,
    to: packet.to!,
    from: packet.from!,

    channel: packet.channel!,
    packetId: packet.id!,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),

    latitude: positionPB.latitudeI,
    longitude: positionPB.longitudeI,
    altitude: positionPB.altitude,
    satsInView: positionPB.satsInView,
    precisionBits: positionPB.precisionBits,
    timestamp: positionPB.timestamp,
    time: positionPB.time,
    pdop: positionPB.PDOP,
  })
  decodeLog(position, positionPB)
  return position
}

export function toNode(envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const user = parseProtobuf(() => meshtastic.User.decode(payload))

  const node = new Node({
    nodeId: packet.from!,
    longName: user.longName,
    shortName: user.shortName,
    hardwareModel: user.hwModel,
    isLicensed: user.isLicensed,
    role: user.role,
  })
  decodeLog(node)
  return node
}

export function toWaypoint(packet: meshtastic.IMeshPacket, waypointPB: meshtastic.Waypoint, envelope: meshtastic.ServiceEnvelope) {
  const waypoint = new Waypoint({
    to: packet.to!,
    from: packet.from!,
    waypointId: waypointPB.id,
    latitude: waypointPB.latitudeI,
    longitude: waypointPB.longitudeI,
    expire: waypointPB.expire,
    lockedTo: waypointPB.lockedTo,
    name: waypointPB.name,
    description: waypointPB.description,
    icon: waypointPB.icon,
    channel: packet.channel!,
    packetId: packet.id!,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),
  })
  decodeLog(waypoint)
  return waypoint
}

export function toNeighborInfo(envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const neighborInfoPB = parseProtobuf(() => meshtastic.NeighborInfo.decode(payload))

  const neighbourInfo = new NeighbourInfo({
    nodeId: packet.from!,
    nodeBroadcastIntervalSecs: neighborInfoPB.nodeBroadcastIntervalSecs,
    neighbours: neighborInfoPB.neighbors.map((neighbour) => {
      return {
        nodeId: neighbour.nodeId!,
        snr: neighbour.snr!,
      }
    }),
  })
  decodeLog(neighbourInfo)
  return neighbourInfo
}

export function toDeviceMetric(telemetry: meshtastic.Telemetry, nodeId: number) {
  const metric = telemetry.deviceMetrics!

  const deviceMetric = new DeviceMetric({
    nodeId: nodeId,
    batteryLevel: sanitizeNumber(metric.batteryLevel),
    voltage: sanitizeNumber(metric.voltage),
    channelUtilization: sanitizeNumber(metric.channelUtilization),
    airUtilTx: sanitizeNumber(metric.airUtilTx),
    uptimeSeconds: sanitizeNumber(metric.uptimeSeconds),
  })
  decodeLog(deviceMetric)
  return deviceMetric
}

export function toPowerMetric(telemetry: meshtastic.Telemetry, nodeId: number) {
  const metric = telemetry.powerMetrics!

  const powerMetric = new PowerMetric({
    nodeId: nodeId,
    ch1Current: metric.ch1Current!,
    ch1Voltage: metric.ch1Voltage!,

    ch2Current: metric.ch2Current!,
    ch2Voltage: metric.ch2Voltage!,

    ch3Current: metric.ch3Current!,
    ch3Voltage: metric.ch3Voltage!,
  })
  decodeLog(powerMetric)
  return powerMetric
}

export function toEnvironmentMetric(telemetry: meshtastic.Telemetry, nodeId: number) {
  const metric = telemetry.environmentMetrics!

  const environmentMetric = new EnvironmentMetric({
    nodeId: nodeId,
    temperature: sanitizeNumber(metric.temperature),
    relativeHumidity: sanitizeNumber(metric.relativeHumidity),
    barometricPressure: sanitizeNumber(metric.barometricPressure),
    gasResistance: sanitizeNumber(metric.gasResistance),
    voltage: sanitizeNumber(metric.voltage),
    current: sanitizeNumber(metric.current),
    iaq: sanitizeNumber(metric.iaq),
  })
  decodeLog(environmentMetric)
  return environmentMetric
}

export function toTraceroute(packet: meshtastic.IMeshPacket, rd: meshtastic.RouteDiscovery, envelope: meshtastic.ServiceEnvelope) {
  const traceroute = new Traceroute({
    to: packet.to!,
    from: packet.from!,
    wantResponse: packet!.decoded!.wantResponse!,
    route: rd.route,
    channel: packet.channel!,
    packetId: packet.id!,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),
  })
  decodeLog(traceroute)
  return traceroute
}

export function toMapReport(envelope: meshtastic.ServiceEnvelope) {
  const packet = envelope.packet
  const payload = packet?.decoded?.payload

  if (!payload) {
    return
  }

  const mr = parseProtobuf(() => meshtastic.MapReport.decode(payload))

  const mapReport = new MapReport({
    nodeId: packet.from!,
    longName: mr.longName,
    shortName: mr.shortName,
    role: mr.role,
    hardwareModel: mr.hwModel,
    firmwareVersion: mr.firmwareVersion,
    region: mr.region,
    modemPreset: mr.modemPreset,
    hasDefaultChannel: mr.hasDefaultChannel,
    latitude: mr.latitudeI,
    longitude: mr.longitudeI,
    altitude: mr.altitude,
    positionPrecision: mr.positionPrecision,
    numOnlineLocalNodes: mr.numOnlineLocalNodes,
  })
  decodeLog(mapReport)
  return mapReport
}

export function sanitizeNumber(num: number | undefined | null) {
  if (num === undefined || num === null) {
    return
  }
  if (num !== 0) {
    return num
  }
}
