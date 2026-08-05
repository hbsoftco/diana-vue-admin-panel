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
        pageTitle: 'pages.utility.avatar.title',
        breadcrumb: [
          { label: 'pages.utility.title', link: '/utility' },
          { label: 'pages.utility.avatar.title' },
        ],
      },
    },
    {
      path: 'colors',
      component: () => import('@/pages/utility/colors.vue'),
      meta: {
        pageTitle: 'pages.utility.colors.title',
        breadcrumb: [
          { label: 'pages.utility.title', link: '/utility' },
          { label: 'pages.utility.colors.title' },
        ],
      },
    },
  ],
}
