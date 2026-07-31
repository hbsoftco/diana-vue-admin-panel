import DefaultLayout from '@/layouts/DefaultLayout.vue'

export const formRoutes = {
  path: '/forms',
  component: DefaultLayout,
  children: [
    { path: '', redirect: '/forms/form-elements/inputs' },
    { path: 'select', redirect: '/forms/form-elements/select' },
    {
      path: 'form-elements/inputs',
      component: () => import('@/pages/forms/form-elements/inputs.vue'),
      meta: {
        pageTitle: 'pages.inputs.inputs',
        breadcrumb: [
          { label: 'pages.inputs.forms', link: '/forms' },
          { label: 'pages.inputs.formElements' },
          { label: 'pages.inputs.inputs' },
        ],
      },
    },
    {
      path: 'form-elements/select',
      component: () => import('@/pages/forms/select.vue'),
      meta: {
        pageTitle: 'pages.select.select',
        breadcrumb: [
          { label: 'pages.select.title', link: '/forms' },
          { label: 'pages.select.formElements' },
          { label: 'pages.select.select' },
        ],
      },
    },
  ],
}
