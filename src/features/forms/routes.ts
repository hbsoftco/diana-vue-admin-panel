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
        pageTitle: 'pages.forms.inputs.title',
        breadcrumb: [
          { label: 'pages.forms.title', link: '/forms' },
          { label: 'pages.forms.formElements.title' },
          { label: 'pages.forms.inputs.title' },
        ],
      },
    },
    {
      path: 'form-elements/checks-radios',
      component: () => import('@/pages/forms/form-elements/checks-radios.vue'),
      meta: {
        pageTitle: 'pages.forms.checksRadios.title',
        breadcrumb: [
          { label: 'pages.forms.title', link: '/forms' },
          { label: 'pages.forms.formElements.title' },
          { label: 'pages.forms.checksRadios.title' },
        ],
      },
    },
    {
      path: 'form-elements/select',
      component: () => import('@/pages/forms/select.vue'),
      meta: {
        pageTitle: 'pages.forms.select.title',
        breadcrumb: [
          { label: 'pages.forms.title', link: '/forms' },
          { label: 'pages.forms.formElements.title' },
          { label: 'pages.forms.select.title' },
        ],
      },
    },
    {
      path: 'form-elements/range',
      component: () => import('@/pages/forms/form-elements/range.vue'),
      meta: {
        pageTitle: 'pages.forms.range.title',
        breadcrumb: [
          { label: 'pages.forms.title', link: '/forms' },
          { label: 'pages.forms.formElements.title' },
          { label: 'pages.forms.range.title' },
        ],
      },
    },
    {
      path: 'form-elements/range-slider',
      component: () => import('@/pages/forms/form-elements/range-slider.vue'),
      meta: {
        pageTitle: 'pages.forms.rangeSlider.title',
        breadcrumb: [
          { label: 'pages.forms.title', link: '/forms' },
          { label: 'pages.forms.formElements.title' },
          { label: 'pages.forms.rangeSlider.title' },
        ],
      },
    },
  ],
}
