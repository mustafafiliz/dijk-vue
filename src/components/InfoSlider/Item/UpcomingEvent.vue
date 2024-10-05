<script setup>
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import { defineProps } from 'vue'

defineProps({
  upcomingEvents: [
    {
      title: String,
      startDate: String,
      endDate: String
    },
    {
      default: () => ({
        startDate: '',
        endDate: '',
        title: ''
      })
    }
  ]
})

const getTodayFormatted = () => {
  const today = new Date()
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  const months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık'
  ]

  const day = today.getDate()
  const month = months[today.getMonth()]
  const dayOfWeek = days[today.getDay()]

  return `${day} ${month} ${dayOfWeek}`
}

const createEventColor = (index) => {
  const colors = ['#FFAB57', '#A483FF']
  return colors[index % colors.length]
}
</script>

<template>
  <div class="flex flex-col h-full">
    <InfoSliderHeader title="Yaklaşan Etkinlikler" to="/#">
      <template #icon>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="8" fill="#FFD12F" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 10.2558C13.723 10.2558 10.2558 13.723 10.2558 18C10.2558 22.277 13.723 25.7442 18 25.7442C22.277 25.7442 25.7442 22.277 25.7442 18C25.7442 13.723 22.277 10.2558 18 10.2558ZM9 18C9 13.0294 13.0294 9 18 9C22.9706 9 27 13.0294 27 18C27 22.9706 22.9706 27 18 27C13.0294 27 9 22.9706 9 18ZM18 14.0233C18.3468 14.0233 18.6279 14.3044 18.6279 14.6512V17.7399L20.537 19.6491C20.7822 19.8943 20.7822 20.2918 20.537 20.537C20.2918 20.7822 19.8943 20.7822 19.6491 20.537L17.556 18.444C17.4382 18.3263 17.3721 18.1665 17.3721 18V14.6512C17.3721 14.3044 17.6532 14.0233 18 14.0233Z"
            fill="black"
          />
        </svg>
      </template>
    </InfoSliderHeader>

    <div class="flex gap-x-1 mt-2 text-12 font-semibold">
      {{ getTodayFormatted() }} <span class="text-wild-dove">Bugün</span>
    </div>

    <div v-if="upcomingEvents?.length > 0" class="flex flex-col gap-y-2 mt-2">
      <div v-for="(event, index) in upcomingEvents" class="text-12 relative ps-3">
        <div
          class="w-1 left-0 top-0 bottom-0 rounded-full absolute"
          :style="`background-color: ${createEventColor(index)}`"
        ></div>
        <div class="font-medium">
          {{ event.title }}
        </div>
        <div class="flex items-center gap-x-1 text-wild-dove font-bold">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M8 16C12.4182 16 16 12.4182 16 8C16 3.58172 12.4182 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4182 3.58172 16 8 16Z"
              fill="#8A8A8A"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.9999 4.20001C8.33126 4.20001 8.5999 4.46864 8.5999 4.80001V7.75145L10.4241 9.57577C10.6585 9.81009 10.6585 10.1899 10.4241 10.4243C10.1898 10.6586 9.80998 10.6586 9.57566 10.4243L7.57566 8.42425C7.4631 8.31177 7.3999 8.15913 7.3999 8.00001V4.80001C7.3999 4.46864 7.66854 4.20001 7.9999 4.20001Z"
              fill="#292D32"
            />
          </svg>
          {{ event.startDate }} - {{ event.endDate }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-center flex-1 text-12 font-medium text-wild-dove min-h-[97px]"
    >
      Yaklaşan Etkinliğiniz Bulunamadı.
    </div>
  </div>
</template>
