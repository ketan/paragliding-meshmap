import L, { TileLayer } from 'leaflet'
import _ from 'lodash'

export type MapTypes = 'Open Street Map' | 'Google Satellite' | 'Google Hybrid' | 'ESRI Satellite'

enum GoogleMapLayers {
  roadsBuildings = 'm',
  roadsTerrain = 'p',
  alteredRoadmap = 'r',
  satelliteOnly = 's',
  terrainOnly = 't',
  hybridRoadsSatellite = 'y',
  roadsOnly = 'h',
}

const mapProviders: Record<MapTypes, { tileProvider: TileLayer }> = {
  'Open Street Map': {
    tileProvider: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22, // increase from 18 to 22
      maxNativeZoom: 18,
      minZoom: 2,
      attribution: `Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | v${__GIT_SHA__}`,
    }),
  },

  'Google Satellite': {
    tileProvider: L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 22,
      maxNativeZoom: 18,
      minZoom: 2,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: `Tiles &copy; <a target="_blank" rel="noreferrer" href="https://maps.google.com/">Google</a> | v${__GIT_SHA__}`,
    }),
  },

  'Google Hybrid': {
    tileProvider: L.tileLayer(`https://{s}.google.com/vt/lyrs=${GoogleMapLayers.hybridRoadsSatellite}&x={x}&y={y}&z={z}`, {
      maxZoom: 22,
      maxNativeZoom: 18,
      minZoom: 2,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: `Tiles &copy; <a target="_blank" rel="noreferrer" href="https://maps.google.com/">Google</a> | v${__GIT_SHA__}`,
    }),
  },
  'ESRI Satellite': {
    tileProvider: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 21,
      maxNativeZoom: 21,
      minZoom: 2,
      attribution:
        'Tiles &copy; <a target="_blank" rel="noreferrer" href="https://developers.arcgis.com/documentation/mapping-apis-and-services/deployment/basemap-attribution/">Esri</a> | v${__GIT_SHA__}',
    }),
  },
}

export class MapTiles {
  private readonly mapType: MapTypes

  constructor(mapType: MapTypes) {
    this.mapType = mapType
  }

  addDefaultLayerToMap(map: L.Map) {
    return mapProviders[this.mapType].tileProvider.addTo(map)
  }

  static allLayers() {
    return _.mapValues(mapProviders, (value) => {
      return value.tileProvider
    })
  }
}
