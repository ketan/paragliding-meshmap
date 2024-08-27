import { NodesEntityForUI } from '../../../nodes-entity'
import { isMobile } from './ui-util.tsx'

export function meshtasticIndiaTelegramLink() {
  if (isMobile()) {
    return 'https://t.me/meshtastic_india'
  } else {
    return 'https://web.telegram.org/k/#@meshtastic_india'
  }
}

export function nodeUrl(node: NodesEntityForUI | number) {
  const nodeId = typeof node === 'number' ? node : node.nodeId
  return `/?nodeId=${nodeId}`
}
