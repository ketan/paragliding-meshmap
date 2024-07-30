import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { sanitizeLatLong, sanitizeNumber } from './ui-util'

interface LatLngZoom {
  lat: number
  lng: number
  zoom?: number
}

type MapTypes = 'Open Street Map' | 'Google Satellite' | 'Google Hybrid'

interface MapProps {
  mapType: MapTypes
}

interface MapState {
  mapCenter?: LatLngZoom
}

export default class MapApp extends Component<MapProps, MapState> {
  map = React.createRef<L.Map>()

  state: MapState = {}

  componentDidMount(): void {
    const mapCenter = this.getQueryLatLngZoom()

    if (mapCenter) {
      this.setState({ mapCenter })
    } else {
      this.setState({ mapCenter: { lat: 21, lng: 79 + 360, zoom: 5 } })
    }

    this.maybeFlyToCurrentLocation()
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
    console.log(this.state.mapCenter)
    return (
      <MapContainer
        ref={this.map}
        center={[this.state.mapCenter.lat, this.state.mapCenter.lng]}
        zoom={this.state.mapCenter.zoom}
        style={{ width: '100%', height: '100%' }}
      >
        {this.layerForName(this.props.mapType)}
        <Marker position={[this.state.mapCenter.lat, this.state.mapCenter.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    )
  }

  private layerForName(name: MapTypes) {
    return this.allLayers()[name]
  }

  private allLayers() {
    enum GoogleMapLayers {
      roadsBuildings = 'm',
      roadsTerrain = 'p',
      alteredRoadmap = 'r',
      satelliteOnly = 's',
      terrainOnly = 't',
      hybridRoadsSatellite = 'y',
      roadsOnly = 'h',
    }

    return {
      'Open Street Map': (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={22} // increase from 18 to 22
          minZoom={2}
          attribution={`Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`}
        />
      ),

      'Google Satellite': (
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={21}
          minZoom={2}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          attribution={`Tiles &copy; Google | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`}
        />
      ),
      'Google Hybrid': (
        <TileLayer
          url={`https://{s}.google.com/vt/lyrs=${GoogleMapLayers.hybridRoadsSatellite}&x={x}&y={y}&z={z}`}
          maxZoom={21}
          minZoom={2}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          attribution={`Tiles &copy; Google | Data from <a target="_blank" rel="noreferrer" href="https://meshtastic.org/docs/software/integrations/mqtt/">Meshtastic</a> | Version - ${__GIT_SHA__}`}
        />
      ),
    }
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
