<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/* =======================
   Types
======================= */

type Position = 'start' | 'end'
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type Props = {
  modelValue: boolean
  position?: Position

  // Responsive: at which breakpoint the drawer stays permanently open
  openAt?: Breakpoint | false

  closeOnOverlay?: boolean
  overlay?: boolean

  label?: string
  closeOverlayLabel?: string

  sideClass?: string
  contentClass?: string
  customClass?: string
}

/* =======================
   Props / Emits
======================= */

const props = withDefaults(defineProps<Props>(), {
  position: 'start',
  openAt: false,
  closeOnOverlay: true,
  overlay: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()
const resolvedLabel = computed(() => props.label ?? t('components.drawer.toggle'))
const resolvedCloseOverlayLabel = computed(
  () => props.closeOverlayLabel ?? t('components.drawer.closeOverlay'),
)

/* =======================
   State control
======================= */

const isOpen = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

/* =======================
   Classes
======================= */

const drawerClasses = computed(() => [
  'drawer',
  props.position === 'end' && 'drawer-end',
  props.openAt && `${props.openAt}:drawer-open`,
  props.customClass,
])

/* =======================
   Actions
======================= */

function closeDrawer() {
  if (props.closeOnOverlay) {
    isOpen.value = false
  }
}
</script>

<template>
  <div :class="drawerClasses">
    <!-- TOGGLE -->
    <input v-model="isOpen" type="checkbox" class="drawer-toggle" :aria-label="resolvedLabel">

    <!-- CONTENT -->
    <div class="drawer-content" :class="contentClass">
      <!-- Trigger slot: use drawer-button class on your label/button -->
      <slot name="trigger" />
      <slot name="content" />
    </div>

    <!-- SIDEBAR -->
    <div class="drawer-side" :class="sideClass">
      <label
        v-if="overlay"
        class="drawer-overlay"
        :aria-label="resolvedCloseOverlayLabel"
        @click="closeDrawer"
      />
      <slot name="side" />
    </div>
  </div>
</template>
