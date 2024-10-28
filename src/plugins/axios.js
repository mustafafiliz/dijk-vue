import axios from 'axios'
import { useSessionStore } from '@/stores/session'

const api = axios.create({
  baseURL: 'https://dijikapi.maverabilisim.com/api/v1',
  timeout: 10000,
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
  (response) => {
    return response.data
  },
  (error) => {
    // if (error.response?.status === 401) {
    //   Cookies.remove('token')
    //   // window.location.href = '/login'
    // }
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
