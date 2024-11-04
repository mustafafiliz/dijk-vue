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
    v-else-if="birthday"
    class="fixed inset-0 p-4 flex flex-col gap-5 lg:gap-10 items-center justify-end bg-opacity-80 text-center shadow-xl bg-gradient-to-b pb-32 from-cornflower via-lucid-dreams via-25% to-lynx-white"
  >
    <h1 class="text-2xl lg:text-5xl font-medium text-gray-800">
      Doğum gününüz kutlu olsun, <br />
      {{ userName }} !
    </h1>
    <p class="text-base lg:text-lg max-w-[600px] text-gray-700">
      Bu özel günde, sizinle birlikte kutlamaktan mutluluk duyuyoruz. Doğum gününüzde, tüm
      dilekleriniz gerçekleşsin!
    </p>
    <VButton class="px-20" @click="() => stopConfetti()"> Devam Et </VButton>
  </div>
  <RouterView v-else />
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
      birthday: false,
      userName: ''
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
      this.userName = data?.name
      this.checkBirthday(data?.birthday)
    } catch (error) {
      if (router.currentRoute.value.path.includes('/auth')) {
        router.push('/dashboard/home')
      }
    } finally {
      this.isLoading = false
    }
  },

  methods: {
    checkBirthday(birthday) {
      const today = new Date()
      const birthdayDate = new Date(birthday)
      birthdayDate.setFullYear(today.getFullYear())

      const todayString = today.toISOString().split('T')[0]
      const birthdayString = birthdayDate.toISOString().split('T')[0]
      const hasSeenConfetti = localStorage.getItem('hasSeenConfetti')

      if (todayString === birthdayString && !hasSeenConfetti) {
        this.birthday = true
        this.startConfetti()
        localStorage.setItem('hasSeenConfetti', 'true')
      }

      const router = useRouter()
      if (router.currentRoute.value.path.includes('/auth') && todayString !== birthdayString) {
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
          origin: { x: random(0, 1), y: 0.1 }
        })

        if (Date.now() < end) {
          animationFrameId = requestAnimationFrame(frame)
        }
      })()
    },

    stopConfetti() {
      document.getElementsByTagName('canvas')[0].remove()
      this.birthday = false
    }
  }
}
</script>

<style>
/* Add any necessary styles here */
</style>
