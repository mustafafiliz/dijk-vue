<script setup>
import { DatePicker } from 'v-calendar'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Button from '@/components/Button.vue'
import { ref, onMounted } from 'vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'

const date = ref(new Date())
const requests = ref([])
const filteredRequests = ref([])
const attributes = ref([])
const showOnlyMe = ref(false)

const meStore = useMeStore()

const updateFilteredRequests = (data) => {
  const dateOnly = (date) => date.toISOString().split('T')[0]

  const _data = data || requests.value

  filteredRequests.value = _data.filter((item) => {
    const isSameDate = dateOnly(new Date(item.start_date)) === dateOnly(date.value)
    const isUserRequest = !showOnlyMe.value || item.user_id === meStore.getUser?.id
    return isSameDate && isUserRequest
  })
}

const handleCalendarChange = () => {
  updateFilteredRequests()
}

onMounted(async () => {
  const { axios } = useAxios()
  try {
    const response = await axios.get('/permits')
    const formattedAttributes = response.data.slice(0, 3).map((item) => ({
      dot: item.statu === '0' ? 'red' : 'green',
      dates: [new Date(item.start_date).toISOString().split('T')[0]]
    }))

    requests.value = response.data
    updateFilteredRequests(response.data)
    attributes.value = formattedAttributes
  } catch (error) {
    console.error('Failed to fetch permits:', error)
  }
})
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
          İzin Talepleri
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

          <RouterLink to="/dashboard/permission-request/new">
            <Button class="w-full lg:!w-[220px] !py-3"> Talep Oluştur </Button>
          </RouterLink>

          <div
            v-if="filteredRequests.length > 0"
            v-for="item in filteredRequests"
            :key="item.id"
            class="bg-white pt-1 pb-2 px-4 font-medium text-12 rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
          >
            <div>{{ item.start_date }}</div>

            <div class="flex items-center gap-x-[10px] mt-[10px]">
              <div class="shrink-0 bg-blue-500 h-9 w-9 rounded-md flex items-center justify-center">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 4H7C4 4 2 5.5 2 9V12.56C2 12.93 2.38 13.16 2.71 13.01C3.69 12.56 4.82 12.39 6.01 12.6C8.64 13.07 10.57 15.51 10.5 18.18C10.49 18.6 10.43 19.01 10.32 19.41C10.24 19.72 10.49 20.01 10.81 20.01H17C20 20.01 22 18.51 22 15.01V9C22 5.5 20 4 17 4ZM12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5ZM19.25 14C19.25 14.41 18.91 14.75 18.5 14.75C18.09 14.75 17.75 14.41 17.75 14V10C17.75 9.59 18.09 9.25 18.5 9.25C18.91 9.25 19.25 9.59 19.25 10V14Z"
                    fill="#fff"
                  />
                  <path
                    d="M5 14C2.79 14 1 15.79 1 18C1 18.75 1.21 19.46 1.58 20.06C2.27 21.22 3.54 22 5 22C6.46 22 7.73 21.22 8.42 20.06C8.79 19.46 9 18.75 9 18C9 15.79 7.21 14 5 14ZM6.49 18.73H5.75V19.51C5.75 19.92 5.41 20.26 5 20.26C4.59 20.26 4.25 19.92 4.25 19.51V18.73H3.51C3.1 18.73 2.76 18.39 2.76 17.98C2.76 17.57 3.1 17.23 3.51 17.23H4.25V16.52C4.25 16.11 4.59 15.77 5 15.77C5.41 15.77 5.75 16.11 5.75 16.52V17.23H6.49C6.9 17.23 7.24 17.57 7.24 17.98C7.24 18.39 6.91 18.73 6.49 18.73Z"
                    fill="#fff"
                  />
                </svg>
              </div>

              <div>
                <div class="text-night-sky">{{ item.user_id }}</div>
                <div class="text-[10px] text-squant">{{ item.message }}</div>
              </div>
            </div>
          </div>
          <div v-else class="bg-white w-full py-10 rounded-2xl mt-5">
            <div class="text-center text-12 text-night-sky">Bu tarihte izin talebi yok</div>
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
