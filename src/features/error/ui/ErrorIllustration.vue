<script setup lang="ts">
type Props = {
  code: '401' | '404' | '500'
  label: string
}

defineProps<Props>()
</script>

<template>
  <svg viewBox="0 0 640 300" class="h-auto w-full max-w-2xl" role="img" :aria-label="label">
    <circle cx="320" cy="146" r="126" class="fill-primary/10" />
    <circle cx="146" cy="90" r="10" class="fill-secondary/40" />
    <circle cx="500" cy="68" r="7" class="fill-accent/50" />
    <path
      d="M112 238c74-36 126-14 189-4 78 13 142-36 227-3"
      fill="none"
      class="stroke-base-content/15"
      stroke-width="3"
      stroke-linecap="round"
    />
    <rect
      x="213"
      y="72"
      width="214"
      height="146"
      rx="22"
      class="fill-base-100 stroke-primary/25"
      stroke-width="3"
    />
    <path d="M213 108h214" class="stroke-primary/20" stroke-width="3" />
    <circle cx="238" cy="91" r="5" class="fill-error/70" />
    <circle cx="255" cy="91" r="5" class="fill-warning/70" />
    <circle cx="272" cy="91" r="5" class="fill-success/70" />
    <text
      x="320"
      y="177"
      text-anchor="middle"
      class="fill-primary font-black"
      font-size="72"
      font-family="ui-sans-serif, system-ui, sans-serif"
    >
      {{ code }}
    </text>
    <path
      d="M176 214l22-38 22 38z"
      class="fill-warning stroke-warning-content/20"
      stroke-width="2"
    />
    <path
      d="M187 188v12m0 6v2"
      class="stroke-warning-content"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M462 177l30 30m0-30-30 30"
      class="stroke-error/70"
      stroke-width="7"
      stroke-linecap="round"
    />
  </svg>
</template>
