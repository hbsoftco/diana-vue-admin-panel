import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import DiLeafletMaps from '../DiLeafletMaps.vue'

const leaflet = vi.hoisted(() => {
  const mapEvents = new Map<string, (...args: unknown[]) => void>()
  const markerEvents: Array<Map<string, (...args: unknown[]) => void>> = []
  const mapInstance = {
    on: vi.fn((name: string, handler: (...args: unknown[]) => void) => {
      mapEvents.set(name, handler)
    }),
    getCenter: vi.fn(() => ({ lat: 51.5, lng: -0.09 })),
    getZoom: vi.fn(() => 13),
    setView: vi.fn(),
    setZoom: vi.fn(),
    fitBounds: vi.fn(),
    invalidateSize: vi.fn(),
    remove: vi.fn(),
    boxZoom: { enable: vi.fn(), disable: vi.fn() },
    doubleClickZoom: { enable: vi.fn(), disable: vi.fn() },
    dragging: { enable: vi.fn(), disable: vi.fn() },
    keyboard: { enable: vi.fn(), disable: vi.fn() },
    scrollWheelZoom: { enable: vi.fn(), disable: vi.fn() },
    touchZoom: { enable: vi.fn(), disable: vi.fn() },
  }
  const tileInstance = { addTo: vi.fn(), remove: vi.fn() }

  return {
    mapEvents,
    markerEvents,
    mapInstance,
    tileInstance,
    api: {
      map: vi.fn(() => mapInstance),
      tileLayer: vi.fn(() => {
        tileInstance.addTo.mockReturnValue(tileInstance)
        return tileInstance
      }),
      marker: vi.fn(() => {
        const events = new Map<string, (...args: unknown[]) => void>()
        markerEvents.push(events)
        const instance = {
          addTo: vi.fn(),
          on: vi.fn((name: string, handler: (...args: unknown[]) => void) => {
            events.set(name, handler)
          }),
          bindPopup: vi.fn(),
          remove: vi.fn(),
        }
        instance.addTo.mockReturnValue(instance)
        return instance
      }),
      featureGroup: vi.fn(() => ({ getBounds: vi.fn(() => 'bounds') })),
    },
  }
})

vi.mock('leaflet', () => ({ default: leaflet.api }))

describe('diLeafletMaps', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    leaflet.mapEvents.clear()
    leaflet.markerEvents.length = 0
  })

  it('initializes once with configuration and emits ready', async () => {
    const wrapper = mount(DiLeafletMaps, {
      props: {
        center: { lat: 48.8566, lng: 2.3522 },
        zoom: 11,
        height: 280,
        interactions: { dragging: false },
      },
    })
    await flushPromises()

    expect(leaflet.api.map).toHaveBeenCalledTimes(1)
    expect(leaflet.api.map).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        center: [48.8566, 2.3522],
        zoom: 11,
      }),
    )
    expect(wrapper.get('.di-leaflet-maps').attributes('style')).toContain('height: 280px')
    expect(leaflet.mapInstance.dragging.disable).toHaveBeenCalled()
    expect(wrapper.emitted('ready')?.[0]?.[0]).toBe(leaflet.mapInstance)
  })

  it('renders markers, fits their bounds, and forwards map events', async () => {
    const markers = [
      { id: 'one', position: { lat: 51.5, lng: -0.09 }, popup: 'London' },
      { id: 'two', position: { lat: 48.85, lng: 2.35 } },
    ]
    const wrapper = mount(DiLeafletMaps, { props: { markers, fitBounds: true } })
    await flushPromises()

    expect(leaflet.api.marker).toHaveBeenCalledTimes(2)
    expect(leaflet.mapInstance.fitBounds).toHaveBeenCalledWith('bounds', expect.any(Object))

    leaflet.mapEvents.get('click')?.({ latlng: { lat: 10, lng: 20 } })
    leaflet.mapEvents.get('zoomend')?.()
    leaflet.mapEvents.get('moveend')?.()
    leaflet.markerEvents[0]?.get('click')?.({ originalEvent: new MouseEvent('click') })

    expect(wrapper.emitted('mapClick')?.[0]?.[0]).toEqual({ lat: 10, lng: 20 })
    expect(wrapper.emitted('zoomChange')?.[0]?.[0]).toBe(13)
    expect(wrapper.emitted('centerChange')?.[0]?.[0]).toEqual({ lat: 51.5, lng: -0.09 })
    expect(wrapper.emitted('markerClick')?.[0]?.[0]).toMatchObject({ marker: markers[0] })
  })

  it('synchronizes controlled view props and destroys the map on unmount', async () => {
    const wrapper = mount(DiLeafletMaps)
    await flushPromises()
    await wrapper.setProps({ center: { lat: 40.7, lng: -74 }, zoom: 9 })

    expect(leaflet.mapInstance.setView).toHaveBeenCalledWith([40.7, -74], 13, { animate: false })
    expect(leaflet.mapInstance.setZoom).toHaveBeenCalledWith(9, { animate: false })

    wrapper.unmount()
    expect(leaflet.mapInstance.remove).toHaveBeenCalledTimes(1)
  })
})
