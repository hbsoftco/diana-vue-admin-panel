import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { DiAvatar, DiAvatarGroup } from '../avatar'

const iconStub = {
  props: ['name', 'size'],
  template: '<span class="di-icon" :data-name="name" :data-size="size" />',
}

describe('diAvatar', () => {
  it('renders an image with meaningful alternative text', () => {
    const wrapper = mount(DiAvatar, {
      props: { src: '/avatar.jpg', alt: 'Jordan profile' },
    })

    const image = wrapper.get('img')
    expect(image.attributes('src')).toBe('/avatar.jpg')
    expect(image.attributes('alt')).toBe('Jordan profile')
  })

  it('derives fallback initials from the first and last names', () => {
    const wrapper = mount(DiAvatar, { props: { name: 'John Michael Doe' } })

    expect(wrapper.text()).toBe('JD')
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('John Michael Doe')
  })

  it('uses explicit initials when supplied', () => {
    const wrapper = mount(DiAvatar, {
      props: { name: 'Extra extra large avatar', initials: 'XXL' },
    })

    expect(wrapper.text()).toBe('XXL')
    expect(wrapper.attributes('aria-label')).toBe('Extra extra large avatar')
  })

  it('switches a broken image to the text fallback', async () => {
    const wrapper = mount(DiAvatar, {
      props: { src: '/missing.jpg', alt: 'Missing profile', name: 'Broken Image' },
    })

    await wrapper.get('img').trigger('error')

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('BI')
    expect(wrapper.emitted('error')).toHaveLength(1)
  })

  it('uses the configured Diana icon after the fallback text priority', () => {
    const iconWrapper = mount(DiAvatar, {
      props: { icon: 'camera', fallback: false, alt: 'Camera avatar' },
      global: { stubs: { DiIcon: iconStub } },
    })
    expect(iconWrapper.find('.di-icon').exists()).toBe(true)
    expect(iconWrapper.get('.di-icon').attributes('data-name')).toBe('camera')

    const initialsWrapper = mount(DiAvatar, {
      props: { name: 'Icon Person', icon: 'camera' },
    })
    expect(initialsWrapper.text()).toBe('IP')
  })

  it('applies container, text, and icon sizing tokens', () => {
    const wrapper = mount(DiAvatar, {
      props: { size: 'xl', icon: 'user', fallback: false },
      global: { stubs: { DiIcon: iconStub } },
    })

    expect(wrapper.get('span > span').classes()).toEqual(
      expect.arrayContaining(['size-16', 'text-xl']),
    )
    expect(wrapper.get('.di-icon').attributes('data-size')).toBe('xl')
  })

  it('supports the full Ynex-inspired size range', () => {
    const extraSmall = mount(DiAvatar, { props: { name: 'Extra Small', size: 'xs' } })
    const extraLarge = mount(DiAvatar, { props: { name: 'Double Extra Large', size: '2xl' } })

    expect(extraSmall.get('span > span').classes()).toContain('size-6')
    expect(extraLarge.get('span > span').classes()).toContain('size-20')
  })

  it('renders custom badge content over the avatar', () => {
    const wrapper = mount(DiAvatar, {
      props: { name: 'Badge User' },
      slots: { badge: '<span class="notification-count">7</span>' },
    })

    expect(wrapper.get('[data-avatar-badge] .notification-count').text()).toBe('7')
  })

  it('positions a proportional circular badge at the requested square-avatar corner', () => {
    const wrapper = mount(DiAvatar, {
      props: {
        name: 'Square Badge User',
        shape: 'square',
        size: 'xl',
        badgePosition: 'bottom-end',
        badgeVariant: 'success',
      },
      slots: { badge: '4' },
    })
    const badge = wrapper.get('[data-avatar-badge]')

    expect(badge.classes()).toEqual(
      expect.arrayContaining([
        'size-6',
        'rounded-full',
        'border-2',
        'border-base-100',
        '-bottom-1',
        '-end-1',
        'bg-success',
      ]),
    )
  })

  it('applies semantic variant surface and content tokens', () => {
    const wrapper = mount(DiAvatar, {
      props: { name: 'Success Person', variant: 'success' },
    })

    expect(wrapper.get('span > span').classes()).toEqual(
      expect.arrayContaining(['bg-success', 'text-success-content']),
    )
  })

  it.each([
    ['online', 'bg-success'],
    ['offline', 'bg-base-content/40'],
    ['busy', 'bg-error'],
    ['away', 'bg-warning'],
  ] as const)('renders the %s status indicator', (status, statusClass) => {
    const wrapper = mount(DiAvatar, { props: { name: 'Status User', status } })
    const indicator = wrapper.get('[data-avatar-status]')

    expect(indicator.classes()).toContain(statusClass)
    expect(indicator.attributes('aria-label')).toBe(
      status.charAt(0).toUpperCase() + status.slice(1),
    )
  })

  it('supports decorative icon-only avatars', () => {
    const wrapper = mount(DiAvatar, {
      props: { icon: 'user', fallback: false, decorative: true },
    })

    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('role')).toBeUndefined()
  })
})

describe('diAvatarGroup', () => {
  it('limits visible avatars and renders the remaining count', () => {
    const wrapper = mount(DiAvatarGroup, {
      props: {
        max: 2,
        avatars: [
          { name: 'One Person' },
          { name: 'Two Person' },
          { name: 'Three Person' },
          { name: 'Four Person' },
        ],
      },
    })

    expect(wrapper.findAllComponents(DiAvatar)).toHaveLength(2)
    expect(wrapper.text()).toContain('+2')
    expect(wrapper.get('[aria-label="2 more avatars"]')).toBeDefined()
  })
})
