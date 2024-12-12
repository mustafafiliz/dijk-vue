import { defineStore } from 'pinia'

export const useFieldsStore = defineStore('fields', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('fieldsItems')) || [
      { title: 'İzin', to: '/dashboard/permission-request/list', image: '/images/izin.svg' },
      { title: 'Avans', to: '/dashboard/prepay-request/list', image: '/images/avans.svg' },
      { title: 'Masraf', to: '/dashboard/expense/list', image: '/images/harcama.svg' },
      {
        title: 'Taksitli Borç',
        to: '/dashboard/installment-request/list',
        image: '/images/taksitli-borc.png'
      },
      { title: 'Fazla Mesai', to: '/dashboard/overtime-request/list', image: '/images/mesai.svg' },
      { title: 'Takımım', to: '/dashboard/team', image: '/images/team.svg' },
      { title: 'Rehber', to: '/dashboard/directory', image: '/images/rehber.svg' },
      { title: 'Bordrolarım', to: '/dashboard/payrolls', image: '/images/payroll.png' },
      { title: 'İlanlar', to: '/dashboard/classifieds', image: '/images/classifieds.png' },
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
