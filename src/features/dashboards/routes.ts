import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const dashboardRoutes = {
  path: '/dashboards',
  component: DefaultLayout,
  children: [
    {
      path: '',
      redirect: '/dashboards/crm',
    },
    {
      path: 'crm',
      component: () => import('@pages/dashboards/crm.vue'),
    },
    {
      path: 'ecommerce',
      component: () => import('@/pages/dashboards/ecommerce.vue'),
    },
    {
      path: 'analytics',
      component: () => import('@/pages/dashboards/analytics.vue'),
    },
    {
      path: 'courses',
      component: () => import('@/pages/dashboards/courses.vue'),
    },
    {
      path: 'crypto',
      component: () => import('@/pages/dashboards/crypto.vue'),
    },
    {
      path: 'hrm',
      component: () => import('@/pages/dashboards/hrm.vue'),
    },
    {
      path: 'jobs',
      component: () => import('@/pages/dashboards/jobs.vue'),
    },
    {
      path: 'nft',
      component: () => import('@/pages/dashboards/nft.vue'),
    },
    {
      path: 'personal',
      component: () => import('@/pages/dashboards/personal.vue'),
    },
    {
      path: 'projects',
      component: () => import('@/pages/dashboards/projects.vue'),
    },
    {
      path: 'sales',
      component: () => import('@/pages/dashboards/sales.vue'),
    },
    {
      path: 'stocks',
      component: () => import('@/pages/dashboards/stocks.vue'),
    },
  ],
}
