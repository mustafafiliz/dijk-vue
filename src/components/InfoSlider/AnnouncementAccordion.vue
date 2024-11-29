<template>
  <div class="announcement w-full p-2 border border-gray-200 rounded-lg bg-white">
    <div @click="toggleAccordion" class="flex justify-between items-center cursor-pointer">
      <h3 class="text-sm font-medium">{{ announcement.title }}</h3>
      <svg
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-down transition-transform duration-200"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <div v-if="isOpen" class="mt-2">
      <div v-html="announcement.description"></div>
      <div class="flex items-center justify-between mt-4">
        <div>Baş: {{ announcement.start_date }}</div>
        <div>Bit: {{ announcement.end_date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  announcement: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<style>
.announcement {
  cursor: pointer;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>
