import L, { TileLayer } from 'leaflet'
import _ from 'lodash'

type MapTypes = 'Open Street Map' | 'Google Satellite' | 'Google Hybrid'

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
      minZoom: 2,
      attribution:
        'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Data from <a target="_blank" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a>',
    }),
  },

  'Google Satellite': {
    tileProvider: L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 21,
      minZoom: 2,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution:
        'Tiles &copy; Google | Data from <a target="_blank" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a>',
    }),
  },

  'Google Hybrid': {
    tileProvider: L.tileLayer(`https://{s}.google.com/vt/lyrs=${GoogleMapLayers.hybridRoadsSatellite}&x={x}&y={y}&z={z}`, {
      maxZoom: 21,
      minZoom: 2,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution:
        'Tiles &copy; Google | Data from <a target="_blank" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a>',
    }),
  },
}

export class MapTiles {
  private mapType: MapTypes
  constructor(mapType: MapTypes) {
    this.mapType = mapType
  }

  tileLayer() {
    return mapProviders[this.mapType].tileProvider
  }

  allLayers() {
    return _.mapValues(mapProviders, (value) => {
      return value.tileProvider
    })
  }
}
