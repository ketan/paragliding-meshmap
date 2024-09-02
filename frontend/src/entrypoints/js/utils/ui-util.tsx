import L from 'leaflet'
import _ from 'lodash'
import { DateTime, Duration } from 'luxon'
import { NodesEntity } from '../../../db-entities'
import { NodeNameAttributes, NodesEntityForUI } from '../../../nodes-entity'
import { Tooltip } from '../components/tooltip'
import { NodeRoleIDToName } from '../../../hardware-modules.ts'

export const BROADCAST_ADDR = Number('0xffffffff')

export type NodeStatus = 'online' | 'old' | 'offline'

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

export function positionPrecision(node: { positionPrecisionBits?: number }) {
  if (node.positionPrecisionBits === 32) {
    return 'High'
  }
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
      <Tooltip tooltipText={dateTime.toFormat('dd LLL, yyyy hh:mm a')} tooltipDir="bottom-end" className="text-nowrap">
        {addParens ? '(' : null}
        {dateTime.toRelative()}
        {addParens ? ')' : null}
      </Tooltip>
    )
  }
  return
}

export function nodeStatus(node: Pick<NodesEntityForUI, 'updatedAt'>, onlineAge: Duration, offlineAge: Duration): NodeStatus {
  const updatedAt = getDateTime(node.updatedAt)
  const now = DateTime.local()

  if (now.diff(updatedAt) < onlineAge) {
    return 'online'
  } else if (now.diff(updatedAt) < offlineAge) {
    return 'old'
  } else {
    return 'offline'
  }
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

interface MapParams {
  configure?: boolean
  lat?: number | false
  lng?: number | false
  nodeId?: number | false
  zoom?: number | false
}

export interface MessageParams {
  from: number
  to: number | 'all'
  since?: string | null
}

function applyParam<T extends MapParams | MessageParams>(param: keyof T, opts: T, url: URL) {
  if (opts[param]) {
    url.searchParams.set(param as string, opts[param]!.toString())
  }
  if (opts[param] === false) {
    url.searchParams.delete(param as string)
  }
}

function setUrl(url: URL) {
  window.history.replaceState(null, '', url.toString())
}

export function setMapUrlParams(opts: MapParams) {
  const url = new URL(window.location.href)

  applyParam('nodeId', opts, url)
  applyParam('lat', opts, url)
  applyParam('lng', opts, url)
  applyParam('zoom', opts, url)

  if (opts.configure) {
    url.searchParams.set('configure', '')
  }
  if (opts.configure === false) {
    url.searchParams.delete('configure')
  }
  setUrl(url)
}

export function setMessageUrlParams(opts: MessageParams) {
  const url = new URL(window.location.href)

  url.searchParams.set('from', opts.from.toString())
  url.searchParams.set('to', opts.to.toString())
  if (opts.since) {
    url.searchParams.set('since', opts.since)
  }

  setUrl(url)
}

export function clearMessageUrlParams() {
  const url = new URL(window.location.href)
  url.searchParams.delete('from')
  url.searchParams.delete('to')
  url.searchParams.delete('since')
  setUrl(url)
}

export function nodeRole(node: NodesEntity) {
  let role: string | undefined
  if (node.role !== null && node.role !== undefined) {
    role = NodeRoleIDToName[node.role]
  }
  return role || `UNKNOWN`
}

export function duration(seconds?: number | null) {
  if (!seconds) {
    return
  }
  return Duration.fromObject({ seconds }).rescale().toHuman()
}

export function randomHex(length: number) {
  return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
}
