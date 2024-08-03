import { All } from '../../../interfaces'
import { NodesEntityForUI } from '../../../nodes-entity'
import { BROADCAST_ADDR } from './ui-util'

export function messageLink(from: number, to: number | All = BROADCAST_ADDR): string {
  return `/messages?from=${from}&to=${to}`
}

export function nodeUrl(node: NodesEntityForUI | number) {
  const nodeId = typeof node === 'number' ? node : node.nodeId
  return `/map/?nodeId=${nodeId}`
}
