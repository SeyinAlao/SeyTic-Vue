<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'ghost', 'secondary'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
})

const buttonClasses = computed(() => {
  const base = 'rounded-lg font-medium transition-colors duration-200 focus:outline-none'
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-slate-700 hover:bg-slate-100',
    secondary: 'bg-white text-blue-600 hover:bg-slate-100',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  }

  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${props.className}`
})
</script>


