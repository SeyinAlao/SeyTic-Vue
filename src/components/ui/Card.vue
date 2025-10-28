<template>
  <div
    :class="cardClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})

const cardClasses = computed(() => {
  const base = 'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border'
  
  return `${base} ${props.className}`
})
</script>


