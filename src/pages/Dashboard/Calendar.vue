<script setup>
import { DatePicker } from 'v-calendar'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { ref, onMounted } from 'vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'

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

    const isDateInRange = startDate <= today && today <= endDate

    return isUserRequest && isDateInRange
  })

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

      const existingItem = acc.find((i) => i.dates.some((date) => dates.includes(date)))
      if (existingItem) {
        existingItem.dates = [...existingItem.dates, ...dates]
      } else {
        acc.push({
          dot: item.statu ? 'blue' : item.now_birthday ? 'pink' : 'green',
          dates: dates
        })
      }

      acc.forEach((item) => {
        const dateCounts = {}
        item.dates.forEach((date) => {
          dateCounts[date] = (dateCounts[date] || 0) + 1
        })
        item.dates = Object.keys(dateCounts).reduce((acc, date) => {
          if (dateCounts[date] <= 2) {
            acc.push(...Array(dateCounts[date]).fill(date))
          } else {
            acc.push(...Array(2).fill(date))
          }
          return acc
        }, [])
      })

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
        now_birthday: dateOnly(birthdayDate)
      }
    })

    const allData = [...birthdays, ...response.data.overtimes, ...response.data.permits]

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
          now_birthday: dateOnly(birthdayDate)
        }
      })

      const allData = [...birthdays, ...response.data.overtimes, ...response.data.permits]

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
          <a
            v-if="filteredRequests.length > 0"
            v-for="item in filteredRequests"
            :href="`/dashboard/profile/${item.user._id}`"
            :key="item.id + item.user._id"
            class="bg-white relative pt-1 pb-2 px-4 font-medium text-12 rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
          >
            <div v-if="!item.now_birthday" class="flex items-center justify-between text-[10px]">
              <div>
                Baş: {{ item.start_date }} {{ item.start_hour ? `/ ${item.start_hour}` : '' }}
              </div>
              <div>Bit: {{ item.end_date }} {{ item.end_hour ? `/ ${item.end_hour}` : '' }}</div>
            </div>
            <div v-else class="flex items-center justify-between text-[10px]">
              <div>Tarih: {{ item.now_birthday }}</div>
            </div>

            <div class="flex items-center gap-x-[10px] mt-[10px]">
              <div
                :class="item?.user?._id === meStore?.user?._id ? 'bg-blue-500' : 'bg-orange-500'"
                class="shrink-0 h-9 w-9 rounded-md flex items-center justify-center"
              >
                <svg
                  v-if="item.now_birthday"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="8" fill="#FF89C9"></rect>
                  <path
                    d="M15.5497 9.1466C15.8718 9.34349 15.9732 9.76418 15.7763 10.0863C15.6334 10.32 15.6693 10.6211 15.8629 10.8148L15.9521 10.904C16.4886 11.4405 16.6864 12.2286 16.4669 12.9548C16.3577 13.3161 15.9762 13.5205 15.6149 13.4112C15.2536 13.302 15.0492 12.9206 15.1584 12.5592C15.2321 12.3154 15.1657 12.0507 14.9856 11.8706L14.8964 11.7814C14.2561 11.1412 14.1378 10.1458 14.61 9.37325C14.8069 9.05119 15.2276 8.94971 15.5497 9.1466Z"
                    fill="black"
                  ></path>
                  <path
                    d="M22.3874 11.5001C22.7575 11.5741 22.9975 11.9342 22.9235 12.3043L22.7923 12.9604C22.6118 13.8634 21.9612 14.6003 21.0876 14.8915C20.6794 15.0276 20.3754 15.3719 20.291 15.7939L20.1598 16.4499C20.0858 16.8201 19.7257 17.0601 19.3555 16.9861C18.9853 16.9121 18.7453 16.552 18.8193 16.1819L18.9505 15.5258C19.1312 14.6228 19.7817 13.8859 20.6553 13.5947C21.0635 13.4586 21.3675 13.1143 21.4519 12.6923L21.5831 12.0362C21.6571 11.6661 22.0172 11.426 22.3874 11.5001Z"
                    fill="black"
                  ></path>
                  <path
                    d="M25.7768 19.5541C25.4472 19.4101 25.0639 19.4706 24.7947 19.7092C24.0571 20.3632 22.984 20.4719 22.1303 19.9791L21.9363 19.8671C21.6094 19.6783 21.4974 19.2603 21.6862 18.9334C21.8749 18.6065 22.2929 18.4945 22.6198 18.6833L22.8138 18.7953C23.1579 18.9939 23.5905 18.9501 23.8877 18.6865C24.5555 18.0943 25.5066 17.9441 26.3244 18.3017L26.5901 18.4178C26.9359 18.5691 27.0937 18.972 26.9425 19.3179C26.7913 19.6638 26.3883 19.8215 26.0424 19.6703L25.7768 19.5541Z"
                    fill="black"
                  ></path>
                  <path
                    d="M12.5802 10.7885C12.7711 10.5976 13.0806 10.5976 13.2715 10.7885C13.4624 10.9794 13.4624 11.2889 13.2715 11.4798C13.0806 11.6707 12.7711 11.6707 12.5802 11.4798C12.3893 11.2889 12.3893 10.9794 12.5802 10.7885Z"
                    fill="black"
                  ></path>
                  <path
                    d="M18.0372 13.7196C17.8462 13.5287 17.5367 13.5287 17.3458 13.7196C17.1549 13.9105 17.1549 14.22 17.3458 14.4109C17.5367 14.6018 17.8462 14.6018 18.0372 14.4109C18.228 14.22 18.228 13.9105 18.0372 13.7196Z"
                    fill="black"
                  ></path>
                  <path
                    d="M21.9025 16.4536C22.0934 16.2626 22.4029 16.2626 22.5938 16.4536C22.7846 16.6444 22.7846 16.954 22.5938 17.1448C22.4029 17.3357 22.0934 17.3357 21.9025 17.1448C21.7115 16.954 21.7115 16.6444 21.9025 16.4536Z"
                    fill="black"
                  ></path>
                  <path
                    d="M24.3261 21.1525C24.1353 20.9617 23.8257 20.9617 23.6349 21.1525C23.444 21.3434 23.444 21.6529 23.6349 21.8438C23.8257 22.0347 24.1353 22.0347 24.3261 21.8438C24.517 21.6529 24.517 21.3434 24.3261 21.1525Z"
                    fill="black"
                  ></path>
                  <path
                    d="M13.0759 25.6436C11.0149 26.323 9.92897 26.6074 9.32827 26.0067C8.66312 25.3416 9.08315 24.0815 9.92321 21.5613L11.4629 16.9423C12.0388 15.2144 12.3772 14.1993 12.9418 13.7875L12.9371 13.8111C12.9305 13.8438 12.921 13.8916 12.909 13.9531C12.8851 14.0761 12.8512 14.254 12.8113 14.4756C12.7315 14.9186 12.627 15.5375 12.528 16.2428C12.332 17.64 12.1504 19.4253 12.2439 20.8519C12.3005 21.7151 12.4801 22.7859 12.6404 23.6227C12.7213 24.045 12.7987 24.4151 12.856 24.6798C12.8846 24.8123 12.9083 24.9185 12.9248 24.9921L12.9441 25.0769L13.0759 25.6436Z"
                    fill="black"
                  ></path>
                  <path
                    d="M18.1496 23.9532L18.3927 23.8721C20.487 23.174 21.5341 22.8249 21.729 21.9991C21.9241 21.1732 21.1435 20.3927 19.5826 18.8317L18.0431 17.2923L18.0388 17.3058C18.021 17.3621 17.9951 17.4451 17.9639 17.5493C17.9014 17.7582 17.818 18.0506 17.7347 18.384C17.5643 19.0664 17.4097 19.8621 17.4097 20.4617C17.4097 21.0613 17.5643 21.8569 17.7347 22.5394C17.818 22.8728 17.9014 23.1652 17.9639 23.3741C17.9951 23.4784 18.021 23.5613 18.0388 23.6176C18.0478 23.6458 18.0547 23.6673 18.0593 23.6813L18.0644 23.6969L18.0655 23.7004L18.1496 23.9532Z"
                    fill="black"
                  ></path>
                  <path
                    d="M14.2862 14.036L14.3324 13.8125C14.8908 14.14 15.5522 14.8013 16.5032 15.7524L16.9614 16.2107L16.7676 16.7939L16.7593 16.8194C16.7537 16.8363 16.7458 16.8609 16.7359 16.8923C16.7159 16.955 16.6878 17.0452 16.6543 17.1573C16.5872 17.3813 16.4979 17.6945 16.4084 18.0528C16.2334 18.7538 16.0426 19.6855 16.0426 20.4617C16.0426 21.238 16.2334 22.1696 16.4084 22.8706C16.4979 23.2289 16.5872 23.5422 16.6543 23.7661C16.6878 23.8783 16.7159 23.9684 16.7359 24.0312C16.7458 24.0625 16.7537 24.087 16.7593 24.1041L16.8527 24.3854L14.3785 25.2101L14.2811 24.7918L14.2765 24.7716L14.2584 24.6917C14.2426 24.6216 14.2198 24.5192 14.192 24.3909C14.1365 24.1342 14.0614 23.7749 13.983 23.3655C13.8246 22.539 13.6587 21.537 13.6079 20.7625C13.5241 19.4831 13.6879 17.8137 13.8817 16.4328C13.9777 15.7489 14.0791 15.1479 14.1566 14.7181C14.1953 14.5033 14.2279 14.3317 14.2508 14.2143C14.2622 14.1556 14.2712 14.1104 14.2773 14.0803L14.2841 14.0464L14.2858 14.0382L14.2862 14.036Z"
                    fill="black"
                  ></path>
                  <path
                    d="M19.8944 9.21158C20.0327 9.19325 20.2847 9.18445 20.485 9.38472C20.6852 9.585 20.6764 9.83697 20.6581 9.97519C20.6407 10.1058 20.5962 10.2623 20.5538 10.4114L20.5212 10.5263L20.5801 10.6196C20.6599 10.7459 20.7455 10.8816 20.798 11.0022C20.8572 11.1384 20.9244 11.3681 20.7976 11.6095C20.6732 11.8463 20.4503 11.9242 20.3085 11.9565C20.1796 11.9858 20.0182 11.9983 19.8648 12.0103L19.7486 12.0193L19.739 12.0201L19.6552 12.1218C19.5553 12.2432 19.4516 12.3693 19.3538 12.4587C19.2503 12.5534 19.0558 12.6994 18.7849 12.6623C18.5048 12.624 18.3595 12.4211 18.2891 12.2944C18.2255 12.1796 18.1698 12.0285 18.1178 11.8877L18.0812 11.7885L17.9819 11.7518C17.8411 11.6999 17.69 11.6441 17.5753 11.5805C17.4485 11.5102 17.2457 11.3649 17.2073 11.0848C17.1702 10.8139 17.3162 10.6194 17.411 10.5158C17.5004 10.4181 17.6264 10.3144 17.7479 10.2144L17.8496 10.1307L17.8503 10.121L17.8594 10.0048C17.8713 9.85142 17.8839 9.6901 17.9132 9.5611C17.9454 9.41934 18.0233 9.19655 18.2602 9.07209C18.5016 8.94521 18.7313 9.01253 18.8674 9.07169C18.9881 9.12414 19.1237 9.20983 19.25 9.2896L19.3435 9.34851L19.4582 9.31588C19.6074 9.27344 19.7638 9.22891 19.8944 9.21158Z"
                    fill="black"
                  ></path>
                  <path
                    d="M26.4433 16.759C26.869 16.3333 27.0264 15.7602 26.7932 15.2554C26.6163 14.8725 26.2584 14.6235 25.8189 14.5297C25.7251 14.0901 25.4761 13.7322 25.0931 13.5553C24.5884 13.3222 24.0152 13.4795 23.5896 13.9052C23.3427 14.1521 23.2309 14.4829 23.1785 14.7775C23.1249 15.0789 23.1239 15.3974 23.1417 15.6765C23.1598 15.9583 23.1982 16.2168 23.2319 16.4036C23.2487 16.4975 23.2646 16.5746 23.2763 16.6288C23.2823 16.6561 23.2872 16.6776 23.2907 16.6928C23.3314 16.8569 23.4657 17.011 23.6297 17.0516L23.6308 17.0518L23.6558 17.0578C23.6709 17.0613 23.6925 17.0662 23.7197 17.0722C23.774 17.084 23.851 17.0999 23.945 17.1167C24.1318 17.1503 24.3902 17.1888 24.672 17.2069C24.9512 17.2247 25.2697 17.2236 25.571 17.17C25.8657 17.1176 26.1965 17.0058 26.4433 16.759Z"
                    fill="black"
                  ></path>
                </svg>
                <svg
                  v-else
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

              <div class="w-full">
                <div class="text-night-sky">{{ item.full_name || item.user.full_name }}</div>
                <div class="text-[10px] text-squant flex items-center justify-between w-full">
                  <span v-if="!item.now_birthday" class="flex-1">{{
                    item.message || 'Mesaj yok.'
                  }}</span>
                  <span v-else class="flex-1">Doğum günü</span>
                  <span
                    v-if="!item.now_birthday && item.confirm_statu"
                    :class="
                      item.confirm_statu === 1
                        ? 'bg-success text-green-900'
                        : item.confirm_statu === 2
                          ? 'bg-danger text-red-900'
                          : 'bg-gray-200'
                    "
                    class="px-2 py-1 text-[10px] rounded-md"
                    >{{ item.confirm_text }}</span
                  >
                  <span
                    v-if="!item.now_birthday && item.statu"
                    :class="
                      item.statu === 1
                        ? 'bg-success text-green-900'
                        : item.statu === 2
                          ? 'bg-danger text-red-900'
                          : 'bg-gray-200'
                    "
                    class="px-2 py-1 text-[10px] rounded-md"
                    >{{ item.statu_text }}</span
                  >
                </div>
              </div>
            </div>
          </a>
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
