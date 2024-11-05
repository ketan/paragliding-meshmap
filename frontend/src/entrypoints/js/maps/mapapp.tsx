import debug from 'debug'
import L, { Control } from 'leaflet'
import 'leaflet-groupedlayercontrol'
import 'leaflet.markercluster'
import 'leaflet.polylinemeasure'
import { DateTime, Duration } from 'luxon'
import { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { MapContainer } from 'react-leaflet'
import { NodeRoleNameToID } from '../../../hardware-modules'
import { NodesEntityForUI } from '../../../nodes-entity'
import { addLegendToMap } from '../../../templates/legend'
import { nodePositionView } from '../../../templates/node-position'
import { NodeTooltip } from '../../../templates/node-tooltip'
import { Page } from '../components/page'
import {
  BROADCAST_ADDR,
  getIconClassFor,
  getQueryParams,
  isDesktop,
  nodeName,
  nodeStatus,
  QueryParams,
  sanitizeLatLong,
  sanitizeNodesProperties,
  sanitizeNumber,
  setMapUrlParams,
  TRACKER_API_BASE_URL,
} from '../utils/ui-util'
import { mapEventsHandler } from './map-events-handler'
import { MapTiles, MapTypes } from './map-providers'
import { SearchBar } from './search-bar'
import { NodeDetailsModal } from './node-details-modal'
import { TrackLog } from './track-log.tsx'
import { getTextSize } from '../utils/text-size.ts'
import { MessagesModal } from './messages-modal.tsx'
import { ProfileModal } from '../components/profile-modal.tsx'

const logger = debug('meshmap')
logger.enabled = true
const MAX_ZOOM = 22

interface MapProps {
  mapType: MapTypes
}

interface UIConfig {
  defaultZoomLevelForNode: number

  // Don't show nodes older than this
  configNodesMaxAge: Duration

  // Nodes older than this are considered offline
  configNodesOfflineAge: Duration
  configNodesOnlineAge: Duration
}

interface AllData {
  allNodes: Record<number, NodesEntityForUI>
  newerNodes: Record<number, NodesEntityForUI>
  newerNodesWithPosition: Record<number, NodesEntityForUI>
  markers: Record<number, L.Marker>
}

interface MapState extends Partial<AllData>, UIConfig, QueryParams {
  map?: L.Map
  dataLoaded: PromiseWithResolvers<void>
  mapInitialized: PromiseWithResolvers<void>
  nodeToShow?: NodesEntityForUI
  trackLogToShow?: NodesEntityForUI
  messageFrom?: number
  messageTo?: number | 'all'
  messageSince: Duration

  aboutModalVisible: boolean
  configModalVisible: boolean
  profileModalVisible: boolean
}

export default class MapApp extends Component<MapProps, MapState> {
  private readonly defaultMessageSince = Duration.fromObject({ days: 7 }).rescale()
  private loadDataInterval: NodeJS.Timeout | null = null

  state: MapState = {
    defaultZoomLevelForNode: localStorage.defaultZoomLevelForNode || 15,
    configNodesMaxAge: Duration.fromISO(localStorage.configNodesMaxAge || 'P2D'),
    configNodesOfflineAge: Duration.fromISO(localStorage.configNodesOfflineAge || 'P1D'),
    configNodesOnlineAge: Duration.fromISO(localStorage.configNodesOnlineAge || 'PT1H'),
    mapInitialized: Promise.withResolvers(),
    dataLoaded: Promise.withResolvers(),
    messageTo: BROADCAST_ADDR,
    messageSince: this.defaultMessageSince,
    showConfigurationPopup: false,
    aboutModalVisible: false,
    configModalVisible: false,
    profileModalVisible: false,
  }

  readonly allClusteredLayerGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 10,
  })

  readonly allNodesLayerGroup = new L.LayerGroup()

  readonly allRouterNodesLayerGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 10,
  })

  readonly tracklogLayerGroup = new L.LayerGroup()

  readonly groupedLayers = new L.Control.GroupedLayers(
    MapTiles.allLayers(),
    {
      Nodes: {
        All: this.allNodesLayerGroup,
        Routers: this.allRouterNodesLayerGroup,
        Clustered: this.allClusteredLayerGroup,
        None: new L.LayerGroup(),
      },
      Overlays: {
        TrackLog: this.tracklogLayerGroup,
      },
    },
    {
      exclusiveGroups: ['Nodes'],
    }
  )

  async componentDidMount() {
    const { coords, zoom, nodeId, showConfigurationPopup } = getQueryParams()

    if (showConfigurationPopup) {
      this.setState({ configModalVisible: true })
    }

    if (coords) {
      this.setState({ coords, zoom })
    } else {
      this.setState({ coords: { lat: 21, lng: 79 }, zoom: 5 })
    }

    if (nodeId) {
      this.setState({ nodeId })
    }

    await this.loadData()
    this.loadDataInterval = setInterval(() => this.loadData(), 60500)

    Promise.all([this.state.dataLoaded.promise, this.state.mapInitialized.promise]).then(() => {
      logger(`Map and data loaded`)
      const markers = this.createMarkers()
      this.setState({ markers }, () => {
        const queryParams = getQueryParams()
        if (queryParams.nodeId) {
          this.flyToNode(queryParams.nodeId)
        } else {
          this.maybeFlyToCurrentLocation()
        }
        if (queryParams.msg) {
          const node = this.findNodeById(this.state.allNodes, queryParams.msg.from)
          if (node) {
            this.showMessages(node)
          }
        }
      })
    })
  }

  private async loadData() {
    const now = DateTime.now()

    try {
      const nodesResponse = await fetch(`${TRACKER_API_BASE_URL}/api/nodes`)
      if (nodesResponse.status == 200 || nodesResponse.status == 304) {
        const rawNodes = await nodesResponse.json()

        const allNodes = sanitizeNodesProperties(rawNodes).reduce(
          (acc, eachNode) => {
            acc[eachNode.nodeId] = eachNode
            return acc
          },
          {} as Record<number, NodesEntityForUI>
        )

        this.setState({ allNodes }, () => {
          const newerNodes: Record<number, NodesEntityForUI> = {}
          const newerNodesWithPosition: Record<number, NodesEntityForUI> = {}

          Object.values(allNodes).forEach((node) => {
            const age = now.diff(DateTime.fromISO(node.updatedAt))
            if (age < this.state.configNodesMaxAge) {
              newerNodes[node.nodeId] = node
            }
          })

          Object.values(newerNodes).forEach((eachNode) => {
            if (eachNode.latLng) {
              newerNodesWithPosition[eachNode.nodeId] = eachNode
            }
          })

          this.setState({ newerNodes, newerNodesWithPosition }, () => {
            this.state.dataLoaded.resolve()
            console.info(`Total nodes - ${Object.keys(this.state.allNodes!).length}`)
            console.info(`Newer nodes - ${Object.keys(this.state.newerNodes!).length}`)
            console.info(`Newer nodes with position - ${Object.keys(this.state.newerNodesWithPosition!).length}`)
          })
        })
      } else {
        logger(`Error fetching data, node response was ${nodesResponse.status}`)
        this.state.dataLoaded.reject()
      }
    } catch (err) {
      logger(`Error fetching data`, { err })
      this.state.dataLoaded.reject()
    }
  }

  componentWillUnmount() {
    if (this.loadDataInterval) {
      clearInterval(this.loadDataInterval)
    }
  }

  render() {
    if (!this.state.coords || !this.state.newerNodesWithPosition) {
      return <div>Loading map...</div>
    }

    const searchBar = <SearchBar nodes={Object.values(this.state.newerNodesWithPosition)} selectCallback={(node) => this.flyToNode(node)} />

    return (
      <Page
        bannerMain={searchBar}
        aboutModal={{
          show: this.state.aboutModalVisible,
          onClick: () => {
            this.setState({ aboutModalVisible: !this.state.aboutModalVisible })
          },
        }}
        profileModal={{
          show: this.state.profileModalVisible,
          onClick: () => {
            this.setState({ profileModalVisible: !this.state.profileModalVisible })
          },
        }}
        configModal={{
          show: this.state.configModalVisible,
          onClick: () => {
            this.setState({ configModalVisible: !this.state.configModalVisible }, () => {
              setMapUrlParams({ configure: this.state.configModalVisible })
            })
          },
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <MapContainer
            center={this.state.coords}
            zoom={this.state.zoom}
            maxZoom={MAX_ZOOM}
            whenReady={(...args) => this.mapReady(args)}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        <NodeDetailsModal
          allNodes={this.state.allNodes}
          node={this.state.nodeToShow}
          key={this.state.nodeToShow?.nodeId}
          onClose={() => this.setState({ nodeToShow: undefined })}
        />
        <MessagesModal
          from={this.state.messageFrom}
          to={this.state.messageTo}
          since={this.state.messageSince}
          onClose={() => this.messagesClosed()}
          nodes={this.state.allNodes || []}
          updateDuration={(newDuration) => this.setState({ messageSince: newDuration })}
          toggleFilter={() => this.toggleMessageFilter()}
        />
        {this.state.profileModalVisible && (
          <ProfileModal show={this.state.profileModalVisible} onClose={() => this.setState({ profileModalVisible: false })} />
        )}

        <TrackLog node={this.state.trackLogToShow} map={this.state.map} layer={this.tracklogLayerGroup} />
      </Page>
    )
  }

  private mapReady(args: unknown[]): void {
    if (Array.isArray(args) && args.length > 0) {
      const arg = (args as unknown[])[0]

      if (arg && typeof arg === 'object' && 'target' in arg && arg.target instanceof L.Map) {
        this.setState({ map: arg.target }, () => {
          this.mapInitialized()
        })
      } else {
        alert(`Something went wrong. Was expecting to initialize a map`)
      }
    }
  }

  private mapInitialized() {
    mapEventsHandler({
      map: this.state.map!,
      closeAllToolTipsAndPopupsAndPopups: this.closeAllToolTipsAndPopupsAndPopups.bind(this),
    })
    this.configureGroupedLayers()
    L.control
      .polylineMeasure({
        position: 'topleft',
        unit: 'kilometres',
        showBearings: true,
        clearMeasurementsOnStop: false,
        showClearControl: true,
      } as Control.PolylineMeasureOptions)
      .addTo(this.state.map!)
    this.allClusteredLayerGroup.addTo(this.state.map!)
    this.tracklogLayerGroup.addTo(this.state.map!)
    new MapTiles(this.props.mapType).addDefaultLayerToMap(this.state.map!)
    addLegendToMap(this.state.map!)
    this.state.mapInitialized.resolve()
  }

  private configureGroupedLayers() {
    this.groupedLayers.addTo(this.state.map!)
  }

  private closeAllToolTipsAndPopupsAndPopups(): void {
    const map = this.state.map
    map?.eachLayer(function (layer) {
      if (layer.options.pane === 'tooltipPane' || layer.options.pane === 'popupPane') {
        layer.removeFrom(map)
      }
    })
    setMapUrlParams({ nodeId: false })
  }

  private maybeFlyToCurrentLocation() {
    const queryParams = getQueryParams()

    // if no coords in query params, get current location, and fly to it
    if (!queryParams.coords) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const latLng = sanitizeLatLong(pos.coords.latitude, pos.coords.longitude)
        const currentQueryParams = getQueryParams()
        if (latLng && !currentQueryParams.coords) {
          this.state.map?.flyTo(latLng, 17, { animate: false })
        }
      })
    }
  }

  private createMarkers() {
    const markers: Record<number, L.Marker> = {}
    Object.values(this.state.newerNodesWithPosition!).forEach(
      (eachNode) => {
        markers[eachNode.nodeId] = this.createMarker(eachNode)
      },
      {} as Record<number, L.Marker>
    )

    return markers
  }

  private createMarker(eachNode: NodesEntityForUI) {
    const iconSize = getTextSize(nodeName(eachNode))

    const marker = L.marker(eachNode.offsetLatLng!, {
      icon: L.divIcon({
        className: getIconClassFor(eachNode, this.state.configNodesOnlineAge, this.state.configNodesOfflineAge),
        iconSize: iconSize,
        html: nodePositionView(nodeName(eachNode)),
        iconAnchor: [iconSize.x / 2, iconSize.y / 2 + 16],
      }),
      zIndexOffset: nodeStatus(eachNode, this.state.configNodesOnlineAge, this.state.configNodesOfflineAge) === 'online' ? 1000 : -1000,
    })

    const tooltipOffset = isDesktop() ? new L.Point(iconSize.x / 2 + 2, -16) : new L.Point(0, -16)

    let popupDiv: HTMLElement | undefined
    let popupReactRoot: ReactDOM.Root | undefined

    function maybeCloseExistingPopup() {
      if (popupReactRoot) {
        popupReactRoot.unmount()
        popupReactRoot = undefined
      }

      if (popupDiv) {
        popupDiv.remove()
        popupDiv = undefined
      }
    }

    function maybeCreateTooltip() {
      maybeCloseExistingPopup()
      popupDiv = document.createElement('div')
      popupDiv.setAttribute('data-purpose', 'node-popup-permanent')
      popupDiv.setAttribute('data-node-id', eachNode.nodeId.toString())
      popupDiv.setAttribute('data-node-hexid', eachNode.nodeIdHex)
      popupDiv.setAttribute('data-node-shortName', eachNode.shortName?.toString() || '')
      popupReactRoot = ReactDOM.createRoot(popupDiv)
    }

    if (isDesktop()) {
      let tooltipDiv: HTMLElement | undefined
      let tooltipReactRoot: ReactDOM.Root | undefined

      marker.bindTooltip(
        () => {
          if (!tooltipDiv || !tooltipDiv.isConnected) {
            tooltipDiv = document.createElement('div')
            tooltipDiv.setAttribute('node-hover-tooltip-id', eachNode.nodeId.toString())
            tooltipDiv.setAttribute('node-hover-tooltip-hexid', eachNode.nodeIdHex)
            tooltipDiv.setAttribute('node-hover-tooltip-shortName', eachNode.shortName?.toString() || '')
          }
          return tooltipDiv
        },
        { interactive: true, offset: tooltipOffset }
      )

      marker.on('tooltipopen', () => {
        if (tooltipReactRoot) {
          tooltipReactRoot.unmount()
          tooltipReactRoot = undefined
        }

        if (tooltipDiv) {
          tooltipReactRoot = ReactDOM.createRoot(tooltipDiv)
        } else {
          throw new Error(`No tooltip div found`)
        }

        tooltipReactRoot.render(
          <NodeTooltip
            offlineAge={this.state.configNodesOfflineAge}
            onlineAge={this.state.configNodesOnlineAge}
            showDetail={() => this.showDetails(eachNode)}
            showTrackLog={() => this.showTrackLog(eachNode)}
            showMessages={() => this.showMessages(eachNode)}
            node={eachNode}
            callback={() => {
              marker.getTooltip()?.update()
            }}
          />
        )
      })

      marker.on('tooltipclose', () => {
        if (tooltipReactRoot) {
          tooltipReactRoot.unmount()
          tooltipReactRoot = undefined
        }
        if (tooltipDiv) {
          tooltipDiv.remove()
          tooltipDiv = undefined
        }
      })
    }

    marker.on('click', () => {
      this.closeAllToolTipsAndPopupsAndPopups()
      maybeCreateTooltip()

      const tooltip = new L.Tooltip(eachNode.offsetLatLng!, {
        interactive: true,
        permanent: true,
        offset: tooltipOffset,
      })

      popupReactRoot?.render(
        <NodeTooltip
          offlineAge={this.state.configNodesOfflineAge}
          onlineAge={this.state.configNodesOnlineAge}
          node={eachNode}
          showDetail={() => this.showDetails(eachNode)}
          showTrackLog={() => this.showTrackLog(eachNode)}
          showMessages={() => this.showMessages(eachNode)}
          callback={() => {
            tooltip.update()
          }}
        />
      )

      tooltip.setContent(popupDiv!)

      setMapUrlParams({ nodeId: eachNode.nodeId })

      this.state.map?.openTooltip(tooltip)
    })

    if (
      eachNode.role == NodeRoleNameToID.ROUTER ||
      eachNode.role == NodeRoleNameToID.ROUTER_CLIENT ||
      eachNode.role == NodeRoleNameToID.REPEATER
    ) {
      marker.addTo(this.allRouterNodesLayerGroup)
    }

    marker.addTo(this.allNodesLayerGroup)
    marker.addTo(this.allClusteredLayerGroup)
    return marker
  }

  private showDetails(node: NodesEntityForUI) {
    this.setState({ nodeToShow: node })
  }

  private showTrackLog(node: NodesEntityForUI) {
    this.closeAllToolTipsAndPopupsAndPopups()
    this.setState({ trackLogToShow: node })
  }

  private findNodeById(nodes?: Record<number, NodesEntityForUI>, nodeId?: number | string | null) {
    if (!nodes) {
      return
    }
    // find node by id
    nodeId = sanitizeNumber(nodeId)
    if (!nodeId) {
      return
    }
    return nodes[nodeId]
  }

  private flyToNode(nodeOrNodeId: string | number | null | NodesEntityForUI) {
    let node: NodesEntityForUI | null | undefined
    if (!nodeOrNodeId) {
      return
    }
    if (typeof nodeOrNodeId === 'string' || typeof nodeOrNodeId === 'number') {
      node = this.findNodeById(this.state.newerNodesWithPosition!, nodeOrNodeId)
    } else {
      node = nodeOrNodeId
    }

    if (!node) {
      return
    }

    if (node.offsetLatLng) {
      this.state.map?.flyTo(node.offsetLatLng, this.state.defaultZoomLevelForNode, {
        animate: true,
        duration: 1,
      })

      const marker = (this.state.markers || [])[node.nodeId]

      if (marker) {
        marker.openTooltip()
      }
    }
  }

  private showMessages(eachNode: NodesEntityForUI) {
    this.setState({ messageFrom: eachNode.nodeId, messageTo: BROADCAST_ADDR, messageSince: this.defaultMessageSince })
  }

  private messagesClosed() {
    this.setState({ messageTo: undefined, messageFrom: undefined, messageSince: this.defaultMessageSince })
  }

  private toggleMessageFilter() {
    if (this.state.messageTo === `all`) {
      this.setState({ messageTo: BROADCAST_ADDR })
    } else {
      this.setState({ messageTo: `all` })
    }
  }
}
