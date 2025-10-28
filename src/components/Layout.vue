<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './Footer.vue'
</script>


