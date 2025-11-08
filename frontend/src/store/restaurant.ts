import { defineStore } from 'pinia'
import { ref } from 'vue'
import { restaurantAPI } from '@/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref<any[]>([])
  const currentRestaurant = ref<any>(null)
  const loading = ref(false)

  async function fetchRestaurants() {
    loading.value = true
    try {
      const response = await restaurantAPI.getAll()
      restaurants.value = response.data.restaurants
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchRestaurantById(id: string) {
    loading.value = true
    try {
      const response = await restaurantAPI.getById(id)
      currentRestaurant.value = response.data.restaurant
      return response.data.restaurant
    } catch (error) {
      console.error('Failed to fetch restaurant:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createRestaurant(data: any) {
    loading.value = true
    try {
      const response = await restaurantAPI.create(data)
      restaurants.value.push(response.data.restaurant)
      toast.success('Restaurant created successfully!')
      return response.data.restaurant
    } catch (error) {
      console.error('Failed to create restaurant:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateRestaurant(id: string, data: any) {
    loading.value = true
    try {
      const response = await restaurantAPI.update(id, data)
      const index = restaurants.value.findIndex((r) => r._id === id)
      if (index !== -1) {
        restaurants.value[index] = response.data.restaurant
      }
      if (currentRestaurant.value?._id === id) {
        currentRestaurant.value = response.data.restaurant
      }
      toast.success('Restaurant updated successfully!')
      return response.data.restaurant
    } catch (error) {
      console.error('Failed to update restaurant:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteRestaurant(id: string) {
    loading.value = true
    try {
      await restaurantAPI.delete(id)
      restaurants.value = restaurants.value.filter((r) => r._id !== id)
      toast.success('Restaurant deleted successfully!')
    } catch (error) {
      console.error('Failed to delete restaurant:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  function setCurrentRestaurant(restaurant: any) {
    currentRestaurant.value = restaurant
    localStorage.setItem('currentRestaurant', JSON.stringify(restaurant))
  }

  function loadCurrentRestaurant() {
    const saved = localStorage.getItem('currentRestaurant')
    if (saved) {
      currentRestaurant.value = JSON.parse(saved)
    }
  }

  return {
    restaurants,
    currentRestaurant,
    loading,
    fetchRestaurants,
    fetchRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    setCurrentRestaurant,
    loadCurrentRestaurant
  }
})
