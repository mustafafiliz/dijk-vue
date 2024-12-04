<script setup>
import { ref } from 'vue'
import Button from './Button.vue'
const isOpen = ref(false)

defineProps({
  description: {
    type: String,
    default: ''
  },
  amount: {
    type: String,
    default: ''
  },
  expenseType: {
    type: String,
    default: ''
  },
  vatRate: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: new Date().toISOString()
  },
  isNew: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  },
  permissives: {
    type: Array,
    default: () => [{ name: 'John Doe', value: 'true' }]
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-2 bg-white py-3 px-4 rounded-20">
    <div @click="isOpen = !isOpen" class="flex justify-between items-center">
      <div class="font-semibold">
        <div>
          {{ description }}
        </div>
        <div class="text-12 text-squant">
          {{ date }}
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <button type="button" @click="isOpen = !isOpen">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 9.5L12.5 15.5L18.5 9.5"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-show="isOpen">
      <div class="flex flex-col gap-y-2 mt-2">
        <div class="flex flex-col gap-y-1">
          <div v-if="expenseType" class="flex justify-between items-center font-semibold text-12">
            <div>Masraf Türü</div>
            <div class="text-squant">{{ expenseType }}</div>
          </div>
          <div v-if="amount" class="flex justify-between items-center font-semibold text-12">
            <div>KDV Dahil Tutar</div>
            <div class="text-squant">{{ amount }}</div>
          </div>
          <div v-if="vatRate" class="flex justify-between items-center font-semibold text-12">
            <div>KDV Oranı</div>
            <div class="text-squant">{{ vatRate }}</div>
          </div>
          <div v-if="company" class="flex justify-between items-center font-semibold text-12">
            <div>Masraf Yapılan Firma</div>
            <div class="text-squant">{{ company }}</div>
          </div>
          <div v-if="image">
            <img class="w-full rounded-lg" :src="image" alt="Masraf Belgesi" />
          </div>
        </div>
        <Button class="!px-2 !py-1 !text-12 self-end font-normal" type="button" variant="primary"
          >Düzenle</Button
        >
      </div>
    </div>
  </div>
</template>
