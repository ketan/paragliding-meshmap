import L from 'leaflet'
export type { Control, HeatLatLngTuple } from 'leaflet'

declare global {
  interface Window {
    L: typeof L
  }
}

globalThis.L = L
window.L = L

await import('leaflet-groupedlayercontrol')
await import('leaflet.markercluster')
await import('leaflet.polylinemeasure')
await import('leaflet.heat')

export default L
