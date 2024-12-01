<template>
  <div class="border border-gray-200 rounded-lg bg-white overflow-hidden">
    <div class="bg-gray-100 aspect-[16/9]"></div>
    <div @click="toggleAccordion" class="flex justify-between items-center cursor-pointer">
      <h3 class="text-sm font-medium p-2">{{ article.title }}</h3>
    </div>
    <!-- Modal -->
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
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
      <div class="bg-white p-4 !pt-6 max-h-[90vh] overflow-y-auto rounded-lg relative">
        <h3 class="!text-2xl !text-center font-medium">{{ article.title }}</h3>
        <div v-html="article.description" class="iframeModalContainer mt-10"></div>
      </div>
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

const closeModal = () => {
  isOpen.value = false
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
