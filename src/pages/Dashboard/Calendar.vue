<script setup>
import { DatePicker } from 'v-calendar'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { ref, onMounted } from 'vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import { eventColors } from '@/helpers/eventColors'
import CalendarCard from '@/components/Calendar/CalendarCard.vue'

const date = ref(new Date())
const currentYear = ref(date.value.getFullYear())
const requests = ref([])
const filteredRequests = ref([])
const attributes = ref([])
const showOnlyMe = ref(false)

const meStore = useMeStore()
const dateOnly = (date) => date.toISOString().split('T')[0]

const updateFilteredRequests = (data) => {
  const _data = data || requests.value

  filteredRequests.value = _data.filter((item) => {
    const isUserRequest = !showOnlyMe.value || item.user?._id || item?._id === meStore.getUser?._id
    const today = dateOnly(date.value)
    const startDate = dateOnly(
      item.now_birthday ? new Date(item.now_birthday) : new Date(item.start_date)
    )
    const endDate = dateOnly(
      item.now_birthday ? new Date(item.now_birthday) : new Date(item.end_date)
    )

    if (item?.title?.includes('CUMHURİYET BAYRAMI')) {
      console.log(startDate, endDate, today)
    }

    const isDateInRange = startDate <= today && today <= endDate

    return isUserRequest && isDateInRange
  })

  console.log(filteredRequests)

  attributes.value = _data
    .filter((item) => !showOnlyMe.value || item.user?._id || item?._id === meStore.getUser?._id)
    .reduce((acc, item) => {
      const startDate = item.now_birthday ? new Date(item.now_birthday) : new Date(item.start_date)
      const endDate = item.now_birthday ? new Date(item.now_birthday) : new Date(item.end_date)
      const dates = []

      while (startDate <= endDate) {
        dates.push(dateOnly(startDate))
        startDate.setDate(startDate.getDate() + 1)
      }

      // Find existing item with same type and dates
      const existingItem = acc.find(
        (i) =>
          i.dot === eventColors?.[item.type].dotColor &&
          i.dates.some((date) => dates.includes(date))
      )

      if (existingItem) {
        existingItem.dates = [...new Set([...existingItem.dates, ...dates])]
      } else {
        acc.push({
          dot: eventColors?.[item.type].dotColor,
          dates: dates
        })
      }

      return acc
    }, [])
}

const handleCalendarChange = () => {
  updateFilteredRequests(requests.value)
}

const getDateRange = (year) => {
  const startDate = `${year}-01-01`
  const endDate = `${year}-12-31`

  return { startDate, endDate }
}

onMounted(async () => {
  const { axios } = useAxios()
  const { startDate, endDate } = getDateRange(date.value.getFullYear())

  try {
    const response = await axios.get(`/calendar?start_date=${startDate}&end_date=${endDate}`)

    const birthdays = response.data.birthdays.map((item) => {
      const birthdayDate = new Date(item.birthday)
      birthdayDate.setFullYear(new Date().getFullYear())
      return {
        ...item,
        now_birthday: dateOnly(birthdayDate),
        type: 'birthday'
      }
    })

    const holidays = response.data.holidays.map((item) => {
      return {
        ...item,
        type: 'holiday'
      }
    })

    const overtimes = response.data.overtimes.map((item) => {
      return {
        ...item,
        type: 'overtime'
      }
    })

    const permits = response.data.permits.map((item) => {
      return {
        ...item,
        type: 'permit'
      }
    })

    const allData = [...birthdays, ...overtimes, ...permits, ...holidays]

    requests.value = allData

    updateFilteredRequests(allData)
  } catch (error) {
    console.error('Failed to fetch permits:', error)
  }
})

const handleDidMove = async (newYear) => {
  if (currentYear.value !== newYear) {
    const { axios } = useAxios()
    const { startDate, endDate } = getDateRange(newYear)
    try {
      const response = await axios.get(`/calendar?start_date=${startDate}&end_date=${endDate}`)

      const birthdays = response.data.birthdays.map((item) => {
        const birthdayDate = new Date(item.birthday)
        birthdayDate.setFullYear(new Date().getFullYear())
        return {
          ...item,
          now_birthday: dateOnly(birthdayDate),
          type: 'birthday'
        }
      })

      const holidays = response.data.holidays.map((item) => {
        return {
          ...item,
          type: 'holiday'
        }
      })

      const overtimes = response.data.overtimes.map((item) => {
        return {
          ...item,
          type: 'overtime'
        }
      })

      const permits = response.data.permits.map((item) => {
        return {
          ...item,
          type: 'permit'
        }
      })

      const allData = [...birthdays, ...permits, ...overtimes, ...holidays]

      requests.value = allData

      updateFilteredRequests(allData)

      currentYear.value = newYear
    } catch (error) {
      console.error('Failed to fetch permits:', error)
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
          Takvim
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
          @did-move="(e) => handleDidMove(e?.[0]?.year)"
          @update:model-value="handleCalendarChange"
        ></DatePicker>
        <div class="flex flex-col gap-y-3 pb-4 w-full">
          <label class="bg-white rounded-20 p-4 flex items-center gap-x-2">
            <input
              type="checkbox"
              id="showOnlyMe"
              @change="handleCalendarChange"
              v-model="showOnlyMe"
            />
            <label for="showOnlyMe">Bana Ait Olanları Göster</label>
          </label>
          <CalendarCard
            v-if="filteredRequests.length > 0"
            v-for="item in filteredRequests"
            :key="item._id"
            :item="item"
          />
          <div v-else class="bg-white w-full py-10 rounded-2xl mt-1">
            <div class="text-center text-12 text-night-sky">Bu tarihte veri yok</div>
          </div>
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
