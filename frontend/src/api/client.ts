import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status
      const data: any = error.response.data

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          toast.error('Session expired. Please login again.')
          break

        case 403:
          toast.error('You do not have permission to perform this action.')
          break

        case 404:
          toast.error('Resource not found.')
          break

        case 422:
        case 400:
          if (data.details && Array.isArray(data.details)) {
            data.details.forEach((err: any) => {
              toast.error(err.message)
            })
          } else {
            toast.error(data.error || 'Validation error')
          }
          break

        case 500:
          toast.error('Server error. Please try again later.')
          break

        default:
          toast.error(data.error || 'An error occurred')
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.')
    } else {
      toast.error('An unexpected error occurred')
    }

    return Promise.reject(error)
  }
)

export default apiClient
