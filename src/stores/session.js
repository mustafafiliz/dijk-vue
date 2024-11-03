import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import axios from 'axios'

const SECRET_KEY = 'PKAMVrB7XHiZJCbqVrvtszSk1ntpKa6b'

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: {
      access_token: null,
      token_type: null,
      expires_in: null,
      refresh_token: null,
      user: null
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
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(sessionData), SECRET_KEY).toString()
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

      if (!refreshToken) return null

      try {
        const response = await axios.post(
          'https://dijikapi.maverabilisim.com/api/v1/auth/refresh',
          {
            refresh_token: 'xyz'
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        this.setSession(response.data) // Update session with new tokens
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
