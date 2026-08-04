<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IconName } from '@/shared/icons/registry'
import type { AlertVariant } from '@/shared/types/models'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

type Layout = 'horizontal' | 'vertical'
type AlertRole = 'alert' | 'status' | 'button'

type Props = {
  variant?: AlertVariant
  layout?: Layout
  role?: AlertRole

  outline?: boolean
  dash?: boolean
  soft?: boolean
  rounded?: boolean

  closable?: boolean
  modelValue?: boolean
  showIcon?: boolean
  closeLabel?: string

  title?: string
  description?: string

  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  role: 'alert',
  outline: false,
  dash: false,
  soft: false,
  rounded: false,
  closable: false,
  modelValue: true,
  showIcon: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()
const slots = defineSlots<{
  default?: () => unknown
  icon?: () => unknown
  actions?: () => unknown
  close?: (props: { close: () => void }) => unknown
}>()
const { t } = useI18n()
const resolvedCloseLabel = computed(() => props.closeLabel ?? t('components.alert.close'))

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  neutral: '[--alert-color:var(--color-neutral)] [--alert-border-color:var(--color-neutral)]',
  primary: '[--alert-color:var(--color-primary)] [--alert-border-color:var(--color-primary)]',
  secondary: '[--alert-color:var(--color-secondary)] [--alert-border-color:var(--color-secondary)]',
  accent: '[--alert-color:var(--color-accent)] [--alert-border-color:var(--color-accent)]',
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

const LAYOUT_CLASSES: Record<Layout, string> = {
  horizontal: 'alert-horizontal',
  vertical: 'alert-vertical',
}

const SOLID_CONTENT_CLASSES: Partial<Record<AlertVariant, string>> = {
  neutral: 'text-neutral-content',
  primary: 'text-primary-content',
  secondary: 'text-secondary-content',
  accent: 'text-accent-content',
}

const SUBTLE_CONTENT_CLASSES: Partial<Record<AlertVariant, string>> = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
}

const DEFAULT_ICONS: Partial<Record<AlertVariant, IconName>> = {
  info: 'informationCircle',
  success: 'checkCircle',
  warning: 'exclamationTriangle',
  error: 'xCircle',
}

const usesSubtleStyle = computed(() => props.outline || props.dash || props.soft)

const alertClasses = computed(() => [
  'alert',

  props.variant && VARIANT_CLASSES[props.variant],
  props.variant
  && (usesSubtleStyle.value
    ? SUBTLE_CONTENT_CLASSES[props.variant]
    : SOLID_CONTENT_CLASSES[props.variant]),
  LAYOUT_CLASSES[props.layout],

  props.outline && 'alert-outline',
  props.dash && 'alert-dash',
  props.soft && 'alert-soft',
  props.rounded && 'rounded-full',
  props.closable && 'relative pe-14',

  props.customClass,
])

const defaultIcon = computed(() => {
  if (!props.variant || !props.showIcon || slots.icon)
    return

  return DEFAULT_ICONS[props.variant]
})

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <div v-if="modelValue" :role="role" :class="alertClasses">
    <DiIcon v-if="defaultIcon" :name="defaultIcon" size="lg" class="shrink-0" />

    <slot name="icon" />

    <div v-if="title || description" class="flex-1">
      <h3 v-if="title" class="font-bold">
        {{ title }}
      </h3>
      <div v-if="description" class="text-xs">
        {{ description }}
      </div>
      <slot />
    </div>
    <span v-else class="flex-1">
      <slot />
    </span>

    <div v-if="slots.actions">
      <slot name="actions" />
    </div>

    <div v-if="closable" class="absolute end-4 top-1/2 shrink-0 -translate-y-1/2">
      <slot v-if="slots.close" name="close" :close="handleClose" />
      <DiButton
        v-else
        variant="ghost"
        size="sm"
        circle
        :aria-label="resolvedCloseLabel"
        @click="handleClose"
      >
        <DiIcon name="xMark" size="sm" />
      </DiButton>
    </div>
  </div>
</template>
