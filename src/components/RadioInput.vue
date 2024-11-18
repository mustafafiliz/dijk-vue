<script setup>
defineProps({
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div :for="name" class="relative text-12 font-semibold">
    <input class="absolute inset-0 opacity-0 peer" type="radio" :name="name" :id="id" />
    <label
      :for="name"
      class="text-center bg-black bg-opacity-5 p-1 rounded block peer-checked:bg-gentian-flower peer-checked:text-white"
    >
      {{ label }}
    </label>
  </div>
</template>
