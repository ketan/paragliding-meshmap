import { LeafletMouseEvent, Map } from 'leaflet'
import { replaceWindowHistory } from '../utils/ui-util.tsx'

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

  replaceWindowHistory({ lat: latLng.lat, lng: latLng.lng, zoom })
}

export function mapEventsHandler({ map, closeAllToolTipsAndPopupsAndPopups }: Props) {
  map.on('zoomend', () => onZoomPan(map))
  map.on('moveend', () => onZoomPan(map))
  map.on('click', (e) => onClick({ map, closeAllToolTipsAndPopupsAndPopups }, e))

  return null
}
