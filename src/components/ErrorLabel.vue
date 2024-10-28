<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  centered: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span
    v-if="text"
    class="text-red-500 text-xs block mt-3 w-full"
    :class="{ 'text-center': centered }"
    >{{ text }}</span
  >
</template>
