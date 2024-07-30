import { LeafletMouseEvent, Map } from 'leaflet'
import { useMapEvents } from 'react-leaflet'

export interface Props {
  closeAllToolTipsAndPopupsAndPopups: (map: Map) => void
}

export function MapEventHandler(props: Props) {
  function onClick(map: Map, event: LeafletMouseEvent): void {
    const clickedElement = event.originalEvent.target as Element

    if (clickedElement.closest('.leaflet-tooltip')) {
      // we clicked on a tooltip. do nothing
      return
    }

    props.closeAllToolTipsAndPopupsAndPopups(map)
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
  const map = useMapEvents({
    zoomend: () => onZoomPan(map),
    moveend: () => onZoomPan(map),
    click: (e) => onClick(map, e),
  })

  return null
}
