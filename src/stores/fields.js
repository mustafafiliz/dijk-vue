import { defineStore } from 'pinia'

export const useFieldsStore = defineStore('fields', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('fieldsItems')) || [
      { title: 'İzin', to: '/dashboard/permission-request/list', image: '/images/izin.svg' },
      { title: 'Avans', to: '/dashboard/advance-request/list', image: '/images/avans.svg' },
      { title: 'Harcama', to: '/dashboard/expense-request/list', image: '/images/harcama.svg' },
      { title: 'Fazla Mesai', to: '/dashboard/overtime-request/list', image: '/images/mesai.svg' },
      { title: 'Takımım', to: '/dashboard/team', image: '/images/team.svg' },
      { title: 'Rehber', to: '/dashboard/directory', image: '/images/rehber.svg' },
      { title: 'Bordrolarım', to: '/dashboard/payrolls', image: '/images/payroll.png' },
      {
        title: 'Organizasyon',
        to: '/dashboard/profile/organization/:userId',
        image: '/images/organizasyon.png'
      },
      {
        title: 'Onaylarım',
        to: '/dashboard/approval-process',
        image: '/images/surecler.svg'
      },
      { title: 'Ayarlar', to: '/dashboard/settings', image: '/images/ayarlar.svg' }
    ]
  }),

  actions: {
    updateItems(newOrder) {
      this.items = newOrder
      localStorage.setItem('fieldsItems', JSON.stringify(newOrder))
    }
  }
})
