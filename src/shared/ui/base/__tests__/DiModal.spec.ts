import { flushPromises, mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it } from 'vitest'

import DiModal from '@/shared/ui/base/DiModal.vue'

type MutableDialog = HTMLDialogElement & { open: boolean }

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    Object.defineProperty(this, 'open', { configurable: true, value: true, writable: true })
  }

  HTMLDialogElement.prototype.close = function () {
    Object.defineProperty(this, 'open', { configurable: true, value: false, writable: true })
  }
})

async function mountModal(props: Record<string, unknown> = {}) {
  const wrapper = mount(DiModal, {
    attachTo: document.body,
    props: {
      modelValue: false,
      teleport: false,
      ...props,
    },
    slots: {
      default: '<p>Modal content</p>',
    },
  })

  await flushPromises()
  return wrapper
}

describe('diModal', () => {
  it('opens and closes when modelValue changes', async () => {
    const wrapper = await mountModal()
    const dialog = wrapper.get('dialog').element as MutableDialog

    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    expect(dialog.open).toBe(true)

    await wrapper.setProps({ modelValue: false })
    await flushPromises()
    expect(dialog.open).toBe(false)

    wrapper.unmount()
  })

  it('closes on a backdrop click by default', async () => {
    const wrapper = await mountModal({ modelValue: true })
    const dialog = wrapper.get('dialog').element as MutableDialog

    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(dialog.open).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })

  it('stays open on a backdrop click when closeOnBackdrop is false', async () => {
    const wrapper = await mountModal({ modelValue: true, closeOnBackdrop: false })
    const dialog = wrapper.get('dialog').element as MutableDialog

    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(dialog.open).toBe(true)
    expect(wrapper.emitted('close')).toBeUndefined()
    wrapper.unmount()
  })

  it('closes on Escape by default', async () => {
    const wrapper = await mountModal({ modelValue: true })
    const dialog = wrapper.get('dialog').element as MutableDialog

    dialog.dispatchEvent(new Event('cancel', { cancelable: true }))
    await wrapper.vm.$nextTick()

    expect(dialog.open).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })

  it('stays open on Escape when closeOnEsc is false', async () => {
    const wrapper = await mountModal({ modelValue: true, closeOnEsc: false })
    const dialog = wrapper.get('dialog').element as MutableDialog

    dialog.dispatchEvent(new Event('cancel', { cancelable: true }))
    await wrapper.vm.$nextTick()

    expect(dialog.open).toBe(true)
    expect(wrapper.emitted('close')).toBeUndefined()
    wrapper.unmount()
  })

  it('blocks backdrop and Escape closing when persistent', async () => {
    const wrapper = await mountModal({ modelValue: true, persistent: true })
    const dialog = wrapper.get('dialog').element as MutableDialog

    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }))
    await wrapper.vm.$nextTick()

    expect(dialog.open).toBe(true)
    expect(wrapper.emitted('close')).toBeUndefined()
    wrapper.unmount()
  })

  it('teleports to body by default and renders locally when teleport is false', async () => {
    const teleported = await mountModal({ teleport: true })
    expect(teleported.find('dialog').exists()).toBe(false)
    expect(document.body.querySelector('dialog')).not.toBeNull()
    teleported.unmount()

    const local = await mountModal()
    expect(local.find('dialog').exists()).toBe(true)
    local.unmount()
  })

  it('uses the default tint without a blur class', async () => {
    const wrapper = await mountModal()
    const classes = wrapper.get('dialog').classes()

    expect(classes).toContain('bg-base-content/40')
    expect(classes.some(className => className.startsWith('backdrop:backdrop-blur-'))).toBe(false)
    wrapper.unmount()
  })

  it.each([
    ['xs', 'backdrop:backdrop-blur-xs'],
    ['sm', 'backdrop:backdrop-blur-sm'],
    ['md', 'backdrop:backdrop-blur-md'],
    ['lg', 'backdrop:backdrop-blur-lg'],
  ])('adds the %s backdrop blur class', async (backdropBlur, expectedClass) => {
    const wrapper = await mountModal({ backdropBlur })
    const classes = wrapper.get('dialog').classes()

    expect(classes).toContain('bg-base-content/40')
    expect(classes).toContain(expectedClass)
    wrapper.unmount()
  })

  it('removes tint and blur classes for a transparent backdrop', async () => {
    const wrapper = await mountModal({
      backdropBlur: 'transparent',
      backdropClass: 'backdrop:bg-primary/40',
    })
    const classes = wrapper.get('dialog').classes()

    expect(classes).toContain('bg-transparent')
    expect(classes).toContain('backdrop:bg-transparent')
    expect(classes).not.toContain('backdrop:bg-primary/40')
    expect(classes.some(className => className.startsWith('backdrop:backdrop-blur-'))).toBe(false)
    wrapper.unmount()
  })

  it('combines a custom tint with a blur class', async () => {
    const wrapper = await mountModal({
      backdropBlur: 'md',
      backdropClass: 'backdrop:bg-primary/40',
    })
    const classes = wrapper.get('dialog').classes()

    expect(classes).toContain('backdrop:bg-primary/40')
    expect(classes).toContain('backdrop:backdrop-blur-md')
    wrapper.unmount()
  })

  it('uses placement-aware modal classes unless modalClass is explicit', async () => {
    const middle = await mountModal({ placement: 'middle' })
    expect(middle.get('dialog').classes()).not.toContain('rounded-t-2xl')
    middle.unmount()

    const bottom = await mountModal({ placement: 'bottom' })
    expect(bottom.get('dialog').classes()).toEqual(
      expect.arrayContaining([
        'rounded-t-2xl',
        'rounded-b-none',
        'w-full',
        'max-w-full',
        'pb-safe',
      ]),
    )
    bottom.unmount()

    const explicit = await mountModal({ placement: 'bottom', modalClass: 'rounded-box' })
    expect(explicit.get('dialog').classes()).toContain('rounded-box')
    expect(explicit.get('dialog').classes()).not.toContain('rounded-t-2xl')
    explicit.unmount()
  })

  it.each([
    ['top', ['items-start', 'justify-items-center']],
    ['middle', ['items-center', 'justify-items-center']],
    ['bottom', ['items-end', 'justify-items-center']],
    ['start', ['items-center', 'justify-items-start']],
    ['end', ['items-center', 'justify-items-end']],
  ])('uses explicit grid-axis alignment for %s placement', async (placement, expectedClasses) => {
    const wrapper = await mountModal({ placement })

    expect(wrapper.get('dialog').classes()).toEqual(expect.arrayContaining(expectedClasses))
    wrapper.unmount()
  })

  it('exposes open and close methods', async () => {
    const wrapper = await mountModal()
    const dialog = wrapper.get('dialog').element as MutableDialog
    const exposed = wrapper.vm as unknown as { open: () => Promise<void>, close: () => void }

    await exposed.open()
    expect(dialog.open).toBe(true)

    exposed.close()
    expect(dialog.open).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })
})
