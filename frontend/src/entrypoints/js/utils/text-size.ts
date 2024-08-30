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
let timeout: number | null = null

// no validation in place for perf reason, so make sure to just pass a single character
function getCharWidth(c: string) {
  return [0, 0]
  if (!charSizes[c]) {
    if (timeout) {
      window.clearTimeout(timeout)
      timeout = null
    }
    if (!nodeSizeElement) {
      nodeSizeElement = document.createElement('div')
      nodeSizeElement.classList.add('w-auto', 'whitespace-nowrap')
      nodeSizeElement.innerHTML = nodePositionView('')
      document.body.appendChild(nodeSizeElement)
    }
    if (nodeSizeElement) {
      const span = nodeSizeElement.querySelector('span')!
      span.innerHTML = c
      charSizes[c] = [span.offsetWidth, span.offsetHeight]
      timeout = window.setTimeout(() => {
        // debugger
        nodeSizeElement!.remove()
        nodeSizeElement = null
        timeout = null
      })
    }
  }
  return charSizes[c]
}
