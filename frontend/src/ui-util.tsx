import L from 'leaflet'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { NodesEntity } from './db-entities'
import { Node, NodeNameAttributes } from './nodes-entity'
import { nodePositionView } from './templates/node-position'
import { Tooltip } from './tooltip'

export const BROADCAST_ADDR = Number('0xffffffff')

export function googleMapsLink(point: L.PointTuple) {
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
    return [lat, lon] as L.PointTuple
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

export function nodeName(node: Partial<NodeNameAttributes>) {
  return _.compact([node.shortName, node.longName, node.nodeId, node.nodeIdHex]).at(0)?.toString() || '<NO NAME>'
}

export function nodeUrl(node: Node | number) {
  const nodeId = typeof node === 'number' ? node : node.nodeId
  return `/?nodeId=${nodeId}`
}

export function isMobile() {
  return /Android|webOS|phone|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function getTextSize(node: Node) {
  const name = nodeName(node)
  let width = 0
  let height = 0
  for (let i = 0; i < name.length; i++) {
    const char = name[i]
    const [w, h] = getCharWidth(char)
    width += w
    height = Math.max(height, h)
  }

  return new L.Point(width + 15, height)
}

const charSizes: Record<string, [number, number]> = {}
// no validation in place for perf reason, so make sure to just pass a single character
function getCharWidth(c: string) {
  if (!charSizes[c]) {
    const testNode = document.querySelector('#test-node-size')!
    testNode.innerHTML = nodePositionView({ shortName: c })
    const span = testNode.querySelector('span')!
    charSizes[c] = [span.offsetWidth, span.offsetHeight]
  }
  return charSizes[c]
}

export function timeAgo(timestamp?: string | null, addParens: boolean = false) {
  if (timestamp) {
    const dateTime = DateTime.fromISO(timestamp)
    return (
      <Tooltip tooltipText={dateTime.toFormat('dd LLL, yyyy hh:mm a')}>
        {addParens ? '(' : null}
        {dateTime.toRelative()}
        {addParens ? ')' : null}
      </Tooltip>
    )
  }
  return
}
