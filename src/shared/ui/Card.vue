<script setup lang="ts">
type Props = {
  bordered?: boolean
  width?: string
  bgColor?: string
  accentColor?: string
  showSeparator?: boolean
  actionsPosition?: 'start' | 'end' | 'center'
}

type Slots = {
  default?: () => any
  title?: () => any
  actions?: () => any
  figure?: () => any
  header?: () => any
}

const props = withDefaults(defineProps<Props>(), {
  bordered: true,
  width: 'w-full',
  bgColor: 'bg-background',
  accentColor: '',
  showSeparator: true,
  actionsPosition: 'end',
})

defineSlots<Slots>()
</script>

<template>
  <div
    class="card shadow-xs"
    :class="[{ 'card-bordered': props.bordered }, props.bgColor, props.width]"
  >
    <!-- Optional figure slot (for images, icons, etc.) -->
    <div v-if="$slots.figure" class="card-figure">
      <slot name="figure" />
    </div>

    <div class="card-body">
      <!-- Optional header slot with accent bar (for badges, labels, etc.) -->
      <div v-if="$slots.header" class="mb-3">
        <div class="flex items-center gap-2">
          <div
            v-if="props.accentColor"
            class="w-0.5 h-4 rounded"
            :style="{ backgroundColor: props.accentColor }"
          />
          <div class="flex-1">
            <slot name="header" />
          </div>
        </div>
        <div v-if="props.showSeparator" class="mt-3 border-t border-base-300" />
      </div>

      <!-- Optional title slot -->
      <h2 v-if="$slots.title" class="card-title">
        <slot name="title" />
      </h2>

      <!-- Default slot for main content -->
      <slot />

      <!-- Optional actions slot -->
      <div
        v-if="$slots.actions"
        class="card-actions"
        :class="{
          'justify-start': props.actionsPosition === 'start',
          'justify-end': props.actionsPosition === 'end',
          'justify-center': props.actionsPosition === 'center',
        }"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
