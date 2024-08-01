// application css
import './index.scss'

// our stuff
import debug from 'debug'
import ReactDOM from 'react-dom/client'
import MapApp from './mapapp'
import { NodeDetailsApp } from './nodedetailsapp'
import { nodeTooltip } from './templates/node-tooltip'

const logger = debug('meshmap')
logger.enabled = true

export interface LatLngZoom {
  lat: number
  lng: number
  zoom?: number
}

addEventListener('load', function () {
  document.body.removeAttribute('style')
  const mapElem = document.getElementById('map')!
  ReactDOM.createRoot(mapElem).render(<MapApp mapType="Google Hybrid" />)
})

function handleButtonClick(event: MouseEvent) {
  const target = event.target as HTMLElement

  const showDetailsButton = target.closest('[data-node-id]')
  if (showDetailsButton) {
    const nodeId = Number(showDetailsButton.getAttribute('data-node-id')!)
    const div = document.createElement('div')
    div.classList.add('node-details')
    document.body.appendChild(div)
    const node = allData.allNodes.find((eachNode) => eachNode.nodeId === nodeId)!

    const root = ReactDOM.createRoot(div)
    root.render(
      <NodeDetailsApp
        node={node}
        ondismiss={() =>
          setTimeout(() => {
            root.unmount()
            div.remove()
          }, 100)
        }
      >
        {nodeTooltip(node)}
      </NodeDetailsApp>
    )
  }
}

document.addEventListener('click', handleButtonClick)
