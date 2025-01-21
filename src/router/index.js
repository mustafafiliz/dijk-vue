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

//User Documents
import DashboardDocumentsList from '@/pages/Dashboard/UserDocuments/UserDocumentsList.vue'

// Other Pages
import NotFound from '@/pages/NotFound.vue'

const routes = [
  // Auth Routes
  {
    path: '/auth/login',
    component: Login,
    meta: { title: 'DijiPortal - Giriş Yap' }
  },
  {
    path: '/auth/reset-password',
    component: ResetPassword,
    meta: { title: 'DijiPortal - Şifre Sıfırlama' }
  },

  // Dashboard Routes
  {
    path: '/dashboard',
    component: DashboardHome,
    meta: { title: 'DijiPortal - Ana Sayfa' }
  },
  {
    path: '/dashboard/home',
    component: DashboardHome,
    meta: { title: 'DijiPortal - Ana Sayfa' }
  },
  {
    path: '/dashboard/profile/:id',
    component: DashboardProfile,
    meta: { title: 'DijiPortal - Profil' }
  },
  {
    path: '/dashboard/profile/organization/:id',
    component: DashboardProfileOrganization,
    meta: { title: 'DijiPortal - Organizasyon' }
  },
  {
    path: '/dashboard/fields',
    component: DashboardFields,
    meta: { title: 'DijiPortal - Alanlar' }
  },
  {
    path: '/dashboard/articles',
    component: DashboardArticles,
    meta: { title: 'DijiPortal - Haberler' }
  },
  {
    path: '/dashboard/announcements',
    component: DashboardAnnouncements,
    meta: { title: 'DijiPortal - Duyurular' }
  },
  {
    path: '/dashboard/videos',
    component: DashboardVideos,
    meta: { title: 'DijiPortal - Eğitimler' }
  },
  {
    path: '/dashboard/payrolls',
    component: DashboardPayrolls,
    meta: { title: 'DijiPortal - Bordro' }
  },
  {
    path: '/dashboard/events',
    component: DashboardEvents,
    meta: { title: 'DijiPortal - Etkinlikler' }
  },

  // Classified Routes
  {
    path: '/dashboard/classifieds',
    component: DashboardClassifieds,
    meta: { title: 'DijiPortal - İlanlar' }
  },
  {
    path: '/dashboard/classifieds/new',
    component: DashboardClassifiedsNew,
    meta: { title: 'DijiPortal - Yeni İlan' }
  },
  {
    path: '/dashboard/classifieds/:id',
    component: DashboardClassifiedsDetail,
    meta: { title: 'DijiPortal - İlan Detay' }
  },
  {
    path: '/dashboard/classifieds/:id/edit',
    component: DashboardClassifiedsEdit,
    meta: { title: 'DijiPortal - İlan Düzenle' }
  },

  // Team & Directory Routes
  {
    path: '/dashboard/team',
    component: DashboardTeam,
    meta: { title: 'DijiPortal - Takım' }
  },
  {
    path: '/dashboard/directory',
    component: DashboardDirectory,
    meta: { title: 'DijiPortal - Rehber' }
  },

  // Request Routes
  {
    path: '/dashboard/approval-process',
    component: DashboardApprovalProcess,
    meta: { title: 'DijiPortal - Onayımdaki Süreçler' }
  },
  {
    path: '/dashboard/permission-request/list',
    component: DashboardPermissionRequestList,
    meta: { title: 'DijiPortal - İzin Talepleri' }
  },
  {
    path: '/dashboard/permission-request/new',
    component: DashboardPermissionRequestNew,
    meta: { title: 'DijiPortal - Yeni İzin Talebi' }
  },
  {
    path: '/dashboard/overtime-request/list',
    component: DashboardOvertimeRequestList,
    meta: { title: 'DijiPortal - Mesai Talepleri' }
  },
  {
    path: '/dashboard/overtime-request/new',
    component: DashboardOvertimeRequestNew,
    meta: { title: 'DijiPortal - Yeni Mesai Talebi' }
  },
  {
    path: '/dashboard/prepay-request/list',
    component: DashboardPrePayRequestList,
    meta: { title: 'DijiPortal - Avans Talepleri' }
  },
  {
    path: '/dashboard/prepay-request/new',
    component: DashboardPrePayRequestNew,
    meta: { title: 'DijiPortal - Yeni Avans Talebi' }
  },
  {
    path: '/dashboard/installment-request/list',
    component: DashboardInstallmentRequestList,
    meta: { title: 'DijiPortal - Taksit Talepleri' }
  },
  {
    path: '/dashboard/installment-request/new',
    component: DashboardInstallmentRequestNew,
    meta: { title: 'DijiPortal - Yeni Taksit Talebi' }
  },
  {
    path: '/dashboard/expense/list',
    component: DashboardExpenseList,
    meta: { title: 'DijiPortal - Masraf Talepleri' }
  },
  {
    path: '/dashboard/expense/new',
    component: DashboardExpenseRequestNew,
    meta: { title: 'DijiPortal - Yeni Masraf Talebi' }
  },

  // User Documents Routes
  {
    path: '/dashboard/documents',
    component: DashboardDocumentsList,
    meta: { title: 'DijiPortal - Evraklarım' }
  },

  // Other Dashboard Routes
  {
    path: '/dashboard/calendar',
    component: DashboardCalendar,
    meta: { title: 'DijiPortal - Takvim' }
  },
  {
    path: '/dashboard/settings',
    component: DashboardSettings,
    meta: { title: 'DijiPortal - Ayarlar' }
  },
  {
    path: '/dashboard/performance',
    component: DashboardPerformance,
    meta: { title: 'DijiPortal - Performans' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'DijiPortal - Sayfa Bulunamadı' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard for setting page titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'DijiPortal'
  next()
})

export default router
