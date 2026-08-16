<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

type ModalPlacement = 'top' | 'middle' | 'bottom' | 'start' | 'end'
type BackdropBlur = '' | 'xs' | 'sm' | 'md' | 'lg' | 'transparent'

type ModalProps = {
  modelValue: boolean

  ariaLabel?: string
  ariaLabelledby?: string

  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean
  persistent?: boolean

  placement?: ModalPlacement

  widthClass?: string

  modalClass?: string
  boxClass?: string

  /**
   * Tailwind backdrop tint/color classes
   * Example:
   * backdrop:bg-black/40
   */
  backdropClass?: string
  backdropBlur?: BackdropBlur

  teleport?: boolean
}

type ModalEmitEvents = {
  'update:modelValue': [value: boolean]
  'open': []
  'close': []
}

type ModalPlacementClassMap = {
  [key in ModalPlacement]: string
}

const props = withDefaults(defineProps<ModalProps>(), {
  closeOnBackdrop: true,
  closeOnEsc: true,
  showCloseButton: false,
  persistent: false,

  placement: 'middle',

  widthClass: 'max-w-lg',

  boxClass: '',

  backdropClass: 'bg-base-content/10',
  backdropBlur: '',

  teleport: true,
})

const emit = defineEmits<ModalEmitEvents>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const BOTTOM_SHEET_CLASSES = 'rounded-t-2xl rounded-b-none w-full max-w-full pb-safe'

const BACKDROP_BLUR_CLASSES: Record<Exclude<BackdropBlur, 'transparent'>, string> = {
  '': '',
  'xs': 'backdrop:backdrop-blur-xs',
  'sm': 'backdrop:backdrop-blur-sm',
  'md': 'backdrop:backdrop-blur-md',
  'lg': 'backdrop:backdrop-blur-lg',
}

const placementClass = computed<string>(() => {
  const map: ModalPlacementClassMap = {
    top: 'modal-top items-start justify-items-center',
    middle: 'modal-middle items-center justify-items-center',
    bottom: 'modal-bottom items-end justify-items-center',
    start: 'modal-start items-center justify-items-start',
    end: 'modal-end items-center justify-items-end',
  }

  return map[props.placement as keyof typeof map]
})

const resolvedModalClass = computed(
  () => props.modalClass ?? (props.placement === 'bottom' ? BOTTOM_SHEET_CLASSES : ''),
)

const resolvedBackdropClasses = computed<string[]>(() => {
  if (props.backdropBlur === 'transparent')
    return ['bg-transparent', 'backdrop:bg-transparent']

  return [props.backdropClass, BACKDROP_BLUR_CLASSES[props.backdropBlur]].filter(Boolean)
})

async function open(): Promise<void> {
  if (!dialogRef.value?.open) {
    await nextTick()

    dialogRef.value?.showModal()

    emit('open')
  }
}

function close(): void {
  if (dialogRef.value?.open) {
    dialogRef.value.close()

    emit('update:modelValue', false)
    emit('close')
  }
}

function onCancel(event: Event): void {
  if (!props.closeOnEsc || props.persistent) {
    event.preventDefault()

    return
  }

  close()
}

function onBackdropClick(event: MouseEvent): void {
  if (!props.closeOnBackdrop || props.persistent) {
    return
  }

  if (event.target === dialogRef.value) {
    close()
  }
}

watch(
  () => props.modelValue,
  async (value: boolean): Promise<void> => {
    if (value) {
      await open()
    }
    else {
      close()
    }
  },
  {
    immediate: true,
  },
)

onMounted(async (): Promise<void> => {
  if (props.modelValue) {
    await open()
  }
})

defineExpose({
  open,
  close,
})
</script>

<template>
  <Teleport v-if="teleport" to="body">
    <dialog
      ref="dialogRef"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :class="[placementClass, resolvedModalClass, resolvedBackdropClasses]"
      class="modal"
      @cancel="onCancel"
      @click="onBackdropClick"
    >
      <div :class="[widthClass, boxClass]" class="modal-box relative">
        <button
          v-if="showCloseButton"
          class="btn btn-sm btn-circle btn-ghost absolute top-2 end-2"
          @click="close"
        >
          ✕
        </button>

        <slot />

        <div class="modal-action">
          <slot name="actions" :close="close" />
        </div>
      </div>

      <slot name="overlay" />
    </dialog>
  </Teleport>

  <dialog
    v-else
    ref="dialogRef"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="[placementClass, resolvedModalClass, resolvedBackdropClasses]"
    class="modal"
    @cancel="onCancel"
    @click="onBackdropClick"
  >
    <div :class="[widthClass, boxClass]" class="modal-box relative">
      <button
        v-if="showCloseButton"
        class="btn btn-sm btn-circle btn-ghost absolute top-2 end-2"
        @click="close"
      >
        ✕
      </button>

      <slot />

      <div class="modal-action">
        <slot name="actions" :close="close" />
      </div>
    </div>

    <slot name="overlay" />
  </dialog>
</template>
