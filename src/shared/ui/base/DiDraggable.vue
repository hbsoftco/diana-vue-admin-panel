<script setup lang="ts" generic="T extends Record<string, unknown>">
import Sortable from 'sortablejs'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  clearActiveDraggableItem,
  getActiveDraggableItem,
  setActiveDraggableItem,
} from './di-draggable-transfer'

type ItemKey = string | number
type DiDraggableGroup = {
  name: string
  pull?: boolean
  put?: boolean | readonly string[]
}

type DiDraggableEvent<T> = { item: T, oldIndex: number, newIndex: number }
type DiDraggableChangeEvent<T> = DiDraggableEvent<T> & { items: T[] }

type Props = {
  itemKey: keyof T | ((item: T) => ItemKey)
  disabled?: boolean
  readOnly?: boolean
  handle?: boolean
  animation?: number
  label?: string
  handleLabel?: string
  group?: string | DiDraggableGroup
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readOnly: false,
  handle: false,
  animation: 180,
  label: 'Draggable list',
  handleLabel: 'Drag to reorder',
})

const emit = defineEmits<{
  dragStart: [event: DiDraggableEvent<T>]
  dragEnd: [event: DiDraggableEvent<T>]
  change: [event: DiDraggableChangeEvent<T>]
}>()

defineSlots<{
  item: (props: { item: T, index: number, dragging: boolean }) => unknown
  handle?: (props: { item: T, index: number }) => unknown
  empty?: () => unknown
}>()

const model = defineModel<T[]>({ required: true })
const root = ref<HTMLElement | null>(null)
const draggingKey = ref<ItemKey | null>(null)
let sortable: Sortable | null = null

const interactionDisabled = computed(() => props.disabled || props.readOnly)

function getItemKey(item: T): ItemKey {
  const key = typeof props.itemKey === 'function' ? props.itemKey(item) : item[props.itemKey]
  if (typeof key !== 'string' && typeof key !== 'number')
    throw new TypeError('DiDraggable item keys must be strings or numbers')
  return key
}

function createEvent(item: T, oldIndex: number, newIndex: number): DiDraggableEvent<T> {
  return { item, oldIndex, newIndex }
}

function moveItem(oldIndex: number, newIndex: number) {
  if (interactionDisabled.value || oldIndex === newIndex)
    return

  const items = [...model.value]
  const [item] = items.splice(oldIndex, 1)
  if (!item)
    return

  items.splice(newIndex, 0, item)
  model.value = items
  emit('change', { ...createEvent(item, oldIndex, newIndex), items })
}

function removeItem(index: number) {
  const items = [...model.value]
  const [item] = items.splice(index, 1)
  if (!item)
    return

  model.value = items
  emit('change', { ...createEvent(item, index, -1), items })
}

function addItem(item: T, index: number) {
  const items = [...model.value]
  items.splice(index, 0, item)
  model.value = items
  emit('change', { ...createEvent(item, -1, index), items })
}

function getGroupOption(): Sortable.GroupOptions | undefined {
  if (typeof props.group === 'string')
    return { name: props.group }

  return props.group
}

function handleItemKeydown(event: KeyboardEvent, index: number) {
  if (interactionDisabled.value || (!event.altKey && !event.ctrlKey && !event.metaKey))
    return

  const direction = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0
  const newIndex = index + direction
  if (!direction || newIndex < 0 || newIndex >= model.value.length)
    return

  event.preventDefault()
  moveItem(index, newIndex)
  nextTick(() => {
    const item = root.value?.querySelector<HTMLElement>(`[data-di-index="${newIndex}"]`)
    const focusTarget = props.handle
      ? item?.querySelector<HTMLElement>('[data-di-drag-handle]')
      : item
    focusTarget?.focus()
  })
}

function initializeSortable() {
  if (!root.value)
    return

  sortable = Sortable.create(root.value, {
    animation: props.animation,
    group: getGroupOption(),
    disabled: interactionDisabled.value,
    draggable: '[data-di-draggable-item]',
    handle: props.handle ? '[data-di-drag-handle]' : undefined,
    filter: props.handle
      ? undefined
      : 'a, button, input, select, textarea, [contenteditable="true"]',
    preventOnFilter: false,
    ghostClass: 'di-draggable__ghost',
    chosenClass: 'di-draggable__chosen',
    dragClass: 'di-draggable__drag',
    forceFallback: true,
    fallbackOnBody: true,
    fallbackClass: 'di-draggable__fallback',
    delayOnTouchOnly: true,
    delay: 120,
    touchStartThreshold: 4,
    onStart(event) {
      const oldIndex = event.oldIndex
      const item = oldIndex === undefined ? undefined : model.value[oldIndex]
      if (oldIndex === undefined || !item)
        return
      draggingKey.value = getItemKey(item)
      setActiveDraggableItem(item)
      emit('dragStart', createEvent(item, oldIndex, oldIndex))
    },
    onAdd(event) {
      const item = getActiveDraggableItem() as T | null
      if (event.newIndex === undefined || !item)
        return

      addItem(item, event.newIndex)
    },
    onRemove(event) {
      if (event.oldIndex === undefined)
        return

      removeItem(event.oldIndex)
    },
    onEnd(event) {
      const oldIndex = event.oldIndex
      const newIndex = event.newIndex
      draggingKey.value = null
      const item = getActiveDraggableItem() as T | null
      clearActiveDraggableItem()
      if (oldIndex === undefined || newIndex === undefined || !item)
        return

      if (event.from === event.to)
        moveItem(oldIndex, newIndex)

      emit('dragEnd', createEvent(item, oldIndex, newIndex))
    },
  })
}

watch(interactionDisabled, value => sortable?.option('disabled', value))
watch(
  () => props.animation,
  value => sortable?.option('animation', value),
)
watch(
  () => props.group,
  () => sortable?.option('group', getGroupOption()),
  { deep: true },
)

onMounted(initializeSortable)
onBeforeUnmount(() => sortable?.destroy())
</script>

<template>
  <div
    ref="root"
    class="di-draggable grid gap-3"
    role="list"
    :aria-label="label"
    :aria-disabled="interactionDisabled || undefined"
  >
    <div
      v-for="(item, index) in model"
      :key="getItemKey(item)"
      data-di-draggable-item
      :data-di-index="index"
      class="di-draggable__item group relative rounded-box focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :class="!handle && !interactionDisabled && 'cursor-grab active:cursor-grabbing'"
      role="listitem"
      :tabindex="interactionDisabled || handle ? undefined : 0"
      @keydown="handleItemKeydown($event, index)"
    >
      <button
        v-if="handle"
        type="button"
        data-di-drag-handle
        class="di-draggable__handle btn btn-ghost btn-sm absolute top-2 z-10 cursor-grab touch-none ltr:right-2 rtl:left-2 active:cursor-grabbing"
        :aria-label="`${handleLabel}: ${index + 1}`"
        :disabled="interactionDisabled"
        @keydown.stop="handleItemKeydown($event, index)"
      >
        <slot name="handle" :item="item" :index="index">
          <span aria-hidden="true" class="text-lg leading-none">⠿</span>
        </slot>
      </button>
      <slot name="item" :item="item" :index="index" :dragging="draggingKey === getItemKey(item)" />
    </div>
    <slot v-if="model.length === 0" name="empty" />
  </div>
</template>
