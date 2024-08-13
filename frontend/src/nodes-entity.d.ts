import {
  DeviceMetricsEntity,
  EnvironmentMetricsEntity,
  NeighbourInfosEntity,
  NodesEntity,
  PositionsEntity,
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

export interface PositionsEntityJSON extends Pick<PositionsEntity, 'latitude' | 'longitude' | 'altitude' | 'createdAt' | 'id'> {}

export interface PositionData {
  latitude: number
  longitude: number
  altitude?: number
  time: DateTime
}

export type TextMessagesEntityForUI = Pick<TextMessagesEntity, 'id' | 'to' | 'from' | 'text' | 'createdAt'>

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

export type NodeNameAttributes = Pick<NodesEntityForUI, 'shortName' | 'longName' | 'nodeId' | 'nodeIdHex'>
