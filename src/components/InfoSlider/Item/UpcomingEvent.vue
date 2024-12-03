<script setup>
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import { defineProps } from 'vue'
import EventCard from '../EventCard.vue'

defineProps({
  upcomingEvents: [
    {
      title: String,
      start_date: String,
      end_date: String,
      description: String,
      _id: String
    },
    {
      default: () => ({
        start_date: '',
        endDate: '',
        title: '',
        description: ''
      })
    }
  ]
})
</script>

<template>
  <div class="flex flex-col h-full">
    <InfoSliderHeader title="Yaklaşan Etkinlikler" to="/events">
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

    <div v-if="upcomingEvents?.length > 0" class="flex flex-col gap-y-2 mt-2">
      <EventCard v-for="event in upcomingEvents" :key="event._id" :event="event" />
    </div>
    <div
      v-else
      class="flex items-center justify-center flex-1 text-12 font-medium text-wild-dove min-h-[97px]"
    >
      Yaklaşan Etkinliğiniz Bulunamadı.
    </div>
  </div>
</template>
