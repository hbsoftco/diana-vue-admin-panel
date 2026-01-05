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
        pageTitle: 'pages.modals.modals',
        breadcrumb: [
          { label: 'pages.modals.title', link: '/advanced-ui' },
          { label: 'pages.modals.modals' },
        ],
      },
    },
    {
      path: 'accordion',
      component: () => import('@/pages/advanced-ui/accordion.vue'),
      meta: {
        pageTitle: 'pages.accordion.accordion',
        breadcrumb: [
          { label: 'pages.accordion.title', link: '/advanced-ui' },
          { label: 'pages.accordion.accordion' },
        ],
      },
    },
    {
      path: 'carousel',
      component: () => import('@/pages/advanced-ui/carousel.vue'),
      meta: {
        pageTitle: 'pages.carousel.carousel',
        breadcrumb: [
          { label: 'pages.carousel.title', link: '/advanced-ui' },
          { label: 'pages.carousel.carousel' },
        ],
      },
    },
    {
      path: 'collapse',
      component: () => import('@/pages/advanced-ui/collapse.vue'),
      meta: {
        pageTitle: 'pages.collapse.collapse',
        breadcrumb: [
          { label: 'pages.collapse.title', link: '/advanced-ui' },
          { label: 'pages.collapse.collapse' },
        ],
      },
    },
    {
      path: 'navbar',
      component: () => import('@/pages/advanced-ui/navbar.vue'),
      meta: {
        pageTitle: 'pages.navbar.navbar',
        breadcrumb: [
          { label: 'pages.navbar.title', link: '/advanced-ui' },
          { label: 'pages.navbar.navbar' },
        ],
      },
    },
    {
      path: 'rating',
      component: () => import('@/pages/advanced-ui/rating.vue'),
      meta: {
        pageTitle: 'pages.rating.rating',
        breadcrumb: [
          { label: 'pages.rating.title', link: '/advanced-ui' },
          { label: 'pages.rating.rating' },
        ],
      },
    },
    {
      path: 'skeleton',
      component: () => import('@/pages/advanced-ui/skeleton.vue'),
      meta: {
        pageTitle: 'pages.skeleton.skeleton',
        breadcrumb: [
          { label: 'pages.skeleton.title', link: '/advanced-ui' },
          { label: 'pages.skeleton.skeleton' },
        ],
      },
    },
  ],
}
