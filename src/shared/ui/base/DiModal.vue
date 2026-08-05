<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IconName } from '@/shared/icons/registry'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

/* =======================
   Types
======================= */
type ModalPosition = 'top' | 'middle' | 'bottom' | 'start' | 'end'
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type BackdropBlur = 'xs' | 'sm' | 'md'

type Props = {
  modelValue?: boolean
  position?: ModalPosition
  size?: ModalSize
  responsive?: boolean
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  closeIcon?: IconName
  showCloseButton?: boolean
  customClass?: string
  backdropBlur?: BackdropBlur | ''
  contentClass?: string
  preventScroll?: boolean
  bordered?: boolean
  headerPadding?: string
  contentPadding?: string
  actionsPadding?: string
  titleSize?: string
  closeLabel?: string
}

type Emits = {
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'backdropClick'): void
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: 'middle',
  size: 'md',
  responsive: false,
  closeOnBackdrop: true,
  closeOnEsc: true,
  closeIcon: 'xMark',
  showCloseButton: true,
  customClass: '',
  backdropBlur: '',
  contentClass: '',
  preventScroll: true,
  bordered: false,
  headerPadding: 'px-5 py-4',
  contentPadding: 'px-5 py-4',
  actionsPadding: 'px-5 py-2',
  titleSize: 'text-lg',
})

const emit = defineEmits<Emits>()
const { t } = useI18n()
const resolvedCloseLabel = computed(() => props.closeLabel ?? t('common.actions.close'))

/* =======================
   Static class maps
======================= */
const POSITION_CLASSES: Record<ModalPosition, string> = {
  top: 'modal-top',
  middle: 'modal-middle',
  bottom: 'modal-bottom',
  start: 'modal-start',
  end: 'modal-end',
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full w-full h-full',
}

/* =======================
   Computed
======================= */
const modalClasses = computed(() =>
  ['modal', POSITION_CLASSES[props.position], props.customClass, props.modelValue && 'modal-open']
    .filter(Boolean)
    .join(' '),
)

const boxClasses = computed(() =>
  [
    'modal-box',
    'relative',
    'p-0',
    SIZE_CLASSES[props.size],
    props.responsive && 'w-11/12',
    props.contentClass,
  ]
    .filter(Boolean)
    .join(' '),
)

const backdropClasses = computed(() =>
  ['modal-backdrop', props.backdropBlur && `backdrop-blur-${props.backdropBlur}`]
    .filter(Boolean)
    .join(' '),
)

const headerClasses = computed(() =>
  [props.headerPadding, props.bordered && 'border-b border-base-300'].filter(Boolean).join(' '),
)

const actionsClasses = computed(() =>
  ['modal-action', props.actionsPadding, 'm-0', props.bordered && 'border-t border-base-300']
    .filter(Boolean)
    .join(' '),
)

/* =======================
   Methods
======================= */
function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleBackdropClick() {
  emit('backdropClick')
  if (props.closeOnBackdrop) {
    close()
  }
}

function handleEscKey(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

/* =======================
   Effects
======================= */
watchEffect((onCleanup) => {
  if (!props.closeOnEsc || !props.modelValue)
    return

  document.addEventListener('keydown', handleEscKey)

  onCleanup(() => {
    document.removeEventListener('keydown', handleEscKey)
  })
})

watch(
  () => props.modelValue,
  (isOpen) => {
    if (props.preventScroll) {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }

    if (isOpen) {
      emit('open')
    }
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body">
    <div :class="modalClasses" role="dialog" aria-modal="true">
      <!-- Modal Box -->
      <div :class="boxClasses" @click.stop>
        <!-- Close Button -->
        <DiButton
          v-if="props.showCloseButton"
          size="sm"
          :aria-label="resolvedCloseLabel"
          circle
          variant="ghost"
          class="absolute ltr:right-4 rtl:left-4 top-4 z-10"
          @click="close"
        >
          <DiIcon :name="props.closeIcon" />
        </DiButton>

        <!-- Header -->
        <div v-if="$slots.header" :class="headerClasses">
          <slot name="header" :title-size="props.titleSize" />
        </div>

        <!-- Content -->
        <div :class="props.contentPadding">
          <slot :close="close" />
        </div>

        <!-- Actions -->
        <div v-if="$slots.actions" :class="actionsClasses">
          <slot name="actions" :close="close" />
        </div>
      </div>

      <!-- Backdrop (باید دوم باشه) -->
      <div :class="backdropClasses" @click="handleBackdropClick" />
    </div>
  </Teleport>
</template>
