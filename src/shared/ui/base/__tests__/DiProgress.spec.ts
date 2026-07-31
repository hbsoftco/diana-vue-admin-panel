import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiProgress from '../DiProgress.vue'

describe('DiProgress', () => {
  it('preserves native progress rendering for the existing API', () => {
    const wrapper = mount(DiProgress, {
      props: { value: 40, max: 80, variant: 'success', size: 'lg' },
    })

    const progress = wrapper.get('progress')
    expect(progress.attributes('value')).toBe('40')
    expect(progress.attributes('max')).toBe('80')
    expect(progress.classes()).toEqual(expect.arrayContaining(['progress-success', 'h-3']))
  })

  it('clamps enhanced progress values and exposes progressbar semantics', () => {
    const wrapper = mount(DiProgress, {
      props: { value: 120, max: 100, pattern: 'striped', animated: true },
    })

    const progressbar = wrapper.get('[role="progressbar"]')
    expect(progressbar.attributes('aria-valuenow')).toBe('100')
    expect(progressbar.attributes('aria-valuemax')).toBe('100')
    expect(wrapper.get('.di-progress-fill').attributes('style')).toContain('width: 100%')
    expect(wrapper.get('.di-progress-fill').classes()).toEqual(
      expect.arrayContaining(['di-progress-striped', 'di-progress-animated']),
    )
  })

  it('supports vertical orientation, labels, and normalized markers', () => {
    const wrapper = mount(DiProgress, {
      props: {
        value: 25,
        orientation: 'vertical',
        showValue: true,
        markers: [-10, 50, 140],
      },
    })

    expect(wrapper.get('.di-progress-fill').attributes('style')).toContain('height: 25%')
    expect(wrapper.get('.di-progress-label').text()).toBe('25%')
    expect(wrapper.findAll('.di-progress-marker')).toHaveLength(3)
    expect(wrapper.findAll('.di-progress-marker')[0]?.attributes('style')).toContain('bottom: 0%')
    expect(wrapper.findAll('.di-progress-marker')[2]?.attributes('style')).toContain('bottom: 100%')
  })

  it('provides normalized values to the value label slot', () => {
    const wrapper = mount(DiProgress, {
      props: { value: 3, max: 5, labelPosition: 'end' },
      slots: {
        'value-label': ({ value, max, percentage }) => `${value}/${max} (${percentage}%)`,
      },
    })

    expect(wrapper.get('.di-progress-label').text()).toBe('3/5 (60%)')
    expect(wrapper.get('.di-progress-label').attributes('style')).toContain('60%')
  })
})
