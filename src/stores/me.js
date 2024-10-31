import { defineStore } from 'pinia'
import { useAxios } from '@/plugins/axios'
import { useSessionStore } from '@/stores/session'

export const useMeStore = defineStore('me', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null
  }),

  getters: {
    getUser: (state) => state.user,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },

  actions: {
    async fetchUserProfile() {
      const { axios } = useAxios()
      this.isLoading = true
      this.error = null

      try {
        const response = await axios.get('/auth/me')
        this.user = response.data
        return response
      } catch (error) {
        //todo: will be remove
        this.user = error.response?.data.data
        this.error = error.response?.data?.message || 'An error occurred'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      const { axios } = useAxios()
      const sessionStore = useSessionStore() // Get session store instance
      this.isLoading = true
      this.error = null

      try {
        await axios.get('/auth/logout')
        this.user = null
        sessionStore.clearSession() // Clear the session data
        window.location.href = '/'
      } catch (error) {
        this.error = error.response?.data?.message || 'An error occurred'
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
