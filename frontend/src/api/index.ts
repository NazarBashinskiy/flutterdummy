import apiClient from './client'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  companyName: string
  subdomain: string
  phone: string
  country: string
  city: string
  plan?: string
}

// ==================== AUTH API ====================
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiClient.post('/auth/login', credentials),

  register: (data: RegisterData) =>
    apiClient.post('/auth/register', data),

  getCurrentUser: () =>
    apiClient.get('/auth/me'),

  updateProfile: (data: any) =>
    apiClient.put('/auth/profile', data)
}

// ==================== TENANT API ====================
export const tenantAPI = {
  getAll: (params?: any) =>
    apiClient.get('/tenants', { params }),

  getById: (id: string) =>
    apiClient.get(`/tenants/${id}`),

  update: (id: string, data: any) =>
    apiClient.put(`/tenants/${id}`, data),

  suspend: (id: string, reason: string) =>
    apiClient.post(`/tenants/${id}/suspend`, { reason }),

  delete: (id: string) =>
    apiClient.delete(`/tenants/${id}`),

  getStats: () =>
    apiClient.get('/tenants/stats')
}

// ==================== RESTAURANT API ====================
export const restaurantAPI = {
  create: (data: any) =>
    apiClient.post('/restaurants', data),

  getAll: (params?: any) =>
    apiClient.get('/restaurants', { params }),

  getById: (id: string) =>
    apiClient.get(`/restaurants/${id}`),

  update: (id: string, data: any) =>
    apiClient.put(`/restaurants/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/restaurants/${id}`)
}

// ==================== MENU API ====================
export const menuAPI = {
  // Categories
  createCategory: (data: any) =>
    apiClient.post('/menu/categories', data),

  getCategories: (restaurantId: string) =>
    apiClient.get(`/menu/restaurants/${restaurantId}/categories`),

  updateCategory: (id: string, data: any) =>
    apiClient.put(`/menu/categories/${id}`, data),

  deleteCategory: (id: string) =>
    apiClient.delete(`/menu/categories/${id}`),

  // Dishes
  createDish: (data: any) =>
    apiClient.post('/menu/dishes', data),

  getDishes: (restaurantId: string, params?: any) =>
    apiClient.get(`/menu/restaurants/${restaurantId}/dishes`, { params }),

  getDishById: (id: string) =>
    apiClient.get(`/menu/dishes/${id}`),

  updateDish: (id: string, data: any) =>
    apiClient.put(`/menu/dishes/${id}`, data),

  deleteDish: (id: string) =>
    apiClient.delete(`/menu/dishes/${id}`),

  bulkUpdateDishes: (dishIds: string[], updates: any) =>
    apiClient.post('/menu/dishes/bulk-update', { dishIds, updates })
}

// ==================== QR CODE API ====================
export const qrAPI = {
  create: (data: any) =>
    apiClient.post('/qr', data),

  bulkCreate: (data: any) =>
    apiClient.post('/qr/bulk', data),

  getAll: (restaurantId: string, params?: any) =>
    apiClient.get(`/qr/restaurants/${restaurantId}`, { params }),

  getImage: (id: string, size?: number) =>
    apiClient.get(`/qr/${id}/image`, { params: { size } }),

  getAnalytics: (restaurantId: string) =>
    apiClient.get(`/qr/restaurants/${restaurantId}/analytics`),

  update: (id: string, data: any) =>
    apiClient.put(`/qr/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/qr/${id}`)
}

// ==================== PUBLIC API ====================
export const publicAPI = {
  getMenu: (subdomain: string, lang?: string) =>
    apiClient.get(`/public/${subdomain}/menu`, { params: { lang } }),

  getDish: (subdomain: string, dishId: string) =>
    apiClient.get(`/public/${subdomain}/dishes/${dishId}`),

  searchDishes: (subdomain: string, params: any) =>
    apiClient.get(`/public/${subdomain}/search`, { params }),

  trackQRScan: (code: string) =>
    apiClient.post(`/public/qr/${code}/scan`)
}

export default {
  auth: authAPI,
  tenant: tenantAPI,
  restaurant: restaurantAPI,
  menu: menuAPI,
  qr: qrAPI,
  public: publicAPI
}
