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
import { NodesEntity } from './database'
import { NodeRoleNameToID } from './hardware-modules'
import { HardwareModel } from './interfaces'
import { MapTiles } from './map-providers'
import { mapLegendTemplate } from './templates/legend'
import { nodePositionView } from './templates/node-position'
import { nodeTooltip } from './templates/node-tooltip'
import { sanitizeLatLong, sanitizeNodesProperties, sanitizeNumber } from './ui-util'
import { DateTime } from 'luxon'
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
  allNodes: NodesEntity[]
  newerNodes: NodesEntity[]
  newerNodesWithPosition: NodesEntity[]
  hardwareModels: HardwareModel[]
} = {
  allNodes: [],
  newerNodes: [],
  newerNodesWithPosition: [],
  hardwareModels: [],
}

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
    allData.allNodes = sanitizeNodesProperties(await nodesResponse.json()) as NodesEntity[]
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
    return eachNode.latitude && eachNode.longitude
  })

  console.info(`Total nodes - ${allData.allNodes.length}`)
  console.info(`Newer nodes - ${allData.newerNodes.length}`)
  console.info(`Newer nodes with position - ${allData.newerNodesWithPosition.length}`)

  redraw(map)
}

function getIconFor(node: NodesEntity) {
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

function redraw(map: Map) {
  allData.newerNodesWithPosition.forEach((eachNode) => {
    let longitude = eachNode.longitude!
    // everything to the left of Australia appears on the right of the map
    if (longitude <= 100) {
      longitude += 360
    }

    const marker = L.marker([eachNode.latitude!, longitude], {
      icon: L.divIcon({
        className: getIconFor(eachNode),
        iconSize: getTextSize(eachNode),
        html: nodePositionView(eachNode),
      }),
      zIndexOffset: eachNode.mqttConnectionState === 'online' ? 1000 : -1000,
    })

    marker.bindTooltip(getTooltip(eachNode))

    marker.addTo(allNodesLayerGroup)
    allClusteredLayerGroup.addLayer(marker)

    if (
      eachNode.role == NodeRoleNameToID.ROUTER ||
      eachNode.role == NodeRoleNameToID.ROUTER_CLIENT ||
      eachNode.role == NodeRoleNameToID.REPEATER
    ) {
      allRouterNodesLayerGroup.addLayer(marker)
    }
  })

  if (!getQueryLatLngZoom()) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const latLng = sanitizeLatLong(pos.coords.latitude, pos.coords.longitude)
      if (latLng) {
        map.flyTo(latLng, 20, { animate: false })
      }
    })
  }
}

addEventListener('load', () => {
  const map = L.map('map')
  const latLngZoom = getQueryLatLngZoom()

  if (latLngZoom) {
    console.log(latLngZoom, `load`)
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

function getTextSize(node: NodesEntity) {
  const testNode = document.querySelector('#test-node-size')!
  testNode.innerHTML = nodePositionView(node)
  const span = testNode.querySelector('span')!

  return [span.offsetWidth + 10, span.offsetHeight - 4] as [number, number]
}

function getTooltip(eachNode: NodesEntity): L.Content | ((layer: L.Layer) => L.Content) | L.Tooltip {
  return nodeTooltip(eachNode)
}
