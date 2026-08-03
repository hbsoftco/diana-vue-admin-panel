import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const utilityRoutes = {
  path: '/utility',
  component: DefaultLayout,
  children: [
    {
      path: '',
      redirect: '/utility/avatar',
    },
    {
      path: 'avatar',
      component: () => import('@/pages/utility/avatar.vue'),
      meta: {
        pageTitle: 'pages.avatar.avatar',
        breadcrumb: [
          { label: 'pages.avatar.title', link: '/utility' },
          { label: 'pages.avatar.avatar' },
        ],
      },
    },
  ],
}
