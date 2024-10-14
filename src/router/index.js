import { createWebHistory, createRouter } from 'vue-router'
import Login from '@/pages/Login.vue'
import DashboardHome from '@/pages/Dashboard/Home.vue'
import DashboardProfile from '@/pages/Dashboard/Profile/Index.vue'
import DashboardFields from '@/pages/Dashboard/Fields.vue'
import DashboardTeam from '@/pages/Dashboard/Team.vue'
import DashboardDirectory from '@/pages/Dashboard/Directory.vue'
import DashboardApprovalProcess from '@/pages/Dashboard/ApprovalProcess.vue'
import DashboardPermissionRequest from '@/pages/Dashboard/PermissionRequest.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard/home', component: DashboardHome },
  { path: '/dashboard/profile', component: DashboardProfile },
  { path: '/dashboard/fields', component: DashboardFields },
  { path: '/dashboard/team', component: DashboardTeam },
  { path: '/dashboard/directory', component: DashboardDirectory },
  { path: '/dashboard/approval-process', component: DashboardApprovalProcess },
  { path: '/dashboard/permission-request', component: DashboardPermissionRequest },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
