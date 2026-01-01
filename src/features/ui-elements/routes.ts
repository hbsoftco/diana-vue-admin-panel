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
        pageTitle: 'pages.alerts.alerts',
        breadcrumb: [
          { label: 'pages.alerts.title', link: '/ui-elements' },
          { label: 'pages.alerts.alerts' },
        ],
      },
    },
    {
      path: 'badge',
      component: () => import('@/pages/ui-elements/badge.vue'),
      meta: {
        pageTitle: 'pages.badge.badge',
        breadcrumb: [
          { label: 'pages.badge.title', link: '/ui-elements' },
          { label: 'pages.badge.badge' },
        ],
      },
    },
    {
      path: 'breadcrumb',
      component: () => import('@/pages/ui-elements/breadcrumb.vue'),
      meta: {
        pageTitle: 'pages.breadcrumb.breadcrumb',
        breadcrumb: [
          { label: 'pages.breadcrumb.title', link: '/ui-elements' },
          { label: 'pages.breadcrumb.breadcrumb' },
        ],
      },
    },
    {
      path: 'buttons',
      component: () => import('@/pages/ui-elements/buttons.vue'),
      meta: {
        pageTitle: 'pages.buttons.buttons',
        breadcrumb: [
          { label: 'pages.buttons.title', link: '/ui-elements' },
          { label: 'pages.buttons.buttons' },
        ],
      },
    },
    {
      path: 'loadings',
      component: () => import('@/pages/ui-elements/loadings.vue'),
      meta: {
        pageTitle: 'pages.loadings.loadings',
        breadcrumb: [
          { label: 'pages.loadings.title', link: '/ui-elements' },
          { label: 'pages.loadings.loadings' },
        ],
      },
    },
    {
      path: 'button-group',
      component: () => import('@/pages/ui-elements/button-group.vue'),
      meta: {
        pageTitle: 'pages.buttonGroup.buttonGroup',
        breadcrumb: [
          { label: 'pages.buttonGroup.title', link: '/ui-elements' },
          { label: 'pages.buttonGroup.buttonGroup' },
        ],
      },
    },
    {
      path: 'cards',
      component: () => import('@/pages/ui-elements/cards.vue'),
      meta: {
        pageTitle: 'pages.card.cards',
        breadcrumb: [
          { label: 'pages.card.title', link: '/ui-elements' },
          { label: 'pages.card.cards' },
        ],
      },
    },
    {
      path: 'dropdowns',
      component: () => import('@/pages/ui-elements/dropdowns.vue'),
      meta: {
        pageTitle: 'pages.dropdowns.dropdowns',
        breadcrumb: [
          { label: 'pages.dropdowns.title', link: '/ui-elements' },
          { label: 'pages.dropdowns.dropdowns' },
        ],
      },
    },
    {
      path: 'images-figures',
      component: () => import('@/pages/ui-elements/images-figures.vue'),
      meta: {
        pageTitle: 'pages.imagesFigures.imagesFigures',
        breadcrumb: [
          { label: 'pages.imagesFigures.title', link: '/ui-elements' },
          { label: 'pages.imagesFigures.imagesFigures' },
        ],
      },
    },
    {
      path: 'links-interactions',
      component: () => import('@/pages/ui-elements/links-interactions.vue'),
      meta: {
        pageTitle: 'pages.linksInteractions.linksInteractions',
        breadcrumb: [
          { label: 'pages.linksInteractions.title', link: '/ui-elements' },
          { label: 'pages.linksInteractions.linksInteractions' },
        ],
      },
    },
    {
      path: 'list-group',
      component: () => import('@/pages/ui-elements/list-group.vue'),
      meta: {
        pageTitle: 'pages.listGroup.listGroup',
        breadcrumb: [
          { label: 'pages.listGroup.title', link: '/ui-elements' },
          { label: 'pages.listGroup.listGroup' },
        ],
      },
    },
    {
      path: 'navs-tabs',
      component: () => import('@/pages/ui-elements/navs-tabs.vue'),
      meta: {
        pageTitle: 'pages.navsTabs.navsTabs',
        breadcrumb: [
          { label: 'pages.navsTabs.title', link: '/ui-elements' },
          { label: 'pages.navsTabs.navsTabs' },
        ],
      },
    },
    {
      path: 'object-fit',
      component: () => import('@/pages/ui-elements/object-fit.vue'),
      meta: {
        pageTitle: 'pages.objectFit.objectFit',
        breadcrumb: [
          { label: 'pages.objectFit.title', link: '/ui-elements' },
          { label: 'pages.objectFit.objectFit' },
        ],
      },
    },
    {
      path: 'pagination',
      component: () => import('@/pages/ui-elements/pagination.vue'),
      meta: {
        pageTitle: 'pages.pagination.pagination',
        breadcrumb: [
          { label: 'pages.pagination.title', link: '/ui-elements' },
          { label: 'pages.pagination.pagination' },
        ],
      },
    },
    {
      path: 'popovers',
      component: () => import('@/pages/ui-elements/popovers.vue'),
      meta: {
        pageTitle: 'pages.popovers.popovers',
        breadcrumb: [
          { label: 'pages.popovers.title', link: '/ui-elements' },
          { label: 'pages.popovers.popovers' },
        ],
      },
    },
    {
      path: 'progress',
      component: () => import('@/pages/ui-elements/progress.vue'),
      meta: {
        pageTitle: 'pages.progress.progress',
        breadcrumb: [
          { label: 'pages.progress.title', link: '/ui-elements' },
          { label: 'pages.progress.progress' },
        ],
      },
    },
    {
      path: 'spinners',
      component: () => import('@/pages/ui-elements/spinners.vue'),
      meta: {
        pageTitle: 'pages.spinners.spinners',
        breadcrumb: [
          { label: 'pages.spinners.title', link: '/ui-elements' },
          { label: 'pages.spinners.spinners' },
        ],
      },
    },
    {
      path: 'toasts',
      component: () => import('@/pages/ui-elements/toasts.vue'),
      meta: {
        pageTitle: 'pages.toasts.toasts',
        breadcrumb: [
          { label: 'pages.toasts.title', link: '/ui-elements' },
          { label: 'pages.toasts.toasts' },
        ],
      },
    },
    {
      path: 'tooltips',
      component: () => import('@/pages/ui-elements/tooltips.vue'),
      meta: {
        pageTitle: 'pages.tooltips.tooltips',
        breadcrumb: [
          { label: 'pages.tooltips.title', link: '/ui-elements' },
          { label: 'pages.tooltips.tooltips' },
        ],
      },
    },
    {
      path: 'typography',
      component: () => import('@/pages/ui-elements/typography.vue'),
      meta: {
        pageTitle: 'pages.typography.typography',
        breadcrumb: [
          { label: 'pages.typography.title', link: '/ui-elements' },
          { label: 'pages.typography.typography' },
        ],
      },
    },
  ],
}
