import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import type { MenuItem, MenuNavigationItem } from '@/shared/types/models'

import { menuItems } from '@/shared/config/menu'
import { testI18n } from '@/shared/ui/base/__tests__/setup'

import SignInForm from '../sign-in/ui/SignInForm.vue'

function mountForm() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })

  return mount(SignInForm, { global: { plugins: [router] } })
}

describe('sign-in form', () => {
  it('renders localized labels and updates them when the locale changes', async () => {
    const wrapper = mountForm()

    expect(wrapper.text()).toContain('Sign in')
    expect(wrapper.text()).toContain('Remember me')
    expect(wrapper.text()).toContain('Forgot password?')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(wrapper.text()).toContain('ورود')
    expect(wrapper.text()).toContain('مرا به خاطر بسپار')
  })

  it('shows required-field errors when submitting an empty form', async () => {
    const wrapper = mountForm()

    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Password is required.')
  })

  it('toggles the password field between hidden and visible', async () => {
    const wrapper = mountForm()
    const passwordInput = wrapper.get('input[name="password"]')
    const toggle = wrapper.get('button[type="button"]')

    expect(passwordInput.attributes('type')).toBe('password')

    await toggle.trigger('click')
    expect(passwordInput.attributes('type')).toBe('text')

    await toggle.trigger('click')
    expect(passwordInput.attributes('type')).toBe('password')
  })

  it('renders the "remember me" control at the compact xs size', () => {
    const wrapper = mountForm()

    expect(wrapper.get('input[type="checkbox"]').classes()).toContain('checkbox-xs')
  })
})

describe('authentication sidebar menu entry', () => {
  const findById = (items: MenuItem[], id: string): MenuNavigationItem | undefined => {
    for (const item of items) {
      if (item.id === id && item.type !== 'label')
        return item
      if ('children' in item && item.children) {
        const match = findById(item.children, id)
        if (match)
          return match
      }
    }
    return undefined
  }

  it('is a top-level item with a fingerprint icon and no route of its own', () => {
    const authentication = menuItems.find(
      (item): item is MenuNavigationItem => item.type !== 'label' && item.id === 'authentication',
    )

    expect(authentication).toBeDefined()
    expect(authentication?.icon).toBe('fingerprint')
    expect(authentication?.route).toBeUndefined()
  })

  it('nests "Sign In" under "Authentication" with Basic and Cover leaf routes', () => {
    const authentication = findById(menuItems, 'authentication')
    const signIn = authentication?.children?.find(
      (child): child is MenuNavigationItem => child.type !== 'label' && child.id === 'sign-in',
    )

    expect(signIn).toBeDefined()
    expect(signIn?.route).toBeUndefined()
    expect(signIn?.children?.map(child => child.type !== 'label' && child.route)).toEqual([
      '/auth/sign-in/basic',
      '/auth/sign-in/cover',
    ])
  })

  it('gives the Basic and Cover leaves meaningful, non-generic icons', () => {
    const basic = findById(menuItems, 'sign-in-basic')
    const cover = findById(menuItems, 'sign-in-cover')

    expect(basic?.icon).toBe('layoutCentered')
    expect(cover?.icon).toBe('layoutSplit')
    for (const icon of [basic?.icon, cover?.icon])
      expect(icon).not.toMatch(/^circle/)
  })
})
