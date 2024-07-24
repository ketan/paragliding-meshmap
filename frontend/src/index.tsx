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
import debug from 'debug'
import _ from 'lodash'
import { DateTime, Duration } from 'luxon'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NodeRoleNameToID } from './hardware-modules'
import { HardwareModel } from './interfaces'
import { MapTiles } from './map-providers'
import { Node } from './nodes-entity'
import { AllData, SearchBarApp } from './searchbarapp'
import { cssClassFor, mapLegendTemplate } from './templates/legend'
import { nodePositionView } from './templates/node-position'
import { nodeTooltip } from './templates/node-tooltip'
import { getTextSize, isMobile, sanitizeLatLong, sanitizeNodesProperties, sanitizeNumber } from './ui-util'

const logger = debug('meshmap')
logger.enabled = true
interface UIConfig {
  defaultZoomLevelForNode: number

  // Don't show nodes older than this
  configNodesMaxAge: Duration

  // Nodes older than this are considered offline
  configNodesOfflineAge: Duration
}

const uiConfig: UIConfig = {
  defaultZoomLevelForNode: localStorage.defaultZoomLevelForNode || 15,
  configNodesMaxAge: Duration.fromISO(localStorage.configNodesMaxAge || 'P2D'),
  configNodesOfflineAge: Duration.fromISO(localStorage.configNodesOfflineAge || 'PT1D'),
}

const allData: AllData = {
  allNodes: [],
  newerNodes: [],
  newerNodesWithPosition: [],
  hardwareModels: [],
}

// for debugging
_.merge(window, { allData })

const defaultTileLayer = 'Google Hybrid'
const mapTiles = new MapTiles(defaultTileLayer)

const map = L.map(document.getElementById('map')!)
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
    return age < uiConfig.configNodesMaxAge
  })

  allData.newerNodesWithPosition = allData.newerNodes.filter((eachNode) => {
    return eachNode.latLng
  })

  console.info(`Total nodes - ${allData.allNodes.length}`)
  console.info(`Newer nodes - ${allData.newerNodes.length}`)
  console.info(`Newer nodes with position - ${allData.newerNodesWithPosition.length}`)

  redraw(map)

  ReactDOM.createRoot(document.getElementById('search-bar-app')!).render(
    <React.StrictMode>
      <SearchBarApp
        {...allData}
        selectCallback={(selectedNode) => {
          flyToNode(map, selectedNode.nodeId)
        }}
      />
    </React.StrictMode>
  )
}

function getIconFor(node: Node) {
  let icon = cssClassFor('disconnected')
  if (node.mqttConnectionState === 'online') {
    icon = cssClassFor('online')
  }

  const now = DateTime.now()
  const age = now.diff(DateTime.fromISO(node.updatedAt))

  if (age > uiConfig.configNodesOfflineAge) {
    icon = cssClassFor('offline')
  }

  return icon
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

function flyToNode(map: L.Map, nodeId?: string | number | null) {
  const node = findNodeById(allData.allNodes, nodeId)
  if (!node) {
    return
  }
  const iconSize = getTextSize(node)
  const tooltipOffset = !isMobile() ? new L.Point(iconSize[0] / 2 + 5, 0) : new L.Point(0, 0)
  if (node.offsetLatLng) {
    // const latlng = [node.latitude, node.longitude] as [number, number]

    map.flyTo(node.offsetLatLng, uiConfig.defaultZoomLevelForNode, {
      animate: true,
      duration: 1,
    })

    map.openTooltip(nodeTooltip(node), node.offsetLatLng, {
      interactive: true, // allow clicking etc inside tooltip
      permanent: true, // don't dismiss when clicking
      offset: tooltipOffset,
    })
  }
}

function redraw(map: Map) {
  allData.newerNodesWithPosition.forEach((eachNode) => {
    const iconSize = getTextSize(eachNode)

    const marker = L.marker(eachNode.offsetLatLng!, {
      icon: L.divIcon({
        className: getIconFor(eachNode),
        iconSize: iconSize,
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

    const tooltipOffset = !isMobile() ? new L.Point(iconSize[0] / 2 + 5, 0) : new L.Point(0, 0)

    if (!isMobile()) {
      marker.bindTooltip(() => nodeTooltip(eachNode), { interactive: true, offset: tooltipOffset })
    }
    marker.on('click', () => {
      marker.closeTooltip()
    })
    marker.on('click', () => {
      closeAllTooltips(map)
      closeAllPopups(map)
      logger(`Selected node`, eachNode)

      map.openTooltip(nodeTooltip(eachNode), eachNode.offsetLatLng!, {
        interactive: true, // allow clicking etc inside tooltip
        permanent: true, // don't dismiss when clicking
        offset: tooltipOffset,
      })
    })
  })

  if (!getQueryLatLngZoom()) {
    navigator.geolocation.getCurrentPosition((pos) => {
      if (!getQueryLatLngZoom()) {
        const latLng = sanitizeLatLong(pos.coords.latitude, pos.coords.longitude)
        if (latLng) {
          map.flyTo(latLng, 20, { animate: false })
        }
      }
    })
  }

  const queryParams = new URLSearchParams(window.location.search)
  const nodeIdParam = queryParams.get('nodeId')

  flyToNode(map, nodeIdParam)
}

function initializeMap() {
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
}

initializeMap()

addEventListener('load', function () {
  document.body.removeAttribute('style')
  loadAllData(map)
})
