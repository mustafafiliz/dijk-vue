<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<template>
  <input class="w-full outline-none rounded-3xl text-24 py-[14px] px-4" :type="type" />
</template>
