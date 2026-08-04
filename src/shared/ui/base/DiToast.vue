<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { AlertVariant } from '@/shared/types/models'

import { acquireToastHost, releaseToastHost } from '@/shared/ui/base/di-toast-host'
import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

type HorizontalPlacement = 'start' | 'center' | 'end' | 'left' | 'right'
type VerticalPlacement = 'top' | 'middle' | 'bottom'
type LiveRole = 'status' | 'alert'
type CloseReason = 'manual' | 'timeout' | 'click'
type ToastAppearance = 'solid' | 'soft' | 'outline' | 'dash' | 'text'

type Props = {
  horizontal?: HorizontalPlacement
  vertical?: VerticalPlacement
  variant?: AlertVariant
  role?: LiveRole
  appearance?: ToastAppearance
  title?: string
  message?: string
  duration?: number
  pauseOnHover?: boolean
  closable?: boolean
  closeLabel?: string
  showIcon?: boolean
  clickable?: boolean
  closeOnClick?: boolean
  outline?: boolean
  soft?: boolean
  dash?: boolean
  teleportTo?: string | false
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: 'end',
  vertical: 'bottom',
  role: 'status',
  duration: 0,
  pauseOnHover: true,
  closable: false,
  showIcon: false,
  clickable: false,
  closeOnClick: false,
  outline: false,
  soft: false,
  dash: false,
  teleportTo: 'body',
})

const emit = defineEmits<{
  activate: [event: MouseEvent | KeyboardEvent]
  close: [reason: CloseReason]
}>()
const slots = defineSlots<{
  default?: () => unknown
  title?: () => unknown
  icon?: () => unknown
  actions?: (props: { close: () => void }) => unknown
}>()
const { t } = useI18n()
const resolvedCloseLabel = computed(() => props.closeLabel ?? t('components.toast.close'))

const model = defineModel<boolean>({ default: true })

const HORIZONTAL_CLASSES: Record<HorizontalPlacement, string> = {
  start: 'toast-start',
  center: 'toast-center',
  end: 'toast-end',
  left: 'di-toast-left',
  right: 'di-toast-right',
}

const VERTICAL_CLASSES: Record<VerticalPlacement, string> = {
  top: 'toast-top',
  middle: 'toast-middle',
  bottom: 'toast-bottom',
}

const MOTION_CLASSES: Record<HorizontalPlacement, string> = {
  start: '-translate-x-6',
  center: '',
  end: 'translate-x-6',
  left: '-translate-x-6',
  right: 'translate-x-6',
}

const timeoutId = ref<ReturnType<typeof setTimeout>>()
const remainingDuration = ref(0)
const timerStartedAt = ref(0)
const managedHost = shallowRef<HTMLElement>()
const managedHostKey = ref<string>()

const usesManagedHost = computed(() => props.teleportTo === 'body')
const toastClasses = computed(() => [
  'toast',
  'z-50',
  HORIZONTAL_CLASSES[props.horizontal],
  VERTICAL_CLASSES[props.vertical],
])
const hostClasses = computed(() => [
  HORIZONTAL_CLASSES[props.horizontal],
  VERTICAL_CLASSES[props.vertical],
])
const hostKey = computed(() => `${props.vertical}-${props.horizontal}`)
const teleportTarget = computed(() => managedHost.value ?? (props.teleportTo || 'body'))
const teleportReady = computed(() => !usesManagedHost.value || Boolean(managedHost.value))
const hasContentHeader = computed(() => props.title !== undefined || Boolean(slots.title))
const hasActions = computed(() => props.closable || Boolean(slots.actions))
const resolvedOutline = computed(
  () =>
    props.appearance === 'outline'
    || props.appearance === 'text'
    || (!props.appearance && props.outline),
)
const resolvedSoft = computed(
  () => props.appearance === 'soft' || (!props.appearance && props.soft),
)
const resolvedDash = computed(
  () => props.appearance === 'dash' || (!props.appearance && props.dash),
)
const alertClasses = computed(() => [
  'pointer-events-auto w-full max-w-sm shadow-lg',
  props.appearance === 'text' && 'border-transparent bg-base-100',
  props.clickable && 'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2',
])
const motionFromClass = computed(() => {
  const horizontalMotion = MOTION_CLASSES[props.horizontal]

  if (horizontalMotion)
    return `opacity-0 ${horizontalMotion}`

  return props.vertical === 'top' ? 'opacity-0 -translate-y-4' : 'opacity-0 translate-y-4'
})

function clearDismissTimer() {
  if (timeoutId.value !== undefined) {
    clearTimeout(timeoutId.value)
    timeoutId.value = undefined
  }
}

function close(reason: CloseReason) {
  if (!model.value)
    return

  clearDismissTimer()
  model.value = false
  emit('close', reason)
}

function scheduleDismiss(duration: number) {
  clearDismissTimer()

  if (!model.value || duration <= 0)
    return

  remainingDuration.value = duration
  timerStartedAt.value = Date.now()
  timeoutId.value = setTimeout(() => close('timeout'), duration)
}

function pauseDismiss() {
  if (!props.pauseOnHover || timeoutId.value === undefined)
    return

  const elapsed = Date.now() - timerStartedAt.value
  remainingDuration.value = Math.max(remainingDuration.value - elapsed, 0)
  clearDismissTimer()
}

function resumeDismiss() {
  if (!props.pauseOnHover || !model.value || remainingDuration.value <= 0)
    return

  scheduleDismiss(remainingDuration.value)
}

function closeManually() {
  close('manual')
}

function activate(event: MouseEvent | KeyboardEvent) {
  if (!props.clickable)
    return

  emit('activate', event)

  if (props.closeOnClick)
    close('click')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ')
    return

  event.preventDefault()
  activate(event)
}

function releaseManagedHost() {
  if (managedHostKey.value)
    releaseToastHost(managedHostKey.value)

  managedHost.value = undefined
  managedHostKey.value = undefined
}

function setupManagedHost() {
  releaseManagedHost()

  if (!usesManagedHost.value || typeof document === 'undefined')
    return

  managedHostKey.value = hostKey.value
  managedHost.value = acquireToastHost(hostKey.value, hostClasses.value)
}

watch(
  [model, () => props.duration],
  ([visible, duration]) => {
    if (visible)
      scheduleDismiss(Math.max(0, duration))
    else clearDismissTimer()
  },
  { immediate: true },
)

watch([hostKey, usesManagedHost], setupManagedHost)
onMounted(setupManagedHost)
onBeforeUnmount(() => {
  clearDismissTimer()
  releaseManagedHost()
})
</script>

<template>
  <Teleport v-if="teleportReady" :to="teleportTarget" :disabled="teleportTo === false">
    <div :class="usesManagedHost ? 'contents' : toastClasses">
      <Transition
        appear
        enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
        :enter-from-class="motionFromClass"
        enter-to-class="opacity-100 translate-x-0 translate-y-0"
        leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
        leave-from-class="opacity-100 translate-x-0 translate-y-0"
        :leave-to-class="motionFromClass"
      >
        <DiAlert
          v-if="model"
          :variant="variant"
          :outline="resolvedOutline"
          :soft="resolvedSoft"
          :dash="resolvedDash"
          :role="clickable ? 'button' : role"
          :show-icon="showIcon"
          :class="alertClasses"
          :tabindex="clickable ? 0 : undefined"
          :aria-live="clickable ? (role === 'alert' ? 'assertive' : 'polite') : undefined"
          @mouseenter="pauseDismiss"
          @mouseleave="resumeDismiss"
          @click="activate"
          @keydown="handleKeydown"
        >
          <template v-if="$slots.icon" #icon>
            <slot name="icon" />
          </template>

          <div class="min-w-0 flex-1">
            <div v-if="hasContentHeader" class="font-bold">
              <slot name="title">
                {{ title }}
              </slot>
            </div>
            <div v-if="message" class="text-sm">
              {{ message }}
            </div>
            <slot />
          </div>

          <template v-if="hasActions" #actions>
            <div class="flex items-center gap-2">
              <slot name="actions" :close="closeManually" />
              <DiButton
                v-if="closable"
                size="sm"
                variant="ghost"
                circle
                :aria-label="resolvedCloseLabel"
                @click.stop="closeManually"
              >
                <DiIcon name="xMark" size="sm" />
              </DiButton>
            </div>
          </template>
        </DiAlert>
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.di-toast-left {
  inset-inline: auto;
  left: 1rem;
  right: auto;
}

.di-toast-right {
  inset-inline: auto;
  right: 1rem;
  left: auto;
}
</style>
