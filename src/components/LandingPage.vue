<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-200 to-white">
    <!-- Navigation -->
    <nav class="bg-white border-b border-slate-200">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TicketIcon class="w-5 h-5 text-white" />
            </div>
            <span class="text-slate-900">SeyTic</span>
          </div>
          <div class="flex items-center gap-4">
            <Button variant="ghost" @click="onLogin">
              Login
            </Button>
            <Button @click="onGetStarted">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-slate-900 mb-6">
            Manage Tickets with Ease
          </h1>
          <p class="text-slate-600 mb-8 max-w-2xl mx-auto">
            Simplify your workflow, manage issues effortlessly, and collaborate smoothly with Seytic, the modern ticket management solution built for teams of every size.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" @click="onGetStarted">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" @click="onLogin">
              Sign In
            </Button>
          </div>
        </div>
      </div>

      <!-- Background Decorations -->
      <div class="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <!-- Wavy Bottom -->
      <div class="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-slate-900 mb-4">
            Everything you need to manage tickets
          </h2>
          <p class="text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to help you stay organized and productive
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            :icon="Zap"
            title="Lightning Fast"
            description="Create, update, and resolve tickets in seconds with our intuitive interface"
          />
          <FeatureCard
            :icon="Shield"
            title="Secure & Reliable"
            description="Your data is protected with enterprise-grade security measures"
          />
          <FeatureCard
            :icon="Users"
            title="Team Collaboration"
            description="Work together seamlessly with real-time updates and notifications"
          />
          <FeatureCard
            :icon="CheckCircle2"
            title="Track Progress"
            description="Monitor ticket status and get insights with comprehensive analytics"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-blue-600 text-white">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="mb-4">
          Ready to go ?
        </h2>
        <p class="mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of teams already using SeyTic to manage their workflows
        </p>
        <Button size="lg" variant="secondary" @click="onGetStarted">
          Start Free Trial
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { TicketIcon, CheckCircle2, Zap, Shield, Users } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import FeatureCard from './FeatureCard.vue'

defineProps({
  onLogin: {
    type: Function,
    required: true
  },
  onGetStarted: {
    type: Function,
    required: true
  }
})
</script>



