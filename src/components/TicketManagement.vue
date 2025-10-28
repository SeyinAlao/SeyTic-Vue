<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TicketIcon class="w-5 h-5 text-white" />
              </div>
              <span class="text-slate-900">SeyTic</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Button variant="ghost" size="sm" class="flex items-center gap-2" @click="onBack">
              <ArrowLeft class="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="outline" class="flex items-center gap-2" size="sm" @click="handleLogout">
              <LogOut class="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-slate-900 mb-2">Ticket Management</h1>
          <p class="text-slate-600">Create, view, edit, and manage all your tickets</p>
        </div>
        <div class="flex gap-3">
          <Button @click="openCreateDialog" class="flex items-center gap-2">
            <Plus class="w-4 h-4" />
            New Ticket
          </Button>
        </div>
      </div>

      <div v-if="tickets.length === 0" class="text-center py-12">
        <Card class="p-12 shadow-lg">
          <div class="max-w-md mx-auto">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TicketIcon class="w-8 h-8 text-slate-400" />
            </div>
            <h3 class="text-slate-900 mb-2">No tickets yet</h3>
            <p class="text-slate-600 mb-6">Get started by creating your first ticket</p>
            <Button @click="openCreateDialog" class="flex items-center gap-2">
              <Plus class="w-4 h-4 mr-2" />
              Create First Ticket
            </Button>
          </div>
        </Card>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TicketCard 
          v-for="ticket in tickets" 
          :key="ticket.id" 
          :ticket="ticket" 
          @edit="openEditDialog" 
          @delete="openDeleteDialog" 
        />
      </div>
    </main>

    <!-- Create Dialog -->
    <Dialog :open="isCreateDialogOpen" @update:open="setIsCreateDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogDescription>Fill in the details to create a new ticket</DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleCreateSubmit">
          <div class="space-y-4 py-4">
            <div class="space-y-2">
              <Label for="title">Title</Label>
              <Input id="title" v-model="formData.title" />
            </div>
            <div class="space-y-2">
              <Label for="description">Description</Label>
              <Textarea id="description" v-model="formData.description" rows="4" />
            </div>
              <div class="space-y-2">
               <Label for="status">Status</Label>
                <Select v-model="formData.status">
                 <option value="open">Open</option>
                 <option value="in_progress">In Progress</option>
                 <option value="closed">Closed</option>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="priority">Priority</Label>
                <Select v-model="formData.priority">
                 <option value="low">Low</option>
                 <option value="medium">Medium</option>
                 <option value="high">High</option>
                </Select>
              </div>
            </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="setIsCreateDialogOpen(false)">Cancel</Button>
            <Button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white">
              Create Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>


    <Dialog :open="isEditDialogOpen" @update:open="setIsEditDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ticket</DialogTitle>
          <DialogDescription>Update the ticket details</DialogDescription>
        </DialogHeader>
        <form @submit.prevent="handleEditSubmit">
          <div class="space-y-4 py-4">
            <div class="space-y-2">
              <Label for="edit-title">Title</Label>
              <Input id="edit-title" v-model="formData.title" />
            </div>
            <div class="space-y-2">
              <Label for="edit-description">Description</Label>
              <Textarea id="edit-description" v-model="formData.description" rows="4" />
            </div>
            <div class="space-y-2">
              <Label for="edit-status">Status</Label>
              <Select v-model="formData.status">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
            <div class="space-y-2">
              <Label for="edit-priority">Priority</Label>
              <Select v-model="formData.priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" @click="setIsEditDialogOpen(false)">Cancel</Button>
            <Button type="submit">Update Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <!-- Delete Confirmation -->
    <Dialog :open="isDeleteDialogOpen" @update:open="setIsDeleteDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete the ticket "{{ selectedTicket?.title || '' }}".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="setIsDeleteDialogOpen(false)">Cancel</Button>
          <Button @click="handleDeleteTicket" class="bg-red-600 hover:bg-red-700">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { TicketIcon, LogOut, Plus, Edit, Trash2, ArrowLeft } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import Card from './ui/Card.vue'
import Input from './ui/Input.vue'
import Label from './ui/Label.vue'
import Textarea from './ui/Textarea.vue'
import Select from './ui/Select.vue'
import Dialog from './ui/Dialog.vue'
import DialogContent from './ui/DialogContent.vue'
import DialogHeader from './ui/DialogHeader.vue'
import DialogTitle from './ui/DialogTitle.vue'
import DialogDescription from './ui/DialogDescription.vue'
import DialogFooter from './ui/DialogFooter.vue'
import TicketCard from './TicketCard.vue'
import { getTickets, addTicket, updateTicket, deleteTicket } from '../utils/tickets'
import { logout } from '../utils/auth'
import { toast } from '../utils/toast'

const props = defineProps({
  onLogout: {
    type: Function,
    required: true
  },
  onBack: {
    type: Function,
    required: true
  }
})

const tickets = ref([])
const isCreateDialogOpen = ref(false)
const isEditDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const selectedTicket = ref(null)
const formData = reactive({
  title: "",
  description: "",
  status: "open",
  priority: "medium",
})

onMounted(() => {
  loadTickets()
})

function loadTickets() {
  try {
    const all = getTickets() || []
    tickets.value = all
  } catch (err) {
    console.warn("Failed to load tickets", err)
    tickets.value = []
  }
}

const handleLogout = () => {
  logout()
  toast.success("Logged out successfully")
  props.onLogout()
}

const handleCreateTicket = (data) => {
  try {
    const created = addTicket(data)
    loadTickets()
    setIsCreateDialogOpen(false)
    toast.success("Ticket created successfully")
    return created
  } catch (error) {
    toast.error("Failed to create ticket")
    console.error(error)
  }
}

const openEditDialog = (ticket) => {
  if (!ticket) return
  selectedTicket.value = ticket
  formData.title = ticket.title || ""
  formData.description = ticket.description || ""
  formData.status = ticket.status || "open"
  formData.priority = ticket.priority || "medium"
  setIsEditDialogOpen(true)
}

const handleEditTicket = (data) => {
  if (!selectedTicket.value) return toast.error("No ticket selected")
  try {
    updateTicket(selectedTicket.value.id, data)
    loadTickets()
    setIsEditDialogOpen(false)
    selectedTicket.value = null
    toast.success("Ticket updated successfully")
  } catch (err) {
    toast.error("Failed to update ticket")
  }
}

const openDeleteDialog = (ticket) => {
  selectedTicket.value = ticket || null
  setIsDeleteDialogOpen(true)
}

const handleDeleteTicket = () => {
  if (!selectedTicket.value) {
    toast.error("No ticket selected")
    return
  }
  try {
    deleteTicket(selectedTicket.value.id)
    loadTickets()
    setIsDeleteDialogOpen(false)
    selectedTicket.value = null
    toast.success("Ticket deleted successfully")
  } catch (err) {
    toast.error("Failed to delete ticket")
  }
}

const openCreateDialog = () => {
  formData.title = ""
  formData.description = ""
  formData.status = "open"
  formData.priority = "medium"
  selectedTicket.value = null
  setIsCreateDialogOpen(true)
}

const setIsCreateDialogOpen = (value) => {
  isCreateDialogOpen.value = value
}

const setIsEditDialogOpen = (value) => {
  isEditDialogOpen.value = value
}

const setIsDeleteDialogOpen = (value) => {
  isDeleteDialogOpen.value = value
}

const handleCreateSubmit = () => {
  if (!formData.title || !formData.status) {
    toast.error("Title and status are required")
    return
  }
  handleCreateTicket({
    ...formData,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
}

const handleEditSubmit = () => {
  if (!formData.title || !formData.status) {
    toast.error("Title and status are required")
    return
  }
  handleEditTicket({
    ...formData,
    updatedAt: Date.now(),
  })
}
</script>



