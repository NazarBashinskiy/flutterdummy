<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">
      Welcome, {{ user?.firstName }}!
    </h1>
    <div class="card">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Start</h2>
      <div class="space-y-4">
        <router-link to="/dashboard/restaurants" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <h3 class="font-medium text-gray-900">1. Create your restaurant</h3>
          <p class="text-sm text-gray-500">Add your restaurant information and branding</p>
        </router-link>
        <router-link to="/dashboard/menu" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <h3 class="font-medium text-gray-900">2. Build your menu</h3>
          <p class="text-sm text-gray-500">Add categories and dishes to your menu</p>
        </router-link>
        <router-link to="/dashboard/qr-codes" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
          <h3 class="font-medium text-gray-900">3. Generate QR codes</h3>
          <p class="text-sm text-gray-500">Create QR codes for your tables</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
