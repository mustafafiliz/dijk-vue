<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import { ref, onMounted, computed, watch } from 'vue'
import { formatPrice } from '@/helpers/format'
import Button from '@/components/Button.vue'

const meStore = useMeStore()
const loading = ref(true)
const startYear = new Date(meStore.user.work_start_date).getFullYear()
const endYear = ref(new Date().getFullYear())

const yearOptions = computed(() => {
  const options = []
  for (let year = startYear; year <= endYear.value; year++) {
    options.push({
      value: year,
      label: year.toString()
    })
  }
  return options
})

const selectedYear = ref(endYear.value)
const prepays = ref([])
const { axios } = useAxios()

const getYearDateRange = (year) => {
  const start_date = `${year}-01-01`
  const end_date = `${year}-12-31`
  return {
    start_date,
    end_date
  }
}

const getPrepays = async () => {
  loading.value = true
  try {
    const { start_date, end_date } = getYearDateRange(selectedYear.value)
    const { data } = await axios.get(`/pre-pays`, {
      params: { start_date, end_date }
    })
    prepays.value = data
  } catch (error) {
    console.error('Error fetching prepays:', error)
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return 'bg-yellow-100 text-yellow-800'
    case 1:
      return 'bg-green-100 text-green-800'
    case 2:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

watch(selectedYear, () => {
  getPrepays()
})

onMounted(() => {
  getPrepays()
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative p-4 flex-1 max-w-5xl">
      <button class="py-2" type="button" @click="$router.go(-1)">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 25.5L13.5 18L21 10.5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Avanslarım</div>

      <div class="grid grid-cols-1 gap-4">
        <RouterLink to="/dashboard/prepay-request/new">
          <Button class="w-full !py-3 text-base lg:text-lg text-nowrap"
            >Avans Talebi Oluştur</Button
          >
        </RouterLink>
        <!-- Year Selector -->
        <div
          class="relative flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium"
        >
          <select v-model="selectedYear" class="w-full h-full outline-none">
            <option v-for="option in yearOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-items-center pt-20">
          <div
            class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
          ></div>
          <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
        </div>

        <!-- Cards Grid -->
        <div v-else class="grid grid-cols-1 gap-4">
          <div
            v-if="prepays.length > 0"
            v-for="item in prepays"
            :key="item._id"
            class="bg-white rounded-xl p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="font-medium text-night-sky">{{ item.prePayType.title }}</div>
              <span
                :class="['px-2 py-1 rounded-full text-xs font-medium', getStatusColor(item.statu)]"
              >
                {{ item.statu_text }}
              </span>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Talep Tarihi:</span>
                <span class="font-medium">
                  {{ item.request_date }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-500">Tutar:</span>
                <span class="font-medium">
                  {{ formatPrice(item.price.toString()) }} {{ item.prePayType.currency }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-gray-500">Aktarım Durumu:</span>
                <span class="font-medium">{{ item.transfer_text }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <h2 class="text-center my-2">Kayıt bulunamadı.</h2>
          </div>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
