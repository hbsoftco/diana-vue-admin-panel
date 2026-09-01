<script setup lang="ts">
import AuthBrandPanel from './ui/AuthBrandPanel.vue'
import SignInForm from './ui/SignInForm.vue'
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <AuthBrandPanel class="hidden lg:flex" />

    <div class="flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div class="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  </div>
</template>
