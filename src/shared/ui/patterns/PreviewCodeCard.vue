<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { codeToHtml } from 'shiki'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useDirection } from '@/shared/composables/use-direction'
import { useTheme } from '@/shared/composables/use-theme'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiCard from '@/shared/ui/base/DiCard.vue'

/* =======================
   Types
======================= */
type Props = {
  title?: string
  accentColor?: string
  code?: string
  showCodeButton?: boolean
  codeButtonLabel?: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCodeButton: true,
  language: 'vue',
})

/* =======================
   Composables
======================= */
const { t } = useI18n()
const { isRtl } = useDirection()
const { copy, copied } = useClipboard()
const { isDark } = useTheme()

/* =======================
   State
======================= */
const showCode = ref(false)
const highlightedCode = ref('')

/* =======================
   Computed
======================= */
const buttonLabel = computed(() => props.codeButtonLabel || t('patterns.previewCodeCard.showCode'))

/* =======================
   Methods
======================= */
async function highlightCode() {
  if (!props.code)
    return

  highlightedCode.value = await codeToHtml(props.code, {
    lang: props.language,
    theme: isDark.value ? 'dracula' : 'catppuccin-latte',
  })
}

async function toggleCode() {
  showCode.value = !showCode.value

  if (showCode.value && !highlightedCode.value) {
    await highlightCode()
  }
}

function copyCode() {
  if (props.code) {
    copy(props.code)
  }
}

/* =======================
   Watchers
======================= */
watch(isDark, async () => {
  if (showCode.value) {
    await highlightCode()
  }
})
</script>

<template>
  <DiCard :accent-color="accentColor">
    <!-- Header -->
    <template #header>
      <div class="flex items-center justify-between w-full">
        <span v-if="title" class="text-sm font-semibold text-base-content">
          {{ title }}
        </span>

        <DiButton
          v-if="showCodeButton && code"
          variant="primary"
          size="sm"
          soft
          @click="toggleCode"
        >
          {{ showCode ? $t('patterns.previewCodeCard.showPreview') : buttonLabel }}

          <template #icon-right>
            <i-material-symbols-light-code v-if="!showCode" class="text-sm" />
            <i-material-symbols-light-code-off v-else class="text-sm" />
          </template>
        </DiButton>
      </div>
    </template>

    <!-- Preview -->
    <div v-if="!showCode">
      <slot />
    </div>

    <!-- Code -->
    <div v-else class="relative code-preview rtl:text-left">
      <DiButton size="xs" variant="ghost" class="absolute top-2 right-2 z-10" @click="copyCode">
        {{ copied ? $t('patterns.previewCodeCard.copied') : $t('patterns.previewCodeCard.copy') }}

        <template v-if="!isRtl" #icon-right>
          <i-material-symbols-light-content-copy v-if="!copied" class="text-xs" />
          <i-material-symbols-light-check v-else class="text-xs" />
        </template>

        <template v-else #icon-left>
          <i-material-symbols-light-content-copy v-if="!copied" class="text-xs" />
          <i-material-symbols-light-check v-else class="text-xs" />
        </template>
      </DiButton>

      <div v-html="highlightedCode" />
    </div>

    <!-- Footer -->
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </DiCard>
</template>

<style scoped>
.code-preview {
  overflow-x: auto;
  border-radius: 0.5rem;
}

/* Shiki output */
.code-preview :deep(pre) {
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 11px;
  line-height: 1.6;
}
</style>
