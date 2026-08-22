<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, onBeforeUnmount, ref, useAttrs, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Size, Variant } from '@/shared/types/models'

import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiProgress from '@/shared/ui/base/DiProgress.vue'

/* =======================
   Types
======================= */
export type DiFileUploadSize = Extract<Size, 'sm' | 'md' | 'lg'>
export type DiFileUploadStatus = 'idle' | 'uploading' | 'success' | 'error'
export type DiFileUploadRejectReason = 'type' | 'size' | 'count'

export type DiFileUploadItem = {
  id: string
  file: File
  previewUrl?: string
  status: DiFileUploadStatus
  progress: number
  errorMessage?: string
}

export type DiFileUploadHandler = (
  file: File,
  onProgress: (percent: number) => void,
) => Promise<void>

type Props = {
  id?: string
  label?: string
  helperText?: string
  error?: string
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSizeBytes?: number
  disabled?: boolean
  required?: boolean
  size?: DiFileUploadSize
  variant?: Variant
  autoUpload?: boolean
  uploadHandler?: DiFileUploadHandler
}

/* =======================
   Defaults
======================= */
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  disabled: false,
  required: false,
  size: 'md',
  variant: 'primary',
  autoUpload: true,
})

/* =======================
   Emits
======================= */
const emit = defineEmits<{
  fileAdded: [item: DiFileUploadItem]
  fileRemoved: [item: DiFileUploadItem]
  uploadComplete: [item: DiFileUploadItem]
  uploadError: [item: DiFileUploadItem, error: unknown]
  reject: [reason: DiFileUploadRejectReason, file: File]
}>()

defineSlots<{
  icon?: () => unknown
  helper?: () => unknown
}>()

/* =======================
   Model
======================= */
const model = defineModel<DiFileUploadItem[]>({ default: () => [] })

/* =======================
   Composables
======================= */
const { t } = useI18n()
const attrs = useAttrs()
const generatedId = useId().split(':').join('')
const inputRef = ref<HTMLInputElement | null>(null)

/* =======================
   Constants and static class maps
======================= */
const SIZE_CLASSES: Record<DiFileUploadSize, { dropzone: string, icon: string }> = {
  sm: { dropzone: 'gap-2 p-4 min-h-[120px]', icon: 'lg' },
  md: { dropzone: 'gap-3 p-6 min-h-[160px]', icon: 'xl' },
  lg: { dropzone: 'gap-3 p-8 min-h-[200px]', icon: 'xl' },
}

const ACCENT_TEXT_CLASSES: Record<Variant, string> = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

const ACTIVE_BORDER_CLASSES: Record<Variant, string> = {
  neutral: 'border-neutral bg-neutral/5',
  primary: 'border-primary bg-primary/5',
  secondary: 'border-secondary bg-secondary/5',
  accent: 'border-accent bg-accent/5',
  info: 'border-info bg-info/5',
  success: 'border-success bg-success/5',
  warning: 'border-warning bg-warning/5',
  error: 'border-error bg-error/5',
}

/* =======================
   State
======================= */
const dragCounter = ref(0)
const isDragActive = ref(false)
const liveMessage = ref('')

/* =======================
   Computed
======================= */
const controlId = computed(() => props.id || `di-file-upload-${generatedId}`)
const messageId = computed(() => `${controlId.value}-message`)
const hintId = computed(() => `${controlId.value}-hint`)
const listId = computed(() => `${controlId.value}-list`)

const validationState = computed<'error' | null>(() => (props.error ? 'error' : null))
const message = computed(() => props.error || props.helperText)
const helperParts = computed(() => {
  const parts: string[] = []
  if (props.accept)
    parts.push(t('components.fileUpload.acceptedTypes', { types: props.accept }))
  if (props.maxSizeBytes)
    parts.push(t('components.fileUpload.maxSize', { size: formatBytes(props.maxSizeBytes) }))
  return parts
})
const describedBy = computed(() => {
  const ids = [
    attrs['aria-describedby'],
    helperParts.value.length ? hintId.value : undefined,
    message.value ? messageId.value : undefined,
  ]
  return ids.filter(Boolean).join(' ') || undefined
})

const rootClasses = computed(() => ['w-full', attrs.class])
const rootStyle = computed(() => attrs.style as StyleValue)

const dropzoneLabel = computed(() => props.label || t('components.fileUpload.clickToUpload'))

const dropzoneClasses = computed(() => [
  'di-file-upload flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 text-center transition-colors',
  SIZE_CLASSES[props.size].dropzone,
  props.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-base-content/30',
  isDragActive.value && !props.disabled && ACTIVE_BORDER_CLASSES[props.variant],
  validationState.value === 'error' && !isDragActive.value && 'border-error',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
])

const iconClasses = computed(() => ACCENT_TEXT_CLASSES[props.variant])

const messageClasses = computed(() => [
  'mt-1.5 block text-xs',
  validationState.value === 'error' ? 'text-error' : 'text-base-content/60',
])

/* =======================
   Methods
======================= */
function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0)
    return '0 B'
  if (bytes < 1024)
    return `${bytes} B`

  const units = ['KB', 'MB', 'GB', 'TB']
  let value = bytes / 1024
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`
}

function matchesAccept(file: File, accept: string): boolean {
  const tokens = accept
    .split(',')
    .map(token => token.trim())
    .filter(Boolean)

  if (tokens.length === 0)
    return true

  return tokens.some((token) => {
    if (token.startsWith('.'))
      return file.name.toLowerCase().endsWith(token.toLowerCase())

    if (token.endsWith('/*'))
      return file.type.startsWith(token.slice(0, -1))

    return file.type === token
  })
}

function validateFile(file: File): DiFileUploadRejectReason | null {
  if (props.accept && !matchesAccept(file, props.accept))
    return 'type'
  if (props.maxSizeBytes && file.size > props.maxSizeBytes)
    return 'size'
  return null
}

function createItem(file: File): DiFileUploadItem {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`,
    file,
    previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    status: 'idle',
    progress: 0,
  }
}

function updateItem(id: string, patch: Partial<DiFileUploadItem>) {
  model.value = model.value.map(item => (item.id === id ? { ...item, ...patch } : item))
}

function clearAll(shouldEmit: boolean) {
  for (const item of model.value) {
    if (item.previewUrl)
      URL.revokeObjectURL(item.previewUrl)
    if (shouldEmit)
      emit('fileRemoved', item)
  }
  model.value = []
}

async function runUpload(item: DiFileUploadItem) {
  if (!props.uploadHandler || props.autoUpload === false)
    return

  updateItem(item.id, { status: 'uploading', progress: 0 })

  try {
    await props.uploadHandler(item.file, (percent) => {
      updateItem(item.id, { progress: Math.min(Math.max(percent, 0), 100) })
    })
    updateItem(item.id, { status: 'success', progress: 100 })
    const finished = model.value.find(current => current.id === item.id)
    if (finished) {
      liveMessage.value = t('components.fileUpload.uploadComplete', { name: finished.file.name })
      emit('uploadComplete', finished)
    }
  }
  catch (uploadError) {
    updateItem(item.id, {
      status: 'error',
      errorMessage: uploadError instanceof Error ? uploadError.message : String(uploadError),
    })
    const failed = model.value.find(current => current.id === item.id)
    if (failed) {
      liveMessage.value = t('components.fileUpload.uploadFailed', { name: failed.file.name })
      emit('uploadError', failed, uploadError)
    }
  }
}

function addFiles(fileList: FileList | File[] | null) {
  if (!fileList || props.disabled)
    return

  let incoming = Array.from(fileList)
  if (!props.multiple)
    incoming = incoming.slice(0, 1)

  const accepted: DiFileUploadItem[] = []

  for (const file of incoming) {
    const rejectReason = validateFile(file)
    if (rejectReason) {
      emit('reject', rejectReason, file)
      continue
    }

    if (
      props.multiple
      && props.maxFiles !== undefined
      && model.value.length + accepted.length >= props.maxFiles
    ) {
      emit('reject', 'count', file)
      continue
    }

    accepted.push(createItem(file))
  }

  if (accepted.length === 0)
    return

  if (!props.multiple && model.value.length > 0)
    clearAll(true)

  model.value = [...model.value, ...accepted]

  for (const item of accepted) {
    liveMessage.value = t('components.fileUpload.fileAdded', { name: item.file.name })
    emit('fileAdded', item)
    runUpload(item)
  }
}

function openPicker() {
  if (props.disabled)
    return
  inputRef.value?.click()
}

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement
  addFiles(target.files)
  target.value = ''
}

function onDragEnter(event: DragEvent) {
  if (props.disabled || !event.dataTransfer?.types.includes('Files'))
    return
  dragCounter.value += 1
  isDragActive.value = true
}

function onDragLeave() {
  if (props.disabled)
    return
  dragCounter.value = Math.max(0, dragCounter.value - 1)
  if (dragCounter.value === 0)
    isDragActive.value = false
}

function onDrop(event: DragEvent) {
  dragCounter.value = 0
  isDragActive.value = false
  if (props.disabled)
    return
  addFiles(event.dataTransfer?.files ?? null)
}

function removeItem(item: DiFileUploadItem) {
  if (item.previewUrl)
    URL.revokeObjectURL(item.previewUrl)
  model.value = model.value.filter(current => current.id !== item.id)
  liveMessage.value = t('components.fileUpload.fileRemoved', { name: item.file.name })
  emit('fileRemoved', item)
}

/* =======================
   Lifecycle
======================= */
onBeforeUnmount(() => {
  for (const item of model.value) {
    if (item.previewUrl)
      URL.revokeObjectURL(item.previewUrl)
  }
})
</script>

<template>
  <div :class="rootClasses" :style="rootStyle">
    <label v-if="label" :for="controlId" class="mb-1.5 block text-sm font-medium text-base-content">
      {{ label }}
      <span v-if="required" class="text-error" aria-hidden="true">*</span>
    </label>

    <div
      :id="controlId"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :class="dropzoneClasses"
      :aria-disabled="disabled || undefined"
      :aria-describedby="describedBy"
      :aria-invalid="validationState === 'error' || undefined"
      :aria-label="dropzoneLabel"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        class="sr-only"
        tabindex="-1"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @click.stop
        @change="onInputChange"
      >

      <slot name="icon">
        <DiIcon name="uploadCloud" size="xl" :custom-class="iconClasses" aria-hidden="true" />
      </slot>

      <p class="text-sm text-base-content">
        <span class="font-semibold" :class="[ACCENT_TEXT_CLASSES[variant]]">
          {{ t('components.fileUpload.clickToUpload') }}
        </span>
        {{ ' ' }}{{ t('components.fileUpload.dragAndDrop') }}
      </p>

      <p v-if="helperParts.length" :id="hintId" class="text-xs text-base-content/50">
        {{ helperParts.join(' · ') }}
      </p>

      <slot name="helper" />
    </div>

    <span
      v-if="message"
      :id="messageId"
      :class="messageClasses"
      :role="validationState === 'error' ? 'alert' : undefined"
    >
      {{ message }}
    </span>

    <ul v-if="model.length" :id="listId" role="list" class="mt-4 flex flex-col gap-2">
      <li
        v-for="item in model"
        :key="item.id"
        class="flex items-center gap-3 rounded-lg border border-base-300 bg-base-100 p-2.5"
      >
        <span
          class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-base-200"
        >
          <img
            v-if="item.previewUrl"
            :src="item.previewUrl"
            :alt="item.file.name"
            class="size-full object-cover"
          >
          <DiIcon
            v-else
            name="fileDocument"
            size="lg"
            custom-class="text-base-content/50"
            aria-hidden="true"
          />
        </span>

        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-medium text-base-content">{{
            item.file.name
          }}</span>
          <span class="block text-xs text-base-content/50">{{ formatBytes(item.file.size) }}</span>

          <DiProgress
            v-if="item.status === 'uploading'"
            :value="item.progress"
            size="xs"
            :variant="variant"
            class="mt-1.5"
          />
          <span
            v-else-if="item.status === 'error'"
            class="mt-1 block text-xs text-error"
            role="alert"
          >
            {{ item.errorMessage }}
          </span>
        </span>

        <DiIcon
          v-if="item.status === 'success'"
          name="checkCircle"
          size="md"
          custom-class="shrink-0 text-success"
          aria-hidden="true"
        />

        <button
          type="button"
          class="btn btn-ghost btn-xs btn-circle shrink-0"
          :aria-label="t('components.fileUpload.remove', { name: item.file.name })"
          @click="removeItem(item)"
        >
          <DiIcon name="close" size="sm" aria-hidden="true" />
        </button>
      </li>
    </ul>

    <span class="sr-only" role="status" aria-live="polite">{{ liveMessage }}</span>
  </div>
</template>
