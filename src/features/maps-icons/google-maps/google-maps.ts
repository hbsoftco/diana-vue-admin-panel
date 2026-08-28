export type GoogleMapDemoType
  = | 'basic'
    | 'overlay'
    | 'layers'
    | 'markers'
    | 'streetView'
    | 'geoFencing'

export type GoogleMapDemo = {
  id: GoogleMapDemoType
  titleKey: string
  labelKey: string
  code: string
}

export const GOOGLE_MAP_DEMOS: GoogleMapDemo[] = [
  {
    id: 'basic',
    titleKey: 'features.mapsIcons.googleMaps.basicMap',
    labelKey: 'features.mapsIcons.googleMaps.basicMapLabel',
    code: '<GoogleMap demo="basic" :api-key="googleMapsApiKey" map-label="Basic Google Map centered on Lima" />',
  },
  {
    id: 'overlay',
    titleKey: 'features.mapsIcons.googleMaps.overlayMap',
    labelKey: 'features.mapsIcons.googleMaps.overlayMapLabel',
    code: '<GoogleMap demo="overlay" :api-key="googleMapsApiKey" map-label="Google Map of Lima with a place overlay" />',
  },
  {
    id: 'layers',
    titleKey: 'features.mapsIcons.googleMaps.layersMap',
    labelKey: 'features.mapsIcons.googleMaps.layersMapLabel',
    code: '<GoogleMap demo="layers" :api-key="googleMapsApiKey" map-label="Zoomed-out Google Map centered on Lima" />',
  },
  {
    id: 'markers',
    titleKey: 'features.mapsIcons.googleMaps.markersMap',
    labelKey: 'features.mapsIcons.googleMaps.markersMapLabel',
    code: '<GoogleMap demo="markers" :api-key="googleMapsApiKey" map-label="Google Map of Lima with two markers" />',
  },
  {
    id: 'streetView',
    titleKey: 'features.mapsIcons.googleMaps.streetViewMap',
    labelKey: 'features.mapsIcons.googleMaps.streetViewMapLabel',
    code: '<GoogleMap demo="streetView" :api-key="googleMapsApiKey" map-label="Google Street View panorama in Boston" />',
  },
  {
    id: 'geoFencing',
    titleKey: 'features.mapsIcons.googleMaps.geoFencingMap',
    labelKey: 'features.mapsIcons.googleMaps.geoFencingMapLabel',
    code: '<GoogleMap demo="geoFencing" :api-key="googleMapsApiKey" map-label="Google Map of Lima with polygon and circle boundaries" />',
  },
]

type MapInstance = { getCenter: () => { lat: () => number, lng: () => number } }
type MarkerInstance = { addListener: (event: string, callback: () => void) => void }
type OverlayViewInstance = {
  getPanes: () => { overlayLayer: Element }
  getProjection: () => {
    fromLatLngToDivPixel: (position: unknown) => { x: number, y: number } | null
  }
  onAdd?: () => void
  draw?: () => void
  onRemove?: () => void
  setMap: (map: MapInstance) => void
}
type GoogleMapsApi = {
  Map: new (element: HTMLElement, options: Record<string, unknown>) => MapInstance
  Marker: new (options: Record<string, unknown>) => MarkerInstance
  InfoWindow: new (options: Record<string, unknown>) => {
    open: (options: Record<string, unknown>) => void
  }
  OverlayView: new () => OverlayViewInstance
  LatLng: new (lat: number, lng: number) => unknown
  StreetViewPanorama: new (element: HTMLElement, options: Record<string, unknown>) => unknown
  Polygon: new (options: Record<string, unknown>) => unknown
  Circle: new (options: Record<string, unknown>) => unknown
}
type GoogleMapsWindow = Window & {
  google?: { maps: GoogleMapsApi }
  __dianaGoogleMapsReady?: () => void
}

let loaderPromise: Promise<GoogleMapsApi> | undefined

export function loadGoogleMaps(apiKey: string) {
  const mapsWindow = window as GoogleMapsWindow
  if (mapsWindow.google?.maps.Map)
    return Promise.resolve(mapsWindow.google.maps)
  if (loaderPromise)
    return loaderPromise

  loaderPromise = new Promise<GoogleMapsApi>((resolve, reject) => {
    const script = document.createElement('script')
    mapsWindow.__dianaGoogleMapsReady = () => {
      delete mapsWindow.__dianaGoogleMapsReady
      const maps = mapsWindow.google?.maps
      if (maps)
        resolve(maps)
      else reject(new Error('Google Maps initialized without the maps library'))
    }
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=__dianaGoogleMapsReady&loading=async&v=weekly`
    script.async = true
    script.onerror = () => {
      delete mapsWindow.__dianaGoogleMapsReady
      script.remove()
      loaderPromise = undefined
      reject(new Error('Google Maps script failed to load'))
    }
    document.head.append(script)
  })
  return loaderPromise
}

const LIMA = { lat: -12.043333, lng: -77.028333 }

export function createGoogleMapDemo(
  maps: GoogleMapsApi,
  element: HTMLElement,
  type: GoogleMapDemoType,
) {
  if (type === 'streetView') {
    return new maps.StreetViewPanorama(element, {
      position: { lat: 42.3455, lng: -71.0983 },
      pov: { heading: 60, pitch: -10 },
      zoom: 1,
    })
  }

  const map = new maps.Map(element, { center: LIMA, zoom: type === 'layers' ? 3 : 12 })

  if (type === 'overlay') {
    const overlay = new maps.OverlayView()
    const label = document.createElement('div')
    label.className
      = 'rounded bg-primary px-3 py-1.5 text-sm font-semibold text-primary-content shadow-md'
    label.textContent = 'Lima'
    overlay.onAdd = () => overlay.getPanes().overlayLayer.append(label)
    overlay.draw = () => {
      const point = overlay
        .getProjection()
        .fromLatLngToDivPixel(new maps.LatLng(LIMA.lat, LIMA.lng))
      if (!point)
        return
      Object.assign(label.style, {
        position: 'absolute',
        transform: 'translate(-50%, calc(-100% - 8px))',
        left: `${point.x}px`,
        top: `${point.y}px`,
      })
    }
    overlay.onRemove = () => label.remove()
    overlay.setMap(map)
  }

  if (type === 'markers') {
    const firstMarker = new maps.Marker({
      map,
      position: { lat: -12.043333, lng: -77.03 },
      title: 'Lima',
    })
    const marker = new maps.Marker({
      map,
      position: { lat: -12.042, lng: -77.028333 },
      title: 'Marker with InfoWindow',
    })
    const infoWindow = new maps.InfoWindow({ content: '<p>HTML Content</p>' })
    marker.addListener('click', () => infoWindow.open({ anchor: marker, map }))
    void firstMarker
  }

  if (type === 'geoFencing') {
    const polygon = new maps.Polygon({
      map,
      paths: [
        { lat: -12.040397656836609, lng: -77.03373871559225 },
        { lat: -12.040248585302038, lng: -77.03993927003302 },
        { lat: -12.050047116528843, lng: -77.02448169303511 },
        { lat: -12.044804866577001, lng: -77.02154422636042 },
      ],
      strokeColor: '#e6533c',
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: '#e6533c',
      fillOpacity: 0.5,
    })
    const circle = new maps.Circle({
      map,
      center: { lat: -12.040504866577001, lng: -77.02024422636042 },
      radius: 350,
      strokeColor: '#f5b849',
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: '#f5b849',
      fillOpacity: 0.5,
    })
    void polygon
    void circle
  }
  return map
}
