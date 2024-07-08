import _ from 'lodash'
import { NodesEntity } from './database'
import { Node, PointTuple } from './nodes-entity'

export function googleMapsLink(point: PointTuple) {
  return `https://maps.google.com/?q=${point[0]},${point[1]}`
}

export function sanitizeNumber(n: number | string | undefined | null) {
  if (n) {
    if (typeof n === 'string') {
      n = Number(n)
      if (!isNaN(n)) {
        return n
      }
    }

    if (typeof n === 'number') {
      return n
    }
  }
}
export function sanitizeLatLong(lat: number | string | undefined | null, lon: number | string | undefined | null) {
  lat = sanitizeNumber(lat)
  lon = sanitizeNumber(lon)

  if (lat && lon) {
    if (lon <= 100) {
      lon += 360
    }
    return [lat, lon] as [number, number]
  }
}

export function sanitizeNodesProperties(nodes: NodesEntity[]): Node[] {
  return nodes.map((eachNode) => sanitizeNodeProperties(eachNode)) as Node[]
}

export function sanitizeNodeProperties(node: NodesEntity): Node {
  const returnValue = { ...node } as Node

  returnValue.nodeIdHex = `!${node.nodeId?.toString(16)}`

  if (node.latitude && node.longitude && !isNaN(node.latitude) && !isNaN(node.longitude)) {
    returnValue.latLng = [node.latitude / 10000000, node.longitude / 10000000]
    returnValue.offsetLatLng = sanitizeLatLong(node.latitude / 10000000, node.longitude / 10000000)
  }

  return returnValue
}

export function nodeName(node: Partial<Pick<Node, 'shortName' | 'longName' | 'nodeIdHex'>>) {
  return _.compact([node.shortName, node.longName, node.nodeIdHex]).at(0) || '<NO NAME>'
}

export function isMobile() {
  return /Android|webOS|phone|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
