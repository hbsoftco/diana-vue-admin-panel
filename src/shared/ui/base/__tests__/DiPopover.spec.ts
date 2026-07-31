import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import type { DiPopoverPlacement } from '../popover'

import { DiPopover } from '../popover'

const Harness = defineComponent({
  components: { DiPopover },
  setup() {
    const open = ref(false)
    return { open }
  },
  template: `
    <DiPopover v-model:open="open">
      <template #trigger><button type="button">Toggle</button></template>
      <button type="button">Action</button>
    </DiPopover>
  `,
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('diPopover', () => {
  it('opens from the trigger and exposes accessible state', async () => {
    const wrapper = mount(DiPopover, {
      attachTo: document.body,
      slots: {
        trigger: '<button type="button">Open</button>',
        default: 'Popover content',
      },
    })

    const trigger = wrapper.get('[data-di-popover-trigger]')
    expect(trigger.attributes('aria-haspopup')).toBe('dialog')
    expect(trigger.attributes('aria-expanded')).toBe('false')

    await trigger.trigger('click')

    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(document.body.querySelector('[role="dialog"]')?.textContent).toContain('Popover content')
    wrapper.unmount()
  })

  it('renders a title as a structured header without creating empty header space', async () => {
    const untitled = mount(DiPopover, {
      attachTo: document.body,
      props: { open: true },
      slots: { trigger: 'Trigger', default: 'Body' },
    })
    expect(document.body.querySelector('[role="dialog"] header')).toBeNull()
    untitled.unmount()

    const titled = mount(DiPopover, {
      attachTo: document.body,
      props: { open: true, title: 'Popover title' },
      slots: { trigger: 'Trigger', default: 'Body' },
    })
    const header = document.body.querySelector('[role="dialog"] header')
    expect(header?.textContent).toContain('Popover title')
    expect(header?.classList).toContain('border-base-300')
    titled.unmount()
  })

  it('uses the header slot as an override for the title prop', () => {
    const wrapper = mount(DiPopover, {
      attachTo: document.body,
      props: { open: true, title: 'Fallback title' },
      slots: {
        trigger: 'Trigger',
        header: 'Custom heading',
        default: 'Body',
      },
    })

    const header = document.body.querySelector('[role="dialog"] header')
    expect(header?.textContent).toContain('Custom heading')
    expect(header?.textContent).not.toContain('Fallback title')
    wrapper.unmount()
  })

  it('shows the attached arrow by default and supports hiding it', () => {
    const visible = mount(DiPopover, {
      attachTo: document.body,
      props: { open: true },
      slots: { trigger: 'Trigger', default: 'Body' },
    })
    expect(document.body.querySelector('.di-popover__arrow')).not.toBeNull()
    visible.unmount()

    const hidden = mount(DiPopover, {
      attachTo: document.body,
      props: { open: true, showArrow: false },
      slots: { trigger: 'Trigger', default: 'Body' },
    })
    expect(document.body.querySelector('.di-popover__arrow')).toBeNull()
    hidden.unmount()
  })

  it('points the arrow toward the trigger for every placement', async () => {
    const placements: DiPopoverPlacement[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ]

    for (const placement of placements) {
      const wrapper = mount(DiPopover, {
        attachTo: document.body,
        props: { open: true, placement },
        slots: { trigger: 'Trigger', default: 'Body' },
      })
      const trigger = wrapper.get<HTMLElement>('[data-di-popover-trigger]')
      trigger.element.getBoundingClientRect = () =>
        ({ top: 320, bottom: 360, left: 420, right: 520, width: 100, height: 40 }) as DOMRect
      const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')
      if (dialog) {
        dialog.getBoundingClientRect = () =>
          ({ top: 0, bottom: 100, left: 0, right: 180, width: 180, height: 100 }) as DOMRect
      }

      window.dispatchEvent(new Event('resize'))
      await nextTick()

      const side = placement.split('-')[0]
      expect(dialog?.dataset.placement).toBe(placement)
      expect(dialog?.querySelector('.di-popover__arrow')?.classList).toContain(
        `di-popover__arrow--${side}`,
      )
      wrapper.unmount()
    }
  })

  it.each(['diana-light', 'diana-dark'])('uses semantic surface tokens in %s', (theme) => {
    const wrapper = mount(DiPopover, {
      attachTo: document.body,
      attrs: { 'data-theme': theme },
      props: { open: true, title: 'Title' },
      slots: { trigger: 'Trigger', default: 'Body' },
    })

    const dialog = document.body.querySelector('[role="dialog"]')
    expect(wrapper.attributes('data-theme')).toBe(theme)
    expect(dialog?.classList).toContain('bg-base-100')
    expect(dialog?.classList).toContain('border-base-300')
    expect(dialog?.querySelector('.di-popover__arrow')).not.toBeNull()
    wrapper.unmount()
  })

  it('supports two-way controlled state and trigger closing', async () => {
    const wrapper = mount(Harness, { attachTo: document.body })
    const trigger = wrapper.get('[data-di-popover-trigger]')

    await trigger.trigger('click')
    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(true)

    await trigger.trigger('click')
    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false)
    wrapper.unmount()
  })

  it('closes on outside pointer interaction', async () => {
    const wrapper = mount(Harness, { attachTo: document.body })
    await wrapper.get('[data-di-popover-trigger]').trigger('click')

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await nextTick()

    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false)
    wrapper.unmount()
  })

  it('closes on Escape and restores trigger focus', async () => {
    const wrapper = mount(Harness, { attachTo: document.body })
    const trigger = wrapper.get<HTMLElement>('[data-di-popover-trigger]')
    await trigger.trigger('click')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()

    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false)
    expect(document.activeElement).toBe(trigger.element)
    wrapper.unmount()
  })

  it('applies placement styling and flips when the viewport edge requires it', async () => {
    const wrapper = mount(DiPopover, {
      attachTo: document.body,
      props: { placement: 'top-start', open: true },
      slots: { trigger: 'Trigger', default: 'Content' },
    })

    const trigger = wrapper.get<HTMLElement>('[data-di-popover-trigger]')
    trigger.element.getBoundingClientRect = () =>
      ({ top: 2, bottom: 22, left: 20, right: 100, width: 80, height: 20 }) as DOMRect
    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')
    if (dialog) {
      dialog.getBoundingClientRect = () =>
        ({ top: 0, bottom: 80, left: 0, right: 120, width: 120, height: 80 }) as DOMRect
    }

    window.dispatchEvent(new Event('resize'))
    await nextTick()

    expect(dialog?.dataset.placement).toBe('bottom-start')
    expect(dialog?.classList).toContain('origin-top-left')
    wrapper.unmount()
  })

  it('does not open while disabled', async () => {
    const wrapper = mount(DiPopover, {
      props: { disabled: true },
      slots: { trigger: 'Disabled', default: 'Content' },
    })

    const trigger = wrapper.get('[data-di-popover-trigger]')
    expect(trigger.attributes('aria-disabled')).toBe('true')
    await trigger.trigger('click')
    await trigger.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:open')).toBeUndefined()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })

  it('keeps persistent content open on outside click and Escape', async () => {
    const wrapper = mount(DiPopover, {
      attachTo: document.body,
      props: { open: true, persistent: true },
      slots: { trigger: 'Trigger', default: 'Persistent content' },
    })

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()

    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull()
    wrapper.unmount()
  })
})
