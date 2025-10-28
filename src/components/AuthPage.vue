<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <div class="inline-flex items-center space-x-2 mb-4">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <CheckCircle2 class="w-6 h-6 text-white" />
          </div>
          <span class="text-slate-900">Seytic</span>
        </div>
        <h1 class="text-slate-900 mb-2">
          {{ mode === 'login' ? 'Welcome Back' : 'Create Account' }}
        </h1>
        <p class="text-slate-600">
          {{ mode === 'login'
            ? 'Sign in to access your dashboard'
            : 'Get started with TicketFlow today' }}
        </p>
      </div>

      <Card class="p-8 shadow-xl">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="errors.general" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {{ errors.general }}
          </div>

          <div v-if="mode === 'signup'" class="space-y-2">
            <Label for="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              v-model="formData.name"
              :disabled="isLoading"
            />
            <p v-if="errors.name" class="text-red-600">{{ errors.name }}</p>
          </div>

          <div class="space-y-2">
            <Label for="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              v-model="formData.email"
              :disabled="isLoading"
            />
            <p v-if="errors.email" class="text-red-600">{{ errors.email }}</p>
          </div>

          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              v-model="formData.password"
              :disabled="isLoading"
            />
            <p v-if="errors.password" class="text-red-600">{{ errors.password }}</p>
          </div>

          <div v-if="mode === 'signup'" class="space-y-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              v-model="formData.confirmPassword"
              :disabled="isLoading"
            />
            <p v-if="errors.confirmPassword" class="text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading
              ? 'Please wait...'
              : mode === 'login'
              ? 'Sign In'
              : 'Create Account' }}
          </Button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-slate-600">
            {{ mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? ' }}
            <button
              type="button"
              @click="toggleMode"
              class="text-blue-600 hover:underline"
              :disabled="isLoading"
            >
              {{ mode === 'login' ? 'Sign up' : 'Sign in' }}
            </button>
          </p>
        </div>
      </Card>

      <div class="mt-6 text-center">
        <button
          type="button"
          @click="onBack"
          class="text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Back to home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'
import Label from './ui/Label.vue'
import Card from './ui/Card.vue'
import { login, signup } from '../utils/auth'
import { toast } from '../utils/toast'

const props = defineProps({
  onSuccess: {
    type: Function,
    required: true
  },
  onBack: {
    type: Function,
    required: true
  },
  initialMode: {
    type: String,
    default: 'login'
  }
})

const mode = ref(props.initialMode)
const formData = reactive({
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
})
const errors = reactive({})
const isLoading = ref(false)

const validateForm = () => {
  // Clear existing errors first
  Object.keys(errors).forEach(key => delete errors[key])
  
  const newErrors = {}

  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!formData.password) {
    newErrors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  if (mode.value === 'signup') {
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
  }
  
  // Set new errors
  Object.assign(errors, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))

  try {
    if (mode.value === 'login') {
      const result = login(formData.email, formData.password)
      if (result.success) {
        toast.success('Login successful!')
        props.onSuccess()
      } else {
        toast.error(result.message || 'Login failed')
      }
    } else {
      const result = signup(formData.email, formData.password, formData.name)
      if (result.success) {
        toast.success('Account created successfully!')
        props.onSuccess()
      } else {
        toast.error(result.message || 'Signup failed')
      }
    }
  } finally {
    isLoading.value = false
  }
}

const handleInputChange = (field, value) => {
  formData[field] = value
  if (errors[field]) {
    delete errors[field]
  }
}

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'signup' : 'login'
  Object.keys(errors).forEach(key => delete errors[key])
}
</script>
