<script setup>
import { ref, defineProps } from 'vue'
import RadioInput from '@/components/RadioInput.vue'

defineProps({
  name: {
    type: String,
    default: 'Yetklinlik Adı'
  },
  description: {
    type: String,
    default: 'Yetkinliğe ait uzun açıklama bu alanda yer alaacaktır.'
  },
  point: {
    type: String,
    default: '100'
  }
})

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center gap-x-2">
      <button
        class="flex items-center gap-x-4 px-2 py-[2px] rounded-md bg-black bg-opacity-5 text-12 font-medium"
        type="button"
        @click="isOpen = !isOpen"
      >
        {{ name }}

        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.25 5.375L6.5 8.625L9.75 5.375"
            stroke="black"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <span class="bg-gentian-flower px-1 py-[2px] rounded text-[10px] text-white font-semibold">
        {{ point }}
      </span>
    </div>

    <template v-if="isOpen">
      <div class="text-14">
        {{ description }}
      </div>
      <div class="flex gap-x-2">
        <RadioInput class="flex-1" :name="name" label="1" />
        <RadioInput class="flex-1" :name="name" label="2" />
        <RadioInput class="flex-1" :name="name" label="3" />
        <RadioInput class="flex-1" :name="name" label="4" />
        <RadioInput class="flex-1" :name="name" label="5" />
      </div>
    </template>
  </div>
</template>
