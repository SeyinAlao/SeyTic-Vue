<template>
  <Card class="p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <Badge :class="getStatusColor(ticket.status)">
        {{ (ticket.status || "").replace("_", " ") }}
      </Badge>
      <Badge v-if="ticket.priority" variant="outline" :class="getPriorityColor(ticket.priority)">
        {{ ticket.priority }}
      </Badge>
    </div>

    <h3 class="text-slate-900 mb-2 line-clamp-2">{{ ticket.title }}</h3>
    <p v-if="ticket.description" class="text-slate-600 mb-4 line-clamp-3">{{ ticket.description }}</p>

    <div class="flex items-center justify-between text-slate-500 mb-4 pt-4 border-t border-slate-200">
      <span>Created {{ formatDate(ticket.createdAt) }}</span>
    </div>

    <div class="flex gap-2">
      <Button variant="outline" size="sm" @click="$emit('edit', ticket)" class="flex-1">
        <Edit class="w-4 h-4 mr-2" />
        Edit
      </Button>
      <Button variant="outline" size="sm" @click="$emit('delete', ticket)" class="text-red-600 hover:text-red-700 hover:bg-red-50">
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </Card>
</template>

<script setup>
import { Edit, Trash2 } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import Card from './ui/Card.vue'
import Badge from './ui/Badge.vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-700 border-green-200"
    case "in_progress":
      return "bg-amber-100 text-amber-700 border-amber-200"
    case "closed":
      return "bg-slate-100 text-slate-700 border-slate-200"
    default:
      return "bg-slate-100 text-slate-700 border-slate-200"
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    case "low":
      return "bg-blue-100 text-blue-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ""
  return new Date(timestamp).toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  })
}
</script>



