import { defineStore } from 'pinia'

export const useFieldsStore = defineStore('fields', {
  state: () => ({
    items: [
      { title: 'İzin', to: '/dashboard/permission-request', image: '/images/izin.svg' },
      { title: 'Avans', image: '/images/avans.svg' },
      { title: 'Harcama', image: '/images/harcama.svg' },
      { title: 'Fazla Mesai', to: '/dashboard/overtime-request', image: '/images/mesai.svg' },
      { title: 'Takımım', to: '/dashboard/team', image: '/images/team.svg' },
      { title: 'Rehber', to: '/dashboard/directory', image: '/images/rehber.svg' },
      {
        title: 'Onayımdaki Süreçler',
        to: '/dashboard/approval-process',
        image: '/images/surecler.svg'
      },
      { title: 'Ayarlar', to: '/dashboard/settings', image: '/images/ayarlar.svg' }
    ]
  }),

  actions: {
    updateItems(newOrder) {
      this.items = newOrder
    }
  }
})
