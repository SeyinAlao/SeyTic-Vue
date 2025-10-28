<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TicketIcon class="w-5 h-5 text-white" />
            </div>
            <span class="text-slate-900">SeyTic</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-slate-600 hidden sm:inline">
              Welcome, {{ userName }}
            </span>
            <Button variant="outline" size="sm" @click="handleLogout">
              <div class="flex items-center gap-2">
                <LogOut class="w-4 h-4" />
                <span>Logout</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-12">
        <h1 class="text-slate-900 mb-2">Dashboard</h1>
        <p class="text-slate-600">
          Monitor your tickets and manage your workflow
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard :icon="TicketIcon" label="Total Tickets" :value="stats.total" color="blue" />
        <StatCard :icon="AlertCircle" label="Open Tickets" :value="stats.open" color="green" />
        <StatCard :icon="Clock" label="In Progress" :value="stats.inProgress" color="amber" />
        <StatCard :icon="CheckCircle2" label="Closed Tickets" :value="stats.closed" color="gray" />
      </div>

      <Card class="p-8 shadow-lg">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 class="text-slate-900 mb-2">Ticket Management</h2>
            <p class="text-slate-600">
              Create, view, edit, and manage all your tickets in one place
            </p>
          </div>
          <div class="flex gap-3">
            <Button @click="onNavigateToTickets" variant="outline">
              View All Tickets
            </Button>
            <Button @click="onNavigateToTickets" class="flex items-center gap-2">
              <Plus class="w-4 h-4" />
              <span>New Ticket</span>
            </Button>
          </div>
        </div>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card class="p-6 shadow-lg">
          <h3 class="text-slate-900 mb-3">Recent Activity</h3>
          <p class="text-slate-600 mb-4">
            Stay updated with your latest ticket activities and changes
          </p>
          <Button @click="onNavigateToTickets" variant="outline">
            <span>View Activity</span>
          </Button>
        </Card>

        <Card class="p-6 shadow-lg">
          <h3 class="text-slate-900 mb-3">Quick Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-slate-600">Resolution Rate</span>
              <span class="text-slate-900">{{ resolutionRate }}%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-600">Active Tickets</span>
              <span class="text-slate-900">{{ stats.open + stats.inProgress }}</span>
            </div>
          </div>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { 
  TicketIcon, CheckCircle2, Clock, AlertCircle, LogOut, Plus 
} from 'lucide-vue-next'
import Button from './ui/Button.vue'
import Card from './ui/Card.vue'
import StatCard from './StatCard.vue'
import { getSession, logout } from '../utils/auth'
import { getTicketStats } from '../utils/tickets'
import { toast } from '../utils/toast'

// ✅ Destructure props so they are usable directly in template
const { onLogout, onNavigateToTickets } = defineProps({
  onLogout: { type: Function, required: true },
  onNavigateToTickets: { type: Function, required: true }
})

const userName = ref('User')
const stats = reactive({ total: 0, open: 0, inProgress: 0, closed: 0 })

const resolutionRate = computed(() => {
  return stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0
})

onMounted(async () => {
  const session = getSession()
  let userId = null

  if (session?.user) {
    userName.value = session.user.name || "User"
    userId = session.user.id
  } else {
    userName.value = "Homie"
  }

  try {
    const ticketStats = await getTicketStats(userId)
    if (ticketStats) {
      stats.total = Number(ticketStats.total) || 0
      stats.open = Number(ticketStats.open) || 0
      stats.inProgress = Number(ticketStats.inProgress) || 0
      stats.closed = Number(ticketStats.closed) || 0
    }
  } catch (err) {
    console.warn("Failed to load ticket stats", err)
  }
})

const handleLogout = () => {
  logout()
  toast.success('Logged out successfully')
  onLogout()
}
</script>
