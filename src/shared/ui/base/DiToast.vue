<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

import type { AlertVariant } from '@/shared/types/models'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

type HorizontalPlacement = 'start' | 'center' | 'end'
type VerticalPlacement = 'top' | 'middle' | 'bottom'
type LiveRole = 'status' | 'alert'
type CloseReason = 'manual' | 'timeout'

type Props = {
  horizontal?: HorizontalPlacement
  vertical?: VerticalPlacement
  variant?: AlertVariant
  role?: LiveRole
  title?: string
  message?: string
  duration?: number
  pauseOnHover?: boolean
  closable?: boolean
  closeLabel?: string
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
  closeLabel: 'Close notification',
  outline: false,
  soft: false,
  dash: false,
  teleportTo: 'body',
})

const emit = defineEmits<{
  close: [reason: CloseReason]
}>()

const slots = defineSlots<{
  default?: () => unknown
  title?: () => unknown
  icon?: () => unknown
  actions?: (props: { close: () => void }) => unknown
}>()

const model = defineModel<boolean>({ default: true })

const HORIZONTAL_CLASSES: Record<HorizontalPlacement, string> = {
  start: 'toast-start',
  center: 'toast-center',
  end: 'toast-end',
}

const VERTICAL_CLASSES: Record<VerticalPlacement, string> = {
  top: 'toast-top',
  middle: 'toast-middle',
  bottom: 'toast-bottom',
}

const timeoutId = ref<ReturnType<typeof setTimeout>>()
const remainingDuration = ref(0)
const timerStartedAt = ref(0)

const toastClasses = computed(() => [
  'toast',
  HORIZONTAL_CLASSES[props.horizontal],
  VERTICAL_CLASSES[props.vertical],
])

const teleportTarget = computed(() => props.teleportTo || 'body')
const hasContentHeader = computed(() => props.title !== undefined || Boolean(slots.title))
const hasActions = computed(() => props.closable || Boolean(slots.actions))

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

watch(
  [model, () => props.duration],
  ([visible, duration]) => {
    if (visible)
      scheduleDismiss(Math.max(0, duration))
    else clearDismissTimer()
  },
  { immediate: true },
)

onBeforeUnmount(clearDismissTimer)
</script>

<template>
  <Teleport :to="teleportTarget" :disabled="teleportTo === false">
    <div v-if="model" :class="toastClasses" @mouseenter="pauseDismiss" @mouseleave="resumeDismiss">
      <DiAlert
        :variant="variant"
        :outline="outline"
        :soft="soft"
        :dash="dash"
        :role="role"
        class="w-full max-w-sm"
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
              :aria-label="closeLabel"
              @click="closeManually"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </div>
        </template>
      </DiAlert>
    </div>
  </Teleport>
</template>
