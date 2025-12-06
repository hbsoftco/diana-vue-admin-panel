import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const dashboardRoutes = {
  path: '/dashboards',
  component: DefaultLayout,
  children: [
    {
      path: 'crm',
      component: () => import('@pages/dashboards/crm.vue'),
    },
    {
      path: '',
      redirect: '/dashboards/crm',
    },
  ],
}
