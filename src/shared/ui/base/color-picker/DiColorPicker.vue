<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, ref, useAttrs, useId, watch } from 'vue'

import type { DiColorPickerSize, DiColorPickerVariant } from './types'

type Props = {
  id?: string
  label?: string
  disabled?: boolean
  readonly?: boolean
  size?: DiColorPickerSize
  variant?: DiColorPickerVariant
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  size: 'md',
  variant: 'default',
})

const emit = defineEmits<{
  change: [value: string]
}>()

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i
const model = defineModel<string>({ default: '#000000' })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')
const draftValue = ref(normalizeColor(model.value) ?? '#000000')

const SIZE_CLASSES: Record<DiColorPickerSize, { control: string, preview: string, text: string }>
  = {
    sm: { control: 'h-8', preview: 'size-6', text: 'text-xs' },
    md: { control: 'h-10', preview: 'size-8', text: 'text-sm' },
    lg: { control: 'h-12', preview: 'size-10', text: 'text-base' },
  }

const controlId = computed(() => props.id || `di-color-picker-${generatedId}`)
const colorInputId = computed(() => `${controlId.value}-native`)
const isInvalidDraft = computed(() => !normalizeColor(draftValue.value))
const displayColor = computed(() => normalizeColor(model.value) ?? '#000000')
const rootClasses = computed(() => ['w-full', attrs.class])
const rootStyle = computed(() => attrs.style as StyleValue)
const nativeAttrs = computed(() => {
  const { class: _class, style: _style, ...forwardedAttrs } = attrs
  return forwardedAttrs
})
const controlClasses = computed(() => [
  'flex items-center rounded-lg border border-base-300 bg-base-100 transition-colors',
  'focus-within:border-base-content/30 focus-within:ring-2 focus-within:ring-primary/25',
  SIZE_CLASSES[props.size].control,
  props.variant === 'compact' ? 'w-fit gap-1.5 px-1.5' : 'w-full gap-2 px-2',
  props.disabled && 'cursor-not-allowed opacity-50',
  props.readonly && !props.disabled && 'bg-base-200/60',
  isInvalidDraft.value && 'border-error focus-within:ring-error/25',
])
const previewClasses = computed(() => [
  'relative shrink-0 overflow-hidden rounded-md border border-base-content/15 shadow-sm',
  SIZE_CLASSES[props.size].preview,
  props.disabled || props.readonly ? 'cursor-not-allowed' : 'cursor-pointer',
])
const hexInputClasses = computed(() => [
  'min-w-20 flex-1 bg-transparent font-mono uppercase text-base-content outline-none',
  SIZE_CLASSES[props.size].text,
  props.variant === 'compact' && 'w-20 flex-none',
  props.disabled && 'cursor-not-allowed',
])

watch(model, (value) => {
  const normalized = normalizeColor(value)
  if (normalized)
    draftValue.value = normalized
})

function normalizeColor(value: string): string | null {
  const trimmed = value.trim()
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  return HEX_COLOR_PATTERN.test(withHash) ? withHash.toUpperCase() : null
}

function updateModel(value: string) {
  if (props.disabled || props.readonly)
    return

  const normalized = normalizeColor(value)
  draftValue.value = value.toUpperCase()
  if (normalized)
    model.value = normalized
}

function commitDraft() {
  if (props.disabled || props.readonly)
    return

  const normalized = normalizeColor(draftValue.value)
  if (!normalized) {
    draftValue.value = displayColor.value
    return
  }

  draftValue.value = normalized
  if (model.value !== normalized)
    model.value = normalized
  emit('change', normalized)
}

function onNativeInput(event: Event) {
  updateModel((event.target as HTMLInputElement).value)
}

function onNativeChange(event: Event) {
  if (props.disabled || props.readonly)
    return

  const normalized = normalizeColor((event.target as HTMLInputElement).value)
  if (normalized) {
    draftValue.value = normalized
    model.value = normalized
    emit('change', normalized)
  }
}

function preventReadonlyInteraction(event: Event) {
  if (props.readonly)
    event.preventDefault()
}
</script>

<template>
  <div :class="rootClasses" :style="rootStyle">
    <label v-if="label" :for="controlId" class="mb-1.5 block text-sm font-medium text-base-content">
      {{ label }}
    </label>

    <div :class="controlClasses">
      <span :class="previewClasses" :style="{ backgroundColor: displayColor }" aria-hidden="true">
        <input
          :id="colorInputId"
          type="color"
          :value="displayColor"
          :disabled="disabled"
          :tabindex="readonly ? -1 : 0"
          class="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          :aria-label="label"
          :aria-readonly="readonly || undefined"
          @click="preventReadonlyInteraction"
          @input="onNativeInput"
          @change="onNativeChange"
        >
      </span>

      <input
        :id="controlId"
        v-bind="nativeAttrs"
        type="text"
        inputmode="text"
        autocomplete="off"
        spellcheck="false"
        maxlength="7"
        :value="draftValue"
        :disabled="disabled"
        :readonly="readonly"
        :class="hexInputClasses"
        :aria-invalid="isInvalidDraft || undefined"
        @blur="commitDraft"
        @input="updateModel(($event.target as HTMLInputElement).value)"
        @keydown.enter.prevent="commitDraft"
      >
    </div>
  </div>
</template>
