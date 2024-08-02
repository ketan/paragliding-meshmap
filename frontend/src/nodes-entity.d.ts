import { NodesEntity } from './db-entities'

export interface NodesEntityForUI extends Omit<NodesEntity, 'latitude' | 'longitude'> {
  latLng?: L.PointTuple
  offsetLatLng?: L.PointTuple
  nodeIdHex: string
}

export type NodeNameAttributes = Pick<NodesEntityForUI, 'shortName' | 'longName' | 'nodeId' | 'nodeIdHex'>
