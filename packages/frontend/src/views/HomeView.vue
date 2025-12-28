<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section with Mockup -->
    <div class="hero min-h-[90vh] bg-gradient-to-br from-primary to-secondary">
      <div class="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl">
        <!-- Mockup -->
        <div class="mockup-window bg-base-100 border lg:w-1/2 shadow-2xl">
          <div class="bg-base-200 flex justify-center px-4 py-16">
            <div class="grid grid-cols-3 gap-4">
              <div
                class="stat bg-primary text-primary-content rounded-lg shadow-lg"
              >
                <div class="stat-title text-xs">Ideas</div>
                <div class="stat-value text-2xl">127</div>
              </div>
              <div
                class="stat bg-secondary text-secondary-content rounded-lg shadow-lg"
              >
                <div class="stat-title text-xs">Maps</div>
                <div class="stat-value text-2xl">24</div>
              </div>
              <div
                class="stat bg-accent text-accent-content rounded-lg shadow-lg"
              >
                <div class="stat-title text-xs">Nodes</div>
                <div class="stat-value text-2xl">892</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="lg:w-1/2 text-white">
          <div class="badge badge-accent badge-lg mb-4">Open Source</div>
          <h1 class="text-5xl lg:text-6xl font-bold mb-6">MindMapper</h1>
          <p class="text-xl lg:text-2xl text-white/90 mb-4">
            Organize your thoughts visually
          </p>
          <p class="text-lg text-white/70 mb-8">
            Create beautiful, interactive mind maps with drag-and-drop
            simplicity. Perfect for brainstorming, planning, and organizing
            ideas.
          </p>

          <div class="flex gap-4 flex-wrap">
            <router-link to="/register" class="btn btn-accent btn-lg gap-2">
              <Zap :size="20" />
              Start Free
            </router-link>
            <router-link
              to="/login"
              class="btn btn-outline btn-white btn-lg gap-2"
            >
              <LogIn :size="20" />
              Sign In
            </router-link>
          </div>

          <!-- Social proof -->
          <div class="flex items-center gap-6 mt-8 text-white/60">
            <div class="flex items-center gap-2">
              <Star :size="16" fill="currentColor" />
              <span class="text-sm">Open Source</span>
            </div>
            <div class="flex items-center gap-2">
              <Users :size="16" />
              <span class="text-sm">Free Forever</span>
            </div>
            <div class="flex items-center gap-2">
              <Shield :size="16" />
              <span class="text-sm">Privacy First</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
      <div class="stat">
        <div class="stat-figure text-primary">
          <Layers :size="32" />
        </div>
        <div class="stat-title">Total Nodes</div>
        <div class="stat-value text-primary">Unlimited</div>
        <div class="stat-desc">Create as many as you need</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <Zap :size="32" />
        </div>
        <div class="stat-title">Real-time Save</div>
        <div class="stat-value text-secondary">Auto</div>
        <div class="stat-desc">Never lose your work</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-accent">
          <Palette :size="32" />
        </div>
        <div class="stat-title">Themes</div>
        <div class="stat-value text-accent">6+</div>
        <div class="stat-desc">Beautiful DaisyUI themes</div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 px-6 bg-base-100">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Powerful Features</h2>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
            Everything you need to create stunning mind maps, built with modern
            web technologies.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="badge badge-primary badge-lg p-4">
                  <GitBranch :size="24" />
                </div>
                <h3 class="card-title">Hierarchical Structure</h3>
              </div>
              <p class="text-base-content/70">
                Create parent-child relationships with intuitive drag-and-drop
                connections.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="badge badge-secondary badge-lg p-4">
                  <Sparkles :size="24" />
                </div>
                <h3 class="card-title">Auto-Layout</h3>
              </div>
              <p class="text-base-content/70">
                4 beautiful layout presets powered by Dagre algorithm for
                perfect organization.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="badge badge-accent badge-lg p-4">
                  <Keyboard :size="24" />
                </div>
                <h3 class="card-title">Keyboard Shortcuts</h3>
              </div>
              <p class="text-base-content/70">
                Work faster with powerful shortcuts: Ctrl+N to add, Esc to
                close, and more.
              </p>
            </div>
          </div>

          <!-- Feature 4 -->
          <div
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="badge badge-info badge-lg p-4">
                  <Save :size="24" />
                </div>
                <h3 class="card-title">Auto-Save</h3>
              </div>
              <p class="text-base-content/70">
                Your changes are automatically saved as you work. Never lose
                progress.
              </p>
            </div>
          </div>

          <!-- Feature 5 -->
          <div
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="badge badge-success badge-lg p-4">
                  <Users :size="24" />
                </div>
                <h3 class="card-title">User Avatars</h3>
              </div>
              <p class="text-base-content/70">
                Beautiful DiceBear avatars with 4 different styles to choose
                from.
              </p>
            </div>
          </div>

          <!-- Feature 6 -->
          <div
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4">
                <div class="badge badge-warning badge-lg p-4">
                  <Palette :size="24" />
                </div>
                <h3 class="card-title">6 Themes</h3>
              </div>
              <p class="text-base-content/70">
                Switch between light, dark, cupcake, retro, forest, and
                wireframe themes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- How it works -->
    <div class="py-20 px-6 bg-base-200">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">How It Works</h2>
          <p class="text-lg text-base-content/70">
            Get started in 3 simple steps
          </p>
        </div>

        <ul class="steps steps-vertical lg:steps-horizontal w-full">
          <li class="step step-primary">
            <div class="text-left">
              <div class="font-bold text-lg mb-2">1. Create Account</div>
              <div class="text-sm text-base-content/70">
                Sign up for free in seconds
              </div>
            </div>
          </li>
          <li class="step step-primary">
            <div class="text-left">
              <div class="font-bold text-lg mb-2">2. Create Your Map</div>
              <div class="text-sm text-base-content/70">
                Add nodes and organize ideas
              </div>
            </div>
          </li>
          <li class="step step-primary">
            <div class="text-left">
              <div class="font-bold text-lg mb-2">3. Collaborate</div>
              <div class="text-sm text-base-content/70">
                Share and work together
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="hero py-20 bg-gradient-to-r from-primary to-secondary">
      <div class="hero-content text-center text-white">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p class="text-xl mb-8 text-white/90">
            Join now and start organizing your ideas with beautiful mind maps.
          </p>
          <router-link to="/register" class="btn btn-accent btn-lg gap-2">
            <Zap :size="20" />
            Create Free Account
          </router-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer :github-url="githubUrl" @open-sponsor="openSponsorModal" />

    <!-- Sponsor Modal -->
    <SponsorModal
      :show="sponsorModalOpen"
      :buy-me-a-coffee-url="buyMeACoffeeUrl"
      :kofi-url="kofiUrl"
      :github-sponsors-url="githubSponsorsUrl"
      :github-repo-url="githubUrl"
      @close="closeSponsorModal"
    />
  </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
import SponsorModal from '@/components/SponsorModal.vue'
import { APP_CONFIG } from '@/config/app.js'
import {
  GitBranch,
  Keyboard,
  Layers,
  LogIn,
  Palette,
  Save,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-vue-next'
import { ref } from 'vue'

// Import links from centralized config
const {
  github: githubUrl,
  buyMeACoffee: buyMeACoffeeUrl,
  kofi: kofiUrl,
  githubSponsors: githubSponsorsUrl,
} = APP_CONFIG.links

const sponsorModalOpen = ref(false)

const openSponsorModal = () => {
  sponsorModalOpen.value = true
}

const closeSponsorModal = () => {
  sponsorModalOpen.value = false
}
</script>
