<template>
  <div
    @click="openModal"
    class="flex items-center justify-between pr-2 border border-gray-200 py-2 rounded-lg bg-white overflow-hidden"
  >
    <div class="text-12 relative ps-3 cursor-pointer">
      <div class="font-medium">
        {{ event.title }}
      </div>
      <div class="flex items-center gap-x-1 text-wild-dove font-bold mt-2">
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
        {{ event.start_date }} - {{ event.end_date }}
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-book-open cursor-pointer"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  </div>
  <div
    v-if="isOpen === true"
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
      <h3 class="!text-2xl !text-center font-medium">{{ event.title }}</h3>
      <div v-html="event.description" class="iframeModalContainer mt-10"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}
</script>
