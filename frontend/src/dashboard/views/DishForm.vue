<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">{{ isEdit ? 'Edit' : 'New' }} Dish</h1>
    <div class="card">
      <p class="text-gray-500">Dish form coming soon...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEdit = computed(() => !!route.params.id)
</script>
