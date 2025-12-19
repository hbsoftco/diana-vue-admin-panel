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
  zIndex?: string | number

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
  zIndex: 1,
})

/* ----------------------------------
 * Emits
 * ---------------------------------- */
const emit = defineEmits<{
  select: [{ option: any, value: any }]
}>()

/* ----------------------------------
 * v-model
 * ---------------------------------- */
const model = defineModel<any>()

/* ----------------------------------
 * Helpers
 * ---------------------------------- */
function resolveValue<T>(option: T, key: KeyGetter<T> | undefined, fallbackKey?: keyof T) {
  if (key == null) {
    return fallbackKey ? (option as any)?.[fallbackKey] : option
  }

  if (typeof key === 'function') {
    return key(option)
  }

  return (option as any)?.[key]
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
    `dropdown-${props.position}`,
    `dropdown-${props.align}`,
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
    props.size !== 'md' && `menu-${props.size}`,
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

  emit('select', {
    option,
    value,
  })
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
          <!-- Fallback UI -->
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
