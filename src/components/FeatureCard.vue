<template>
  <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
      <component :is="icon" class="w-6 h-6" />
    </div>
    <h3 class="text-slate-900 mb-2">{{ title }}</h3>
    <p class="text-slate-600">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>



