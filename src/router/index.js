import { createWebHistory, createRouter } from 'vue-router'
import Login from '@/pages/Login.vue'
import DashboardHome from '@/pages/Dashboard/Home.vue'
import DashboardProfile from '@/pages/Dashboard/Profile/ProfileLayout.vue'
import DashboardFields from '@/pages/Dashboard/Fields.vue'
import DashboardArticles from '@/pages/Dashboard/Articles.vue'
import DashboardVideos from '@/pages/Dashboard/Videos.vue'
import DashboardEvents from '@/pages/Dashboard/Events.vue'
import DashboardAnnouncements from '@/pages/Dashboard/Announcements.vue'
import DashboardTeam from '@/pages/Dashboard/Team.vue'
import DashboardDirectory from '@/pages/Dashboard/Directory.vue'
import DashboardApprovalProcess from '@/pages/Dashboard/ApprovalProcess.vue'
import DashboardPayrolls from '@/pages/Dashboard/Payrolls.vue'
import DashboardClassifieds from '@/pages/Dashboard/Classifield/Classifieds.vue'
import DashboardClassifiedsNew from '@/pages/Dashboard/Classifield/NewClassified.vue'
import DashboardClassifiedsDetail from '@/pages/Dashboard/Classifield/ClassifiedDetail.vue'
import DashboardClassifiedsEdit from '@/pages/Dashboard/Classifield/EditClassified.vue'
import DashboardExpenseList from '@/pages/Dashboard/ExpenseRequest/Index.vue'
import DashboardExpenseRequestNew from '@/pages/Dashboard/ExpenseRequest/NewRequest.vue'
import DashboardPrePayRequestList from '@/pages/Dashboard/PrePayRequest/PrePayRequestList.vue'
import DashboardPrePayRequestNew from '@/pages/Dashboard/PrePayRequest/PrePayRequestNew.vue'
import DashboardPermissionRequestList from '@/pages/Dashboard/PermissionRequest/Index.vue'
import DashboardPermissionRequestNew from '@/pages/Dashboard/PermissionRequest/NewRequest.vue'
import DashboardOvertimeRequestList from '@/pages/Dashboard/OvertimeRequest/Index.vue'
import DashboardOvertimeRequestNew from '@/pages/Dashboard/OvertimeRequest/NewRequest.vue'
import DashboardProfileOrganization from '@/pages/Dashboard/Profile/Organization.vue'
import DashboardCalendar from '@/pages/Dashboard/Calendar.vue'
import DashboardSettings from '@/pages/Dashboard/Settings.vue'
import DashboardPerformance from '@/pages/Dashboard/Performance.vue'
import TestApi from '@/pages/TestApi.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword from '@/pages/ResetPassword.vue'

const routes = [
  { path: '/auth/login', component: Login },
  { path: '/auth/reset-password', component: ResetPassword },
  { path: '/dashboard/home', component: DashboardHome },
  {
    path: '/dashboard/profile/:id',
    component: DashboardProfile
  },
  { path: '/dashboard/profile/organization/:id', component: DashboardProfileOrganization },
  { path: '/dashboard/fields', component: DashboardFields },
  { path: '/dashboard/articles', component: DashboardArticles },
  { path: '/dashboard/announcements', component: DashboardAnnouncements },
  { path: '/dashboard/videos', component: DashboardVideos },
  { path: '/dashboard/payrolls', component: DashboardPayrolls },
  { path: '/dashboard/events', component: DashboardEvents },
  { path: '/dashboard/classifieds', component: DashboardClassifieds },
  { path: '/dashboard/classifieds/new', component: DashboardClassifiedsNew },
  { path: '/dashboard/classifieds/:id', component: DashboardClassifiedsDetail },
  { path: '/dashboard/classifieds/:id/edit', component: DashboardClassifiedsEdit },
  { path: '/dashboard/team', component: DashboardTeam },
  { path: '/dashboard/directory', component: DashboardDirectory },
  { path: '/dashboard/approval-process', component: DashboardApprovalProcess },
  { path: '/dashboard/permission-request/list', component: DashboardPermissionRequestList },
  { path: '/dashboard/permission-request/new', component: DashboardPermissionRequestNew },
  { path: '/dashboard/overtime-request/list', component: DashboardOvertimeRequestList },
  { path: '/dashboard/overtime-request/new', component: DashboardOvertimeRequestNew },
  { path: '/dashboard/prepay-request/list', component: DashboardPrePayRequestList },
  { path: '/dashboard/prepay-request/new', component: DashboardPrePayRequestNew },
  { path: '/dashboard/expense/list', component: DashboardExpenseList },
  { path: '/dashboard/expense/new', component: DashboardExpenseRequestNew },
  { path: '/dashboard/calendar', component: DashboardCalendar },
  { path: '/dashboard/settings', component: DashboardSettings },
  { path: '/dashboard/performance', component: DashboardPerformance },
  { path: '/test-api', component: TestApi },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
