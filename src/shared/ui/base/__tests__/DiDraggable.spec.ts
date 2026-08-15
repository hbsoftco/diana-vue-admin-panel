import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import DiDraggable from '../DiDraggable.vue'

const sortableOptions = vi.hoisted(() => ({ values: [] as Record<string, unknown>[] }))

vi.mock('sortablejs', () => ({
  default: {
    create: vi.fn((_element, options) => {
      sortableOptions.values.push(options)
      return { destroy: vi.fn(), option: vi.fn() }
    }),
  },
}))

const items = [
  { id: 'research', title: 'Research' },
  { id: 'design', title: 'Design' },
  { id: 'review', title: 'Review' },
]

function mountList(props: Record<string, unknown> = {}) {
  return mount(DiDraggable, {
    props: { modelValue: items, itemKey: 'id', ...props },
    slots: { item: ({ item }: { item: Record<string, unknown> }) => String(item.title) },
  })
}

describe('diDraggable', () => {
  beforeEach(() => {
    sortableOptions.values = []
  })

  it('renders keyed items and an empty state', () => {
    expect(mountList().findAll('[data-di-draggable-item]')).toHaveLength(3)
    const empty = mount(DiDraggable, {
      props: { modelValue: [], itemKey: 'id' },
      slots: { item: () => '', empty: 'Nothing queued' },
    })
    expect(empty.text()).toContain('Nothing queued')
  })

  it('reorders and emits the public event contract', async () => {
    const wrapper = mountList()
    const options = sortableOptions.values[0] as {
      onStart: (event: { oldIndex: number }) => void
      onEnd: (event: {
        oldIndex: number
        newIndex: number
        from: HTMLElement
        to: HTMLElement
      }) => void
    }
    const list = wrapper.element as HTMLElement
    options.onStart({ oldIndex: 0 })
    options.onEnd({ oldIndex: 0, newIndex: 2, from: list, to: list })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([items[1], items[2], items[0]])
    expect(wrapper.emitted('dragStart')?.[0]?.[0]).toMatchObject({ item: items[0], oldIndex: 0 })
    expect(wrapper.emitted('dragEnd')?.[0]?.[0]).toMatchObject({ item: items[0], newIndex: 2 })
    expect(wrapper.emitted('change')?.[0]?.[0]).toMatchObject({ oldIndex: 0, newIndex: 2 })
  })

  it('supports keyboard reordering and blocks read-only interaction', async () => {
    const wrapper = mountList()
    await wrapper
      .findAll('[data-di-draggable-item]')[1]
      ?.trigger('keydown', { key: 'ArrowUp', ctrlKey: true })
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([items[1], items[0], items[2]])

    const readOnly = mountList({ readOnly: true })
    await readOnly
      .findAll('[data-di-draggable-item]')[1]
      ?.trigger('keydown', { key: 'ArrowUp', ctrlKey: true })
    expect(readOnly.emitted('update:modelValue')).toBeUndefined()
    expect(readOnly.attributes('aria-disabled')).toBe('true')
  })

  it('uses a handle when requested', () => {
    const wrapper = mountList({ handle: true })
    expect(wrapper.findAll('[data-di-drag-handle]')).toHaveLength(3)
    expect(sortableOptions.values[0]).toMatchObject({
      handle: '[data-di-drag-handle]',
      forceFallback: true,
      fallbackOnBody: true,
    })
  })

  it('moves an item between connected group models', async () => {
    const sourceItems = [...items.slice(0, 2)]
    const destinationItems = [...items.slice(2)]
    const sourceWrapper = mountList({
      modelValue: sourceItems,
      group: { name: 'workflow', pull: true, put: true },
    })
    const destinationWrapper = mountList({
      modelValue: destinationItems,
      group: { name: 'workflow', pull: true, put: true },
    })

    const sourceOptions = sortableOptions.values[0] as {
      onStart: (event: { oldIndex: number }) => void
      onRemove: (event: { oldIndex: number }) => void
      onEnd: (event: {
        oldIndex: number
        newIndex: number
        from: HTMLElement
        to: HTMLElement
      }) => void
    }
    const destinationOptions = sortableOptions.values[1] as {
      onAdd: (event: { newIndex: number }) => void
    }

    sourceOptions.onStart({ oldIndex: 0 })
    sourceOptions.onRemove({ oldIndex: 0 })
    destinationOptions.onAdd({ newIndex: 1 })
    sourceOptions.onEnd({
      oldIndex: 0,
      newIndex: 1,
      from: sourceWrapper.element as HTMLElement,
      to: destinationWrapper.element as HTMLElement,
    })
    await Promise.all([sourceWrapper.vm.$nextTick(), destinationWrapper.vm.$nextTick()])

    expect(sourceWrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([items[1]])
    expect(destinationWrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([items[2], items[0]])
    expect(sortableOptions.values[0]?.group).toEqual({ name: 'workflow', pull: true, put: true })
    expect(sortableOptions.values[1]?.group).toEqual({ name: 'workflow', pull: true, put: true })
  })
})
