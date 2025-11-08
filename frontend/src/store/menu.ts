import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { menuAPI } from '@/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useMenuStore = defineStore('menu', () => {
  const categories = ref<any[]>([])
  const dishes = ref<any[]>([])
  const currentDish = ref<any>(null)
  const loading = ref(false)

  const dishesByCategory = computed(() => {
    const grouped: Record<string, any[]> = {}
    dishes.value.forEach((dish) => {
      if (!grouped[dish.categoryId]) {
        grouped[dish.categoryId] = []
      }
      grouped[dish.categoryId].push(dish)
    })
    return grouped
  })

  // ==================== CATEGORIES ====================
  async function fetchCategories(restaurantId: string) {
    loading.value = true
    try {
      const response = await menuAPI.getCategories(restaurantId)
      categories.value = response.data.categories
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      loading.value = false
    }
  }

  async function createCategory(data: any) {
    loading.value = true
    try {
      const response = await menuAPI.createCategory(data)
      categories.value.push(response.data.category)
      toast.success('Category created successfully!')
      return response.data.category
    } catch (error) {
      console.error('Failed to create category:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateCategory(id: string, data: any) {
    loading.value = true
    try {
      const response = await menuAPI.updateCategory(id, data)
      const index = categories.value.findIndex((c) => c._id === id)
      if (index !== -1) {
        categories.value[index] = response.data.category
      }
      toast.success('Category updated successfully!')
      return response.data.category
    } catch (error) {
      console.error('Failed to update category:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteCategory(id: string) {
    loading.value = true
    try {
      await menuAPI.deleteCategory(id)
      categories.value = categories.value.filter((c) => c._id !== id)
      toast.success('Category deleted successfully!')
    } catch (error) {
      console.error('Failed to delete category:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // ==================== DISHES ====================
  async function fetchDishes(restaurantId: string, params?: any) {
    loading.value = true
    try {
      const response = await menuAPI.getDishes(restaurantId, params)
      dishes.value = response.data.dishes
      return response.data
    } catch (error) {
      console.error('Failed to fetch dishes:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchDishById(id: string) {
    loading.value = true
    try {
      const response = await menuAPI.getDishById(id)
      currentDish.value = response.data.dish
      return response.data.dish
    } catch (error) {
      console.error('Failed to fetch dish:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createDish(data: any) {
    loading.value = true
    try {
      const response = await menuAPI.createDish(data)
      dishes.value.push(response.data.dish)
      toast.success('Dish created successfully!')
      return response.data.dish
    } catch (error) {
      console.error('Failed to create dish:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateDish(id: string, data: any) {
    loading.value = true
    try {
      const response = await menuAPI.updateDish(id, data)
      const index = dishes.value.findIndex((d) => d._id === id)
      if (index !== -1) {
        dishes.value[index] = response.data.dish
      }
      if (currentDish.value?._id === id) {
        currentDish.value = response.data.dish
      }
      toast.success('Dish updated successfully!')
      return response.data.dish
    } catch (error) {
      console.error('Failed to update dish:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteDish(id: string) {
    loading.value = true
    try {
      await menuAPI.deleteDish(id)
      dishes.value = dishes.value.filter((d) => d._id !== id)
      toast.success('Dish deleted successfully!')
    } catch (error) {
      console.error('Failed to delete dish:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function bulkUpdateDishes(dishIds: string[], updates: any) {
    loading.value = true
    try {
      await menuAPI.bulkUpdateDishes(dishIds, updates)
      // Refresh dishes
      toast.success(`${dishIds.length} dishes updated successfully!`)
    } catch (error) {
      console.error('Failed to bulk update dishes:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    dishes,
    currentDish,
    loading,
    dishesByCategory,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchDishes,
    fetchDishById,
    createDish,
    updateDish,
    deleteDish,
    bulkUpdateDishes
  }
})
