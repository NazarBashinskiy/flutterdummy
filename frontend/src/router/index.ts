import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresSuperAdmin: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/admin/views/Dashboard.vue')
      },
      {
        path: 'tenants',
        name: 'AdminTenants',
        component: () => import('@/admin/views/Tenants.vue')
      },
      {
        path: 'tenants/:id',
        name: 'AdminTenantDetail',
        component: () => import('@/admin/views/TenantDetail.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/dashboard/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard/home'
      },
      {
        path: 'home',
        name: 'DashboardHome',
        component: () => import('@/dashboard/views/Home.vue')
      },
      {
        path: 'restaurants',
        name: 'Restaurants',
        component: () => import('@/dashboard/views/Restaurants.vue')
      },
      {
        path: 'restaurants/:id',
        name: 'RestaurantDetail',
        component: () => import('@/dashboard/views/RestaurantDetail.vue')
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/dashboard/views/Menu.vue')
      },
      {
        path: 'menu/dishes/new',
        name: 'NewDish',
        component: () => import('@/dashboard/views/DishForm.vue')
      },
      {
        path: 'menu/dishes/:id/edit',
        name: 'EditDish',
        component: () => import('@/dashboard/views/DishForm.vue')
      },
      {
        path: 'qr-codes',
        name: 'QRCodes',
        component: () => import('@/dashboard/views/QRCodes.vue')
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/dashboard/views/Analytics.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/dashboard/views/Settings.vue')
      }
    ]
  },
  {
    path: '/menu/:subdomain',
    name: 'PublicMenu',
    component: () => import('@/guest/GuestMenu.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresSuperAdmin && !authStore.isSuperAdmin) {
    next('/dashboard')
  } else if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    if (authStore.isSuperAdmin) {
      next('/admin')
    } else {
      next('/dashboard')
    }
  } else {
    next()
  }
})

export default router
