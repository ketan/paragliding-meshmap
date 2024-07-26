import { renderToString } from 'react-dom/server'

export const mapLegendTemplate = renderToString(
  <div className="p-4">
    <div>
      <h3 className="text-2xl">Legend</h3>
    </div>
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
  const commonClasses = `bg-white rounded-full border-4 border-none ring-offset-4 ring-4`

  if (str === 'online') {
    return `ring-green-600 ${commonClasses}`
  } else if (str === 'disconnected') {
    return `ring-purple-600 ${commonClasses}`
  } else if (str === 'offline') {
    return `ring-red-600 ${commonClasses}`
  }
}
