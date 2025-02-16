import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { constants } from '@/constants/config'

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {
      access_token: null,
      token_type: null,
      expires_in: null,
      refresh_token: null
    }
  }),

  getters: {
    getSession: (state) => state.session,
    getToken: (state) => state.session.access_token,
    getRefreshToken: (state) => state.session.refresh_token
  },

  actions: {
    setSession(sessionData) {
      this.session = sessionData
      // Encrypt data before storing in cookie
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(sessionData),
        constants.SECRET
      ).toString()
      Cookies.set('session', encryptedData)
    },

    loadSessionFromCookie() {
      const encryptedData = Cookies.get('session')

      if (encryptedData) {
        try {
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
          const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8)

          if (decryptedData) {
            this.session = JSON.parse(decryptedData)
          }
        } catch (error) {
          // Invalid or malformed session data, clear it
          this.clearSession()
        }
      }
    },

    async refreshSession() {
      const refreshToken = this.session.refresh_token
      const token = this.session.access_token

      if (!refreshToken) return null

      try {
        //vite env usage => import.meta.env.API_BASE_URL

        const response = await axios.post(
          `${constants.API_BASE_URL}/auth/refresh`,
          {
            refresh_token: refreshToken
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )

        this.setSession(response.data.data) // Update session with new tokens
        return response.data.access_token
      } catch (error) {
        this.clearSession()
        window.location.href = '/auth/login'
        return null
      }
    },

    clearSession() {
      this.session = {
        access_token: null,
        token_type: null,
        expires_in: null,
        refresh_token: null,
        user: null
      }
      Cookies.remove('session')
    }
  }
})
