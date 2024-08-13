import L from 'leaflet'
import _ from 'lodash'
import { DateTime, Duration } from 'luxon'
import { NodesEntity } from '../../../db-entities'
import { NodeNameAttributes, NodesEntityForUI } from '../../../nodes-entity'
import { Tooltip } from '../components/tooltip'

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

export function sanitizeNodesProperties(nodes: NodesEntity[]): NodesEntityForUI[] {
  return nodes.map((eachNode) => sanitizeNodeProperties(eachNode)) as NodesEntityForUI[]
}

export function sanitizeNodeProperties(node: NodesEntity): NodesEntityForUI {
  const returnValue = { ...node } as NodesEntityForUI

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

export function isMobile() {
  return /Android|webOS|phone|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isDesktop() {
  return !isMobile()
}

export function timeAgo(timestamp?: string | null | Date | DateTime, addParens: boolean = false) {
  if (timestamp) {
    const dateTime = getDateTime(timestamp)
    return (
      <Tooltip tooltipText={dateTime.toFormat('dd LLL, yyyy hh:mm a')} tooltipDir="bottom-right" className="text-nowrap">
        {addParens ? '(' : null}
        {dateTime.toRelative()}
        {addParens ? ')' : null}
      </Tooltip>
    )
  }
  return
}

function getDateTime(timestamp: string | Date | DateTime) {
  if (typeof timestamp === 'string') {
    return DateTime.fromISO(timestamp)
  } else if (timestamp instanceof Date) {
    return DateTime.fromJSDate(timestamp)
  } else {
    return timestamp
  }
}

export function duration(seconds?: number | null) {
  if (!seconds) {
    return
  }
  return Duration.fromObject({ seconds }).rescale().toHuman()
}
