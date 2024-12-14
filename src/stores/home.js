import { defineStore } from 'pinia'
import { useAxios } from '@/plugins/axios'

export const useHomeStore = defineStore('home', {
  state: () => ({
    homeData: {}
  }),
  actions: {
    setHomeData(data) {
      this.homeData = data
    }
  }
})
