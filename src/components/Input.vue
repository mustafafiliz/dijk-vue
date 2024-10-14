<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <input
    class="w-full relative outline-none rounded-3xl text-24 py-[14px] px-4"
    :type="type"
    :value="value"
  />
</template>

<style>
input[type='date']::-webkit-inner-spin-button,
input[type='time']::-webkit-calendar-picker-indicator,
input[type='date']::-webkit-calendar-picker-indicator {
  background: none;
  position: absolute;
  left: 0;
  width: 100%;
}
</style>
