import { LeafletMouseEvent, Map } from 'leaflet'

export interface Props {
  map: Map
  closeAllToolTipsAndPopupsAndPopups: (map: Map) => void
}

function onClick({ map, closeAllToolTipsAndPopupsAndPopups }: Props, event: LeafletMouseEvent): void {
  const clickedElement = event.originalEvent.target as Element

  if (clickedElement.closest('.leaflet-tooltip')) {
    // we clicked on a tooltip. do nothing
    return
  }

  closeAllToolTipsAndPopupsAndPopups(map)
}

function onZoomPan(map: Map): void {
  const latLng = map.getCenter()
  const zoom = map.getZoom()

  const url = new URL(window.location.href)
  url.searchParams.set('lat', latLng.lat.toString())
  url.searchParams.set('lng', latLng.lng.toString())
  url.searchParams.set('zoom', zoom.toString())
  window.history.replaceState(null, '', url.toString())
}

export function mapEventsHandler({ map, closeAllToolTipsAndPopupsAndPopups }: Props) {
  map.on('zoomend', () => onZoomPan(map))
  map.on('moveend', () => onZoomPan(map))
  map.on('click', (e) => onClick({ map, closeAllToolTipsAndPopupsAndPopups }, e))

  return null
}
