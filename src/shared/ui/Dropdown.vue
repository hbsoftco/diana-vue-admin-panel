<script setup lang="ts">
import { computed } from 'vue'

/* ----------------------------------
 * Types
 * ---------------------------------- */
type KeyGetter<T> = keyof T | ((option: T) => any)

export type DropdownProps<T = any> = {
  options?: T[]

  labelKey?: KeyGetter<T>
  valueKey?: KeyGetter<T>

  position?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  hover?: boolean
  closeOnClick?: boolean

  width?: string
  bgColor?: string
  rounded?: boolean | string
  shadow?: boolean | string
  zIndex?: number

  triggerClass?: string
  buttonClass?: string
  contentClass?: string
  class?: string
}

/* ----------------------------------
 * Props
 * ---------------------------------- */
const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],

  position: 'bottom',
  align: 'start',
  size: 'md',

  hover: false,
  closeOnClick: false,

  width: 'w-52',
  bgColor: 'bg-base-100',
  rounded: 'rounded-box',
  shadow: 'shadow',
  zIndex: 10,
})

/* ----------------------------------
 * Emits
 * ---------------------------------- */
const emit = defineEmits<{
  select: [{ option: any, value: any }]
}>()

/* ----------------------------------
 * Static class maps (Tailwind v4 safe)
 * ---------------------------------- */
const POSITION_CLASS_MAP = {
  top: 'dropdown-top',
  bottom: 'dropdown-bottom',
  left: 'dropdown-left',
  right: 'dropdown-right',
} as const

const ALIGN_CLASS_MAP = {
  start: 'dropdown-start',
  center: 'dropdown-center',
  end: 'dropdown-end',
} as const

const SIZE_CLASS_MAP = {
  xs: 'menu-xs',
  sm: 'menu-sm',
  md: '',
  lg: 'menu-lg',
  xl: 'menu-xl',
} as const

/* ----------------------------------
 * v-model
 * ---------------------------------- */
const model = defineModel<any>()

/* ----------------------------------
 * Helpers
 * ---------------------------------- */
function resolveValue<T>(option: T, key: KeyGetter<T> | undefined, fallbackKey?: keyof T) {
  if (!key) {
    return fallbackKey ? (option as any)?.[fallbackKey] : option
  }
  return typeof key === 'function' ? key(option) : (option as any)?.[key]
}

function getLabel(option: any) {
  return resolveValue(option, props.labelKey, 'label')
}

function getValue(option: any) {
  return resolveValue(option, props.valueKey, 'value')
}

function isSelected(option: any) {
  return model.value === getValue(option)
}

/* ----------------------------------
 * Classes
 * ---------------------------------- */
const dropdownClasses = computed(() =>
  [
    'dropdown',
    POSITION_CLASS_MAP[props.position],
    ALIGN_CLASS_MAP[props.align],
    props.hover && 'dropdown-hover',
    props.class,
  ]
    .filter(Boolean)
    .join(' '),
)

const contentClasses = computed(() =>
  [
    'dropdown-content',
    'menu',
    SIZE_CLASS_MAP[props.size],
    props.width,
    props.bgColor,
    typeof props.rounded === 'string' ? props.rounded : props.rounded && 'rounded-box',
    typeof props.shadow === 'string' ? props.shadow : props.shadow && 'shadow',
    `z-${props.zIndex}`,
    props.contentClass,
  ]
    .filter(Boolean)
    .join(' '),
)

/* ----------------------------------
 * Handlers
 * ---------------------------------- */
function handleSelect(option: any) {
  const value = getValue(option)
  model.value = value
  emit('select', { option, value })
}

function handleContentClick(e: MouseEvent) {
  if (!props.closeOnClick) {
    return
  }
  ;(e.target as HTMLElement | null)?.blur()
}
</script>

<template>
  <div :class="dropdownClasses">
    <!-- Trigger -->
    <button tabindex="0" :class="triggerClass">
      <slot name="trigger">
        <button :class="buttonClass">
          Menu
        </button>
      </slot>
    </button>

    <!-- Content -->
    <ul tabindex="-1" :class="contentClasses" @click="handleContentClick">
      <li v-for="(option, index) in options" :key="index">
        <slot
          name="option"
          :option="option"
          :select="() => handleSelect(option)"
          :selected="isSelected(option)"
        >
          <button
            class="w-full text-left"
            :class="{ 'bg-base-200 font-medium': isSelected(option) }"
            @click="handleSelect(option)"
          >
            {{ getLabel(option) }}
          </button>
        </slot>
      </li>
    </ul>
  </div>
</template>
