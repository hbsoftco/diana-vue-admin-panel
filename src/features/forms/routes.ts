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
    {
      path: 'form-elements/range',
      component: () => import('@/pages/forms/form-elements/range.vue'),
      meta: {
        pageTitle: 'pages.range.range',
        breadcrumb: [
          { label: 'pages.range.forms', link: '/forms' },
          { label: 'pages.range.formElements' },
          { label: 'pages.range.range' },
        ],
      },
    },
    {
      path: 'form-elements/range-slider',
      component: () => import('@/pages/forms/form-elements/range-slider.vue'),
      meta: {
        pageTitle: 'pages.rangeSlider.rangeSlider',
        breadcrumb: [
          { label: 'pages.rangeSlider.forms', link: '/forms' },
          { label: 'pages.rangeSlider.formElements' },
          { label: 'pages.rangeSlider.rangeSlider' },
        ],
      },
    },
  ],
}
