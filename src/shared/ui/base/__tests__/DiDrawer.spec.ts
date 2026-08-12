import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import DiDrawer from '../DiDrawer.vue'

const DrawerHarness = defineComponent({
  components: { DiDrawer },
  setup() {
    const open = ref(false)
    return { open }
  },
  template: `
    <button data-drawer-trigger type="button" @click="open = true">Open drawer</button>
    <DiDrawer v-model="open" open-at="lg" label="Navigation drawer">
      <template #side>
        <div>
          <button data-first type="button">First action</button>
          <button data-last type="button">Last action</button>
        </div>
      </template>
    </DiDrawer>
  `,
})

afterEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})

describe('diDrawer', () => {
  it.each([
    ['sm', 'sm:drawer-open'],
    ['md', 'md:drawer-open'],
    ['lg', 'lg:drawer-open'],
    ['xl', 'xl:drawer-open'],
    ['2xl', '2xl:drawer-open'],
  ] as const)('maps the %s responsive breakpoint to a static class', (openAt, className) => {
    const wrapper = mount(DiDrawer, {
      props: { modelValue: false, openAt },
    })

    expect(wrapper.classes()).toContain(className)
  })

  it('connects the toggle and drawer dialog with accessible state', async () => {
    const wrapper = mount(DiDrawer, {
      props: { modelValue: false, label: 'Navigation drawer' },
      slots: { side: 'Drawer content' },
    })

    const toggle = wrapper.get('input.drawer-toggle')
    const side = wrapper.get('.drawer-side')

    expect(toggle.attributes('aria-haspopup')).toBe('dialog')
    expect(toggle.attributes('role')).toBe('button')
    expect(toggle.attributes('aria-expanded')).toBe('false')
    expect(toggle.attributes('aria-controls')).toBe(side.attributes('id'))
    expect(side.attributes('role')).toBeUndefined()
    expect(side.attributes('aria-label')).toBeUndefined()
    expect(side.attributes('aria-modal')).toBeUndefined()
    expect(side.classes()).toContain('motion-reduce:transition-none')

    await wrapper.setProps({ modelValue: true })
    await nextTick()

    expect(side.attributes('role')).toBe('dialog')
    expect(side.attributes('aria-label')).toBe('Navigation drawer')
    expect(side.attributes('aria-modal')).toBe('true')
    wrapper.unmount()
  })

  it('starts closed and moves focus into the side only after an explicit open', async () => {
    const wrapper = mount(DrawerHarness, { attachTo: document.body })
    const trigger = wrapper.get<HTMLElement>('[data-drawer-trigger]')
    const firstAction = wrapper.get<HTMLElement>('[data-first]')

    trigger.element.focus()
    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false)
    expect(document.activeElement).toBe(trigger.element)

    await trigger.trigger('click')
    await nextTick()

    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(true)
    expect(wrapper.get('input.drawer-toggle').attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('.drawer-side').attributes('aria-modal')).toBe('true')
    expect(document.activeElement).toBe(firstAction.element)
    wrapper.unmount()
  })

  it('contains Tab focus, closes on Escape, and restores the invoking trigger', async () => {
    const wrapper = mount(DrawerHarness, { attachTo: document.body })
    const trigger = wrapper.get<HTMLElement>('[data-drawer-trigger]')
    const firstAction = wrapper.get<HTMLElement>('[data-first]')
    const lastAction = wrapper.get<HTMLElement>('[data-last]')

    trigger.element.focus()
    await trigger.trigger('click')
    await nextTick()

    lastAction.element.focus()
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }),
    )
    expect(document.activeElement).toBe(firstAction.element)

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      }),
    )
    expect(document.activeElement).toBe(lastAction.element)

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    )
    await nextTick()
    await nextTick()

    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false)
    expect(document.activeElement).toBe(trigger.element)
    wrapper.unmount()
  })

  it('leaves DaisyUI in charge of scroll locking', async () => {
    document.body.style.overflow = 'clip'
    const wrapper = mount(DrawerHarness, { attachTo: document.body })

    await wrapper.get('[data-drawer-trigger]').trigger('click')
    await nextTick()

    expect(document.body.style.overflow).toBe('clip')
    wrapper.unmount()
  })

  it('restores focus when an open drawer unmounts', async () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    document.body.append(trigger)
    trigger.focus()

    const wrapper = mount(DiDrawer, {
      attachTo: document.body,
      props: { modelValue: false },
      slots: { side: '<button type="button" data-action>Action</button>' },
    })

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(document.activeElement).toBe(document.body.querySelector('[data-action]'))

    wrapper.unmount()
    expect(document.activeElement).toBe(trigger)
  })
})
