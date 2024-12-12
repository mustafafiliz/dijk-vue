import { createWebHistory, createRouter } from 'vue-router'

// Auth Pages
import Login from '@/pages/Login.vue'
import ResetPassword from '@/pages/ResetPassword.vue'

// Dashboard Pages
import DashboardHome from '@/pages/Dashboard/Home.vue'
import DashboardProfile from '@/pages/Dashboard/Profile/ProfileLayout.vue'
import DashboardProfileOrganization from '@/pages/Dashboard/Profile/Organization.vue'
import DashboardFields from '@/pages/Dashboard/Fields.vue'
import DashboardArticles from '@/pages/Dashboard/Articles.vue'
import DashboardVideos from '@/pages/Dashboard/Videos.vue'
import DashboardEvents from '@/pages/Dashboard/Events.vue'
import DashboardAnnouncements from '@/pages/Dashboard/Announcements.vue'
import DashboardTeam from '@/pages/Dashboard/Team.vue'
import DashboardDirectory from '@/pages/Dashboard/Directory.vue'
import DashboardApprovalProcess from '@/pages/Dashboard/ApprovalProcess.vue'
import DashboardPayrolls from '@/pages/Dashboard/Payrolls.vue'
import DashboardCalendar from '@/pages/Dashboard/Calendar.vue'
import DashboardSettings from '@/pages/Dashboard/Settings.vue'
import DashboardPerformance from '@/pages/Dashboard/Performance.vue'

// Classified Pages
import DashboardClassifieds from '@/pages/Dashboard/Classifield/Classifieds.vue'
import DashboardClassifiedsNew from '@/pages/Dashboard/Classifield/NewClassified.vue'
import DashboardClassifiedsDetail from '@/pages/Dashboard/Classifield/ClassifiedDetail.vue'
import DashboardClassifiedsEdit from '@/pages/Dashboard/Classifield/EditClassified.vue'

// Request Pages
import DashboardExpenseList from '@/pages/Dashboard/ExpenseRequest/Index.vue'
import DashboardExpenseRequestNew from '@/pages/Dashboard/ExpenseRequest/NewRequest.vue'
import DashboardPrePayRequestList from '@/pages/Dashboard/PrePayRequest/PrePayRequestList.vue'
import DashboardPrePayRequestNew from '@/pages/Dashboard/PrePayRequest/PrePayRequestNew.vue'
import DashboardInstallmentRequestList from '@/pages/Dashboard/InstallmentRequest/InstallmentRequestList.vue'
import DashboardInstallmentRequestNew from '@/pages/Dashboard/InstallmentRequest/InstallmentRequestNew.vue'
import DashboardPermissionRequestList from '@/pages/Dashboard/PermissionRequest/Index.vue'
import DashboardPermissionRequestNew from '@/pages/Dashboard/PermissionRequest/NewRequest.vue'
import DashboardOvertimeRequestList from '@/pages/Dashboard/OvertimeRequest/Index.vue'
import DashboardOvertimeRequestNew from '@/pages/Dashboard/OvertimeRequest/NewRequest.vue'

// Other Pages
import NotFound from '@/pages/NotFound.vue'

const routes = [
  // Auth Routes
  {
    path: '/auth/login',
    component: Login,
    meta: { title: 'Diji Portal - Giriş Yap' }
  },
  {
    path: '/auth/reset-password',
    component: ResetPassword,
    meta: { title: 'Diji Portal - Şifre Sıfırlama' }
  },

  // Dashboard Routes
  {
    path: '/dashboard/home',
    component: DashboardHome,
    meta: { title: 'Diji Portal - Ana Sayfa' }
  },
  {
    path: '/dashboard/profile/:id',
    component: DashboardProfile,
    meta: { title: 'Diji Portal - Profil' }
  },
  {
    path: '/dashboard/profile/organization/:id',
    component: DashboardProfileOrganization,
    meta: { title: 'Diji Portal - Organizasyon' }
  },
  {
    path: '/dashboard/fields',
    component: DashboardFields,
    meta: { title: 'Diji Portal - Alanlar' }
  },
  {
    path: '/dashboard/articles',
    component: DashboardArticles,
    meta: { title: 'Diji Portal - Haberler' }
  },
  {
    path: '/dashboard/announcements',
    component: DashboardAnnouncements,
    meta: { title: 'Diji Portal - Duyurular' }
  },
  {
    path: '/dashboard/videos',
    component: DashboardVideos,
    meta: { title: 'Diji Portal - Eğitimler' }
  },
  {
    path: '/dashboard/payrolls',
    component: DashboardPayrolls,
    meta: { title: 'Diji Portal - Bordro' }
  },
  {
    path: '/dashboard/events',
    component: DashboardEvents,
    meta: { title: 'Diji Portal - Etkinlikler' }
  },

  // Classified Routes
  {
    path: '/dashboard/classifieds',
    component: DashboardClassifieds,
    meta: { title: 'Diji Portal - İlanlar' }
  },
  {
    path: '/dashboard/classifieds/new',
    component: DashboardClassifiedsNew,
    meta: { title: 'Diji Portal - Yeni İlan' }
  },
  {
    path: '/dashboard/classifieds/:id',
    component: DashboardClassifiedsDetail,
    meta: { title: 'Diji Portal - İlan Detay' }
  },
  {
    path: '/dashboard/classifieds/:id/edit',
    component: DashboardClassifiedsEdit,
    meta: { title: 'Diji Portal - İlan Düzenle' }
  },

  // Team & Directory Routes
  {
    path: '/dashboard/team',
    component: DashboardTeam,
    meta: { title: 'Diji Portal - Takım' }
  },
  {
    path: '/dashboard/directory',
    component: DashboardDirectory,
    meta: { title: 'Diji Portal - Rehber' }
  },

  // Request Routes
  {
    path: '/dashboard/approval-process',
    component: DashboardApprovalProcess,
    meta: { title: 'Diji Portal - Onayımdaki Süreçler' }
  },
  {
    path: '/dashboard/permission-request/list',
    component: DashboardPermissionRequestList,
    meta: { title: 'Diji Portal - İzin Talepleri' }
  },
  {
    path: '/dashboard/permission-request/new',
    component: DashboardPermissionRequestNew,
    meta: { title: 'Diji Portal - Yeni İzin Talebi' }
  },
  {
    path: '/dashboard/overtime-request/list',
    component: DashboardOvertimeRequestList,
    meta: { title: 'Diji Portal - Mesai Talepleri' }
  },
  {
    path: '/dashboard/overtime-request/new',
    component: DashboardOvertimeRequestNew,
    meta: { title: 'Diji Portal - Yeni Mesai Talebi' }
  },
  {
    path: '/dashboard/prepay-request/list',
    component: DashboardPrePayRequestList,
    meta: { title: 'Diji Portal - Avans Talepleri' }
  },
  {
    path: '/dashboard/prepay-request/new',
    component: DashboardPrePayRequestNew,
    meta: { title: 'Diji Portal - Yeni Avans Talebi' }
  },
  {
    path: '/dashboard/installment-request/list',
    component: DashboardInstallmentRequestList,
    meta: { title: 'Diji Portal - Taksit Talepleri' }
  },
  {
    path: '/dashboard/installment-request/new',
    component: DashboardInstallmentRequestNew,
    meta: { title: 'Diji Portal - Yeni Taksit Talebi' }
  },
  {
    path: '/dashboard/expense/list',
    component: DashboardExpenseList,
    meta: { title: 'Diji Portal - Masraf Talepleri' }
  },
  {
    path: '/dashboard/expense/new',
    component: DashboardExpenseRequestNew,
    meta: { title: 'Diji Portal - Yeni Masraf Talebi' }
  },

  // Other Dashboard Routes
  {
    path: '/dashboard/calendar',
    component: DashboardCalendar,
    meta: { title: 'Diji Portal - Takvim' }
  },
  {
    path: '/dashboard/settings',
    component: DashboardSettings,
    meta: { title: 'Diji Portal - Ayarlar' }
  },
  {
    path: '/dashboard/performance',
    component: DashboardPerformance,
    meta: { title: 'Diji Portal - Performans' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Diji Portal - Sayfa Bulunamadı' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard for setting page titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Diji Portal'
  next()
})

export default router
