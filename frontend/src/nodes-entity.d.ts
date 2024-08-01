import { NodesEntity } from './db-entities'

export interface Node extends Omit<NodesEntity, 'latitude' | 'longitude'> {
  latLng?: L.PointTuple
  offsetLatLng?: L.PointTuple
  nodeIdHex: string
}

export type NodeNameAttributes = Pick<Node, 'shortName' | 'longName' | 'nodeId' | 'nodeIdHex'>
