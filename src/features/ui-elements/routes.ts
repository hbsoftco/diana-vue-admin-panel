import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const uiElementRoutes = {
  path: '/ui-elements',
  component: DefaultLayout,
  children: [
    {
      path: '',
      redirect: '/ui-elements/buttons',
    },
    {
      path: 'alerts',
      component: () => import('@/pages/ui-elements/alerts.vue'),
    },
    {
      path: 'badge',
      component: () => import('@/pages/ui-elements/badge.vue'),
    },
    {
      path: 'breadcrumb',
      component: () => import('@/pages/ui-elements/breadcrumb.vue'),
    },
    {
      path: 'buttons',
      component: () => import('@/pages/ui-elements/buttons.vue'),
    },
    {
      path: 'button-group',
      component: () => import('@/pages/ui-elements/button-group.vue'),
    },
    {
      path: 'cards',
      component: () => import('@/pages/ui-elements/cards.vue'),
    },
    {
      path: 'dropdowns',
      component: () => import('@/pages/ui-elements/dropdowns.vue'),
    },
    {
      path: 'images-figures',
      component: () => import('@/pages/ui-elements/images-figures.vue'),
    },
    {
      path: 'links-interactions',
      component: () => import('@/pages/ui-elements/links-interactions.vue'),
    },
    {
      path: 'list-group',
      component: () => import('@/pages/ui-elements/list-group.vue'),
    },
    {
      path: 'navs-tabs',
      component: () => import('@/pages/ui-elements/navs-tabs.vue'),
    },
    {
      path: 'object-fit',
      component: () => import('@/pages/ui-elements/object-fit.vue'),
    },
    {
      path: 'pagination',
      component: () => import('@/pages/ui-elements/pagination.vue'),
    },
    {
      path: 'popovers',
      component: () => import('@/pages/ui-elements/popovers.vue'),
    },
    {
      path: 'progress',
      component: () => import('@/pages/ui-elements/progress.vue'),
    },
    {
      path: 'spinners',
      component: () => import('@/pages/ui-elements/spinners.vue'),
    },
    {
      path: 'toasts',
      component: () => import('@/pages/ui-elements/toasts.vue'),
    },
    {
      path: 'tooltips',
      component: () => import('@/pages/ui-elements/tooltips.vue'),
    },
    {
      path: 'typography',
      component: () => import('@/pages/ui-elements/typography.vue'),
    },
  ],
}
