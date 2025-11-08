<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            sign in to existing account
          </router-link>
        </p>
      </div>

      <form class="mt-8 space-y-6 bg-white p-8 rounded-lg shadow" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Personal Info -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              class="mt-1 input"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              class="mt-1 input"
            />
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 input"
            />
          </div>

          <div class="sm:col-span-2">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="mt-1 input"
            />
          </div>

          <!-- Company Info -->
          <div class="sm:col-span-2">
            <h3 class="text-lg font-medium text-gray-900 mt-4 mb-4">Restaurant Information</h3>
          </div>

          <div class="sm:col-span-2">
            <label for="companyName" class="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              id="companyName"
              v-model="form.companyName"
              type="text"
              required
              class="mt-1 input"
            />
          </div>

          <div class="sm:col-span-2">
            <label for="subdomain" class="block text-sm font-medium text-gray-700">Subdomain</label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                id="subdomain"
                v-model="form.subdomain"
                type="text"
                required
                pattern="[a-z0-9-]+"
                class="flex-1 input rounded-none rounded-l-md"
                placeholder="my-restaurant"
              />
              <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                .menuplatform.com
              </span>
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="mt-1 input"
            />
          </div>

          <div>
            <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
            <input
              id="country"
              v-model="form.country"
              type="text"
              required
              class="mt-1 input"
            />
          </div>

          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
            <input
              id="city"
              v-model="form.city"
              type="text"
              required
              class="mt-1 input"
            />
          </div>

          <div>
            <label for="plan" class="block text-sm font-medium text-gray-700">Plan</label>
            <select
              id="plan"
              v-model="form.plan"
              class="mt-1 input"
            >
              <option value="free">Free (14-day trial)</option>
              <option value="starter">Starter - $29/month</option>
              <option value="professional">Professional - $99/month</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary"
          >
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  companyName: '',
  subdomain: '',
  phone: '',
  country: '',
  city: '',
  plan: 'free'
})

const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  try {
    await authStore.register(form.value)
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>
