import { NodesEntity } from './db-entities'

export type PointTuple = [number, number]

export interface Node extends Omit<NodesEntity, 'latitude' | 'longitude'> {
  latLng?: PointTuple
  offsetLatLng?: PointTuple
  nodeIdHex: string
}

export type NodeNameAttributes = Pick<Node, 'shortName' | 'longName' | 'nodeId' | 'nodeIdHex'>
