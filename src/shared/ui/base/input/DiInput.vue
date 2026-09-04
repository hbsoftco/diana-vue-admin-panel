<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, ref, useAttrs, useId, watch } from 'vue'

import type { IconName } from '@/shared/icons/registry'

import type {
  DiInputPasswordToggleLabels,
  DiInputSize,
  DiInputType,
  DiInputValue,
  DiInputVariant,
} from './types'

import DiIcon from '../DiIcon.vue'
import DiLoading from '../DiLoading.vue'
import { INPUT_SIZE_CLASSES } from './sizes'
import { INPUT_VARIANT_CLASSES } from './variants'

type Props = {
  id?: string
  type?: DiInputType
  size?: DiInputSize
  variant?: DiInputVariant
  label?: string
  helperText?: string
  error?: string
  success?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  required?: boolean
  /**
   * Decorative icon rendered before the text. The `prefix` slot, when
   * provided, takes precedence over this prop.
   */
  prefixIcon?: IconName
  /**
   * Decorative icon rendered after the text. Lower precedence than the
   * `suffix` slot and the password toggle, higher than the error icon.
   */
  suffixIcon?: IconName
  /**
   * With `type="password"`, render an interactive show/hide button as the
   * suffix. Clicking it toggles the resolved input type between `password`
   * and `text` and swaps the eye / eye-off icon. Ignored for other types
   * and when a `suffix` slot is supplied.
   */
  showPasswordToggle?: boolean
  /** Translated accessible labels for the password toggle button. */
  passwordToggleLabels?: DiInputPasswordToggleLabels
  /**
   * Show a status icon inside the control while in the error state. Used
   * when a `suffix` slot, password toggle, and `suffixIcon` are all absent.
   */
  showErrorIcon?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'primary',
  disabled: false,
  readonly: false,
  loading: false,
  required: false,
  showPasswordToggle: false,
  showErrorIcon: false,
  passwordToggleLabels: () => ({ show: 'Show password', hide: 'Hide password' }),
})

const emit = defineEmits<{
  passwordVisibilityChange: [visible: boolean]
}>()

const slots = defineSlots<{
  prefix?: () => unknown
  suffix?: () => unknown
}>()

const model = defineModel<DiInputValue>({ default: '' })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')

const controlId = computed(() => props.id || `di-input-${generatedId}`)
const messageId = computed(() => `${controlId.value}-message`)
const sizeClasses = computed(() => INPUT_SIZE_CLASSES[props.size])
const validationState = computed<'error' | 'success' | null>(() => {
  if (props.error)
    return 'error'
  if (props.success)
    return 'success'
  return null
})
const message = computed(() => props.error || props.success || props.helperText)
const describedBy = computed(() => {
  const ids = [attrs['aria-describedby'], message.value ? messageId.value : undefined]
  return ids.filter(Boolean).join(' ') || undefined
})

const isPasswordInput = computed(() => props.type === 'password')
const hasPasswordToggle = computed(() => isPasswordInput.value && props.showPasswordToggle)
const passwordVisible = ref(false)
const resolvedType = computed<DiInputType>(() =>
  hasPasswordToggle.value && passwordVisible.value ? 'text' : props.type,
)
const passwordToggleLabel = computed(() =>
  passwordVisible.value ? props.passwordToggleLabels.hide : props.passwordToggleLabels.show,
)

// Reset the reveal state if the field stops being a password field.
watch(isPasswordInput, (isPassword) => {
  if (!isPassword)
    passwordVisible.value = false
})

const hasPrefix = computed(() => Boolean(slots.prefix || props.prefixIcon))
const suffixMode = computed<'slot' | 'toggle' | 'icon' | 'error' | null>(() => {
  if (slots.suffix)
    return 'slot'
  if (hasPasswordToggle.value)
    return 'toggle'
  if (props.suffixIcon)
    return 'icon'
  if (props.showErrorIcon && validationState.value === 'error')
    return 'error'
  return null
})

const rootClasses = computed(() => ['w-full', attrs.class])
const rootStyle = computed(() => attrs.style as StyleValue)
const inputAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    'aria-describedby': _ariaDescribedBy,
    'aria-invalid': _ariaInvalid,
    ...nativeAttrs
  } = attrs
  return nativeAttrs
})
const controlClasses = computed(() => [
  'input w-full max-w-none bg-base-100 border-base-300 focus-within:border-base-content/30 focus-within:outline-none focus-within:ring-2',
  sizeClasses.value.control,
  sizeClasses.value.icon,
  sizeClasses.value.gap,
  validationState.value === 'error'
    ? 'input-error focus-within:ring-error/25'
    : validationState.value === 'success'
      ? 'input-success focus-within:ring-success/25'
      : INPUT_VARIANT_CLASSES[props.variant],
])
const nativeInputClasses = computed(() => [
  'min-w-0 grow bg-transparent outline-none placeholder:text-base-content/40 disabled:cursor-not-allowed',
  sizeClasses.value.content,
])
const affixClasses = computed(() => [
  'inline-flex shrink-0 items-center justify-center text-base-content/55',
  props.disabled && 'opacity-50',
])
const toggleClasses = computed(() => [
  'inline-flex shrink-0 items-center justify-center rounded-md text-base-content/55 transition-colors hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
  sizeClasses.value.toggle,
])
const messageClasses = computed(() => [
  'mt-1.5 block text-xs',
  validationState.value === 'error'
    ? 'text-error'
    : validationState.value === 'success'
      ? 'text-success'
      : 'text-base-content/60',
])
const ariaInvalid = computed(() => {
  if (props.error)
    return 'true'

  const externalValue = attrs['aria-invalid']
  if (externalValue === true || externalValue === 'true')
    return 'true'
  if (externalValue === false || externalValue === 'false')
    return 'false'
  if (externalValue === 'grammar' || externalValue === 'spelling')
    return externalValue
  return undefined
})

function onInput(event: Event) {
  const input = event.target as HTMLInputElement

  if (props.disabled || props.readonly) {
    input.value = String(model.value ?? '')
    return
  }

  if (props.type === 'number') {
    model.value
      = input.value === '' || Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber
    return
  }

  model.value = input.value
}

function togglePasswordVisibility() {
  if (props.disabled)
    return

  passwordVisible.value = !passwordVisible.value
  emit('passwordVisibilityChange', passwordVisible.value)
}
</script>

<template>
  <div :class="rootClasses" :style="rootStyle">
    <label v-if="label" :for="controlId" class="mb-1.5 block text-sm font-medium text-base-content">
      {{ label }}
      <span v-if="required" class="text-error" aria-hidden="true">*</span>
    </label>

    <div :class="controlClasses">
      <span v-if="hasPrefix" :class="affixClasses">
        <slot name="prefix">
          <DiIcon v-if="prefixIcon" :name="prefixIcon" />
        </slot>
      </span>

      <input
        :id="controlId"
        v-bind="inputAttrs"
        :type="resolvedType"
        :value="model ?? ''"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="nativeInputClasses"
        :aria-describedby="describedBy"
        :aria-invalid="ariaInvalid"
        :aria-busy="loading || undefined"
        @input="onInput"
      >

      <span v-if="suffixMode === 'slot'" :class="affixClasses">
        <slot name="suffix" />
      </span>
      <button
        v-else-if="suffixMode === 'toggle'"
        type="button"
        :class="toggleClasses"
        :disabled="disabled"
        :aria-label="passwordToggleLabel"
        :aria-pressed="passwordVisible"
        :aria-controls="controlId"
        @click="togglePasswordVisibility"
      >
        <DiIcon :name="passwordVisible ? 'eyeOff' : 'eye'" />
      </button>
      <span v-else-if="suffixMode === 'icon'" :class="affixClasses">
        <DiIcon :name="suffixIcon!" />
      </span>
      <span
        v-else-if="suffixMode === 'error'"
        class="inline-flex shrink-0 items-center justify-center text-error"
      >
        <DiIcon name="xCircle" />
      </span>

      <DiLoading
        v-if="loading"
        class="shrink-0"
        :size="sizeClasses.loading"
        :color="variant"
        aria-hidden="true"
      />
    </div>

    <span
      v-if="message"
      :id="messageId"
      :class="messageClasses"
      :role="validationState === 'error' ? 'alert' : undefined"
    >
      {{ message }}
    </span>
  </div>
</template>
