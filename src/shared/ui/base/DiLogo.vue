<script setup lang="ts">
import { computed } from 'vue'

/**
 * DIANA brand mark, rendered as inline SVG so it follows the active theme.
 *
 * - The neutral shapes (crossbar, "i" stem, "A"/"N" letterforms) are painted
 *   with `currentColor`, so the consumer controls them with a text-color
 *   utility tied to a Diana theme token (e.g. `text-base-content` on themed
 *   surfaces, `text-primary-content` on the always-dark sidebar / brand panel).
 * - The brand purple is a fixed brand identity color, isolated here as
 *   `--di-logo-brand`. Set `mono` to fold it into `currentColor` too (for
 *   single-color placement on a colored surface).
 */
type LogoVariant = 'full' | 'mini'

type Props = {
  /** `full` renders the DIANA wordmark, `mini` the DI mark. */
  variant?: LogoVariant
  /** Paint the whole mark with `currentColor`, brand purple included. */
  mono?: boolean
  /**
   * Accessible name. When omitted the logo is decorative and hidden from
   * assistive technology.
   */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
  mono: false,
})

const VIEW_BOX: Record<LogoVariant, string> = {
  full: '0 0 1235 278',
  mini: '0 0 357 216',
}

const rootClasses = computed(() => ['di-logo', props.mono && 'di-logo--mono'])
const viewBox = computed(() => VIEW_BOX[props.variant])
const isDecorative = computed(() => !props.label)
</script>

<template>
  <svg
    :class="rootClasses"
    :viewBox="viewBox"
    fill="none"
    :role="isDecorative ? undefined : 'img'"
    :aria-hidden="isDecorative ? 'true' : undefined"
    :aria-label="isDecorative ? undefined : label"
  >
    <title v-if="label">{{ label }}</title>

    <template v-if="variant === 'full'">
      <path
        class="di-logo__brand"
        d="M98 16H262C326 17 373 65 373 133C373 205 327 254 257 273C248 275 240 275 231 275H99C97 275 96 274 96 272L97 186H175L176 211C176 214 177 217 179 219H244C282 217 307 191 307 154C307 113 283 80 244 74L98 75V16Z"
      />
      <rect x="2" y="122" width="261" height="51" rx="2" fill="currentColor" />

      <ellipse class="di-logo__brand" cx="428" cy="35" rx="38" ry="33" />
      <rect x="400" y="83" width="55" height="190" rx="1.5" fill="currentColor" />

      <path
        fill="currentColor"
        d="M595 52L468 231L469 272H503L593 143L598 147L627 194L625 196H569L552 231L648 232L674 272L716 271L715 233L595 52Z"
      />
      <path
        fill="currentColor"
        d="M733 67L786 67L899 194L900 68H956V237L933 272H893L785 154V271L764 273L732 271L733 67Z"
      />

      <path
        class="di-logo__brand"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1076 66H1116L1232 269L1231 272H1174L1147 230L1032 231L1003 272H948L947 271L1076 66ZM1092 139L1058 192L1121 193L1125 190L1102 151L1092 139Z"
      />
    </template>

    <template v-else>
      <path
        class="di-logo__brand"
        d="M82 15L208 14C255 14 290 53 290 109C290 169 255 205 202 212L83 213V143H140L143 168L194 167C220 164 236 143 236 112C236 82 218 65 200 64L83 63L82 15Z"
      />
      <rect x="2" y="94" width="202" height="38" rx="1.5" fill="currentColor" />

      <ellipse class="di-logo__brand" cx="325" cy="28" rx="30" ry="26" />
      <rect x="303" y="65" width="43" height="145" rx="1.5" fill="currentColor" />
    </template>
  </svg>
</template>

<style scoped>
.di-logo {
  --di-logo-brand: #854cfe;
}

.di-logo__brand {
  fill: var(--di-logo-brand);
}

.di-logo--mono .di-logo__brand {
  fill: currentColor;
}
</style>
