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
      component: () => import('@/pages/dashboards/crm.vue'),
      meta: {
        pageTitle: 'pages.dashboard.crm.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.crm.title' },
        ],
      },
    },
    {
      path: 'ecommerce',
      component: () => import('@/pages/dashboards/ecommerce.vue'),
      meta: {
        pageTitle: 'pages.dashboard.ecommerce.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.ecommerce.title' },
        ],
      },
    },
    {
      path: 'analytics',
      component: () => import('@/pages/dashboards/analytics.vue'),
      meta: {
        pageTitle: 'pages.dashboard.analytics.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.analytics.title' },
        ],
      },
    },
    {
      path: 'courses',
      component: () => import('@/pages/dashboards/courses.vue'),
      meta: {
        pageTitle: 'pages.dashboard.courses.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.courses.title' },
        ],
      },
    },
    {
      path: 'crypto',
      component: () => import('@/pages/dashboards/crypto.vue'),
      meta: {
        pageTitle: 'pages.dashboard.crypto.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.crypto.title' },
        ],
      },
    },
    {
      path: 'hrm',
      component: () => import('@/pages/dashboards/hrm.vue'),
      meta: {
        pageTitle: 'pages.dashboard.hrm.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.hrm.title' },
        ],
      },
    },
    {
      path: 'jobs',
      component: () => import('@/pages/dashboards/jobs.vue'),
      meta: {
        pageTitle: 'pages.dashboard.jobs.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.jobs.title' },
        ],
      },
    },
    {
      path: 'nft',
      component: () => import('@/pages/dashboards/nft.vue'),
      meta: {
        pageTitle: 'pages.dashboard.nft.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.nft.title' },
        ],
      },
    },
    {
      path: 'personal',
      component: () => import('@/pages/dashboards/personal.vue'),
      meta: {
        pageTitle: 'pages.dashboard.personal.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.personal.title' },
        ],
      },
    },
    {
      path: 'projects',
      component: () => import('@/pages/dashboards/projects.vue'),
      meta: {
        pageTitle: 'pages.dashboard.projects.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.projects.title' },
        ],
      },
    },
    {
      path: 'sales',
      component: () => import('@/pages/dashboards/sales.vue'),
      meta: {
        pageTitle: 'pages.dashboard.sales.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.sales.title' },
        ],
      },
    },
    {
      path: 'stocks',
      component: () => import('@/pages/dashboards/stocks.vue'),
      meta: {
        pageTitle: 'pages.dashboard.stocks.title',
        breadcrumb: [
          { label: 'pages.dashboard.title', link: '/dashboards' },
          { label: 'pages.dashboard.stocks.title' },
        ],
      },
    },
  ],
}
