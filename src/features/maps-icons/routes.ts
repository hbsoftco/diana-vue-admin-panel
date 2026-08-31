import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const mapsIconsRoutes = {
  path: '/maps-icons',
  component: DefaultLayout,
  children: [
    {
      path: '',
      redirect: '/maps-icons/map/google-maps',
    },
    {
      path: 'map',
      redirect: '/maps-icons/map/google-maps',
    },
    {
      path: 'map/leaflet-maps',
      component: () => import('@/pages/maps-icons/map/leaflet-maps.vue'),
      meta: {
        pageTitle: 'pages.mapsIcons.leafletMaps.title',
        breadcrumb: [
          { label: 'pages.mapsIcons.title', link: '/maps-icons' },
          { label: 'pages.mapsIcons.map.title', link: '/maps-icons/map' },
          { label: 'pages.mapsIcons.leafletMaps.title' },
        ],
      },
    },
    {
      path: 'map/google-maps',
      component: () => import('@/pages/maps-icons/map/google-maps.vue'),
      meta: {
        pageTitle: 'pages.mapsIcons.googleMaps.title',
        breadcrumb: [
          { label: 'pages.mapsIcons.title', link: '/maps-icons' },
          { label: 'pages.mapsIcons.map.title', link: '/maps-icons/map' },
          { label: 'pages.mapsIcons.googleMaps.title' },
        ],
      },
    },
  ],
}
