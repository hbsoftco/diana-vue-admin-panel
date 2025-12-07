<script setup lang="ts">
import AppHeader from '@shared/ui/layout/AppHeader.vue'
import AppSidebar from '@shared/ui/layout/AppSidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-base-200">
    <AppSidebar />

    <div class="flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 overflow-y-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>
