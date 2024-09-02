import { MessageIn, MessageOut, Neighbour } from './interfaces.js'
/*
 * This file was generated by a tool.
 * Rerun sql-ts to regenerate this file.
 */
export interface DeviceMetricsEntity {
  airUtilTx?: number
  batteryLevel?: number
  channelUtilization?: number
  createdAt: string
  id: number
  nodeId: number
  updatedAt: string
  uptimeSeconds?: number
  voltage?: number
}
export interface EnvironmentMetricsEntity {
  barometricPressure?: number
  createdAt: string
  current?: number
  gasResistance?: number
  iaq?: number
  id: number
  nodeId: number
  relativeHumidity?: number
  temperature?: number
  updatedAt: string
  voltage?: number
}
export interface MapReportsEntity {
  altitude?: number
  createdAt: string
  firmwareVersion: string
  hardwareModel: number
  hasDefaultChannel?: boolean
  id: number
  latitude?: number
  longName: string
  longitude?: number
  modemPreset?: number
  nodeId: number
  numOnlineLocalNodes?: number
  positionPrecision?: number
  region?: number
  role?: number
  shortName: string
  updatedAt: string
}
export interface NeighbourInfosEntity {
  createdAt: string
  id: number
  neighbours?: Neighbour[]
  nodeBroadcastIntervalSecs: number
  nodeId: number
  updatedAt: string
}
export interface NodesEntity {
  airUtilTx?: number
  altitude?: number
  barometricPressure?: number
  batteryLevel?: number
  channelUtilization?: number
  createdAt: string
  firmwareVersion?: string
  flyXcToken?: string
  hardwareModel?: number
  hasDefaultChannel?: boolean
  inbox?: MessageIn[]
  isLicensed?: boolean
  latitude?: number
  longName?: string
  longitude?: number
  modemPreset?: number
  neighbourBroadcastIntervalSecs?: number
  neighbours?: Neighbour[]
  neighboursUpdatedAt?: string
  nodeId: number
  numOnlineLocalNodes?: number
  outbox?: MessageOut[]
  positionPdop?: number
  positionPrecision?: number
  positionPrecisionBits?: number
  positionTimestamp?: string
  positionUpdatedAt?: string
  region?: number
  relativeHumidity?: number
  role?: number
  satsInView?: number
  shortName?: string
  temperature?: number
  updatedAt: string
  uptimeSeconds?: number
  voltage?: number
}
export interface PositionsEntity {
  altitude?: number
  channel?: number
  channelId?: string
  createdAt: string
  from: number
  gatewayId?: number
  id: number
  latitude?: number
  longitude?: number
  nodeId: number
  packetId?: number
  pdop?: number
  precisionBits?: number
  satsInView?: number
  time?: string
  timestamp?: string
  to: number
  updatedAt: string
}
export interface PowerMetricsEntity {
  ch1Current?: number
  ch1Voltage?: number
  ch2Current?: number
  ch2Voltage?: number
  ch3Current?: number
  ch3Voltage?: number
  createdAt: string
  id: number
  nodeId: number
  updatedAt: string
}
export interface ServiceEnvelopesEntity {
  channelId: string
  createdAt: string
  from?: number
  gatewayId?: number
  id: number
  mqttTopic: string

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  protobuf: any
  to?: number
  updatedAt: string
}
export interface TextMessagesEntity {
  channel: number
  channelId: string
  createdAt: string
  from: number
  gatewayId?: number
  hopLimit?: number
  id: number
  packetId: number
  rxRssi?: number
  rxSnr?: number
  rxTime?: number
  text: string
  to: number
  updatedAt: string
  wantResponse?: boolean
}
export interface TraceroutesEntity {
  channel?: number
  channelId?: string
  createdAt: string
  from: number
  gatewayId?: number
  id: number
  packetId?: number
  route?: number[]
  to: number
  updatedAt: string
  wantResponse: boolean
}
export interface WaypointsEntity {
  channel: number
  channelId: string
  createdAt: string
  description?: string
  expire?: number
  from: number
  gatewayId?: number
  icon?: number
  id: number
  latitude: number
  lockedTo?: number
  longitude: number
  name?: string
  packetId: number
  to: number
  updatedAt: string
  waypointId: number
}
