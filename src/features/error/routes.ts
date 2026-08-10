import EmptyLayout from '@/layouts/EmptyLayout.vue'

export const errorRoutes = {
  path: '/error',
  component: EmptyLayout,
  children: [
    {
      path: '',
      redirect: '/error/404',
    },
    {
      path: '401',
      component: () => import('@/pages/error/401.vue'),
      meta: {
        pageTitle: 'pages.error.401.title',
      },
    },
    {
      path: '404',
      component: () => import('@/pages/error/404.vue'),
      meta: {
        pageTitle: 'pages.error.404.title',
      },
    },
    {
      path: '500',
      component: () => import('@/pages/error/500.vue'),
      meta: {
        pageTitle: 'pages.error.500.title',
      },
    },
  ],
}
