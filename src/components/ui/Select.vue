<template>
  <div class="relative">
    <select
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
      :class="selectClasses"
      v-bind="$attrs"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <slot />
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const selectClasses = computed(() => {
  const base = 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  return `${base} ${props.className}`
})
</script>



