<template>
  <label
    :class="labelClasses"
    v-bind="$attrs"
  >
    <slot />
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})

const labelClasses = computed(() => {
  const base = 'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
  
  return `${base} ${props.className}`
})
</script>


