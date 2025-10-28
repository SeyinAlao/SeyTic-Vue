<template>
  <option :value="value" :class="itemClasses">
    <slot />
  </option>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

const itemClasses = computed(() => {
  const base = 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  
  return `${base} ${props.className}`
})
</script>



