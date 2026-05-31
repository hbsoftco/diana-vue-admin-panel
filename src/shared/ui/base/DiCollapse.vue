<script setup lang="ts">
import { computed, useId } from 'vue'

/* =======================
   Types
======================= */
type CollapseIcon = 'none' | 'arrow' | 'plus'
type CollapseType = 'focus' | 'checkbox' | 'details'
type CollapseState = 'default' | 'open' | 'close'
type CollapseColor
  = | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'neutral'
    | string

type Props = {
  title?: string
  icon?: CollapseIcon
  type?: CollapseType
  state?: CollapseState
  color?: CollapseColor
  bordered?: boolean
  bg?: boolean
  iconStart?: boolean
  customClass?: string
  titleClass?: string
  contentClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  title: '',
  icon: 'none',
  type: 'checkbox',
  state: 'default',
  color: 'default',
  bordered: true,
  bg: true,
  iconStart: false,
  customClass: '',
  titleClass: '',
  contentClass: '',
})

const emit = defineEmits<{
  toggle: [open: boolean]
}>()

/* =======================
   Static class maps
======================= */
const ICON_CLASSES: Record<CollapseIcon, string> = {
  none: '',
  arrow: 'collapse-arrow',
  plus: 'collapse-plus',
}

const STATE_CLASSES: Record<CollapseState, string> = {
  default: '',
  open: 'collapse-open',
  close: 'collapse-close',
}

const COLOR_CLASSES: Record<string, string> = {
  default: '',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
  info: 'bg-info text-info-content',
  success: 'bg-success text-success-content',
  warning: 'bg-warning text-warning-content',
  error: 'bg-error text-error-content',
  neutral: 'bg-neutral text-neutral-content',
}

/* =======================
   Unique ID for checkbox type
======================= */
const uid = useId()

/* =======================
   Computed
======================= */
const wrapperClasses = computed(() => [
  'collapse',
  ICON_CLASSES[props.icon],
  STATE_CLASSES[props.state],
  props.color === 'default' && props.bg ? 'bg-base-100' : '',
  COLOR_CLASSES[props.color] ?? '',
  props.bordered ? 'border border-base-300' : '',
  props.customClass,
])

const titleClasses = computed(() => [
  'collapse-title font-semibold',
  props.iconStart ? 'after:start-5 after:end-auto pe-4 ps-12' : '',
  props.titleClass,
])

const contentClasses = computed(() => ['collapse-content text-sm', props.contentClass])

function onCheckboxChange(e: Event) {
  emit('toggle', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <!-- details/summary type -->
  <details v-if="props.type === 'details'" :class="wrapperClasses">
    <summary :class="titleClasses">
      <slot name="title">
        {{ props.title }}
      </slot>
    </summary>
    <div :class="contentClasses">
      <slot />
    </div>
  </details>

  <!-- focus type -->
  <div v-else-if="props.type === 'focus'" tabindex="0" :class="wrapperClasses">
    <div :class="titleClasses">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div :class="contentClasses">
      <slot />
    </div>
  </div>

  <!-- checkbox type (default) -->
  <div v-else :class="wrapperClasses">
    <input :id="uid" type="checkbox" @change="onCheckboxChange">
    <div :class="titleClasses">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div :class="contentClasses">
      <slot />
    </div>
  </div>
</template>
