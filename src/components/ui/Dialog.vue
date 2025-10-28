<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/50" 
      @click="$emit('update:open', false)"
    ></div>
    
    <!-- Dialog -->
    <div class="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:open'])
</script>



