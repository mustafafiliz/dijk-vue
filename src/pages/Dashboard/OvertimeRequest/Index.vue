<script setup>
import { DatePicker } from 'v-calendar'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Button from '@/components/Button.vue'
import { ref, onMounted } from 'vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import { eventColors } from '@/helpers/eventColors'
import CalendarCard from '@/components/Calendar/CalendarCard.vue'

const date = ref(new Date())
const currentMonth = ref(date.value.getMonth() + 1)
const currentYear = ref(date.value.getFullYear())
const requests = ref([])
const filteredRequests = ref([])
const attributes = ref([])
const showOnlyMe = ref(false)
const loading = ref(false)

const meStore = useMeStore()

const updateFilteredRequests = (data) => {
  const dateOnly = (date) => {
    const d = new Date(date)
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]
  }
  const _data = data || requests.value

  filteredRequests.value = _data.filter((item) => {
    const isSameDate = dateOnly(new Date(item.start_date)) === dateOnly(date.value)
    const isUserRequest = !showOnlyMe.value || item.user._id === meStore.getUser?._id
    return isSameDate && isUserRequest
  })

  attributes.value = _data
    .filter((item) => !showOnlyMe.value || item.user._id === meStore.getUser?._id)
    .map((item) => ({
      dot: eventColors[item.type].badgeColor,
      dates: [dateOnly(new Date(item.start_date))]
    }))
}

const handleCalendarChange = () => {
  updateFilteredRequests(requests.value)
}

const getMonthRange = (year, month) => {
  const lastDay = new Date(year, month, 0).getDate()
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`
  const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`
  return { startDate, endDate }
}

onMounted(async () => {
  const { axios } = useAxios()
  const { startDate, endDate } = getMonthRange(currentYear.value, currentMonth.value)

  try {
    loading.value = true
    const response = await axios.get(`/overtimes?start_date=${startDate}&end_date=${endDate}`)

    const datas = response.data.map((item) => ({
      type: 'overtime',
      ...item
    }))

    requests.value = datas
    updateFilteredRequests(datas)
  } catch (error) {
    console.error('Failed to fetch overtime requests:', error)
  } finally {
    loading.value = false
  }
})

const handleDidMove = async (e) => {
  const newMonth = e?.[0]?.month
  const newYear = e?.[0]?.year

  if (currentMonth.value !== newMonth || currentYear.value !== newYear) {
    const { axios } = useAxios()
    const { startDate, endDate } = getMonthRange(newYear, newMonth)

    try {
      loading.value = true
      const response = await axios.get(`/overtimes?start_date=${startDate}&end_date=${endDate}`)

      const datas = response.data.map((item) => ({
        type: 'overtime',
        ...item
      }))

      requests.value = datas
      updateFilteredRequests(datas)

      currentMonth.value = newMonth
      currentYear.value = newYear
    } catch (error) {
      console.error('Failed to fetch overtimes:', error)
    } finally {
      loading.value = false
    }
  }
}
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 pb-20 flex-1 max-w-5xl">
      <div class="relative">
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

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
          Mesai Talepleri
        </div>
      </div>

      <div class="flex flex-col gap-3 md:flex-row sticky top-0">
        <DatePicker
          class="w-full rounded-2xl border-none p-4 md:max-w-[300px] md:sticky md:top-4"
          title-position="left"
          v-model="date"
          :is-dark="false"
          :attributes="attributes"
          locale="tr"
          @did-move="handleDidMove"
          @update:model-value="handleCalendarChange"
        ></DatePicker>
        <div class="flex flex-col gap-y-3 pb-4 w-full">
          <label class="bg-white rounded-20 p-4 flex items-center gap-x-2">
            <input type="checkbox" id="showOnlyMe" @change="handleCalendarChange" />
            <label for="showOnlyMe">Bana Ait Olanları Göster</label>
          </label>

          <RouterLink to="/dashboard/overtime-request/new">
            <Button class="w-full lg:!w-[220px] !py-3"> Talep Oluştur </Button>
          </RouterLink>
          <div v-if="loading" class="flex flex-col items-center justify-items-center mt-5">
            <div
              class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
            ></div>
            <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
          </div>
          <template v-else>
            <CalendarCard
              v-if="filteredRequests.length > 0"
              v-for="item in filteredRequests"
              :key="item._id"
              :item="item"
            />
            <div v-else class="bg-white w-full py-10 rounded-2xl mt-1">
              <div class="text-center text-12 text-night-sky">Bu tarihte mesai talebi yok</div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>

<style>
.vc-day {
  @apply border border-uniform;
  @apply aspect-square;
}

.vc-highlight {
  @apply w-full h-full;
  @apply rounded-none;
}

.vc-day-content {
  @apply w-full h-full;
  @apply rounded-none;
}

.vc-header {
  @apply mt-0 px-0;
}

.vc-weeks {
  @apply p-0 mt-[18px];
}

.vc-weekdays {
  @apply mb-[10px];
}

.vc-weekday {
  @apply text-black;
}

.vc-monthly .is-not-in-month * {
  @apply opacity-100;
  @apply bg-alpine text-uniform;
}
</style>
