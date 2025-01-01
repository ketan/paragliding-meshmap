import L from 'leaflet'
import { nodePositionView } from '../../../templates/node-position.tsx'

export function getTextSize(text: string) {
  let width = 0
  let height = 0
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const [w, h] = getCharWidth(char)
    width += w
    height = Math.max(height, h)
  }

  return new L.Point(width + 15, height)
}

const charSizes: Record<string, [number, number]> = {}

let nodeSizeElement: HTMLElement | null = null

// no validation in place for perf reason, so make sure to just pass a single character
function getCharWidth(c: string) {
  if (!charSizes[c]) {
    if (!nodeSizeElement) {
      nodeSizeElement = document.createElement('div')
      nodeSizeElement.setAttribute('id', 'test-node-size')
      nodeSizeElement.classList.add('invisible', '-z-1000', 'absolute', '-left-[1000px]', '-top-[1000px]', 'w-auto', 'whitespace-nowrap')
      document.body.appendChild(nodeSizeElement)
    }
    if (nodeSizeElement) {
      nodeSizeElement.innerHTML = nodePositionView(c)
      const span = nodeSizeElement.querySelector('span')!
      charSizes[c] = [span.offsetWidth, span.offsetHeight]
    }
  }
  return charSizes[c]
}
