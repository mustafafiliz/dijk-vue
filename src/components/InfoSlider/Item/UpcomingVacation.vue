<script setup>
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import { defineProps } from 'vue'
import UpComingCard from '../UpComingCard.vue'

defineProps({
  upcomingVacations: [
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
    <InfoSliderHeader title="Yaklaşan İzinler">
      <template #icon>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="8" fill="#2F69FF" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4357 24.491C11.4372 23.9007 11.7727 23.3235 12.319 22.6775L9.15934 20.6794C8.96012 20.593 8.96451 20.4714 9.08023 20.3278L9.74968 19.7565C9.87126 19.6818 10.0002 19.6496 10.1393 19.6877L14.0388 20.3469L17.2879 16.8282L9.7028 11.6968C9.5109 11.584 9.49479 11.4565 9.69255 11.3086L10.7868 10.4355L20.6746 13.2144L23.5956 10.0913C24.5756 9.24312 25.5277 8.86372 26.2587 9.0439C26.6615 9.14351 26.8036 9.26363 26.9281 9.64157C27.1698 10.3828 26.7948 11.3789 25.9086 12.4043L22.7855 15.3253L25.5644 25.2132L24.6913 26.3074C24.5433 26.5037 24.4159 26.4876 24.3031 26.2972L19.1702 18.7135L15.6516 21.9612L16.3108 25.8607C16.3489 25.9984 16.3181 26.1273 16.242 26.2503L15.6707 26.9198C15.5286 27.0355 15.4055 27.0399 15.3191 26.8407L13.321 23.6809C12.6721 24.2288 12.0949 24.5642 11.5017 24.5642C11.4475 24.5628 11.4357 24.5437 11.4357 24.491Z"
            fill="white"
          />
        </svg>
      </template>
    </InfoSliderHeader>

    <div
      v-if="upcomingVacations.length > 0"
      class="flex flex-col mt-4 gap-y-2 max-h-[140px] overflow-y-auto"
    >
      <UpComingCard v-for="item in upcomingVacations" :item="item" />
    </div>
    <div v-else class="flex items-center justify-center h-full text-sm">Bulunamadı.</div>
  </div>
</template>
