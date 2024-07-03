import _ from 'lodash'
import { NodesEntity } from './database'

export function googleMapsLink(node: NodesEntity) {
  return `https://maps.google.com/?q=${node.latitude},${node.longitude}`
}

export function sanitizeLatLong(lat: number | string | undefined | null, lon: number | string | undefined | null) {
  if (lat && lon) {
    if (typeof lat === 'string') {
      lat = Number(lat)
    }
    if (typeof lon !== 'number') {
      lon = Number(lon)
    }

    if (!isNaN(lon) && !isNaN(lat)) {
      if (lon <= 100) {
        lon += 360
      }
      return [lat, lon] as [number, number]
    }
  }
}

export function sanitizeNodesProperties(nodes: NodesEntity[]): NodesEntity[] {
  nodes.forEach((eachNode) => sanitizeNodeProperties(eachNode))
  return nodes
}

export function sanitizeNodeProperties(eachNode: Partial<NodesEntity>) {
  if (eachNode.latitude && eachNode.longitude && !isNaN(eachNode.latitude) && !isNaN(eachNode.longitude)) {
    eachNode.latitude = eachNode.latitude / 10000000
    eachNode.longitude = eachNode.longitude / 10000000
  } else {
    eachNode.latitude = undefined
    eachNode.longitude = undefined
  }
}

export function nodeName(node: Partial<Pick<NodesEntity, 'shortName' | 'longName' | 'nodeId'>>) {
  const hexNodeId = node.nodeId ? `0x${node.nodeId?.toString(16)}` : undefined
  return _.compact([node.shortName, node.longName, hexNodeId]).at(0) || '<NO NAME>'
}
