import { NodesEntityForUI, PositionData, PositionsEntityJSON } from '../../../nodes-entity'
import L, { Map, PointTuple } from 'leaflet'
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

interface TrackLogProps {
  node?: NodesEntityForUI
  map?: Map
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
    if (this.props.node) {
      this.loadData()
    }
  }

  componentDidUpdate(prevProps: Readonly<TrackLogProps>, _prevState: Readonly<TrackLogState>) {
    if (prevProps.node?.nodeId != this.props.node?.nodeId) {
      this.loadData()
    }
  }

  render() {
    return <></>
  }

  private async loadData() {
    if (!this.props.node) {
      return
    }
    this.setState({ loadedState: 'loading' })

    const response = await fetch(`/api/node/${this.props.node!.nodeId}/positions`)
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
          this.gpxLayer.addTo(this.props.map!)
          this.props.map!.fitBounds(this.gpxLayer.getBounds())
        } else {
          toast('There are no track logs for this node')
        }
      })
    } else {
      this.setState({ loadedState: 'error' })
    }
  }

  private filteredPositions(positionData: PositionsEntityJSON[]) {
    return positionData
      .filter((point) => point.latitude && point.longitude)
      .map((position) => {
        return {
          id: position.id,
          latitude: position.latitude! / 10000000,
          longitude: position.longitude! / 10000000,
          altitude: position.altitude,
          time: DateTime.fromISO(position.createdAt),
        } as PositionData
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
      const label = 'Take-off'
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

      featureGroup.addLayer(startMarker)
    }

    const endPosition = positions.at(-1)
    if (endPosition) {
      const label = 'Landing'
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
      featureGroup.addLayer(endMarker)
    }

    function positionTooltip(position: PositionData) {
      const node = {
        latLng: [position.latitude, position.longitude] as PointTuple,
        positionUpdatedAt: position.time.toISOTime()!,
        altitude: position.altitude,
      }
      const element = <Position node={node} />
      return renderToString(element)
    }

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i]
      const marker = L.marker([position.latitude, position.longitude], {
        icon: new L.DivIcon({
          className: 'rounded-full border-3 bg-green-600',
          iconSize: [5, 5],
        }),
        zIndexOffset: 1000,
      })

      marker.bindTooltip(() => positionTooltip(position), { interactive: true })

      marker.on('click', () => {
        const tooltip = new L.Tooltip([position.latitude, position.longitude], { interactive: true, permanent: true })
        tooltip.setContent(() => {
          return positionTooltip(position)
        })

        this.props.map!.openTooltip(tooltip)
      })

      featureGroup.addLayer(marker)
    }

    const colours = new Gradient().setGradient('#0000ff', '#00ff00').setNumberOfColors(positions.length).getColors()

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
}
