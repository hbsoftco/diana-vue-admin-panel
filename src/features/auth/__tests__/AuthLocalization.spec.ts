import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import type { MenuItem, MenuNavigationItem } from '@/shared/types/models'

import { menuItems } from '@/shared/config/menu'
import { testI18n } from '@/shared/ui/base/__tests__/setup'
import DiAvatar from '@/shared/ui/base/avatar/DiAvatar.vue'

import LockScreenForm from '../lock-screen/ui/LockScreenForm.vue'
import SignInForm from '../sign-in/ui/SignInForm.vue'
import TwoStepVerificationForm from '../two-step/ui/TwoStepVerificationForm.vue'

function mountForm() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })

  return mount(SignInForm, { global: { plugins: [router] } })
}

function mountTwoStepForm() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })

  return mount(TwoStepVerificationForm, { global: { plugins: [router] } })
}

async function mountLockScreenForm(initialPath = '/auth/lock-screen/basic') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })
  await router.push(initialPath)

  return mount(LockScreenForm, { global: { plugins: [router] } })
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

  it('nests "Two Step Verification" under "Authentication" with Basic and Cover leaf routes', () => {
    const authentication = findById(menuItems, 'authentication')
    const twoStep = authentication?.children?.find(
      (child): child is MenuNavigationItem => child.type !== 'label' && child.id === 'two-step',
    )

    expect(twoStep).toBeDefined()
    expect(twoStep?.icon).toBe('twoStepVerification')
    expect(twoStep?.route).toBeUndefined()
    expect(twoStep?.children?.map(child => child.type !== 'label' && child.route)).toEqual([
      '/auth/two-step/basic',
      '/auth/two-step/cover',
    ])
  })

  it('reuses the Basic and Cover icons for the Two Step Verification leaves', () => {
    const basic = findById(menuItems, 'two-step-basic')
    const cover = findById(menuItems, 'two-step-cover')

    expect(basic?.icon).toBe('layoutCentered')
    expect(cover?.icon).toBe('layoutSplit')
  })

  it('nests "Lock Screen" under "Authentication" with Basic and Cover leaf routes', () => {
    const authentication = findById(menuItems, 'authentication')
    const lockScreen = authentication?.children?.find(
      (child): child is MenuNavigationItem => child.type !== 'label' && child.id === 'lock-screen',
    )

    expect(lockScreen).toBeDefined()
    expect(lockScreen?.icon).toBe('lockScreen')
    expect(lockScreen?.route).toBeUndefined()
    expect(lockScreen?.children?.map(child => child.type !== 'label' && child.route)).toEqual([
      '/auth/lock-screen/basic',
      '/auth/lock-screen/cover',
    ])
  })

  it('reuses the Basic and Cover icons for the Lock Screen leaves', () => {
    const basic = findById(menuItems, 'lock-screen-basic')
    const cover = findById(menuItems, 'lock-screen-cover')

    expect(basic?.icon).toBe('layoutCentered')
    expect(cover?.icon).toBe('layoutSplit')
  })
})

describe('two-step verification form', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('keeps the Verify button disabled until the code is fully entered', async () => {
    const wrapper = mountTwoStepForm()
    const boxes = wrapper.findAll<HTMLInputElement>('input')
    const submit = wrapper.get('button[type="submit"]')

    expect(boxes).toHaveLength(6)
    expect(submit.attributes('disabled')).toBeDefined()

    for (const box of boxes)
      await box.setValue('1')

    expect(submit.attributes('disabled')).toBeUndefined()
  })

  it('starts a 30s cooldown on resend and re-enables the button when it elapses', async () => {
    vi.useFakeTimers()
    const wrapper = mountTwoStepForm()
    const resend = wrapper.findAll('button').find(button => button.text().includes('Resend'))!

    expect(resend.attributes('disabled')).toBeUndefined()

    await resend.trigger('click')
    expect(resend.attributes('disabled')).toBeDefined()
    expect(resend.text()).toContain('30')

    await vi.advanceTimersByTimeAsync(30_000)
    expect(resend.attributes('disabled')).toBeUndefined()
  })
})

describe('lock screen form', () => {
  it('shows the locked user\'s avatar and name, and requires only a password', async () => {
    const wrapper = await mountLockScreenForm()

    expect(wrapper.findComponent(DiAvatar).exists()).toBe(true)
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.get('input[name="password"]').attributes('type')).toBe('password')

    await wrapper.get('form').trigger('submit')
    expect(wrapper.text()).toContain('Password is required.')
  })

  it('toggles password visibility using DiInput\'s built-in toggle', async () => {
    const wrapper = await mountLockScreenForm()
    const passwordInput = wrapper.get('input[name="password"]')
    const toggle = wrapper.get('button[type="button"]')

    await toggle.trigger('click')
    expect(passwordInput.attributes('type')).toBe('text')
  })

  it('links "sign in as a different user" to the Basic sign-in page from the Basic layout', async () => {
    const wrapper = await mountLockScreenForm('/auth/lock-screen/basic')

    expect(wrapper.get('a').attributes('href')).toBe('/auth/sign-in/basic')
  })

  it('links "sign in as a different user" to the Cover sign-in page from the Cover layout', async () => {
    const wrapper = await mountLockScreenForm('/auth/lock-screen/cover')

    expect(wrapper.get('a').attributes('href')).toBe('/auth/sign-in/cover')
  })
})
