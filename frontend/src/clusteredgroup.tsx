import L from 'leaflet'
import { DateTime, Duration } from 'luxon'
import { Component, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { Node } from './nodes-entity'
import { cssClassFor } from './templates/legend'
import { nodePositionView } from './templates/node-position'
import { getTextSize } from './ui-util'

export interface Props {
  nodes: Node[]
  configNodesOfflineAge: Duration
  // map: L.Map | null
}

export function CreateMarkers(props: Props) {
  const allNodesLayer = L.layerGroup()
  const allClusteredLayerGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 10,
  })

  const map = useMap()

  const markers = props.nodes.map((eachNode) => {
    const iconSize = getTextSize(eachNode)
    const marker = L.marker(eachNode.offsetLatLng!, {
      icon: L.divIcon({
        className: getIconClassFor(eachNode, props.configNodesOfflineAge),
        iconSize: iconSize,
        html: nodePositionView(eachNode),
        iconAnchor: [iconSize.x / 2, iconSize.y / 2 + 16],
      }),
      zIndexOffset: eachNode.mqttConnectionState === 'online' ? 1000 : -1000,
    })
    marker.addTo(allNodesLayer)
    allClusteredLayerGroup.addLayer(marker)

    // allNodesLayer.addLayer(marker)
    // allClusteredLayerGroup.addLayer(marker)

    map.addLayer(allNodesLayer)
    map.addLayer(allClusteredLayerGroup)
    return marker
  })

  useEffect(() => {
    // invoked on unmount
    return () => {
      markers.forEach((marker) => {
        marker.remove()
      })
      allNodesLayer.remove()
      allClusteredLayerGroup.remove()
    }
  })

  // useEffect(() => {
  //   setMarkers(
  //     props.nodes.map((eachNode) => {
  //       const iconSize = getTextSize(eachNode)
  //       const marker = L.marker(eachNode.offsetLatLng!, {
  //         icon: L.divIcon({
  //           className: getIconClassFor(eachNode, props.configNodesOfflineAge),
  //           iconSize: iconSize,
  //           html: nodePositionView(eachNode),
  //           iconAnchor: [iconSize.x / 2, iconSize.y / 2 + 16],
  //         }),
  //         zIndexOffset: eachNode.mqttConnectionState === 'online' ? 1000 : -1000,
  //       })

  //       allNodesLayer.addLayer(marker)
  //       allClusteredLayerGroup.addLayer(marker)
  //       return marker
  //     })
  //   )

  //   const map = useMap()
  //   console.log(map)
  //   map.addLayer(allNodesLayer)
  //   map.addLayer(allClusteredLayerGroup)
  // }, [])

  return null
}

export class xCreateMarkers extends Component<Props> {
  markers: L.Marker<unknown>[] = []
  allNodesLayer = L.layerGroup()
  allClusteredLayerGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 10,
  })

  componentDidMount() {
    this.markers = this.props.nodes.map((eachNode) => {
      const iconSize = getTextSize(eachNode)
      const marker = L.marker(eachNode.offsetLatLng!, {
        icon: L.divIcon({
          className: getIconClassFor(eachNode, this.props.configNodesOfflineAge),
          iconSize: iconSize,
          html: nodePositionView(eachNode),
          iconAnchor: [iconSize.x / 2, iconSize.y / 2 + 16],
        }),
        zIndexOffset: eachNode.mqttConnectionState === 'online' ? 1000 : -1000,
      })

      this.allNodesLayer.addLayer(marker)
      this.allClusteredLayerGroup.addLayer(marker)
      return marker
    })

    console.log(`creating markers - ${this.markers.length} markers`)
    console.log(this.props.map)
    this.props.map?.addLayer(this.allNodesLayer)
    this.props.map?.addLayer(this.allClusteredLayerGroup)
  }

  componentWillUnmount(): void {
    this.markers.forEach((marker) => {
      marker.remove()
    })
    this.allNodesLayer.remove()
    this.allClusteredLayerGroup.remove()
  }

  render() {
    return null
  }
}

function getIconClassFor(node: Node, configNodesOfflineAge: Duration) {
  let icon = cssClassFor('disconnected')
  if (node.mqttConnectionState === 'online') {
    icon = cssClassFor('online')
  }

  const now = DateTime.now()
  const age = now.diff(DateTime.fromISO(node.updatedAt))

  if (age > configNodesOfflineAge) {
    icon = cssClassFor('offline')
  }

  return icon
}
