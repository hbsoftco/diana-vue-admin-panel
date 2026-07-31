<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, onBeforeUnmount, ref, useAttrs, useId } from 'vue'

import type { IconName } from '@/shared/icons/registry'

import type {
  DiRangeSliderHandle,
  DiRangeSliderOrientation,
  DiRangeSliderSize,
  DiRangeSliderTick,
  DiRangeSliderValue,
  DiRangeSliderVariant,
} from './types'

import DiIcon from '../DiIcon.vue'
import {
  clampSliderValue,
  sliderPercentToValue,
  sliderValueToPercent,
  snapSliderValue,
} from './math.ts'
import { SLIDER_SIZE_CLASSES } from './sizes'
import { SLIDER_VARIANT_CLASSES } from './variants'

type Props = {
  id?: string
  min?: number
  max?: number
  step?: number
  minDistance?: number
  maxDistance?: number
  softMin?: number
  softMax?: number
  disabled?: boolean
  size?: DiRangeSliderSize
  variant?: DiRangeSliderVariant
  orientation?: DiRangeSliderOrientation
  label?: string
  helperText?: string
  error?: string
  success?: string
  showTooltips?: boolean
  mergeTooltips?: boolean
  tooltipMergeDistance?: number
  tooltipSeparator?: string
  thumbIcon?: IconName
  formatValue?: (value: number) => string
  ticks?: DiRangeSliderTick[]
  ticksClickable?: boolean
}

type DragState
  = | { type: 'handle', handle: DiRangeSliderHandle }
    | { type: 'range', startPercent: number, startValue: DiRangeSliderValue }
    | null

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  minDistance: 0,
  disabled: false,
  size: 'md',
  variant: 'primary',
  orientation: 'horizontal',
  showTooltips: false,
  mergeTooltips: false,
  tooltipMergeDistance: 15,
  tooltipSeparator: ' – ',
  ticksClickable: false,
})

const emit = defineEmits<{
  change: [value: DiRangeSliderValue]
}>()

const model = defineModel<DiRangeSliderValue>({ default: () => [25, 75] })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')
const trackElement = ref<HTMLElement>()
const dragState = ref<DragState>(null)

const controlId = computed(() => props.id || `di-range-slider-${generatedId}`)
const labelId = computed(() => `${controlId.value}-label`)
const messageId = computed(() => `${controlId.value}-message`)
const sizeClasses = computed(() => SLIDER_SIZE_CLASSES[props.size])
const bounds = computed(() => ({ min: props.min, max: props.max, step: props.step }))
const distanceBounds = computed(() => {
  const available = Math.max(0, props.max - props.min)
  const minimum = clampSliderValue(props.minDistance, 0, available)
  const maximum = clampSliderValue(props.maxDistance ?? available, minimum, available)
  return { minimum, maximum }
})
const values = computed<DiRangeSliderValue>(() => {
  const lower = clampSliderValue(Math.min(model.value[0], model.value[1]), props.min, props.max)
  const upper = clampSliderValue(Math.max(model.value[0], model.value[1]), props.min, props.max)
  return [lower, upper]
})
const positions = computed<DiRangeSliderValue>(() => [
  sliderValueToPercent(values.value[0], props.min, props.max),
  sliderValueToPercent(values.value[1], props.min, props.max),
])
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
const formattedValues = computed<[string, string]>(() => [
  props.formatValue?.(values.value[0]) ?? String(values.value[0]),
  props.formatValue?.(values.value[1]) ?? String(values.value[1]),
])
const tooltipsAreMerged = computed(
  () =>
    props.mergeTooltips && positions.value[1] - positions.value[0] <= props.tooltipMergeDistance,
)
const mergedTooltipPosition = computed(() => (positions.value[0] + positions.value[1]) / 2)
const tickValues = computed(() =>
  [...(props.ticks ?? [])]
    .filter(tick => tick.value >= props.min && tick.value <= props.max)
    .sort((a, b) => a.value - b.value),
)
const rootClasses = computed(() => [
  props.orientation === 'vertical' ? 'w-fit' : 'w-full',
  props.disabled && 'opacity-40',
  attrs.class,
])
const rootStyle = computed(() => attrs.style as StyleValue)
const fieldAttrs = computed(() => {
  const { class: _class, style: _style, 'aria-describedby': _describedBy, ...rest } = attrs
  return rest
})
const trackClasses = computed(() => [
  'relative rounded-full bg-base-300 select-none touch-none',
  props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  props.orientation === 'vertical' ? 'h-48 w-2' : `w-full ${sizeClasses.value.track}`,
])
const connectedClasses = computed(() => [
  'absolute rounded-full',
  SLIDER_VARIANT_CLASSES[props.variant],
  props.disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
])
const handleClasses = computed(() => [
  'absolute z-10 inline-flex cursor-grab items-center justify-center rounded-sm border border-content bg-base-200 p-0 text-base-content shadow-sm transition-shadow active:cursor-grabbing focus-visible:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content disabled:cursor-not-allowed',
  sizeClasses.value.thumb,
])
const thumbIconSize = computed(() => ({ sm: 'xs', md: 'sm', lg: 'md' })[props.size])
const messageClasses = computed(() => [
  'block',
  sizeClasses.value.message,
  validationState.value === 'error'
    ? 'text-error'
    : validationState.value === 'success'
      ? 'text-success'
      : 'text-base-content/60',
])
const connectionStyle = computed(() =>
  props.orientation === 'vertical'
    ? {
        bottom: `${positions.value[0]}%`,
        height: `${positions.value[1] - positions.value[0]}%`,
        width: '100%',
      }
    : {
        insetInlineStart: `${positions.value[0]}%`,
        width: `${positions.value[1] - positions.value[0]}%`,
        height: '100%',
      },
)

function handleStyle(handle: DiRangeSliderHandle) {
  return props.orientation === 'vertical'
    ? { bottom: `${positions.value[handle]}%`, insetInlineStart: '50%' }
    : { insetInlineStart: `${positions.value[handle]}%`, top: '50%' }
}

function tooltipStyle(handle: DiRangeSliderHandle) {
  return props.orientation === 'vertical'
    ? { bottom: `${positions.value[handle]}%`, insetInlineStart: '100%' }
    : { insetInlineStart: `${positions.value[handle]}%`, bottom: '100%' }
}

const mergedTooltipStyle = computed(() =>
  props.orientation === 'vertical'
    ? { bottom: `${mergedTooltipPosition.value}%`, insetInlineStart: '100%' }
    : { insetInlineStart: `${mergedTooltipPosition.value}%`, bottom: '100%' },
)

function isRtl() {
  if (!trackElement.value)
    return false
  return getComputedStyle(trackElement.value).direction === 'rtl'
}

function pointerPercent(event: PointerEvent) {
  const rect = trackElement.value?.getBoundingClientRect()
  if (!rect)
    return 0

  if (props.orientation === 'vertical')
    return clampSliderValue(((rect.bottom - event.clientY) / rect.height) * 100, 0, 100)

  const raw = ((event.clientX - rect.left) / rect.width) * 100
  return clampSliderValue(isRtl() ? 100 - raw : raw, 0, 100)
}

function constrainHandle(handle: DiRangeSliderHandle, value: number) {
  const [lower, upper] = values.value
  const { minimum, maximum } = distanceBounds.value

  if (handle === 0)
    return clampSliderValue(value, Math.max(props.min, upper - maximum), upper - minimum)

  return clampSliderValue(value, lower + minimum, Math.min(props.max, lower + maximum))
}

function handleMinimum(handle: DiRangeSliderHandle) {
  const [lower, upper] = values.value
  return handle === 0
    ? Math.max(props.min, upper - distanceBounds.value.maximum)
    : lower + distanceBounds.value.minimum
}

function handleMaximum(handle: DiRangeSliderHandle) {
  const [lower, upper] = values.value
  return handle === 0
    ? upper - distanceBounds.value.minimum
    : Math.min(props.max, lower + distanceBounds.value.maximum)
}

function updateHandle(handle: DiRangeSliderHandle, value: number) {
  if (props.disabled)
    return

  const next = [...values.value] as DiRangeSliderValue
  next[handle] = constrainHandle(handle, snapSliderValue(value, bounds.value))
  model.value = next
}

function updateRange(percent: number, startPercent: number, startValue: DiRangeSliderValue) {
  const delta = ((percent - startPercent) / 100) * (props.max - props.min)
  const distance = startValue[1] - startValue[0]
  const lower = clampSliderValue(startValue[0] + delta, props.min, props.max - distance)
  model.value = [
    sliderPercentToValue(sliderValueToPercent(lower, props.min, props.max), bounds.value),
    sliderPercentToValue(
      sliderValueToPercent(lower + distance, props.min, props.max),
      bounds.value,
    ),
  ]
}

function startHandleDrag(handle: DiRangeSliderHandle, event: PointerEvent) {
  if (props.disabled)
    return
  event.preventDefault()
  event.stopPropagation()
  dragState.value = { type: 'handle', handle }
  addDragListeners()
}

function startRangeDrag(event: PointerEvent) {
  if (props.disabled)
    return
  event.preventDefault()
  event.stopPropagation()
  dragState.value = {
    type: 'range',
    startPercent: pointerPercent(event),
    startValue: [...values.value],
  }
  addDragListeners()
}

function onTrackPointerDown(event: PointerEvent) {
  if (props.disabled)
    return
  const value = sliderPercentToValue(pointerPercent(event), bounds.value)
  const handle: DiRangeSliderHandle
    = Math.abs(value - values.value[0]) <= Math.abs(value - values.value[1]) ? 0 : 1
  updateHandle(handle, value)
  finishInteraction()
}

function onPointerMove(event: PointerEvent) {
  if (!dragState.value)
    return
  const percent = pointerPercent(event)
  if (dragState.value.type === 'handle') {
    updateHandle(dragState.value.handle, sliderPercentToValue(percent, bounds.value))
    return
  }
  updateRange(percent, dragState.value.startPercent, dragState.value.startValue)
}

function addDragListeners() {
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', stopDragging, { once: true })
}

function stopDragging() {
  dragState.value = null
  window.removeEventListener('pointermove', onPointerMove)
  finishInteraction()
}

function applySoftLimits() {
  const softMinimum = clampSliderValue(props.softMin ?? props.min, props.min, props.max)
  const softMaximum = clampSliderValue(props.softMax ?? props.max, softMinimum, props.max)
  const next: DiRangeSliderValue = [
    clampSliderValue(values.value[0], softMinimum, softMaximum),
    clampSliderValue(values.value[1], softMinimum, softMaximum),
  ]
  if (next[1] - next[0] < distanceBounds.value.minimum) {
    next[0] = clampSliderValue(next[1] - distanceBounds.value.minimum, softMinimum, softMaximum)
    next[1] = clampSliderValue(next[0] + distanceBounds.value.minimum, softMinimum, softMaximum)
  }
  model.value = next
}

function finishInteraction() {
  applySoftLimits()
  emit('change', [...model.value])
}

function onHandleKeydown(handle: DiRangeSliderHandle, event: KeyboardEvent) {
  if (props.disabled)
    return

  const pageStep = props.step * 10
  const rtlMultiplier = props.orientation === 'horizontal' && isRtl() ? -1 : 1
  let next: number | undefined
  if (event.key === 'ArrowRight')
    next = values.value[handle] + props.step * rtlMultiplier
  else if (event.key === 'ArrowLeft')
    next = values.value[handle] - props.step * rtlMultiplier
  else if (event.key === 'ArrowUp')
    next = values.value[handle] + props.step
  else if (event.key === 'ArrowDown')
    next = values.value[handle] - props.step
  else if (event.key === 'PageUp')
    next = values.value[handle] + pageStep
  else if (event.key === 'PageDown')
    next = values.value[handle] - pageStep
  else if (event.key === 'Home')
    next = props.min
  else if (event.key === 'End')
    next = props.max
  else return

  event.preventDefault()
  updateHandle(
    handle,
    sliderPercentToValue(sliderValueToPercent(next, props.min, props.max), bounds.value),
  )
}

function selectTick(tick: DiRangeSliderTick) {
  if (!props.ticksClickable || props.disabled)
    return
  const handle: DiRangeSliderHandle
    = Math.abs(tick.value - values.value[0]) <= Math.abs(tick.value - values.value[1]) ? 0 : 1
  updateHandle(handle, tick.value)
  finishInteraction()
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', stopDragging)
})
</script>

<template>
  <div v-bind="fieldAttrs" :class="rootClasses" :style="rootStyle">
    <div v-if="label" class="font-medium text-base-content" :class="[sizeClasses.label]">
      <span :id="labelId">{{ label }}</span>
    </div>

    <div
      :class="orientation === 'vertical' ? 'flex items-center gap-3 py-2' : 'pt-6'"
      role="group"
      :aria-labelledby="label ? labelId : undefined"
      :aria-describedby="describedBy"
    >
      <div ref="trackElement" :class="trackClasses" @pointerdown="onTrackPointerDown">
        <div :class="connectedClasses" :style="connectionStyle" @pointerdown="startRangeDrag" />

        <div
          v-if="showTooltips && tooltipsAreMerged"
          class="pointer-events-none absolute z-30 whitespace-nowrap"
          :class="
            orientation === 'vertical'
              ? 'ms-2 translate-y-1/2'
              : 'mb-2 -translate-x-1/2 rtl:translate-x-1/2'
          "
          :style="mergedTooltipStyle"
          aria-hidden="true"
        >
          <span class="badge badge-neutral badge-sm tabular-nums">
            {{ formattedValues.join(tooltipSeparator) }}
          </span>
        </div>

        <div v-for="handle in [0, 1] as const" :key="handle" class="contents">
          <div
            v-if="showTooltips && !tooltipsAreMerged"
            class="pointer-events-none absolute z-30 whitespace-nowrap"
            :class="
              orientation === 'vertical'
                ? 'ms-2 translate-y-1/2'
                : 'mb-2 -translate-x-1/2 rtl:translate-x-1/2'
            "
            :style="tooltipStyle(handle)"
            aria-hidden="true"
          >
            <span class="badge badge-neutral badge-sm tabular-nums">{{
              formattedValues[handle]
            }}</span>
          </div>

          <button
            :id="`${controlId}-${handle === 0 ? 'minimum' : 'maximum'}`"
            type="button"
            role="slider"
            :class="[
              handleClasses,
              orientation === 'vertical'
                ? '-translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2'
                : '-translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2',
            ]"
            :style="handleStyle(handle)"
            :disabled="disabled"
            :aria-label="`${label || 'Range'} ${handle === 0 ? 'minimum' : 'maximum'}`"
            :aria-valuemin="handleMinimum(handle)"
            :aria-valuemax="handleMaximum(handle)"
            :aria-valuenow="values[handle]"
            :aria-valuetext="formattedValues[handle]"
            :aria-orientation="orientation"
            :aria-invalid="error ? 'true' : undefined"
            :aria-describedby="describedBy"
            @pointerdown="startHandleDrag(handle, $event)"
            @keydown="onHandleKeydown(handle, $event)"
            @keyup="finishInteraction"
            @blur="applySoftLimits"
          >
            <span v-if="thumbIcon" class="pointer-events-none inline-flex" aria-hidden="true">
              <DiIcon :name="thumbIcon" :size="thumbIconSize" />
            </span>
          </button>
        </div>
      </div>

      <div
        v-if="tickValues.length"
        :class="[
          orientation === 'vertical' ? 'relative h-48 w-12' : 'relative mt-2 h-8 w-full',
          sizeClasses.ticks,
        ]"
        :aria-hidden="ticksClickable ? undefined : 'true'"
      >
        <button
          v-for="tick in tickValues"
          :key="tick.value"
          type="button"
          class="absolute flex items-center text-base-content/55"
          :class="[
            orientation === 'vertical'
              ? 'start-0 -translate-y-1/2 gap-1'
              : 'top-0 -translate-x-1/2 flex-col gap-0.5 rtl:translate-x-1/2',
            ticksClickable && !disabled
              ? 'cursor-pointer hover:text-primary'
              : 'pointer-events-none',
          ]"
          :style="
            orientation === 'vertical'
              ? { bottom: `${sliderValueToPercent(tick.value, min, max)}%` }
              : { insetInlineStart: `${sliderValueToPercent(tick.value, min, max)}%` }
          "
          :disabled="disabled"
          :tabindex="ticksClickable ? 0 : -1"
          :aria-label="
            ticksClickable ? `Move nearest handle to ${tick.label ?? tick.value}` : undefined
          "
          @click="selectTick(tick)"
        >
          <span
            :class="orientation === 'vertical' ? 'h-px w-1.5' : 'h-1.5 w-px'"
            class="bg-base-content/30"
          />
          <span>{{ tick.label ?? tick.value }}</span>
        </button>
      </div>
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
