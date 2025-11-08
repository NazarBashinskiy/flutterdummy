<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Platform Dashboard</h1>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card">
        <h3 class="text-sm font-medium text-gray-500">Total Tenants</h3>
        <p class="mt-2 text-3xl font-bold text-gray-900">{{ stats.total || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-500">Active</h3>
        <p class="mt-2 text-3xl font-bold text-green-600">{{ stats.active || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-500">Trial</h3>
        <p class="mt-2 text-3xl font-bold text-blue-600">{{ stats.trial || 0 }}</p>
      </div>
      <div class="card">
        <h3 class="text-sm font-medium text-gray-500">Suspended</h3>
        <p class="mt-2 text-3xl font-bold text-red-600">{{ stats.suspended || 0 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { tenantAPI } from '@/api'

const stats = ref<any>({})

onMounted(async () => {
  try {
    const response = await tenantAPI.getStats()
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
})
</script>
