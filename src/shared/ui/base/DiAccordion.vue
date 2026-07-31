<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

import { computed, ref, useId } from 'vue'

import type { Size } from '@/shared/types/models'

import DiIcon from '@/shared/ui/base/DiIcon.vue'

export type AccordionItem = {
  id: string
  title: string
  content?: string
  disabled?: boolean
}

type AccordionVariant = 'separated' | 'bordered'
type AccordionIcon = 'chevron' | 'plus' | 'none'
type HeadingLevel = 2 | 3 | 4 | 5 | 6

type Props = {
  items: readonly AccordionItem[]
  multiple?: boolean
  collapsible?: boolean
  disabled?: boolean
  variant?: AccordionVariant
  icon?: AccordionIcon
  size?: Size
  headingLevel?: HeadingLevel
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  collapsible: true,
  disabled: false,
  variant: 'separated',
  icon: 'chevron',
  size: 'md',
  headingLevel: 3,
})

const emit = defineEmits<{
  toggle: [payload: { id: string, open: boolean }]
}>()

defineSlots<{
  title?: (props: {
    item: AccordionItem
    index: number
    open: boolean
    disabled: boolean
  }) => unknown
  default?: (props: {
    item: AccordionItem
    index: number
    open: boolean
    disabled: boolean
  }) => unknown
}>()

const model = defineModel<string[]>({
  default: () => [],
})

const TRIGGER_SIZE_CLASSES: Record<Size, string> = {
  xs: 'min-h-9 px-3 py-2 text-xs',
  sm: 'min-h-10 px-3 py-2.5 text-sm',
  md: 'min-h-12 px-4 py-3 text-sm',
  lg: 'min-h-14 px-5 py-4 text-base',
  xl: 'min-h-16 px-6 py-5 text-lg',
}

const CONTENT_SIZE_CLASSES: Record<Size, string> = {
  xs: 'px-3 pb-3 text-xs',
  sm: 'px-3 pb-3 text-sm',
  md: 'px-4 pb-4 text-sm',
  lg: 'px-5 pb-5 text-base',
  xl: 'px-6 pb-6 text-base',
}

const accordionId = useId()
const triggerRefs = ref<Array<HTMLButtonElement | null>>([])

const wrapperClasses = computed(() => [
  'w-full',
  props.variant === 'separated' ? 'space-y-2' : '',
  props.variant === 'bordered'
    ? 'overflow-hidden rounded-box border border-base-300 divide-y divide-base-300'
    : '',
])

function isItemOpen(id: string) {
  return model.value.includes(id)
}

function isItemDisabled(item: AccordionItem) {
  return props.disabled || item.disabled === true
}

function getItemClasses(open: boolean) {
  return [
    'collapse bg-base-100',
    open ? 'collapse-open' : 'collapse-close',
    props.variant === 'separated' ? 'rounded-box border border-base-300' : '',
  ]
}

function getTriggerId(item: AccordionItem) {
  return `${accordionId}-${item.id.replace(/[^\w-]/g, '-')}-trigger`
}

function getPanelId(item: AccordionItem) {
  return `${accordionId}-${item.id.replace(/[^\w-]/g, '-')}-panel`
}

function setTriggerRef(element: Element | ComponentPublicInstance | null, index: number) {
  triggerRefs.value[index] = element instanceof HTMLButtonElement ? element : null
}

function toggleItem(item: AccordionItem) {
  if (isItemDisabled(item))
    return

  const open = isItemOpen(item.id)

  if (open && !props.collapsible && !props.multiple && model.value.length === 1)
    return

  if (props.multiple) {
    model.value = open ? model.value.filter(id => id !== item.id) : [...model.value, item.id]
  }
  else {
    model.value = open ? [] : [item.id]
  }

  emit('toggle', { id: item.id, open: !open })
}

function focusEnabledTrigger(currentIndex: number, direction: 1 | -1) {
  const enabledIndexes = props.items
    .map((item, index) => (isItemDisabled(item) ? -1 : index))
    .filter(index => index >= 0)

  if (enabledIndexes.length === 0)
    return

  const currentPosition = enabledIndexes.indexOf(currentIndex)
  const nextPosition
    = currentPosition < 0
      ? 0
      : (currentPosition + direction + enabledIndexes.length) % enabledIndexes.length

  const nextIndex = enabledIndexes[nextPosition]
  if (nextIndex !== undefined)
    triggerRefs.value[nextIndex]?.focus()
}

function handleTriggerKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusEnabledTrigger(index, 1)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    focusEnabledTrigger(index, -1)
  }
  else if (event.key === 'Home') {
    event.preventDefault()
    const firstEnabled = props.items.findIndex(item => !isItemDisabled(item))
    if (firstEnabled >= 0)
      triggerRefs.value[firstEnabled]?.focus()
  }
  else if (event.key === 'End') {
    event.preventDefault()
    let lastEnabled = -1
    for (let itemIndex = props.items.length - 1; itemIndex >= 0; itemIndex--) {
      const item = props.items[itemIndex]
      if (item !== undefined && !isItemDisabled(item)) {
        lastEnabled = itemIndex
        break
      }
    }
    if (lastEnabled >= 0)
      triggerRefs.value[lastEnabled]?.focus()
  }
}
</script>

<template>
  <div :class="wrapperClasses">
    <div v-for="(item, index) in items" :key="item.id" :class="getItemClasses(isItemOpen(item.id))">
      <component :is="`h${headingLevel}`" class="m-0">
        <button
          :id="getTriggerId(item)"
          :ref="(element) => setTriggerRef(element, index)"
          type="button"
          class="collapse-title flex w-full items-center justify-between gap-3 text-start font-semibold transition-colors hover:bg-base-200 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
          :class="TRIGGER_SIZE_CLASSES[size]"
          :aria-expanded="isItemOpen(item.id)"
          :aria-controls="getPanelId(item)"
          :disabled="isItemDisabled(item)"
          data-accordion-trigger
          @click="toggleItem(item)"
          @keydown="handleTriggerKeydown($event, index)"
        >
          <span class="min-w-0 flex-1">
            <slot
              name="title"
              :item="item"
              :index="index"
              :open="isItemOpen(item.id)"
              :disabled="isItemDisabled(item)"
            >
              {{ item.title }}
            </slot>
          </span>

          <DiIcon
            v-if="icon !== 'none'"
            :name="icon === 'plus' ? 'plus' : 'chevronDown'"
            size="sm"
            class="shrink-0 transition-transform duration-200 motion-reduce:transition-none"
            :rotate="isItemOpen(item.id) ? (icon === 'plus' ? 45 : 180) : 0"
          />
        </button>
      </component>

      <div
        v-show="isItemOpen(item.id)"
        :id="getPanelId(item)"
        class="collapse-content text-base-content/80"
        :class="CONTENT_SIZE_CLASSES[size]"
        role="region"
        :aria-labelledby="getTriggerId(item)"
      >
        <slot
          :item="item"
          :index="index"
          :open="isItemOpen(item.id)"
          :disabled="isItemDisabled(item)"
        >
          {{ item.content }}
        </slot>
      </div>
    </div>
  </div>
</template>
