<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import InfoSlider from '@/components/InfoSlider/Index.vue'
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import InfoSliderItemVacation from '@/components/InfoSlider/Item/Vacation.vue'
import InfoSliderItemUpcomingEvent from '@/components/InfoSlider/Item/UpcomingEvent.vue'
import InfoSliderItemUserData from '@/components/InfoSlider/Item/UserData.vue'
import InfoSliderItemUpcomingBirthday from '@/components/InfoSlider/Item/UpcomingBirthday.vue'
import InfoSliderItemUpcomingHoliday from '@/components/InfoSlider/Item/UpcomingHoliday.vue'
import InfoSliderItemUpcomingVacation from '@/components/InfoSlider/Item/UpcomingVacation.vue'
import InfoSliderItemOvertimeRequest from '@/components/InfoSlider/Item/OvertimeRequest.vue'
import AnnouncementAccordion from '@/components/InfoSlider/AnnouncementAccordion.vue'
import WeatcherCard from '@/components/WeatcherCard.vue'
import VideoBox from '@/components/VideoBox.vue'
import QuickActions from '@/components/QuickActions.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { onMounted, ref } from 'vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import ArticleCard from '@/components/InfoSlider/ArticleCard.vue'

const { axios } = useAxios()
const meStore = useMeStore()

const user = meStore.user

const isOffToday = ref(false)
const isOffTodayPermit = ref(null)
const upcomingPermits = ref([])
const upcomingEvents = ref([])
const upcomingBirthdays = ref([])
const upcomingHolidays = ref([])
const upcomingOvertimes = ref([])
const myRemainingPermits = ref(null)
const videos = ref([])
const showModal = ref(false)
const iframeContent = ref('')
const announcements = ref([])
const articles = ref([])
const loading = ref(true)

const openModal = (video) => {
  iframeContent.value = video?.iframe
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const dateOnly = (date) => {
  const d = new Date(date)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]
}

const calculateExperience = (startDate) => {
  const start = new Date(startDate)
  const today = new Date()

  let years = today.getFullYear() - start.getFullYear()
  let months = today.getMonth() - start.getMonth()
  let days = today.getDate() - start.getDate()

  // Adjust for negative months
  if (months < 0) {
    years--
    months += 12
  }

  // Adjust for negative days
  if (days < 0) {
    months--
    // Get last day of previous month
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }

  // Handle edge case when months becomes negative after days adjustment
  if (months < 0) {
    years--
    months += 12
  }

  let experience = ''
  if (years > 0) {
    experience += `${years} yıl `
  }
  if (months > 0) {
    experience += `${months} ay `
  }
  if (days > 0) {
    experience += `${days} gün`
  }

  return experience.trim()
}

const getHomePageData = async () => {
  const today = new Date()

  try {
    const data = await axios.get('/homepage')

    const birthdays = data.birthdays.map((item) => {
      const birthdayDate = new Date(item.birthday)
      const targetYear =
        birthdayDate.getMonth() < today.getMonth() ? today.getFullYear() + 1 : today.getFullYear()
      birthdayDate.setFullYear(targetYear)
      return {
        ...item,
        date: dateOnly(birthdayDate),
        type: 'birthday'
      }
    })

    const holidays = data.holidays.map((item) => {
      return {
        ...item,
        date: dateOnly(item.start_date)
      }
    })

    const permits = data.permits.map((item) => {
      return {
        ...item,
        full_name: item.user.full_name,
        date: dateOnly(item.start_date),
        type: 'permit'
      }
    })

    const overtimes = data.overtimes.map((item) => {
      return {
        ...item,
        full_name: item.user.full_name,
        date: item.start_date,
        dateRange: item.start_date.split(' ')?.[1] + ' ' + item.end_date.split(' ')?.[1],
        type: 'overtime'
      }
    })

    upcomingBirthdays.value = birthdays
    upcomingHolidays.value = holidays
    upcomingPermits.value = permits
    upcomingOvertimes.value = overtimes

    articles.value = data.articles
    announcements.value = data.announcements
    videos.value = data.videos
    upcomingEvents.value = data.events

    myRemainingPermits.value = data.annual_permit_day
    isOffToday.value = data.is_off_today
    isOffTodayPermit.value = data.is_off_today_permit

    console.log('hey', data.is_off_today)
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  getHomePageData()
})
</script>

<template>
  <div
    class="flex flex-col max-md:h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 flex-1 max-w-5xl lg:min-h-dvh">
      <div class="flex items-center">
        <img
          v-if="meStore?.user?.company_image && me?.user?.company_image !== null"
          class="me-auto w-10 h-10 rounded-full"
          :src="meStore.user.company_image"
          alt=""
        />
        <div
          v-else
          class="flex items-center justify-center rounded-full bg-white border border-gray-100 text-sm"
        >
          {{ meStore?.user?.erp_company_text.split(' ')[0].charAt(0).toUpperCase() }}
          {{ meStore?.user?.erp_company_text.split(' ')[1].charAt(0).toUpperCase() }}
        </div>
        <UserAvatar />
      </div>
      <div class="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2">
        <div class="col-span-2 flex justify-center">
          <WeatcherCard class="order-1" />
        </div>
        <div class="order-2 md:col-span-2">
          <div class="flex items-center gap-x-2 mb-4">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="8" fill="#FF8000" />
              <g clip-path="url(#clip0_280_4126)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.2597 18.9H21.5597C20.0683 18.9 18.9 20.1168 18.9 21.6081V24.3081C18.9 25.7994 20.0683 27 21.5597 27H24.2597C25.7511 27 27 25.7994 27 24.3081V21.6081C27 20.1168 25.7511 18.9 24.2597 18.9ZM14.3597 18.9H11.6597C10.1683 18.9 9 20.1168 9 21.6081V24.3081C9 25.7994 10.1683 27 11.6597 27H14.3597C15.8511 27 17.1 25.7994 17.1 24.3081V21.6081C17.1 20.1168 15.8511 18.9 14.3597 18.9ZM24.2597 9H21.5597C20.0683 9 18.9 10.2168 18.9 11.7081V14.4081C18.9 15.8994 20.0683 17.1 21.5597 17.1H24.2597C25.7511 17.1 27 15.8994 27 14.4081V11.7081C27 10.2168 25.7511 9 24.2597 9ZM14.3597 9H11.6597C10.1683 9 9 10.2168 9 11.7081V14.4081C9 15.8994 10.1683 17.1 11.6597 17.1H14.3597C15.8511 17.1 17.1 15.8994 17.1 14.4081V11.7081C17.1 10.2168 15.8511 9 14.3597 9Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_280_4126">
                  <rect width="18" height="18" fill="white" transform="translate(9 9)" />
                </clipPath>
              </defs>
            </svg>

            <span class="text-[18px] font-semibold"> Hızlı Alanım </span>
          </div>

          <QuickActions />
        </div>
        <template v-if="loading">
          <div
            class="order-3 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
          <div
            class="order-4 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
          <div
            class="order-4 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
          <div
            class="order-5 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
          <div
            class="order-5 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
          <div
            class="order-5 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
          <div
            class="order-5 col-span-2 bg-white border border-gray-200 animate-pulse h-40 rounded-2xl flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-5 w-5 border-t-4 border-b-4 border-blue-500 mx-auto"
            ></div>
          </div>
        </template>
        <template v-else>
          <InfoSlider class="order-3">
            <template #slide0>
              <InfoSliderItemVacation
                total-annual-leave="14"
                :remaining-annual-leave="myRemainingPermits"
                :is-off-today="isOffToday"
                :is-off-today-permit="isOffTodayPermit"
              />
            </template>
            <template #slide1>
              <InfoSliderItemUserData
                :user-data="{
                  name: user.full_name,
                  startDate: user.work_start_date,
                  experience: calculateExperience(user.work_start_date),
                  jobTitle: user.work_title_text,
                  company: user.erp_company_text,
                  workType: user.erp_plant_text
                }"
              />
            </template>
          </InfoSlider>
          <div v-if="upcomingEvents?.length > 0" class="bg-white rounded-2xl h-full order-4 p-2">
            <InfoSliderItemUpcomingEvent :upcoming-events="upcomingEvents" />
          </div>
          <InfoSlider class="order-5">
            <template #slide0>
              <InfoSliderItemUpcomingBirthday :upcomingBirthdays="upcomingBirthdays" />
            </template>
            <template #slide1>
              <InfoSliderItemUpcomingHoliday :upcomingHolidays="upcomingHolidays" />
            </template>
          </InfoSlider>
          <InfoSlider class="order-6">
            <template #slide0>
              <InfoSliderItemUpcomingVacation :upcomingVacations="upcomingPermits" />
            </template>
            <template #slide1>
              <InfoSliderItemOvertimeRequest :upcomingOvertimes="upcomingOvertimes" />
            </template>
          </InfoSlider>
          <div class="bg-white rounded-2xl h-full order-7 p-2">
            <InfoSliderHeader to="/dashboard/announcements" title="Duyurular">
              <template #icon>
                <div class="relative">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FF5454" />
                  </svg>
                  <span class="flex items-center justify-center absolute inset-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 -1 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    >
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                      >
                        <g
                          id="Icon-Set-Filled"
                          sketch:type="MSLayerGroup"
                          transform="translate(-206.000000, -310.000000)"
                          fill="#fff"
                        >
                          <path
                            d="M224,330 L227,330 L227,316 L224,316 L224,330 Z M236,310 L229,314.667 L229,331.333 L236,336 C237.104,336 238,335.104 238,334 L238,312 C238,310.896 237.104,310 236,310 L236,310 Z M206,323 C206,326.733 208.561,329.148 212.019,329.81 L212,330 L212,338 C212,339.104 212.896,340 214,340 L217,340 C218.104,340 219,339.104 219,338 L219,330 L222,330 L222,316 L214,316 C209.582,316 206,318.582 206,323 L206,323 Z"
                            id="megaphone"
                            sketch:type="MSShapeGroup"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </span>
                </div>
              </template>
            </InfoSliderHeader>
            <div class="flex flex-col gap-2 mt-5 max-h-[400px] overflow-y-auto">
              <AnnouncementAccordion
                v-for="announcement in announcements"
                :key="announcement._id"
                :announcement="announcement"
              />
            </div>
          </div>
          <div class="bg-white p-2 rounded-2xl col-span-1 order-8">
            <InfoSliderHeader to="/dashboard/videos" title="Eğitimler">
              <template #icon>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="8" fill="#FF5454" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.9948 13.9878H15.0052C11.9678 13.9878 10.4492 13.9878 9.59609 14.8759C8.74302 15.7641 8.94373 17.1363 9.34516 19.8806L9.72583 22.483C10.0406 24.6351 10.198 25.7111 11.0055 26.3555C11.813 26.9999 13.0039 26.9999 15.3858 26.9999H20.6141C22.9961 26.9999 24.1871 26.9999 24.9945 26.3555C25.802 25.7111 25.9593 24.6351 26.2742 22.483L26.6549 19.8806C27.0563 17.1363 27.257 15.7641 26.4039 14.8759C25.5508 13.9878 24.0322 13.9878 20.9948 13.9878ZM20.3231 21.4148C20.8256 21.1032 20.8256 20.2967 20.3231 19.9851L17.2886 18.104C16.8002 17.8013 16.2 18.1954 16.2 18.8188V22.5811C16.2 23.2045 16.8002 23.5986 17.2886 23.2959L20.3231 21.4148Z"
                    fill="white"
                  />
                  <path
                    opacity="0.4"
                    d="M14.8585 9.00001H21.1406C21.3498 8.99995 21.5103 8.99992 21.6505 9.01363C22.6475 9.11117 23.4636 9.71062 23.8097 10.5181H12.1895C12.5355 9.71062 13.3516 9.11117 14.3486 9.01363C14.4889 8.99992 14.6493 8.99995 14.8585 9.00001Z"
                    fill="white"
                  />
                  <path
                    opacity="0.7"
                    d="M12.8791 11.4504C11.6275 11.4504 10.6013 12.2062 10.2588 13.2089C10.2517 13.2297 10.2448 13.2508 10.2383 13.2719C10.5966 13.1634 10.9695 13.0925 11.3471 13.0441C12.3194 12.9194 13.5482 12.9195 14.9756 12.9196H21.1785C22.6059 12.9195 23.8348 12.9194 24.8071 13.0441C25.1846 13.0925 25.5576 13.1634 25.9159 13.2719C25.9094 13.2508 25.9024 13.2297 25.8953 13.2089C25.5529 12.2062 24.5266 11.4504 23.2751 11.4504H12.8791Z"
                    fill="white"
                  />
                </svg>
              </template>
            </InfoSliderHeader>
            <div class="grid grid-cols-2 gap-x-2 flex-1 overflow-x-auto mt-2">
              <div :key="video._id" v-for="video in videos" class="relative">
                <VideoBox :title="video.title" :iframe="video.iframe" />
                <div
                  @click="openModal(video)"
                  class="absolute inset-0 z-10 cursor-pointer bg-white bg-opacity-30 flex items-center juistfy-center"
                >
                  <div
                    class="bg-white mx-auto w-20 h-20 flex items-center justify-center rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#292D32"
                      stroke-width="1.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-play-circle"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2 order-9 bg-white p-2 rounded-2xl">
            <InfoSliderHeader title="Haberler" to="/dashboard/articles">
              <template #icon>
                <div class="relative flex items-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="36" rx="8" fill="#FF5454" />
                  </svg>
                  <span
                    class="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-tv"
                    >
                      <rect
                        stroke="#fff"
                        fill="#fff"
                        x="2"
                        y="7"
                        width="20"
                        height="15"
                        rx="2"
                        ry="2"
                      ></rect>
                      <polyline stroke="#fff" points="17 2 12 7 7 2"></polyline>
                    </svg>
                  </span>
                </div>
              </template>
            </InfoSliderHeader>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-5 max-h-[400px] overflow-y-auto">
              <ArticleCard v-for="article in articles" :key="article._id" :article="article" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <BottomNavigation />
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white p-4 rounded-lg">
      <button
        @click="closeModal"
        class="absolute top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div v-html="iframeContent" class="iframeModalContainer"></div>
    </div>
  </div>
</template>

<style>
.iframeModalContainer {
  width: 85vw;
  height: auto;
  aspect-ratio: 16 / 9;
}
.iframeModalContainer iframe {
  width: 100%;
  height: 100%;
}
</style>
