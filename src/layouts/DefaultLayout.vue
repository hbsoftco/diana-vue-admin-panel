<script setup lang="ts">
import LanguageToggle from '@shared/ui/layout/LanguageToggle.vue'
import ThemeToggle from '@shared/ui/layout/ThemeToggle.vue'
</script>

<template>
  <div class="flex h-screen bg-base-200">
    <!-- Sidebar -->
    <aside class="w-64 bg-base-100 border-r border-base-300">
      {{ $t('greeting') }}
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="h-16 border-b border-base-300 bg-base-100">
        <div class="flex justify-center">
          <ThemeToggle />

          <LanguageToggle />
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
