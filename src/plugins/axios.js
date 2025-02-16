import axios from 'axios'
import { useSessionStore } from '@/stores/session'
import { constants } from '@/constants/config'

//vite env usage => import.meta.env.API_BASE_URL

const api = axios.create({
  baseURL: constants.API_BASE_URL,
  timeout: 900000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const sessionStore = useSessionStore()
    const token = sessionStore.getToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    console.log('error', error)
    const sessionStore = useSessionStore()

    if (error.response?.status === 401) {
      const newToken = await sessionStore.refreshSession()
      if (newToken) {
        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`
        return api.request(error.config) // Retry the request
      }
    }

    return Promise.reject(error)
  }
)

export default {
  install: (app) => {
    app.config.globalProperties.$axios = api
  }
}

export const useAxios = () => {
  return { axios: api }
}
