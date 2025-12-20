<script setup lang="ts">
import { computed } from 'vue'

/* ----------------------------------
 * Types
 * ---------------------------------- */
type KeyGetter<T> = keyof T | ((option: T) => any)

export type DropdownOption<T = any> = T & {
  divider?: boolean
  disabled?: boolean
}

export type DropdownProps<T = any> = {
  options?: DropdownOption<T>[]

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
  border?: boolean | string
  zIndex?: number

  // New props
  header?: string
  footer?: string
  showHeaderDivider?: boolean
  showFooterDivider?: boolean

  triggerClass?: string
  buttonClass?: string
  contentClass?: string
  headerClass?: string
  footerClass?: string
  dividerClass?: string
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
  bgColor: 'bg-content-background',
  rounded: 'rounded-box',
  shadow: 'shadow',
  zIndex: 10,

  showHeaderDivider: true,
  showFooterDivider: true,

  headerClass: 'px-4 py-2 text-sm font-semibold text-base-content',
  footerClass: 'px-4 py-2 text-sm text-base-content',
  dividerClass: 'divider my-0',
})

/* ----------------------------------
 * Emits
 * ---------------------------------- */
const emit = defineEmits<{
  select: [{ option: any, value: any }]
}>()

/* ----------------------------------
 * Slots
 * ---------------------------------- */
const slots = defineSlots<{
  trigger?: any
  option?: any
  header?: any
  footer?: any
  divider?: any
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
 * Computed
 * ---------------------------------- */
const hasHeader = computed(() => props.header || !!slots.header)
const hasFooter = computed(() => props.footer || !!slots.footer)

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

function isDivider(option: DropdownOption) {
  return option.divider === true
}

function isDisabled(option: DropdownOption) {
  return option.disabled === true
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
    typeof props.border === 'string' ? props.border : props.border && 'border',
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
  if (isDisabled(option) || isDivider(option)) {
    return
  }

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
      <!-- Header -->
      <li v-if="hasHeader" class="menu-title pointer-events-none">
        <slot name="header">
          <div :class="headerClass">
            {{ header }}
          </div>
        </slot>
      </li>

      <!-- Header Divider -->
      <li v-if="hasHeader && showHeaderDivider" class="pointer-events-none">
        <slot name="divider">
          <div :class="dividerClass" />
        </slot>
      </li>

      <!-- Options -->
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="{ 'pointer-events-none': isDisabled(option) || isDivider(option) }"
      >
        <!-- Divider -->
        <template v-if="isDivider(option)">
          <slot name="divider">
            <div :class="dividerClass" />
          </slot>
        </template>

        <!-- Regular Option -->
        <template v-else>
          <slot
            name="option"
            :option="option"
            :select="() => handleSelect(option)"
            :selected="isSelected(option)"
            :disabled="isDisabled(option)"
          >
            <button
              class="w-full text-left"
              :class="{
                'bg-base-200 font-medium': isSelected(option),
                'opacity-50 cursor-not-allowed': isDisabled(option),
              }"
              :disabled="isDisabled(option)"
              @click="handleSelect(option)"
            >
              {{ getLabel(option) }}
            </button>
          </slot>
        </template>
      </li>

      <!-- Footer Divider -->
      <li v-if="hasFooter && showFooterDivider" class="pointer-events-none">
        <slot name="divider">
          <div :class="dividerClass" />
        </slot>
      </li>

      <!-- Footer -->
      <li v-if="hasFooter" class="menu-title pointer-events-none">
        <slot name="footer">
          <div :class="footerClass">
            {{ footer }}
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>
