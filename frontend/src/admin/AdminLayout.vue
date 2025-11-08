<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-gray-900">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <h1 class="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.path"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.path === item.path
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            ]"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- User Menu -->
        <div class="p-4 border-t border-gray-800">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-white">{{ user?.firstName }} {{ user?.lastName }}</p>
              <p class="text-xs text-gray-400">Super Admin</p>
            </div>
            <button
              @click="handleLogout"
              class="ml-2 p-2 text-gray-400 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="pl-64">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const navigation = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Tenants', path: '/admin/tenants' }
]

function handleLogout() {
  authStore.logout()
}
</script>
