<template>
  <div class="border border-gray-200 rounded-lg bg-white">
    <div @click="toggleAccordion" class="flex justify-between items-center cursor-pointer">
      <h3 class="text-sm font-medium">{{ announcement.title }}</h3>
    </div>
    <div v-if="isOpen" class="mt-2">
      <div v-html="announcement.description"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  article: {
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
