import { NodesEntityForUI } from '../../../nodes-entity'

export function nodeUrl(node: NodesEntityForUI | number) {
  const nodeId = typeof node === 'number' ? node : node.nodeId
  return `/?nodeId=${nodeId}`
}
