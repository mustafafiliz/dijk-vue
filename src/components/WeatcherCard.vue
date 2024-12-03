<script setup>
import { useMeStore } from '@/stores/me'
import { onMounted, ref, watchEffect } from 'vue'

const greeting = ref('')
const imageSrc = ref('')
const currentTime = ref('')
const meStore = useMeStore()

const updateGreetingAndImage = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) {
    greeting.value = `Günaydın ${meStore.user.full_name}`
    imageSrc.value = '/images/sunny.jpg'
  } else if (hour >= 12 && hour < 17) {
    greeting.value = `İyi Günler ${meStore.user.full_name}`
    imageSrc.value = '/images/sunny.jpg'
  } else if (hour >= 17 && hour < 21) {
    greeting.value = `İyi Akşamlar ${meStore.user.full_name}`
    imageSrc.value = '/images/night.png'
  } else {
    greeting.value = `İyi Geceler ${meStore.user.full_name}`
    imageSrc.value = '/images/night.png'
  }
}

const updateCurrentTime = () => {
  currentTime.value = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

onMounted(() => {
  updateGreetingAndImage()
  updateCurrentTime()

  setInterval(() => {
    updateGreetingAndImage()
    updateCurrentTime()
  }, 1000)
})

watchEffect(updateCurrentTime, { flush: 'post' })
</script>

<template>
  <div
    class="rounded-lg overflow-hidden relative md:aspect-[400/90] aspect-[400/150] w-full h-auto"
  >
    <div class="absolute inset-0 z-10 bg-black bg-opacity-5" />
    <div
      class="z-[11] flex items-center justify-between absolute top-0 left-0 w-full p-[10px] text-white md:p-10"
    >
      <div class="font-semibold">
        <div class="text-[20px] md:text-4xl mt-5">{{ greeting }}</div>
        <div class="text-[25px] md:text-5xl mt-5">{{ currentTime }}</div>
      </div>
    </div>
    <img class="w-full h-full object-cover" :src="imageSrc" alt="" />
  </div>
</template>
