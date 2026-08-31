import type { Map, MapOptions, MarkerOptions, TileLayerOptions } from 'leaflet'

export type DiLeafletCoordinate = {
  lat: number
  lng: number
}

export type DiLeafletMarker = {
  id: string | number
  position: DiLeafletCoordinate
  popup?: string
  options?: MarkerOptions
}

export type DiLeafletTileLayer = {
  url: string
  attribution?: string
  options?: Omit<TileLayerOptions, 'attribution'>
}

export type DiLeafletInteractionOptions = Pick<
  MapOptions,
  | 'boxZoom'
  | 'doubleClickZoom'
  | 'dragging'
  | 'keyboard'
  | 'scrollWheelZoom'
  | 'touchZoom'
  | 'zoomControl'
>

export type DiLeafletMarkerEvent = {
  marker: DiLeafletMarker
  originalEvent: MouseEvent
}

export type DiLeafletMap = Map
