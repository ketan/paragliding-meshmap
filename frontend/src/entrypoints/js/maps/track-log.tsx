import { NodesEntityForUI, PositionData, PositionsEntityJSON } from '../../../nodes-entity'
import L, { DivIcon, DivIconOptions, Map, Marker, PointTuple } from 'leaflet'
import { Component } from 'react'
import { LoadedState } from './loaded-state.tsx'
import { DateTime } from 'luxon'
import { getTextSize } from '../utils/text-size.ts'
import { cssClassFor } from '../../../templates/legend.tsx'
import { nodePositionView } from '../../../templates/node-position.tsx'
import { Gradient } from 'typescript-color-gradient'
import { renderToString } from 'react-dom/server'
import { Position } from './position.tsx'
import { toast } from 'react-toastify'
import { nodeName, sanitizeLatLong, TRACKER_API_BASE_URL } from '../utils/ui-util.tsx'
import _ from 'lodash'

interface TrackLogProps {
  map: Map
  layer: L.LayerGroup
  trackLog: { node: NodesEntityForUI; fitToWindow: boolean }
}

interface TrackLogState {
  loadedState?: LoadedState
  positions?: PositionData[]
}

export class TrackLog extends Component<TrackLogProps, TrackLogState> {
  state: TrackLogState = {}
  gpxLayer?: L.FeatureGroup

  componentWillUnmount() {
    if (this.gpxLayer) {
      this.gpxLayer.remove()
      this.gpxLayer = undefined
    }
  }

  componentDidMount() {
    if (this.props.trackLog.node) {
      this.loadData()
    }
  }

  componentDidUpdate(prevProps: Readonly<TrackLogProps>, _prevState: Readonly<TrackLogState>) {
    if (prevProps.trackLog.node.nodeId != this.props.trackLog.node.nodeId) {
      this.loadData()
    }
  }

  render() {
    return <></>
  }

  private async loadData() {
    if (!this.props.trackLog.node) {
      return
    }
    this.setState({ loadedState: 'loading' })

    const response = await fetch(`${TRACKER_API_BASE_URL}/api/node/${this.props.trackLog.node.nodeId}/positions`)
    if (response.status === 200 || response.status === 304) {
      const trackLogs = (await response.json()) as PositionsEntityJSON[]
      const positions = this.filteredPositions(trackLogs)
      this.setState({ positions, loadedState: 'loaded' }, () => {
        if (this.gpxLayer) {
          this.gpxLayer.remove()
        }
        this.gpxLayer = undefined
        this.gpxLayer = this.createGPXLayer(this.state.positions!)
        if (this.gpxLayer) {
          this.gpxLayer.addTo(this.props.layer)
          if (this.props.trackLog.fitToWindow) {
            this.props.map.fitBounds(this.gpxLayer.getBounds())
          }
        } else {
          toast('There are no track logs for this node')
        }
      })
    } else {
      this.setState({ loadedState: 'error' })
    }
  }

  private filteredPositions(positionData: PositionsEntityJSON[]): PositionData[] {
    return positionData
      .filter((point) => point.latitude && point.longitude)
      .map((position) => {
        const latLong = sanitizeLatLong(position.latitude! / 10000000, position.longitude! / 10000000)!

        const earliestTime = _([position.time, position.timestamp, position.createdAt]).compact().min()

        return {
          id: position.id,
          latitude: latLong[0],
          longitude: latLong[1],
          time: DateTime.fromISO(earliestTime!),
          altitude: position.altitude,
          aboveGroundLevel: position.aboveGroundLevel,
          pdop: position.pdop,
          precisionBits: position.precisionBits,
          satsInView: position.satsInView,
        }
      })
      .sort((a, b) => {
        return a.time.diff(b.time).toMillis()
      })
  }

  private createGPXLayer(positions: PositionData[]) {
    if (positions.length === 0) {
      return
    }

    const featureGroup = new L.FeatureGroup()

    const startPosition = positions.at(0)
    if (startPosition) {
      const label = `Earliest position for ${nodeName(this.props.trackLog.node)}`
      const iconSize = getTextSize(label)
      const startMarker = L.marker([startPosition.latitude, startPosition.longitude], {
        icon: L.divIcon({
          className: cssClassFor(`start-track`),
          iconSize: iconSize,
          html: nodePositionView(label),
          iconAnchor: [iconSize.x / 2, iconSize.y / 2 + 16],
        }),
        zIndexOffset: 2000,
      })
      this.createTooltip(startMarker, startPosition)
      featureGroup.addLayer(startMarker)
    }

    const endPosition = positions.at(-1)
    if (endPosition) {
      const label = `Last known position for ${nodeName(this.props.trackLog.node)}`
      const iconSize = getTextSize(label)
      const endMarker = L.marker([endPosition.latitude, endPosition.longitude], {
        icon: L.divIcon({
          className: cssClassFor(`end-track`),
          iconSize: iconSize,
          html: nodePositionView(label),
          iconAnchor: [iconSize.x / 2, iconSize.y / 2 + 16],
        }),
        zIndexOffset: 2000,
      })

      this.createTooltip(endMarker, endPosition)
      featureGroup.addLayer(endMarker)
    }

    const colours = new Gradient().setGradient('#0000ff', '#00ff00').setNumberOfColors(positions.length).getColors()

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const marker = L.marker([position.latitude, position.longitude], {
        icon: new CustomColorIcon({
          backgroundColor: colours[i],
        }),
        zIndexOffset: 1000,
      })

      this.createTooltip(marker, position)

      featureGroup.addLayer(marker)
    }

    for (let i = 0; i < positions.length - 1; i++) {
      const position = positions[i]
      const nextPosition = positions[i + 1]

      const polyline = L.polyline(
        [
          [position.latitude, position.longitude],
          [nextPosition.latitude, nextPosition.longitude],
        ],
        { color: colours[i] }
      )
      featureGroup.addLayer(polyline)
    }

    return featureGroup
  }

  private createTooltip(marker: Marker, position: PositionData) {
    marker.bindTooltip(() => this.positionTooltip(position), { interactive: true })

    marker.on('click', () => {
      const tooltip = new L.Tooltip([position.latitude, position.longitude], { interactive: true, permanent: true })
      tooltip.setContent(() => {
        return this.positionTooltip(position)
      })

      this.props.map.openTooltip(tooltip)
    })
  }

  private positionTooltip(position: PositionData) {
    const element = (
      <Position
        positionAttrs={{
          latLng: [position.latitude, position.longitude] as PointTuple,
          altitude: position.altitude,
          time: position.time,
          satsInView: position.satsInView,
          positionPdop: position.pdop,
          positionPrecisionBits: position.precisionBits,
        }}
        title={`Position for ${nodeName(this.props.trackLog.node)}`}
      />
    )
    return renderToString(element)
  }
}

export class CustomColorIcon extends DivIcon {
  private backgroundColor: string | undefined

  constructor(options?: DivIconOptions & { backgroundColor: string }) {
    super({
      className: `rounded-full border-3`,
      iconSize: [10, 10],
      ...options,
    })
    this.backgroundColor = options?.backgroundColor
  }

  createIcon(oldIcon?: HTMLElement) {
    const div = super.createIcon(oldIcon)
    if (this.backgroundColor) {
      div.style.backgroundColor = this.backgroundColor
    }
    return div
  }
}
