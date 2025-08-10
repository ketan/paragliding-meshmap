import { renderToString } from 'react-dom/server'
import L from 'leaflet'
import { NodeStatus } from '../entrypoints/js/utils/ui-util.tsx'

export const legendReactDOM = (
  <div className="p-3">
    {/* <div> */}
    <h3 className="text-2xl pb-2">Legend</h3>
    {/* </div> */}
    <div className="relative pl-4">
      <span className={`absolute h-3 w-3 rounded-full bg-green-600 top-0.5 left-0`}></span>
      Connected
    </div>
    <div className="relative pl-4">
      <span className={`absolute h-3 w-3 rounded-full bg-purple-600 top-0.5 left-0`}></span>
      Disconnected
    </div>
    <div className="relative pl-4">
      <span className={`absolute h-3 w-3 rounded-full bg-gray-600 top-0.5 left-0`}></span>
      Offline Too Long
    </div>
  </div>
)

export const mapLegendTemplate = renderToString(legendReactDOM)

export function addLegendToMap(map: L.Map) {
  const legend = new L.Control({ position: 'bottomleft' })

  legend.onAdd = function (_map) {
    const div = L.DomUtil.create('div', 'leaflet-control-layers')
    div.innerHTML = mapLegendTemplate
    return div
  }

  legend.addTo(map)
}

export function cssClassFor(str: NodeStatus | 'start-track' | 'end-track', activity?: string | undefined | null) {
  const activityClass = activity ? `node-activity-${activity}` : ''
  const commonClasses = `text-white rounded-full marker-location node-status-${str} ${activityClass}`

  switch (str) {
    case 'start-track':
      return `bg-blue-600 ${commonClasses}`
    case 'end-track':
      return `bg-amber-600 ${commonClasses}`
    case 'online':
      return `bg-green-600 ${commonClasses}`
    case 'old':
      return `bg-purple-600 ${commonClasses}`
    case 'offline':
      return `bg-gray-600 ${commonClasses}`
  }
}
