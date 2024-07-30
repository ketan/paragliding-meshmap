import type { FitBoundsOptions, LatLngBoundsExpression, Layer, LayerGroup, MapOptions, TileLayer } from 'leaflet'
import { Control, DomUtil, Map, tileLayer } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { mapEventsHandler } from './map-events-handler'
import { mapLegendTemplate } from './templates/legend'

export type ControlledLayer = {
  addLayer(layer: Layer): void
  removeLayer(layer: Layer): void
}

export type LeafletContextInterface = Readonly<{
  __version: number
  map: Map
  layerContainer?: ControlledLayer | LayerGroup
  layersControl?: Control.Layers
  overlayContainer?: Layer
  pane?: string
}>

const CONTEXT_VERSION = 1

function createLeafletContext(map: Map): LeafletContextInterface {
  return Object.freeze({ __version: CONTEXT_VERSION, map })
}

export interface MapContainerProps extends MapOptions {
  closeAllToolTipsAndPopupsAndPopups: (map: Map) => void
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  whenReady?: () => void
}

export const MAX_ZOOM = 22

enum GoogleMapLayers {
  roadsBuildings = 'm',
  roadsTerrain = 'p',
  alteredRoadmap = 'r',
  satelliteOnly = 's',
  terrainOnly = 't',
  hybridRoadsSatellite = 'y',
  roadsOnly = 'h',
}

export type MapTypes = 'Open Street Map' | 'Google Satellite' | 'Google Hybrid'

const allLayers: Record<MapTypes, TileLayer> = {
  'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: MAX_ZOOM, // increase from 18 to 22
    maxNativeZoom: MAX_ZOOM,
    minZoom: 2,
    attribution: `Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`,
  }),

  'Google Satellite': tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: MAX_ZOOM,
    maxNativeZoom: MAX_ZOOM,
    minZoom: 2,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: `Tiles &copy; Google | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`,
  }),
  'Google Hybrid': tileLayer(`https://{s}.google.com/vt/lyrs=${GoogleMapLayers.hybridRoadsSatellite}&x={x}&y={y}&z={z}`, {
    maxZoom: MAX_ZOOM,
    maxNativeZoom: MAX_ZOOM,
    minZoom: 2,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: `Tiles &copy; Google | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`,
  }),
}

export function FastMap({ closeAllToolTipsAndPopupsAndPopups, ...options }: MapContainerProps) {
  const [context, setContext] = useState<LeafletContextInterface | null>(null)

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new Map(node, { zoomControl: false, ...options })

      if (map.options.maxZoom) {
        map.setMaxZoom(map.options.maxZoom)
      }

      if (options.center) {
        map.setView(options.center)
      }

      if (options.zoom) {
        map.setZoom(options.zoom)
      }

      const layerControls = new Control.Layers()
      layerControls.addTo(map)

      Object.keys(allLayers).forEach((key) => {
        const layer = allLayers[key as MapTypes]
        layerControls.addBaseLayer(layer, key)
        layer.addTo(map)
      })

      const legend = new Control({ position: 'bottomleft' })
      legend.onAdd = function (_map) {
        const div = DomUtil.create('div', 'leaflet-control-layers')
        div.innerHTML = mapLegendTemplate
        return div
      }
      legend.addTo(map)

      mapEventsHandler({ map, closeAllToolTipsAndPopupsAndPopups })
      setContext(createLeafletContext(map))
    }
  }, [])

  useEffect(() => {
    return () => {
      context?.map.remove()
    }
  }, [])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
