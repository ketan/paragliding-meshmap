import {
  DeviceMetricsEntity,
  EnvironmentMetricsEntity,
  NeighbourInfosEntity,
  NodesEntity,
  TextMessagesEntity,
  TraceroutesEntity,
} from './db-entities'

export interface NodesEntityForUI extends Omit<NodesEntity, 'latitude' | 'longitude'> {
  latLng?: L.PointTuple
  offsetLatLng?: L.PointTuple
  nodeIdHex: string
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
