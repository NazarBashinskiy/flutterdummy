import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authAPI } from '@/api'
import type { LoginCredentials, RegisterData } from '@/api'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const tenant = ref<any>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role)
  const isSuperAdmin = computed(() => userRole.value === 'super_admin')
  const isOwner = computed(() => userRole.value === 'owner')
  const isAdmin = computed(() => userRole.value === 'admin')

  async function login(credentials: LoginCredentials) {
    loading.value = true
    try {
      const response = await authAPI.login(credentials)
      const { token: authToken, user: userData, tenant: tenantData } = response.data

      token.value = authToken
      user.value = userData
      tenant.value = tenantData

      localStorage.setItem('token', authToken)
      localStorage.setItem('user', JSON.stringify(userData))
      if (tenantData) {
        localStorage.setItem('tenant', JSON.stringify(tenantData))
      }

      toast.success('Login successful!')

      // Redirect based on role
      if (userData.role === 'super_admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function register(data: RegisterData) {
    loading.value = true
    try {
      const response = await authAPI.register(data)
      const { token: authToken, user: userData, tenant: tenantData } = response.data

      token.value = authToken
      user.value = userData
      tenant.value = tenantData

      localStorage.setItem('token', authToken)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('tenant', JSON.stringify(tenantData))

      toast.success('Registration successful! Welcome aboard!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function restoreSession() {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    const savedTenant = localStorage.getItem('tenant')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      if (savedTenant) {
        tenant.value = JSON.parse(savedTenant)
      }

      // Verify token is still valid
      try {
        const response = await authAPI.getCurrentUser()
        user.value = response.data.user
        tenant.value = response.data.tenant
      } catch (error) {
        logout()
      }
    }
  }

  function logout() {
    token.value = null
    user.value = null
    tenant.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tenant')

    toast.info('Logged out successfully')
    router.push('/login')
  }

  return {
    user,
    tenant,
    token,
    loading,
    isAuthenticated,
    userRole,
    isSuperAdmin,
    isOwner,
    isAdmin,
    login,
    register,
    restoreSession,
    logout
  }
})
