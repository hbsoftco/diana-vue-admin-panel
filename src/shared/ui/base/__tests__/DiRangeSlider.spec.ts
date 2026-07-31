import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiRangeSlider from '../range-slider/DiRangeSlider.vue'

const variants = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'] as const

function mockTrack(wrapper: ReturnType<typeof mount>) {
  const track = wrapper.get('[role="group"] > div').element
  Object.defineProperty(track, 'getBoundingClientRect', {
    value: () => ({ bottom: 20, height: 20, left: 0, right: 100, top: 0, width: 100 }),
  })
  return track
}

function lastModelUpdate(wrapper: ReturnType<typeof mount>) {
  const updates = wrapper.emitted('update:modelValue')
  return updates?.[updates.length - 1]
}

describe('diRangeSlider', () => {
  it('renders two accessible slider handles with a connected track', () => {
    const wrapper = mount(DiRangeSlider, {
      props: { label: 'Price', modelValue: [20, 80] },
    })
    const handles = wrapper.findAll('[role="slider"]')

    expect(handles).toHaveLength(2)
    expect(handles[0]?.attributes()).toMatchObject({
      'aria-label': 'Price minimum',
      'aria-valuenow': '20',
      'aria-orientation': 'horizontal',
    })
    expect(handles[1]?.attributes('aria-label')).toBe('Price maximum')
    expect(wrapper.find('.bg-primary').exists()).toBe(true)
    expect(handles[0]?.classes()).toContain('rounded-sm')
    expect(handles[0]?.classes()).not.toContain('rounded-full')
    expect(handles[0]?.classes()).toEqual(
      expect.arrayContaining([
        'inline-flex',
        'items-center',
        'justify-center',
        'border',
        'border-base-300',
        'bg-base-100',
        'text-base-content',
        'p-0',
      ]),
    )
    expect(handles[0]?.classes()).not.toContain('border-2')
  })

  it('enforces minimum and maximum handle distances with keyboard input', async () => {
    const minimum = mount(DiRangeSlider, {
      props: { minDistance: 20, modelValue: [30, 60] },
    })
    await minimum.findAll('[role="slider"]')[0]?.trigger('keydown', { key: 'End' })
    expect(lastModelUpdate(minimum)).toEqual([[40, 60]])

    const maximum = mount(DiRangeSlider, {
      props: { maxDistance: 30, modelValue: [30, 50] },
    })
    await maximum.findAll('[role="slider"]')[1]?.trigger('keydown', { key: 'End' })
    expect(lastModelUpdate(maximum)).toEqual([[30, 60]])
  })

  it('moves the nearest handle when the track is clicked', async () => {
    const wrapper = mount(DiRangeSlider, { props: { modelValue: [20, 80] } })
    const track = mockTrack(wrapper)

    track.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 35 }))
    await wrapper.vm.$nextTick()

    expect(lastModelUpdate(wrapper)).toEqual([[35, 80]])
  })

  it('drags the connected interval while preserving its distance', async () => {
    const wrapper = mount(DiRangeSlider, { props: { modelValue: [20, 50] } })
    mockTrack(wrapper)
    const connection = wrapper.get('.bg-primary')

    connection.element.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, clientX: 30 }),
    )
    window.dispatchEvent(new PointerEvent('pointermove', { clientX: 50 }))
    window.dispatchEvent(new PointerEvent('pointerup'))
    await wrapper.vm.$nextTick()

    expect(lastModelUpdate(wrapper)).toEqual([[40, 70]])
  })

  it('applies soft limits after interaction completes', async () => {
    const wrapper = mount(DiRangeSlider, {
      props: { modelValue: [10, 90], softMax: 80, softMin: 20 },
    })

    await wrapper.findAll('[role="slider"]')[0]?.trigger('keyup', { key: 'ArrowRight' })

    expect(lastModelUpdate(wrapper)).toEqual([[20, 80]])
  })

  it('supports formatted tooltips and clickable custom ticks', async () => {
    const wrapper = mount(DiRangeSlider, {
      props: {
        formatValue: value => `$${value}`,
        modelValue: [20, 70],
        showTooltips: true,
        ticks: [{ value: 0 }, { value: 50, label: 'Middle' }, { value: 100 }],
        ticksClickable: true,
      },
    })

    expect(wrapper.text()).toContain('$20')
    expect(wrapper.text()).toContain('$70')
    await wrapper
      .findAll('button')
      .find(button => button.text() === 'Middle')
      ?.trigger('click')
    expect(lastModelUpdate(wrapper)).toEqual([[20, 50]])
  })

  it('merges nearby handle tooltips', () => {
    const wrapper = mount(DiRangeSlider, {
      props: {
        mergeTooltips: true,
        modelValue: [45, 55],
        showTooltips: true,
        tooltipSeparator: ' to ',
      },
    })

    expect(wrapper.findAll('.badge-neutral')).toHaveLength(1)
    expect(wrapper.get('.badge-neutral').text()).toBe('45 to 55')
  })

  it('renders registered decorative icons without replacing interactive thumbs', () => {
    const wrapper = mount(DiRangeSlider, {
      props: { modelValue: [25, 75], size: 'lg', thumbIcon: 'dragHandle' },
      global: { stubs: { DiIcon: true } },
    })

    expect(wrapper.findAll('[role="slider"]')).toHaveLength(2)
    expect(wrapper.findAll('di-icon-stub')).toHaveLength(2)
    expect(wrapper.get('di-icon-stub').attributes()).toMatchObject({
      name: 'dragHandle',
      size: 'md',
    })
    expect(wrapper.get('[role="slider"] span').attributes('aria-hidden')).toBe('true')
  })

  it.each([
    ['sm', 'xs'],
    ['md', 'sm'],
    ['lg', 'md'],
  ] as const)('scales the %s thumb icon to %s', (size, iconSize) => {
    const wrapper = mount(DiRangeSlider, {
      props: { modelValue: [25, 75], size, thumbIcon: 'dragHandle' },
      global: { stubs: { DiIcon: true } },
    })

    expect(wrapper.get('di-icon-stub').attributes('size')).toBe(iconSize)
  })

  it.each(['diana-light', 'diana-dark'] as const)(
    'uses adaptive surface tokens in the %s theme',
    (theme) => {
      const wrapper = mount(DiRangeSlider, {
        props: { modelValue: [25, 75], thumbIcon: 'dragHandle' },
        attrs: { 'data-theme': theme },
        global: { stubs: { DiIcon: true } },
      })
      const handle = wrapper.get('[role="slider"]')

      expect(wrapper.attributes('data-theme')).toBe(theme)
      expect(handle.classes()).toEqual(
        expect.arrayContaining(['bg-base-100', 'border-base-300', 'text-base-content']),
      )
    },
  )

  it.each(variants)('keeps %s handles surface-styled while coloring only the connection', (variant) => {
    const wrapper = mount(DiRangeSlider, {
      props: { modelValue: [25, 75], thumbIcon: 'dragHandle', variant },
      global: { stubs: { DiIcon: true } },
    })
    const handles = wrapper.findAll('[role="slider"]')

    expect(wrapper.find(`.bg-${variant}`).exists()).toBe(true)
    for (const handle of handles) {
      expect(handle.classes()).toContain('bg-base-100')
      expect(handle.classes()).toContain('text-base-content')
      expect(handle.classes()).toContain('focus-visible:outline-base-content')
      expect(handle.classes()).not.toContain(`bg-${variant}`)
    }
  })

  it('reverses horizontal arrow direction in RTL', async () => {
    const wrapper = mount(DiRangeSlider, { props: { modelValue: [25, 75] } })
    const track = mockTrack(wrapper)
    track.setAttribute('style', 'direction: rtl')

    await wrapper.findAll('[role="slider"]')[0]?.trigger('keydown', { key: 'ArrowRight' })

    expect(lastModelUpdate(wrapper)).toEqual([[24, 75]])
  })

  it('supports vertical, disabled, and validation states', () => {
    const wrapper = mount(DiRangeSlider, {
      props: {
        disabled: true,
        error: 'Invalid interval',
        modelValue: [25, 75],
        orientation: 'vertical',
        variant: 'secondary',
      },
    })

    expect(
      wrapper
        .findAll('[role="slider"]')
        .every(handle => handle.attributes('disabled') !== undefined),
    ).toBe(true)
    expect(wrapper.get('[role="alert"]').text()).toBe('Invalid interval')
    expect(wrapper.get('[role="slider"]').attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.find('.bg-secondary').exists()).toBe(true)
  })
})
