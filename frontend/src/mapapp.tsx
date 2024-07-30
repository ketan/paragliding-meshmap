import { Map } from 'leaflet'
import { DateTime, Duration } from 'luxon'
import React, { Component, ReactNode } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import { HardwareModel } from './interfaces'
import { MapEventHandler } from './map-events-handler'
import { Node } from './nodes-entity'
import { sanitizeLatLong, sanitizeNodesProperties, sanitizeNumber } from './ui-util'

interface LatLngZoom {
  lat: number
  lng: number
  zoom?: number
}

type MapTypes = 'Open Street Map' | 'Google Satellite' | 'Google Hybrid'

interface MapProps {
  mapType: MapTypes
}

enum GoogleMapLayers {
  roadsBuildings = 'm',
  roadsTerrain = 'p',
  alteredRoadmap = 'r',
  satelliteOnly = 's',
  terrainOnly = 't',
  hybridRoadsSatellite = 'y',
  roadsOnly = 'h',
}

interface UIConfig {
  defaultZoomLevelForNode: number

  // Don't show nodes older than this
  configNodesMaxAge: Duration

  // Nodes older than this are considered offline
  configNodesOfflineAge: Duration
}
interface AllData {
  allNodes: Node[]
  newerNodes: Node[]
  newerNodesWithPosition: Node[]
  hardwareModels: HardwareModel[]
}

interface MapState extends Partial<AllData>, UIConfig {
  mapCenter?: LatLngZoom
}

export default class MapApp extends Component<MapProps, MapState> {
  readonly MAX_ZOOM = 22
  map = React.createRef<L.Map>()

  state: MapState = {
    defaultZoomLevelForNode: localStorage.defaultZoomLevelForNode || 15,
    configNodesMaxAge: Duration.fromISO(localStorage.configNodesMaxAge || 'P2D'),
    configNodesOfflineAge: Duration.fromISO(localStorage.configNodesOfflineAge || 'PT1D'),
  }

  async componentDidMount() {
    const mapCenter = this.getQueryLatLngZoom()

    if (mapCenter) {
      this.setState({ mapCenter })
    } else {
      this.setState({ mapCenter: { lat: 21, lng: 79 + 360, zoom: 5 } })
    }

    this.maybeFlyToCurrentLocation()

    const [nodesResponse, hardwareModelsResponse] = await Promise.all([fetch('/api/nodes'), fetch('/api/hardware-models')])

    if (hardwareModelsResponse.status == 200 || hardwareModelsResponse.status == 304) {
      const hardwareModels = (await hardwareModelsResponse.json()) as HardwareModel[]
      this.setState({ hardwareModels })
    }

    const now = DateTime.now()

    if (nodesResponse.status == 200 || nodesResponse.status == 304) {
      const allNodes = sanitizeNodesProperties(await nodesResponse.json()) as Node[]

      this.setState({ allNodes }, () => {
        const newerNodes = allNodes.filter((eachNode) => {
          const age = now.diff(DateTime.fromISO(eachNode.updatedAt))
          return age < this.state.configNodesMaxAge
        })

        const newerNodesWithPosition = newerNodes.filter((eachNode) => {
          return eachNode.latLng
        })

        this.setState({ newerNodes, newerNodesWithPosition }, () => {
          console.info(`Total nodes - ${this.state.allNodes?.length}`)
          console.info(`Newer nodes - ${this.state.newerNodes?.length}`)
          console.info(`Newer nodes with position - ${this.state.newerNodesWithPosition?.length}`)
        })
      })
    }
  }

  private maybeFlyToCurrentLocation() {
    const mapCenter = this.getQueryLatLngZoom()
    navigator.geolocation.getCurrentPosition((pos) => {
      if (!mapCenter) {
        const latLng = sanitizeLatLong(pos.coords.latitude, pos.coords.longitude)
        if (latLng) {
          this.map.current?.flyTo(latLng, 20, { animate: false })
        }
      }
    })
  }

  render() {
    if (!this.state.mapCenter) {
      return <div>Initializing map...</div>
    }

    return (
      <MapContainer
        ref={this.map}
        center={[this.state.mapCenter.lat, this.state.mapCenter.lng]}
        zoom={this.state.mapCenter.zoom}
        maxZoom={this.MAX_ZOOM}
        style={{ width: '100%', height: '100%' }}
      >
        <MapEventHandler closeAllToolTipsAndPopupsAndPopups={(map) => this.closeAllToolTipsAndPopupsAndPopups(map)} />
        {this.layers()}
        {this.legendControl()}

        {this.state.newerNodesWithPosition?.map((eachNode) => {
          return (
            <Marker key={eachNode.id} position={eachNode.latLng!}>
              <Popup>
                <div>
                  <h3 className="text-2xl">{eachNode.longName || eachNode.shortName || eachNode.nodeIdHex}</h3>
                  <div>
                    <a href={`/node/${eachNode.nodeId}`}>Details</a>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    )
  }

  private layers() {
    return (
      <LayersControl position="topright">
        {Object.keys(this.allLayers).map((key) => {
          return (
            <LayersControl.BaseLayer key={key} name={key} checked={key === this.props.mapType}>
              {this.layerForName(key as MapTypes)}
            </LayersControl.BaseLayer>
          )
        })}
      </LayersControl>
    )
  }

  private legendControl() {
    return (
      <Control position="bottomleft">
        <div className="leaflet-control-layers p-4">
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
      </Control>
    )
  }

  closeAllToolTipsAndPopupsAndPopups(map: Map): void {
    map.eachLayer(function (layer) {
      if (layer.options.pane === 'tooltipPane' || layer.options.pane === 'popupPane') {
        layer.removeFrom(map)
      }
    })
  }

  private layerForName(name: MapTypes) {
    return this.allLayers[name]
  }

  allLayers: Record<MapTypes, ReactNode> = {
    'Open Street Map': (
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={this.MAX_ZOOM} // increase from 18 to 22
        maxNativeZoom={this.MAX_ZOOM}
        minZoom={2}
        attribution={`Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`}
      />
    ),

    'Google Satellite': (
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        maxZoom={this.MAX_ZOOM}
        maxNativeZoom={this.MAX_ZOOM}
        minZoom={2}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        attribution={`Tiles &copy; Google | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`}
      />
    ),
    'Google Hybrid': (
      <TileLayer
        url={`https://{s}.google.com/vt/lyrs=${GoogleMapLayers.hybridRoadsSatellite}&x={x}&y={y}&z={z}`}
        maxZoom={this.MAX_ZOOM}
        maxNativeZoom={this.MAX_ZOOM}
        minZoom={2}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        attribution={`Tiles &copy; Google | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`}
      />
    ),
  }

  private getQueryLatLngZoom() {
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
}
