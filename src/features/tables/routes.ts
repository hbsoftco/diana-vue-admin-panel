import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const tablesRoutes = {
  path: '/tables',
  component: DefaultLayout,
  children: [
    {
      path: '',
      redirect: '/tables/tables',
    },
    {
      path: 'tables',
      component: () => import('@/pages/tables/tables.vue'),
      meta: {
        pageTitle: 'pages.tables.tables.title',
        breadcrumb: [
          { label: 'pages.tables.title', link: '/tables' },
          { label: 'pages.tables.tables.title' },
        ],
      },
    },
    {
      path: 'grid-js-tables',
      component: () => import('@/pages/tables/grid-js-tables.vue'),
      meta: {
        pageTitle: 'pages.tables.gridJsTables.title',
        breadcrumb: [
          { label: 'pages.tables.title', link: '/tables' },
          { label: 'pages.tables.gridJsTables.title' },
        ],
      },
    },
    {
      path: 'data-tables',
      component: () => import('@/pages/tables/data-tables.vue'),
      meta: {
        pageTitle: 'pages.tables.dataTables.title',
        breadcrumb: [
          { label: 'pages.tables.title', link: '/tables' },
          { label: 'pages.tables.dataTables.title' },
        ],
      },
    },
  ],
}
