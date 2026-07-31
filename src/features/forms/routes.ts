import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const formRoutes = {
  path: '/forms',
  component: DefaultLayout,
  children: [
    { path: '', redirect: '/forms/select' },
    {
      path: 'select',
      component: () => import('@/pages/forms/select.vue'),
      meta: {
        pageTitle: 'pages.select.select',
        breadcrumb: [
          { label: 'pages.select.title', link: '/forms' },
          { label: 'pages.select.select' },
        ],
      },
    },
  ],
}
