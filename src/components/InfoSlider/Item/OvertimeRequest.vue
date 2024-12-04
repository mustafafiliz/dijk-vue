<script setup>
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import { defineProps } from 'vue'
import UpComingCard from '../UpComingCard.vue'

defineProps({
  upcomingOvertimes: [
    {
      full_name: String,
      date: String,
      _id: String
    },
    {
      default: () => ({
        full_name: '',
        date: '',
        _id: ''
      })
    }
  ]
})
</script>

<template>
  <div class="flex flex-col h-full">
    <InfoSliderHeader title="Fazla Mesai Talepleri">
      <template #icon>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="8" fill="#B13A3A" />
          <path
            d="M18 8C12.5 8 8 12.5 8 18C8 23.5 12.5 28 18 28C23.5 28 28 23.5 28 18C28 12.5 23.5 8 18 8ZM19 18C19 18.4 18.8 18.7 18.5 18.9L15.15 20.9C14.65 21.2 14.05 21 13.75 20.5C13.45 20 13.65 19.4 14.15 19.1L17 17.4V13C17 12.4 17.4 12 18 12C18.6 12 19 12.4 19 13V18Z"
            fill="white"
          />
        </svg>
      </template>
    </InfoSliderHeader>

    <div
      v-if="upcomingOvertimes.length > 0"
      class="flex flex-col mt-4 gap-y-2 max-h-[140px] overflow-y-auto"
    >
      <UpComingCard v-for="item in upcomingOvertimes" :item="item" />
    </div>
    <div v-else class="flex items-center justify-center h-full text-sm">Bulunamadı.</div>
  </div>
</template>
