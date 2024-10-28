<template>
  <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
      ></div>
      <div class="text-xl text-gray-700 font-medium">Yükleniyor...</div>
    </div>
  </div>
  <RouterView v-else />
</template>

<script>
import { useSessionStore } from '@/stores/session'
import { useMeStore } from '@/stores/me'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      isLoading: true
    }
  },
  async created() {
    const sessionStore = useSessionStore()
    const meStore = useMeStore()
    const router = useRouter()

    sessionStore.loadSessionFromCookie()

    if (!sessionStore.getToken) {
      router.push('/')
      this.isLoading = false
      return
    }

    try {
      await meStore.fetchUserProfile()
      if (router.currentRoute.value.path === '/') {
        router.push('/dashboard/home')
      }
    } catch (error) {
      sessionStore.clearSession()
      router.push('/')
    } finally {
      this.isLoading = false
    }
  }
}
</script>
