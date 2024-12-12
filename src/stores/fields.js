import { defineStore } from 'pinia'

const defaultItems = [
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

const checkAndUpdateStorage = () => {
  const storedItems = localStorage.getItem('fieldsItems')
  if (!storedItems) {
    localStorage.setItem('fieldsItems', JSON.stringify(defaultItems))
    return defaultItems
  }

  const parsedStoredItems = JSON.parse(storedItems)
  let needsUpdate = false

  defaultItems.forEach((defaultItem) => {
    const storedItem = parsedStoredItems.find((item) => item.title === defaultItem.title)
    if (storedItem && storedItem.to !== defaultItem.to) {
      needsUpdate = true
    }
  })

  if (needsUpdate) {
    localStorage.setItem('fieldsItems', JSON.stringify(defaultItems))
    return defaultItems
  }

  return parsedStoredItems
}

export const useFieldsStore = defineStore('fields', {
  state: () => ({
    items: checkAndUpdateStorage()
  }),

  actions: {
    updateItems(newOrder) {
      this.items = newOrder
      localStorage.setItem('fieldsItems', JSON.stringify(newOrder))
    }
  }
})
