import { toBigInt } from '#helpers/utils'
import { meshtastic } from '../gen/meshtastic-protobufs.js'
import { Prisma } from '@prisma/client'

export function toServiceEnvelope(
  packet: meshtastic.IMeshPacket,
  payload: Buffer,
  mqttTopic: string,
  envelope: meshtastic.ServiceEnvelope
) {
  return {
    from: packet.from,
    to: packet.to,

    protobuf: payload,
    mqttTopic: mqttTopic,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),
  } as Prisma.ServiceEnvelopesCreateInput
}

export function toTextMessage(envelope: meshtastic.ServiceEnvelope, packet: meshtastic.IMeshPacket) {
  return {
    channelId: envelope.channelId,
    channel: packet.channel,
    from: packet.from,
    to: packet.to,
    packetId: packet.id,
    text: packet!.decoded!.payload!.toString(),
    wantResponse: packet.wantAck,
    gatewayId: toBigInt(envelope.gatewayId),
    hopLimit: packet.hopLimit,
    rxRssi: packet.rxRssi,
    rxSnr: packet.rxSnr,
    rxTime: packet.rxTime,
  } as Prisma.TextMessagesCreateInput
}

export function toPosition(packet: meshtastic.IMeshPacket, envelope: meshtastic.ServiceEnvelope, position: meshtastic.Position) {
  return {
    nodeId: packet.from,
    to: packet.to,
    from: packet.from,

    channel: packet.channel,
    packetId: packet.id,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),

    latitude: position.latitudeI,
    longitude: position.longitudeI,
    altitude: position.altitude,
  } as Prisma.PositionCreateInput
}

export function toNode(packet: meshtastic.IMeshPacket, user: meshtastic.User) {
  return {
    nodeId: packet.from,
    longName: user.longName,
    shortName: user.shortName,
    hardwareModel: user.hwModel,
    isLicensed: user.isLicensed,
    role: user.role,
  } as Prisma.NodeCreateInput
}

export function toWaypoint(packet: meshtastic.IMeshPacket, waypoint: meshtastic.Waypoint, envelope: meshtastic.ServiceEnvelope) {
  return {
    to: packet.to,
    from: packet.from,
    waypointId: waypoint.id,
    latitude: waypoint.latitudeI,
    longitude: waypoint.longitudeI,
    expire: waypoint.expire,
    lockedTo: waypoint.lockedTo,
    name: waypoint.name,
    description: waypoint.description,
    icon: waypoint.icon,
    channel: packet.channel,
    packetId: packet.id,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),
  } as Prisma.WaypointCreateInput
}

export function toNeighborInfo(packet: meshtastic.IMeshPacket, neighborInfo: meshtastic.NeighborInfo) {
  return {
    nodeId: packet.from,
    nodeBroadcastIntervalSecs: neighborInfo.nodeBroadcastIntervalSecs,
    neighbours: neighborInfo.neighbors.map((neighbour) => {
      return {
        nodeId: neighbour.nodeId,
        snr: neighbour.snr,
      }
    }),
  } as Prisma.NeighbourInfoCreateInput
}

export function toDeviceMetric(telemetry: meshtastic.Telemetry, nodeId: number) {
  const metric = telemetry.deviceMetrics!

  const deviceMetric = {
    nodeId: nodeId,
    batteryLevel: sanitizeNumber(metric.batteryLevel),
    voltage: sanitizeNumber(metric.voltage),
    channelUtilization: sanitizeNumber(metric.channelUtilization),
    airUtilTx: sanitizeNumber(metric.airUtilTx),
    uptimeSeconds: sanitizeNumber(metric.uptimeSeconds),
  } as Prisma.DeviceMetricCreateInput
  return deviceMetric
}

export function toPowerMetric(telemetry: meshtastic.Telemetry, nodeId: number) {
  const metric = telemetry.powerMetrics!

  const powerMetric = {
    nodeId: nodeId,
    ch1Current: metric.ch1Current,
    ch1Voltage: metric.ch1Voltage,

    ch2Current: metric.ch2Current,
    ch2Voltage: metric.ch2Voltage,

    ch3Current: metric.ch3Current,
    ch3Voltage: metric.ch3Voltage,
  } as Prisma.PowerMetricCreateInput
  return powerMetric
}

export function toEnvironmentMetric(telemetry: meshtastic.Telemetry, nodeId: number) {
  const metric = telemetry.environmentMetrics!
  const environmentMetric = {
    nodeId: nodeId,
    temperature: sanitizeNumber(metric.temperature),
    relativeHumidity: sanitizeNumber(metric.relativeHumidity),
    barometricPressure: sanitizeNumber(metric.barometricPressure),
    gasResistance: sanitizeNumber(metric.gasResistance),
    voltage: sanitizeNumber(metric.voltage),
    current: sanitizeNumber(metric.current),
    iaq: sanitizeNumber(metric.iaq),
  } as Prisma.EnvironmentMetricCreateInput
  return environmentMetric
}

export function toTraceroute(packet: meshtastic.IMeshPacket, rd: meshtastic.RouteDiscovery, envelope: meshtastic.ServiceEnvelope) {
  return {
    to: packet.to,
    from: packet.from,
    wantResponse: packet!.decoded!.wantResponse,
    route: rd.route,
    channel: packet.channel,
    packetId: packet.id,
    channelId: envelope.channelId,
    gatewayId: toBigInt(envelope.gatewayId),
  } as Prisma.TraceRouteCreateInput
}

export function toMapReport(packet: meshtastic.IMeshPacket, mr: meshtastic.MapReport) {
  return {
    nodeId: packet.from,
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
  } as Prisma.MapReportCreateInput
}

export function sanitizeNumber(num: number | undefined | null) {
  if (num === undefined || num === null) {
    return undefined
  }
  if (num !== 0) {
    return num
  }
  return undefined
}
