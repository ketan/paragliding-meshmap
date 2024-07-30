import { renderToString } from 'react-dom/server'

export const mapLegendTemplate = renderToString(
  <div className="p-3">
    {/* <div> */}
    <h3 className="text-2xl pb-2">Legend</h3>
    {/* </div> */}
    <div className="relative pl-4">
      <span className={`absolute h-3 w-3 rounded-full bg-green-600 border-3 top-0.5 left-0`}></span>
      Connected
    </div>
    <div className="relative pl-4">
      <span className={`absolute h-3 w-3 rounded-full bg-purple-600 border-3 top-0.5 left-0`}></span>
      Disconnected
    </div>
    <div className="relative pl-4">
      <span className={`absolute h-3 w-3 rounded-full bg-red-600 border-3 top-0.5 left-0`}></span>
      Offline Too Long
    </div>
  </div>
)

export function cssClassFor(str: 'online' | 'offline' | 'disconnected') {
  const commonClasses = `text-white rounded-full border-4 border-none marker-location node-status-${str}`

  if (str === 'online') {
    return `bg-green-600 ${commonClasses}`
  } else if (str === 'disconnected') {
    return `bg-purple-600 ${commonClasses}`
  } else if (str === 'offline') {
    return `bg-red-600 ${commonClasses}`
  }
}
