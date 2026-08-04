<script setup lang="ts" generic="T extends SelectValue = SelectValue">
import { useI18n } from 'vue-i18n'

import type { SelectOption, SelectValue } from './types'

import DiButton from '../DiButton.vue'
import DiIcon from '../DiIcon.vue'
import { useDiSelect } from './composables/use-di-select'

type Props = {
  option: SelectOption<T>
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  remove: [option: SelectOption<T>]
}>()

defineSlots<{
  default?: (props: { option: SelectOption<T>, remove: () => void }) => unknown
}>()

const select = useDiSelect<T>()
const { t } = useI18n()

function remove() {
  if (!props.disabled) {
    emit('remove', props.option)
  }
}
</script>

<template>
  <span
    class="inline-flex max-w-full items-center rounded-sm"
    :class="[select.sizeClasses.value.tag, select.variantClasses.value.tag]"
  >
    <slot :option="option" :remove="remove">
      <span class="truncate">{{ option.label }}</span>
    </slot>
    <DiButton
      v-if="!disabled"
      variant="ghost"
      :size="select.sizeClasses.value.actionSize"
      square
      :aria-label="t('components.select.removeOption', { option: option.label })"
      :custom-class="`${select.sizeClasses.value.action} text-current hover:bg-current/10`"
      @click.stop="remove"
    >
      <DiIcon name="close" :size="select.sizeClasses.value.icon" />
    </DiButton>
  </span>
</template>
