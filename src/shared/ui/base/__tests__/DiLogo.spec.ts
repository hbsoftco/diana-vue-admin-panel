import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiLogo from '../DiLogo.vue'

describe('diLogo', () => {
  it('renders the full wordmark by default', () => {
    const wrapper = mount(DiLogo)
    const svg = wrapper.get('svg')

    expect(svg.attributes('viewBox')).toBe('0 0 1235 278')
    expect(svg.classes()).toContain('di-logo')
    expect(svg.classes()).not.toContain('di-logo--mono')
  })

  it('renders the mini mark for variant="mini"', () => {
    const svg = mount(DiLogo, { props: { variant: 'mini' } }).get('svg')

    expect(svg.attributes('viewBox')).toBe('0 0 357 216')
  })

  it('paints neutral shapes with currentColor and keeps brand shapes on a dedicated class', () => {
    const wrapper = mount(DiLogo)

    expect(wrapper.findAll('.di-logo__brand').length).toBeGreaterThan(0)
    const currentColorShapes = wrapper
      .findAll('svg > *')
      .filter(node => node.attributes('fill') === 'currentColor')
    expect(currentColorShapes.length).toBeGreaterThan(0)
  })

  it('folds the brand color into currentColor when mono', () => {
    const svg = mount(DiLogo, { props: { mono: true } }).get('svg')

    expect(svg.classes()).toContain('di-logo--mono')
  })

  it('exposes an accessible name when label is provided', () => {
    const wrapper = mount(DiLogo, { props: { label: 'DIANA' } })
    const svg = wrapper.get('svg')

    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-label')).toBe('DIANA')
    expect(svg.attributes('aria-hidden')).toBeUndefined()
    expect(wrapper.get('title').text()).toBe('DIANA')
  })

  it('is hidden from assistive tech when decorative', () => {
    const wrapper = mount(DiLogo)
    const svg = wrapper.get('svg')

    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.attributes('role')).toBeUndefined()
    expect(wrapper.find('title').exists()).toBe(false)
  })

  it('forwards a consumer class onto the svg root', () => {
    const svg = mount(DiLogo, { attrs: { class: 'h-8 w-auto text-primary-content' } }).get('svg')

    expect(svg.classes()).toEqual(expect.arrayContaining(['di-logo', 'h-8', 'w-auto', 'text-primary-content']))
  })
})
