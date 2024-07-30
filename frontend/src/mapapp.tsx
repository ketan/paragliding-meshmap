import L, { Map } from 'leaflet'
import { DateTime, Duration } from 'luxon'
import React, { Component } from 'react'
import { LayersControl } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import { CreateMarkers } from './clusteredgroup'
import { HardwareModel } from './interfaces'
import { mapEventsHandler } from './map-events-handler'
import { FastMap, MapTypes, MAX_ZOOM } from './map-fast'
import { Node } from './nodes-entity'
import { sanitizeLatLong, sanitizeNodesProperties, sanitizeNumber } from './ui-util'

interface LatLngZoom {
  lat: number
  lng: number
  zoom?: number
}

interface MapProps {
  mapType: MapTypes
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
  map = React.createRef<L.Map>()
  readonly allClusteredLayerGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 10,
  })

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
    if (!this.state.mapCenter || !this.state.newerNodesWithPosition) {
      return <div>Loading map...</div>
    }

    return (
      <FastMap
        center={[this.state.mapCenter.lat, this.state.mapCenter.lng]}
        zoom={this.state.mapCenter.zoom}
        maxZoom={MAX_ZOOM}
        closeAllToolTipsAndPopupsAndPopups={this.closeAllToolTipsAndPopupsAndPopups}
      >
        {/* <MapEventHandler closeAllToolTipsAndPopupsAndPopups={(map) => this.closeAllToolTipsAndPopupsAndPopups(map)} /> */}

        {/* {this.layers()}
        {this.legendControl()} */}
        {/* <CreateMarkers nodes={this.state.newerNodesWithPosition} configNodesOfflineAge={this.state.configNodesOfflineAge} /> */}
      </FastMap>
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
