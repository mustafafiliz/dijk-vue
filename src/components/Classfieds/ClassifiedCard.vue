<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="relative h-32">
      <img :src="classified.images[0]" :alt="classified.title" class="w-full h-full object-cover" />
    </div>

    <div class="p-2 lg:p-4">
      <h3 class="lg:text-18 text-sm font-medium text-night-sky mb-2">{{ classified.title }}</h3>
      <p class="lg:text-20 text-sm font-medium text-night-sky">Fiyat: {{ classified.price }} TL</p>
    </div>
    <div class="flex">
      <RouterLink
        :to="`/dashboard/classifieds/${classified._id}`"
        class="bg-gray-100 text-xs text-black font-medium text-center py-2 w-full"
      >
        Detay
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  classified: {
    type: Object,
    required: true
  }
})
</script>
