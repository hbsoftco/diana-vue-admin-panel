<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useDirection } from '@/shared/composables/use-direction'

type Props = {
  slideCount: number
  loop?: boolean
  disabled?: boolean
  showControls?: boolean
  showIndicators?: boolean
  label?: string
  previousLabel?: string
  nextLabel?: string
  slideLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  loop: false,
  disabled: false,
  showControls: true,
  showIndicators: true,
})

const emit = defineEmits<{
  change: [index: number]
}>()

defineSlots<{
  default?: (props: { index: number, active: boolean }) => unknown
  empty?: () => unknown
}>()

const model = defineModel<number>({ default: 0 })
const { isRtl } = useDirection()
const { t } = useI18n()

const resolvedLabel = computed(() => props.label ?? t('components.carousel.label'))
const resolvedPreviousLabel = computed(
  () => props.previousLabel ?? t('components.carousel.previousSlide'),
)
const resolvedNextLabel = computed(() => props.nextLabel ?? t('components.carousel.nextSlide'))
const roleDescription = computed(() => t('components.carousel.roleDescription'))
const slideRoleDescription = computed(() => t('components.carousel.slideRoleDescription'))

const totalSlides = computed(() => Math.max(0, Math.floor(props.slideCount)))
const activeIndex = computed(() => {
  if (totalSlides.value === 0)
    return 0

  return Math.min(Math.max(0, Math.floor(model.value)), totalSlides.value - 1)
})

const canGoPrevious = computed(
  () => !props.disabled && totalSlides.value > 1 && (props.loop || activeIndex.value > 0),
)
const canGoNext = computed(
  () =>
    !props.disabled
    && totalSlides.value > 1
    && (props.loop || activeIndex.value < totalSlides.value - 1),
)

function getSlideAriaLabel(index: number) {
  if (props.slideLabel)
    return `${props.slideLabel} ${index + 1} / ${totalSlides.value}`

  return t('components.carousel.slidePosition', {
    current: index + 1,
    total: totalSlides.value,
  })
}

function goTo(index: number) {
  if (props.disabled || totalSlides.value === 0)
    return

  const nextIndex = props.loop
    ? (index + totalSlides.value) % totalSlides.value
    : Math.min(Math.max(0, index), totalSlides.value - 1)

  if (nextIndex === activeIndex.value)
    return

  model.value = nextIndex
  emit('change', nextIndex)
}

function goPrevious() {
  goTo(activeIndex.value - 1)
}

function goNext() {
  goTo(activeIndex.value + 1)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Home') {
    event.preventDefault()
    goTo(0)
  }
  else if (event.key === 'End') {
    event.preventDefault()
    goTo(totalSlides.value - 1)
  }
  else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    isRtl.value ? goNext() : goPrevious()
  }
  else if (event.key === 'ArrowRight') {
    event.preventDefault()
    isRtl.value ? goPrevious() : goNext()
  }
}
</script>

<template>
  <section
    class="w-full"
    role="region"
    :aria-roledescription="roleDescription"
    :aria-label="resolvedLabel"
    :aria-disabled="disabled || undefined"
    tabindex="0"
    @keydown="handleKeydown"
  >
    <div v-if="totalSlides > 0" class="carousel w-full rounded-box">
      <div
        v-for="index in totalSlides"
        v-show="index - 1 === activeIndex"
        :key="index"
        class="carousel-item w-full"
        role="group"
        :aria-roledescription="slideRoleDescription"
        :aria-label="getSlideAriaLabel(index - 1)"
        :aria-hidden="index - 1 !== activeIndex"
      >
        <slot :index="index - 1" :active="index - 1 === activeIndex" />
      </div>
    </div>

    <slot v-else name="empty" />

    <p v-if="totalSlides > 0" class="sr-only" aria-live="polite" aria-atomic="true">
      {{ getSlideAriaLabel(activeIndex) }}
    </p>

    <div
      v-if="totalSlides > 1 && (showControls || showIndicators)"
      class="mt-4 flex items-center justify-between gap-3"
    >
      <button
        v-if="showControls"
        type="button"
        class="btn btn-circle btn-sm"
        :aria-label="resolvedPreviousLabel"
        :disabled="!canGoPrevious"
        @click="goPrevious"
      >
        <span aria-hidden="true">{{ isRtl ? '›' : '‹' }}</span>
      </button>

      <div v-if="showIndicators" class="flex flex-1 flex-wrap justify-center gap-2">
        <button
          v-for="index in totalSlides"
          :key="index"
          type="button"
          class="btn btn-circle btn-xs"
          :class="index - 1 === activeIndex ? 'btn-primary' : 'btn-ghost'"
          :aria-label="getSlideAriaLabel(index - 1)"
          :aria-current="index - 1 === activeIndex ? 'true' : undefined"
          :disabled="disabled"
          @click="goTo(index - 1)"
        >
          <span class="text-[0.625rem]" aria-hidden="true">{{ index }}</span>
        </button>
      </div>

      <button
        v-if="showControls"
        type="button"
        class="btn btn-circle btn-sm"
        :aria-label="resolvedNextLabel"
        :disabled="!canGoNext"
        @click="goNext"
      >
        <span aria-hidden="true">{{ isRtl ? '‹' : '›' }}</span>
      </button>
    </div>
  </section>
</template>
