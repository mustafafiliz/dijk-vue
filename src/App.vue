<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
      ></div>
      <div class="text-xl text-gray-700 font-medium">Yükleniyor...</div>
    </div>
  </div>
  <div
    v-else-if="birthdayEvent || seniorEvent"
    class="fixed inset-0 p-4 flex flex-col gap-5 lg:gap-10 items-center justify-end bg-opacity-80 text-center shadow-xl bg-gradient-to-b pb-44 from-cornflower via-lucid-dreams via-25% to-lynx-white"
  >
    <div class="flex items-center justify-center">
      <img
        :src="seniorEvent ? '/images/confetti.png' : '/images/birthday-cake.png'"
        alt="birthday-cake"
        class="w-20 h-20 mb-4"
      />
    </div>
    <h1 class="text-2xl lg:text-5xl font-medium text-gray-800">
      <template v-if="birthdayEvent">
        Doğum günün kutlu olsun, <br />
        {{ userName }} !
      </template>
      <template v-else-if="seniorEvent">
        Yıl dönümünüz kutlu olsun, <br />
        {{ userName }} !
      </template>
    </h1>
    <p class="text-base lg:text-lg max-w-[600px] text-gray-700">
      <template v-if="birthdayEvent">
        Bu özel günde, sizinle birlikte kutlamaktan mutluluk duyuyoruz. Doğum gününde, tüm
        dilekleriniz gerçekleşsin!
      </template>
      <template v-else-if="seniorEvent">
        <span v-if="yearsWorked === 5">5. yılınız kutlu olsun!</span>
        <span v-else-if="yearsWorked > 0">Çalıştığınız yıl: {{ yearsWorked }} yıl!</span>
        <span v-else
          >Bu özel günde, sizinle birlikte kutlamaktan mutluluk duyuyoruz. Yıl dönümünüzde, tüm
          dilekleriniz gerçekleşsin!</span
        >
      </template>
    </p>
    <VButton class="!px-20" @click="() => stopConfetti()"> Devam Et </VButton>
  </div>
  <div
    v-else
    class="md:px-24 bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white"
  >
    <div class="fixed bottom-20 right-10 z-20">
      <div
        v-if="showQuickMenu"
        class="fixed inset-0 bg-black/30"
        @click="showQuickMenu = false"
      ></div>
      <div
        v-if="showQuickMenu"
        class="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-lg p-4 w-auto after:content-[''] after:absolute after:bottom-[-8px] after:right-[20px] after:w-0 after:h-0 after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px] after:border-t-white"
      >
        <div class="flex flex-col gap-4 whitespace-nowrap">
          <RouterLink
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-2 text-night-sky hover:text-gentian-flower"
            @click="showQuick"
          >
            <span class="text-sm font-medium">{{ link.title }}</span>
          </RouterLink>
        </div>
      </div>
      <button
        class="hidden md:flex rounded-full bg-gentian-flower w-14 h-14 items-center justify-center shadow-lg"
        @click="showQuick"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4V20M4 12H20" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <RouterView />
  </div>
</template>

<script>
import { useSessionStore } from '@/stores/session'
import { useMeStore } from '@/stores/me'
import { useRouter } from 'vue-router'
import VButton from '@/components/Button.vue'

export default {
  components: {
    VButton
  },

  data() {
    return {
      isLoading: true,
      birthdayEvent: false,
      seniorEvent: false,
      userName: '',
      yearsWorked: 0,
      showQuickMenu: false,
      quickLinks: [
        {
          title: 'Yeni İzin Talebi',
          path: '/dashboard/permission-request/new'
        },
        {
          title: 'Yeni Mesai Talebi',
          path: '/dashboard/overtime-request/new'
        },
        {
          title: 'Yeni İlan',
          path: '/dashboard/classifieds/new'
        },
        {
          title: 'Yeni Avans Talebi',
          path: '/dashboard/prepay-request/new'
        },
        {
          title: 'Yeni Masraf Talebi',
          path: '/dashboard/expense/new'
        }
      ]
    }
  },

  async created() {
    const sessionStore = useSessionStore()
    const meStore = useMeStore()
    const router = useRouter()

    sessionStore.loadSessionFromCookie()

    if (!sessionStore.getToken && !router.currentRoute.value.path.includes('/auth')) {
      router.push('/auth/login')
      this.isLoading = false
      return
    }

    try {
      const { data } = await meStore.fetchUserProfile()

      // Check missing documents
      if (
        data?.missing_documents?.some((doc) => doc.statu === 0) &&
        !router.currentRoute.value.path.includes('/dashboard/documents')
      ) {
        console.log('Missing documents, redirecting to documents page')
        router.push('/dashboard/documents')
        return
      }

      this.userName = data?.name
      this.checkEvents(data?.birthday, data?.senior_date)
    } catch (error) {
      if (router.currentRoute.value.path.includes('/auth')) {
        router.push('/dashboard/home')
      }
    } finally {
      this.isLoading = false
    }
  },

  methods: {
    checkEvents(birthday, seniorDate) {
      const today = new Date()
      const birthdayDate = new Date(birthday)
      const seniorDateObj = new Date(seniorDate)
      birthdayDate.setFullYear(today.getFullYear())
      seniorDateObj.setFullYear(today.getFullYear())

      const todayString = today.toISOString().split('T')[0]
      const birthdayString = birthdayDate.toISOString().split('T')[0]
      const birthdayMonthDay = today.toISOString().slice(5, 10)
      const seniorMonthDay = seniorDateObj.toISOString().slice(5, 10)
      const hasSeenConfetti = localStorage.getItem('hasSeenConfetti')

      if (todayString === birthdayString && !hasSeenConfetti) {
        this.birthdayEvent = true
        this.startConfetti()
        localStorage.setItem('hasSeenConfetti', 'true')
      }
      if (birthdayMonthDay === seniorMonthDay) {
        this.seniorEvent = true
        this.calculateYearsWorked(seniorDate)
        this.startConfetti()
      }

      const router = useRouter()
      if (
        router.currentRoute.value.path.includes('/auth') &&
        todayString !== birthdayString &&
        birthdayMonthDay !== seniorMonthDay
      ) {
        router.push('/dashboard/home')
      }
    },

    startConfetti() {
      const duration = 10 * 1000
      const end = Date.now() + duration * 100000
      let animationFrameId = null

      const random = (min, max) => Math.random() * (max - min) + min
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: random(55, 125),
          spread: random(50, 70),
          startVelocity: 30,
          decay: 0.9,
          scalar: random(1, 3),
          origin: { x: random(0, 1), y: 0 }
        })

        if (Date.now() < end) {
          animationFrameId = requestAnimationFrame(frame)
        }
      })()
    },

    stopConfetti() {
      document.getElementsByTagName('canvas')[0].remove()
      this.birthday = false
      this.seniorEvent = false
    },

    calculateYearsWorked(seniorDate) {
      const seniorYear = new Date(seniorDate).getFullYear()
      const currentYear = new Date().getFullYear()
      this.yearsWorked = currentYear - seniorYear
    },

    showQuick() {
      this.showQuickMenu = !this.showQuickMenu
    }
  }
}
</script>

<style>
/* Add any necessary styles here */
</style>
