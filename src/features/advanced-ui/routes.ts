import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const advancedUiRoutes = {
  path: '/advanced-ui',
  component: DefaultLayout,
  children: [
    {
      path: '',
      redirect: '/advanced-ui/modals',
    },
    {
      path: 'modals',
      component: () => import('@/pages/advanced-ui/modals.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.modals.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.modals.title' },
        ],
      },
    },
    {
      path: 'accordion',
      component: () => import('@/pages/advanced-ui/accordion.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.accordion.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.accordion.title' },
        ],
      },
    },
    {
      path: 'carousel',
      component: () => import('@/pages/advanced-ui/carousel.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.carousel.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.carousel.title' },
        ],
      },
    },
    {
      path: 'collapse',
      component: () => import('@/pages/advanced-ui/collapse.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.collapse.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.collapse.title' },
        ],
      },
    },
    {
      path: 'navbar',
      component: () => import('@/pages/advanced-ui/navbar.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.navbar.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.navbar.title' },
        ],
      },
    },
    {
      path: 'drawer',
      component: () => import('@/pages/advanced-ui/drawer.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.drawer.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.drawer.title' },
        ],
      },
    },
    {
      path: 'rating',
      component: () => import('@/pages/advanced-ui/rating.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.rating.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.rating.title' },
        ],
      },
    },
    {
      path: 'skeleton',
      component: () => import('@/pages/advanced-ui/skeleton.vue'),
      meta: {
        pageTitle: 'pages.advancedUi.skeleton.title',
        breadcrumb: [
          { label: 'pages.advancedUi.title', link: '/advanced-ui' },
          { label: 'pages.advancedUi.skeleton.title' },
        ],
      },
    },
  ],
}
