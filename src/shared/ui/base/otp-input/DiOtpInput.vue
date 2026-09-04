<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

import { computed, onMounted, ref, useId, watch } from 'vue'

import type { DiOtpInputSize, DiOtpInputType } from './types'

import { OTP_BOX_SIZE_CLASSES, OTP_GROUP_GAP_CLASSES } from './sizes'

/**
 * Segmented one-time-code input, e.g. for a 6-digit SMS/email verification
 * step. Each box is a real `<input>` so it stays keyboard- and
 * screen-reader-accessible; the group is always rendered `dir="ltr"` because
 * numeric codes read left-to-right even inside an RTL page (the same
 * convention as phone numbers), independent of the current locale direction.
 */
type Props = {
  /** Number of boxes / digits in the code. */
  length?: number
  size?: DiOtpInputSize
  disabled?: boolean
  readonly?: boolean
  /** Validation message. Presence also drives the error visual state. */
  error?: string
  inputType?: DiOtpInputType
  /** Focus the first box once the component mounts. */
  autoFocus?: boolean
  /** Accessible name for the group. English fallback; pass a translated string. */
  ariaLabel?: string
  /**
   * One accessible label per box (e.g. `Digit 1 of 6`), already translated.
   * Falls back to an English "Digit N of length" label per box when omitted.
   */
  boxAriaLabels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  size: 'md',
  disabled: false,
  readonly: false,
  inputType: 'numeric',
  autoFocus: false,
  ariaLabel: 'Verification code',
})

const emit = defineEmits<{
  /** Fires once when every box transitions from not-full to fully filled. */
  complete: [value: string]
}>()

const model = defineModel<string>({ default: '' })

const CHAR_PATTERNS: Record<DiOtpInputType, RegExp> = {
  numeric: /^\d$/,
  alphanumeric: /^[a-z0-9]$/i,
}

function splitToLength(value: string, length: number): string[] {
  return Array.from({ length }, (_, index) => value[index] ?? '')
}

const values = ref<string[]>(splitToLength(model.value ?? '', props.length))
const boxRefs = ref<Array<HTMLInputElement | null>>([])

const generatedId = useId().split(':').join('')
const groupId = `di-otp-input-${generatedId}`
const errorId = `${groupId}-error`

const pattern = computed(() => CHAR_PATTERNS[props.inputType])
const inputMode = computed(() => (props.inputType === 'numeric' ? 'numeric' : 'text'))
const inputPattern = computed(() => (props.inputType === 'numeric' ? '[0-9]*' : undefined))

const groupClasses = computed(() => ['flex', OTP_GROUP_GAP_CLASSES[props.size]])
const boxClasses = computed(() => [
  'input text-center font-medium bg-base-100 border-base-300 focus:border-base-content/30 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  OTP_BOX_SIZE_CLASSES[props.size],
  props.error ? 'input-error focus:ring-error/25' : 'focus:ring-primary/25',
])

function boxAriaLabel(index: number): string {
  return props.boxAriaLabels?.[index] ?? `Digit ${index + 1} of ${props.length}`
}

function setBoxRef(element: Element | ComponentPublicInstance | null, index: number) {
  boxRefs.value[index] = element instanceof HTMLInputElement ? element : null
}

function focusBox(index: number) {
  const clamped = Math.max(0, Math.min(index, props.length - 1))
  const box = boxRefs.value[clamped]
  box?.focus()
  box?.select()
}

/** Applies a full set of box values, syncs the model, and emits `complete` on the fill transition. */
function commit(next: string[], focusIndex?: number) {
  const wasComplete = values.value.every(char => char !== '')
  values.value = next
  model.value = next.join('')

  if (focusIndex !== undefined)
    focusBox(focusIndex)

  const isComplete = next.every(char => char !== '')
  if (isComplete && !wasComplete)
    emit('complete', model.value)
}

function onInput(event: Event, index: number) {
  const input = event.target as HTMLInputElement
  const previous = values.value[index] ?? ''

  if (props.disabled || props.readonly) {
    input.value = previous
    return
  }

  if (input.value === '') {
    commit(values.value.map((char, i) => (i === index ? '' : char)))
    return
  }

  const matched = [...input.value].filter(c => pattern.value.test(c))
  const char = matched[matched.length - 1]

  if (!char) {
    // Every typed character was rejected by the current character set;
    // ignore the keystroke instead of letting it slip into the box.
    input.value = previous
    return
  }

  input.value = char
  commit(
    values.value.map((existing, i) => (i === index ? char : existing)),
    index < props.length - 1 ? index + 1 : undefined,
  )
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (props.disabled || props.readonly)
    return

  if (event.key === 'Backspace') {
    const input = event.target as HTMLInputElement
    if (input.value === '' && index > 0) {
      event.preventDefault()
      commit(
        values.value.map((char, i) => (i === index - 1 ? '' : char)),
        index - 1,
      )
    }
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    focusBox(index - 1)
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    focusBox(index + 1)
  }
}

function onPaste(event: ClipboardEvent, index: number) {
  if (props.disabled || props.readonly)
    return

  event.preventDefault()

  const text = event.clipboardData?.getData('text') ?? ''
  const matched = [...text].filter(char => pattern.value.test(char))
  if (matched.length === 0)
    return

  const next = [...values.value]
  let lastIndex = index
  for (let offset = 0; offset < matched.length && index + offset < props.length; offset++) {
    next[index + offset] = matched[offset]!
    lastIndex = index + offset
  }

  commit(next, lastIndex)
}

// Resync from an external assignment (e.g. the parent clears the field after
// submit); ignore changes that merely echo our own last commit.
watch(model, (next) => {
  if (next === values.value.join(''))
    return
  values.value = splitToLength(next ?? '', props.length)
})

watch(
  () => props.length,
  (length) => {
    values.value = splitToLength(values.value.join(''), length)
    boxRefs.value.length = length
  },
)

onMounted(() => {
  if (props.autoFocus && !props.disabled && !props.readonly)
    focusBox(0)
})
</script>

<template>
  <fieldset
    :id="groupId"
    dir="ltr"
    class="m-0 inline-block border-0 p-0"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-describedby="error ? errorId : undefined"
    :aria-invalid="error ? 'true' : undefined"
  >
    <div :class="groupClasses">
      <input
        v-for="(char, index) in values"
        :key="index"
        :ref="(element) => setBoxRef(element, index)"
        type="text"
        :class="boxClasses"
        :value="char"
        :disabled="disabled"
        :readonly="readonly"
        maxlength="1"
        :inputmode="inputMode"
        :pattern="inputPattern"
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
        spellcheck="false"
        :aria-label="boxAriaLabel(index)"
        @input="onInput($event, index)"
        @keydown="onKeydown($event, index)"
        @paste="onPaste($event, index)"
      >
    </div>

    <p v-if="error" :id="errorId" class="mt-1.5 text-xs text-error" role="alert">
      {{ error }}
    </p>
  </fieldset>
</template>
