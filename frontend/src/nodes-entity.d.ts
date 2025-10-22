import {
  DeviceMetricsEntity,
  EnvironmentMetricsEntity,
  NeighbourInfosEntity,
  NodesEntity,
  TextMessagesEntity,
  TraceroutesEntity,
} from './db-entities'
import { PointTuple } from 'leaflet'
import { DateTime } from 'luxon'

export interface NodesEntityForUI extends Omit<NodesEntity, 'latitude' | 'longitude'> {
  latLng?: PointTuple
  offsetLatLng?: PointTuple
  nodeIdHex: string
}

export interface PositionsEntityJSON {
  id: number
  latitude: number
  longitude: number
  altitude: number
  aboveGroundLevel: number
  createdAt: string

  pdop?: number
  timestamp?: string
  time?: string
  precisionBits?: number
  satsInView?: number
}

export interface MessagesEntityForUI extends Pick<TextMessagesEntity, 'createdAt' | 'from' | 'to' | 'text' | 'id'> {}

export interface PositionData extends Omit<PositionsEntityJSON, 'timestamp' | 'createdAt' | 'time'> {
  time?: DateTime
}

export type DeviceMetricsEntityForUI = Pick<
  DeviceMetricsEntity,
  'batteryLevel' | 'voltage' | 'channelUtilization' | 'airUtilTx' | 'createdAt'
>

export type EnvironmentMetricsEntityForUI = Pick<
  EnvironmentMetricsEntity,
  'barometricPressure' | 'relativeHumidity' | 'temperature' | 'createdAt'
>

export type NeighbourInfosEntityForUI = Pick<NeighbourInfosEntity, 'neighbours' | 'createdAt'>

export type TraceroutesEntityForUI = Pick<TraceroutesEntity, 'route' | 'to' | 'createdAt'>

export type NodeNameAttributes = Pick<NodesEntityForUI, 'shortName' | 'longName' | 'nodeId' | 'nodeIdHex' | 'positionPrecisionBits'>
