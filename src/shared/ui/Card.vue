<script setup lang="ts">
import { computed } from 'vue'

export type CardProps = {
  title?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  border?: boolean
  dash?: boolean
  side?: boolean
  imageFull?: boolean
  figureBottom?: boolean
  bgColor?: string
  textColor?: string
  shadow?: string | boolean
  class?: string
  bodyClass?: string
  titleClass?: string
  actionsClass?: string
  figureClass?: string
  style?: Record<string, string>
  centered?: boolean
  accentColor?: string
  showSeparator?: boolean
  actionsPosition?: 'start' | 'end' | 'center'
  headerClass?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  size: 'md',
  border: false,
  dash: false,
  side: false,
  imageFull: false,
  figureBottom: false,
  shadow: 'shadow-xs',
  centered: false,
  showSeparator: true,
  actionsPosition: 'end',
  bgColor: 'bg-content-background',
})

const cardClasses = computed(() => {
  const classes = ['card']

  // Size variants
  if (props.size && props.size !== 'md') {
    classes.push(`card-${props.size}`)
  }

  // Border styles
  if (props.border) {
    classes.push('card-border')
  }
  if (props.dash) {
    classes.push('card-dash')
  }

  // Layout modifiers
  if (props.side) {
    classes.push('card-side')
  }
  if (props.imageFull) {
    classes.push('image-full')
  }

  // Colors
  if (props.bgColor) {
    classes.push(props.bgColor)
  }
  if (props.textColor) {
    classes.push(props.textColor)
  }

  // Shadow
  if (typeof props.shadow === 'string') {
    classes.push(props.shadow)
  }
  else if (props.shadow === true) {
    classes.push('shadow-sm')
  }

  // Custom class
  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

const bodyClasses = computed(() => {
  const classes = ['card-body']

  if (props.centered) {
    classes.push('items-center', 'text-center')
  }

  if (props.bodyClass) {
    classes.push(props.bodyClass)
  }

  return classes.join(' ')
})

const titleClasses = computed(() => {
  const classes = ['card-title']

  if (props.titleClass) {
    classes.push(props.titleClass)
  }

  return classes.join(' ')
})

const actionsClasses = computed(() => {
  const classes = ['card-actions']

  // Position alignment
  if (props.actionsPosition === 'start') {
    classes.push('justify-start')
  }
  else if (props.actionsPosition === 'end') {
    classes.push('justify-end')
  }
  else if (props.actionsPosition === 'center') {
    classes.push('justify-center')
  }

  if (props.actionsClass) {
    classes.push(props.actionsClass)
  }

  return classes.join(' ')
})

const figureClasses = computed(() => {
  const classes: string[] = []

  if (props.figureClass) {
    classes.push(props.figureClass)
  }

  return classes.length ? classes.join(' ') : undefined
})

const headerWrapperClasses = computed(() => {
  const classes = ['mb-3']

  if (props.headerClass) {
    classes.push(props.headerClass)
  }

  return classes.join(' ')
})

const customStyle = computed(() => props.style || undefined)
</script>

<template>
  <div :class="cardClasses" :style="customStyle">
    <!-- Figure (Image) - Top or Side -->
    <figure v-if="$slots.figure && !imageFull && !figureBottom" :class="figureClasses">
      <slot name="figure" />
    </figure>

    <!-- Card Body -->
    <div
      v-if="
        $slots.default || $slots.title || $slots.actions || title || $slots.header || $slots.footer
      "
      :class="bodyClasses"
    >
      <!-- Card Header (optional slot for badges, etc) -->
      <div v-if="$slots.header" :class="headerWrapperClasses">
        <div class="flex items-center gap-2">
          <!-- Accent Color Bar -->
          <div
            v-if="accentColor"
            class="w-0.5 h-4 rounded"
            :style="{ backgroundColor: accentColor }"
          />
          <div class="flex-1">
            <slot name="header" />
          </div>
        </div>
        <!-- Separator Line -->
        <div v-if="showSeparator" class="mt-3 border-t border-base-300" />
      </div>

      <!-- Card Title -->
      <h2 v-if="$slots.title || title" :class="titleClasses">
        <slot name="title">
          {{ title }}
        </slot>
      </h2>

      <!-- Card Content -->
      <slot />

      <!-- Card Footer (optional slot for additional content) -->
      <div v-if="$slots.footer" class="mt-4">
        <slot name="footer" />
      </div>

      <!-- Card Actions -->
      <div v-if="$slots.actions" :class="actionsClasses">
        <slot name="actions" />
      </div>
    </div>

    <!-- Figure (Image) - Bottom -->
    <figure v-if="$slots.figure && figureBottom" :class="figureClasses">
      <slot name="figure" />
    </figure>
  </div>
</template>
