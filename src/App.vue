<script setup>
import { ref, onMounted } from 'vue'
import Layout from './components/Layout.vue'
import LandingPage from './components/LandingPage.vue'
import AuthPage from './components/AuthPage.vue'
import Dashboard from './components/Dashboard.vue'
import TicketManagement from './components/TicketManagement.vue'

// Page state: controls what screen is visible
const currentPage = ref('landing')

// Initialize page based on login status
onMounted(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  currentPage.value = isLoggedIn ? 'dashboard' : 'landing'
})

// Auth & navigation handlers
const handleLogin = () => {
  currentPage.value = 'auth'
}

const handleGetStarted = () => {
  currentPage.value = 'auth'
}

const handleBack = () => {
  currentPage.value = 'landing'
}

const handleAuthSuccess = () => {
  alert('You are logged in!')
  localStorage.setItem('isLoggedIn', 'true')
  currentPage.value = 'dashboard'
}

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  currentPage.value = 'landing'
}

const handleNavigateToTickets = () => {
  currentPage.value = 'tickets'
}

const handleBackToDashboard = () => {
  currentPage.value = 'dashboard'
}
</script>

<template>
  <Layout>
    <LandingPage 
      v-if="currentPage === 'landing'"
      @login="handleLogin" 
      @get-started="handleGetStarted" 
    />

    <AuthPage 
      v-if="currentPage === 'auth'"
      @success="handleAuthSuccess" 
      @back="handleBack" 
    />

    <Dashboard
      v-if="currentPage === 'dashboard'"
      @logout="handleLogout"
      @navigate-to-tickets="handleNavigateToTickets"
    />

    <TicketManagement
      v-if="currentPage === 'tickets'"
      @logout="handleLogout"
      @back="handleBackToDashboard"
    />
  </Layout>
</template>
