import { NodesEntity } from './database'

export type PointTuple = [number, number]

export interface Node extends Omit<NodesEntity, 'latitude' | 'longitude'> {
  latLng?: PointTuple
  offsetLatLng?: PointTuple
}
