// application css
import './index.scss'

// leaflet stuff
import L, { Map } from 'leaflet'
import 'leaflet-arrowheads'
import 'leaflet-geometryutil'
import 'leaflet-groupedlayercontrol'
import 'leaflet-polylineoffset'
import 'leaflet.markercluster'

// our stuff
import { DateTime } from 'luxon'
// import { Node } from './database'
import { NodeRoleNameToID } from './hardware-modules'
import { HardwareModel } from './interfaces'
import { MapTiles } from './map-providers'
import { Node } from './nodes-entity'
import { mapLegendTemplate } from './templates/legend'
import { nodePositionView } from './templates/node-position'
import { nodeTooltip } from './templates/node-tooltip'
import { isMobile, sanitizeLatLong, sanitizeNodesProperties, sanitizeNumber } from './ui-util'
import _ from 'lodash'

interface UIConfig {
  defaultZoomLevelForNode: number
  configNodesMaxAgeInSeconds: number
  configNodesOfflineAgeInSeconds: number
}

const uiConfig: UIConfig = {
  defaultZoomLevelForNode: 15,
  configNodesMaxAgeInSeconds: 24 * 3600, // 24 hours
  configNodesOfflineAgeInSeconds: 3600, // 1 hour
}

const allData: {
  allNodes: Node[]
  newerNodes: Node[]
  newerNodesWithPosition: Node[]
  hardwareModels: HardwareModel[]
} = {
  allNodes: [],
  newerNodes: [],
  newerNodesWithPosition: [],
  hardwareModels: [],
}

// for debugging
_.merge(window, {allData})

const defaultTileLayer = 'Google Hybrid'
const mapTiles = new MapTiles(defaultTileLayer)

const allNodesLayerGroup = new L.LayerGroup()
const allRouterNodesLayerGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  disableClusteringAtZoom: 10,
})
const allClusteredLayerGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  disableClusteringAtZoom: 10,
})
const legendOverlayGroup = new L.LayerGroup()
const legend = new L.Control({ position: 'bottomleft' })
legend.onAdd = function (_map) {
  const div = L.DomUtil.create('div', 'leaflet-control-layers')
  div.innerHTML = mapLegendTemplate
  return div
}

async function loadAllData(map: Map) {
  const [nodesResponse, hardwareModelsResponse] = await Promise.all([fetch('/api/nodes'), fetch('/api/hardware-models')])

  if (nodesResponse.status == 200 || nodesResponse.status == 304) {
    allData.allNodes = sanitizeNodesProperties(await nodesResponse.json()) as Node[]
  }

  if (hardwareModelsResponse.status == 200 || hardwareModelsResponse.status == 304) {
    allData.hardwareModels = (await hardwareModelsResponse.json()) as HardwareModel[]
  }

  const now = DateTime.now()
  allData.newerNodes = allData.allNodes.filter((eachNode) => {
    const age = now.diff(DateTime.fromISO(eachNode.updatedAt))
    return age.seconds < uiConfig.configNodesMaxAgeInSeconds
  })

  allData.newerNodesWithPosition = allData.newerNodes.filter((eachNode) => {
    return eachNode.latLng
  })

  console.info(`Total nodes - ${allData.allNodes.length}`)
  console.info(`Newer nodes - ${allData.newerNodes.length}`)
  console.info(`Newer nodes with position - ${allData.newerNodesWithPosition.length}`)

  redraw(map)
}

function getIconFor(node: Node) {
  const commonClasses = `bg-white rounded-full border-4 border-none ring-offset-4 ring-4`
  if (node.mqttConnectionState === 'online') {
    return `ring-green-500 ${commonClasses}`
  }
  const now = DateTime.now()
  const age = now.diff(DateTime.fromISO(node.updatedAt))

  if (age.seconds > uiConfig.configNodesOfflineAgeInSeconds) {
    return `ring-red-500 ${commonClasses}`
  }
  return `ring-blue-500 ${commonClasses}`
}

export interface LatLngZoom {
  lat: number
  lng: number
  zoom?: number
}

function getQueryLatLngZoom() {
  const queryParams = new URLSearchParams(window.location.search)
  const queryLat = queryParams.get('lat')
  const queryLng = queryParams.get('lng')
  const queryZoom = sanitizeNumber(queryParams.get('zoom'))

  const latLng = sanitizeLatLong(queryLat, queryLng)
  if (latLng) {
    const result: LatLngZoom = {
      lat: latLng[0],
      lng: latLng[1],
    }

    if (queryZoom) {
      result.zoom = queryZoom
    }
    return result
  }
}

function closeAllPopups(map: Map) {
  map.eachLayer(function (layer) {
    if (layer.options.pane === 'popupPane') {
      layer.removeFrom(map)
    }
  })
}

function closeAllTooltips(map: Map) {
  map.eachLayer(function (layer) {
    if (layer.options.pane === 'tooltipPane') {
      layer.removeFrom(map)
    }
  })
}

function findNodeById(nodes: Node[], nodeId?: number | string | null) {
  // find node by id
  nodeId = sanitizeNumber(nodeId)
  if (!nodeId) {
    return
  }
  return nodes.find((node) => node.nodeId === nodeId)
}

function redraw(map: Map) {
  allData.newerNodesWithPosition.forEach((eachNode) => {
    // const latitude = eachNode.latitude!

    // let longitude = eachNode.longitude!
    // // everything to the left of Australia appears on the right of the map
    // if (longitude <= 100) {
    //   longitude += 360
    // }

    const marker = L.marker(eachNode.offsetLatLng!, {
      icon: L.divIcon({
        className: getIconFor(eachNode),
        iconSize: getTextSize(eachNode),
        html: nodePositionView(eachNode),
      }),

      zIndexOffset: eachNode.mqttConnectionState === 'online' ? 1000 : -1000,
    })

    marker.addTo(allNodesLayerGroup)
    allClusteredLayerGroup.addLayer(marker)

    if (
      eachNode.role == NodeRoleNameToID.ROUTER ||
      eachNode.role == NodeRoleNameToID.ROUTER_CLIENT ||
      eachNode.role == NodeRoleNameToID.REPEATER
    ) {
      allRouterNodesLayerGroup.addLayer(marker)
    }

    if (!isMobile()) {
      marker.bindTooltip(() => nodeTooltip(eachNode), { interactive: true })
    }
    marker.on('click', () => {
      marker.closeTooltip()
    })
    marker.on('click', () => {
      closeAllTooltips(map)
      closeAllPopups(map)

      map.openTooltip(nodeTooltip(eachNode), eachNode.offsetLatLng!, {
        interactive: true, // allow clicking etc inside tooltip
        permanent: true, // don't dismiss when clicking
      })
    })
  })

  if (!getQueryLatLngZoom()) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latLng = sanitizeLatLong(pos.coords.latitude, pos.coords.longitude)
      if (latLng) {
        map.flyTo(latLng, 20, { animate: false })
      }
    })
  }

  const queryParams = new URLSearchParams(window.location.search)
  const nodeIdParam = queryParams.get('nodeId')

  const node = findNodeById(allData.allNodes, nodeIdParam)

  if (node) {
    if (node.offsetLatLng) {
      // const latlng = [node.latitude, node.longitude] as [number, number]

      map.flyTo(node.offsetLatLng, uiConfig.defaultZoomLevelForNode, {
        animate: true,
        duration: 1,
      })

      map.openTooltip(nodeTooltip(node), node.offsetLatLng, {
        interactive: true, // allow clicking etc inside tooltip
        permanent: true, // don't dismiss when clicking
      })
    }
  }
}

addEventListener('load', () => {
  const map = L.map('map')
  const latLngZoom = getQueryLatLngZoom()

  if (latLngZoom) {
    map.setView([latLngZoom.lat, latLngZoom.lng], latLngZoom.zoom || 5)
  } else {
    map.setView([21, 79 + 360], 5)
  }

  map.on('moveend zoomend', function () {
    const latLng = map.getCenter()
    const zoom = map.getZoom()

    const url = new URL(window.location.href)
    url.searchParams.set('lat', latLng.lat.toString())
    url.searchParams.set('lng', latLng.lng.toString())
    url.searchParams.set('zoom', zoom.toString())
    window.history.replaceState(null, '', url.toString())
  })

  map.on('click', function (event) {
    const clickedElement = event.originalEvent.target as Element

    if (clickedElement.closest('.leaflet-tooltip')) {
      // we clicked on a tooltip. do nothing
      return
    }

    closeAllTooltips(map)
    closeAllPopups(map)
  })

  mapTiles.tileLayer().addTo(map)
  legendOverlayGroup.addTo(map)
  map.addControl(legend)

  const neighboursOverlayGroup = new L.LayerGroup()
  const waypointsLayerGroup = new L.LayerGroup()

  L.control
    .groupedLayers(
      mapTiles.allLayers(),
      {
        Nodes: {
          All: allNodesLayerGroup,
          Routers: allRouterNodesLayerGroup,
          Clustered: allClusteredLayerGroup,
          None: new L.LayerGroup(),
        },
        Overlays: {
          // Legend: legendOverlayGroup,
          Neighbours: neighboursOverlayGroup,
          Waypoints: waypointsLayerGroup,
        },
      },
      {
        exclusiveGroups: ['Nodes'],
      }
    )
    .addTo(map)

  allClusteredLayerGroup.addTo(map)

  loadAllData(map)
})

function getTextSize(node: Node) {
  const testNode = document.querySelector('#test-node-size')!
  testNode.innerHTML = nodePositionView(node)
  const span = testNode.querySelector('span')!

  return [span.offsetWidth + 10, span.offsetHeight - 4] as [number, number]
}
