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
      meta: {
        pageTitle: 'pages.uiElements.alerts.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.alerts.title' },
        ],
      },
    },
    {
      path: 'badge',
      component: () => import('@/pages/ui-elements/badge.vue'),
      meta: {
        pageTitle: 'pages.uiElements.badge.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.badge.title' },
        ],
      },
    },
    {
      path: 'breadcrumb',
      component: () => import('@/pages/ui-elements/breadcrumb.vue'),
      meta: {
        pageTitle: 'pages.uiElements.breadcrumb.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.breadcrumb.title' },
        ],
      },
    },
    {
      path: 'buttons',
      component: () => import('@/pages/ui-elements/buttons.vue'),
      meta: {
        pageTitle: 'pages.uiElements.buttons.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.buttons.title' },
        ],
      },
    },
    {
      path: 'icons',
      component: () => import('@/pages/ui-elements/icons.vue'),
      meta: {
        pageTitle: 'pages.uiElements.icons.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.icons.title' },
        ],
      },
    },
    {
      path: 'loadings',
      component: () => import('@/pages/ui-elements/loadings.vue'),
      meta: {
        pageTitle: 'pages.uiElements.loadings.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.loadings.title' },
        ],
      },
    },
    {
      path: 'logo-loading',
      component: () => import('@/pages/ui-elements/logo-loading.vue'),
      meta: {
        pageTitle: 'pages.uiElements.logoLoading.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.logoLoading.title' },
        ],
      },
    },
    {
      path: 'button-group',
      component: () => import('@/pages/ui-elements/button-group.vue'),
      meta: {
        pageTitle: 'pages.uiElements.buttonGroup.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.buttonGroup.title' },
        ],
      },
    },
    {
      path: 'cards',
      component: () => import('@/pages/ui-elements/cards.vue'),
      meta: {
        pageTitle: 'pages.uiElements.cards.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.cards.title' },
        ],
      },
    },
    {
      path: 'dropdowns',
      component: () => import('@/pages/ui-elements/dropdowns.vue'),
      meta: {
        pageTitle: 'pages.uiElements.dropdowns.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.dropdowns.title' },
        ],
      },
    },
    {
      path: 'images-figures',
      component: () => import('@/pages/ui-elements/images-figures.vue'),
      meta: {
        pageTitle: 'pages.uiElements.imagesFigures.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.imagesFigures.title' },
        ],
      },
    },
    {
      path: 'links-interactions',
      component: () => import('@/pages/ui-elements/links-interactions.vue'),
      meta: {
        pageTitle: 'pages.uiElements.linksInteractions.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.linksInteractions.title' },
        ],
      },
    },
    {
      path: 'list-group',
      component: () => import('@/pages/ui-elements/list-group.vue'),
      meta: {
        pageTitle: 'pages.uiElements.listGroup.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.listGroup.title' },
        ],
      },
    },
    {
      path: 'navs-tabs',
      component: () => import('@/pages/ui-elements/navs-tabs.vue'),
      meta: {
        pageTitle: 'pages.uiElements.navsTabs.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.navsTabs.title' },
        ],
      },
    },
    {
      path: 'object-fit',
      component: () => import('@/pages/ui-elements/object-fit.vue'),
      meta: {
        pageTitle: 'pages.uiElements.objectFit.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.objectFit.title' },
        ],
      },
    },
    {
      path: 'pagination',
      component: () => import('@/pages/ui-elements/pagination.vue'),
      meta: {
        pageTitle: 'pages.uiElements.pagination.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.pagination.title' },
        ],
      },
    },
    {
      path: 'popovers',
      component: () => import('@/pages/ui-elements/popovers.vue'),
      meta: {
        pageTitle: 'pages.uiElements.popovers.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.popovers.title' },
        ],
      },
    },
    {
      path: 'progress',
      component: () => import('@/pages/ui-elements/progress.vue'),
      meta: {
        pageTitle: 'pages.uiElements.progress.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.progress.title' },
        ],
      },
    },
    {
      path: 'switch',
      component: () => import('@/pages/ui-elements/switch.vue'),
      meta: {
        pageTitle: 'pages.uiElements.switch.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.switch.title' },
        ],
      },
    },
    {
      path: 'toasts',
      component: () => import('@/pages/ui-elements/toasts.vue'),
      meta: {
        pageTitle: 'pages.uiElements.toasts.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.toasts.title' },
        ],
      },
    },
    {
      path: 'tooltips',
      component: () => import('@/pages/ui-elements/tooltips.vue'),
      meta: {
        pageTitle: 'pages.uiElements.tooltips.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.tooltips.title' },
        ],
      },
    },
    {
      path: 'typography',
      component: () => import('@/pages/ui-elements/typography.vue'),
      meta: {
        pageTitle: 'pages.uiElements.typography.title',
        breadcrumb: [
          { label: 'pages.uiElements.title', link: '/ui-elements' },
          { label: 'pages.uiElements.typography.title' },
        ],
      },
    },
  ],
}
