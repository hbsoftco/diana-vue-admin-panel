<script setup lang="ts">
import { ref } from 'vue'

import Dropdown from '@/shared/ui/Dropdown.vue'

const hbsoft = ref<string | null>(null)
</script>

<template>
  <div>
    <br>
    <br>
    {{ hbsoft }}
    <br>
    <br>
    <br>
    <br>
    <br>
    <Dropdown
      v-model="hbsoft"
      :options="[
        { label1: 'Profile', value: 'profile' },
        { label1: 'Settings', value: 'settings' },
        { label1: 'Logout', value: 'logout', class: 'text-error' },
      ]"
      align="start"
      position="bottom"
      label-key="label1"
      close-on-click
      @select="console.log('hosseinnnn :)', $event)"
    >
      <template #trigger>
        <button class="btn btn-ghost">
          Options
        </button>
      </template>
    </Dropdown>
  </div>
</template>
