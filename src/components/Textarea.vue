<script setup>
import { defineProps, ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 5
  }
})

const currentValue = ref(props.value)
const maxLength = ref(216)

watch(
  () => props.value,
  (newValue) => {
    currentValue.value = newValue
  }
)
</script>

<template>
  <div>
    <textarea
      class="w-full relative outline-none rounded-20 text-12 font-medium py-[14px] px-4"
      v-model="currentValue"
      :rows="5"
      :placeholder="placeholder"
      >{{ props.value }}</textarea
    >

    <div class="mt-1 text-[10px] text-metal-armor font-medium">
      {{ maxLength - currentValue.length }} / {{ maxLength }} karakter kaldı.
    </div>
  </div>
</template>
