<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
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

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <textarea
      class="w-full relative outline-none rounded-20 text-12 font-medium py-[14px] px-4 resize-none"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      :placeholder="placeholder"
    ></textarea>

    <div class="mt-1 text-[10px] text-metal-armor font-medium">
      {{ 216 - props.modelValue.length }} / 216 karakter kaldı.
    </div>
  </div>
</template>
