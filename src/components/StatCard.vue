<template>
  <Card class="p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-slate-600 mb-2">{{ label }}</p>
        <p class="text-slate-900">{{ value }}</p>
      </div>
      <div
        :class="['w-12 h-12 rounded-lg flex items-center justify-center', colorClasses[color]]"
      >
        <component :is="icon" class="w-6 h-6" />
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from './ui/Card.vue'

const props = defineProps({
  icon: Object,
  label: String,
  value: Number,
  color: String
})

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  amber: "bg-amber-100 text-amber-600",
  gray: "bg-slate-100 text-slate-600",
}
</script>

