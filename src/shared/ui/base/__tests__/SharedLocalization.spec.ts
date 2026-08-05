import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import DiAlert from '../DiAlert.vue'
import DiPagination from '../DiPagination.vue'
import DiSelect from '../select/DiSelect.vue'
import { testI18n } from './setup'

describe('shared component localization', () => {
  it('updates defaults immediately when the active locale changes', async () => {
    const alert = mount(DiAlert, { props: { closable: true } })
    const pagination = mount(DiPagination, { props: { totalPages: 3 } })
    const select = mount(DiSelect, { props: { options: [] } })

    expect(alert.get('button').attributes('aria-label')).toBe('Close alert')
    expect(pagination.get('nav').attributes('aria-label')).toBe('Pagination')
    expect(select.get('[role="combobox"]').attributes('aria-label')).toBe('Select an option')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(alert.get('button').attributes('aria-label')).toBe('بستن هشدار')
    expect(pagination.get('nav').attributes('aria-label')).toBe('صفحه‌بندی')
    expect(select.get('[role="combobox"]').attributes('aria-label')).toBe(
      'یک گزینه انتخاب کنید',
    )
  })

  it('keeps explicit text props as stable overrides', async () => {
    const alert = mount(DiAlert, {
      props: { closable: true, closeLabel: 'Dismiss' },
    })
    const select = mount(DiSelect, {
      props: { options: [], placeholder: 'Choose', ariaLabel: 'Choose' },
    })

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(alert.get('button').attributes('aria-label')).toBe('Dismiss')
    expect(select.get('[role="combobox"]').attributes('aria-label')).toBe('Choose')
    expect(select.get('input').attributes('placeholder')).toBe('Choose')
  })
})
