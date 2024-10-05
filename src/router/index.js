import { createWebHistory, createRouter } from 'vue-router'
import Login from '@/pages/Login.vue'
import DashboardHome from '@/pages/Dashboard/Home.vue'
import DashboardProfile from '@/pages/Dashboard/Profile/Index.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard/home', component: DashboardHome },
  { path: '/dashboard/profile', component: DashboardProfile },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
