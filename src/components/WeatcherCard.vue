src/components/WeatcherCard.vue
<script setup>
import { useMeStore } from '@/stores/me'
import { onMounted, ref } from 'vue'

const greeting = ref('')
const imageSrc = ref('')
const meStore = useMeStore()

const updateGreetingAndImage = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) {
    greeting.value = `Günaydın ${meStore.user.name}`
    imageSrc.value = '/images/gunaydin.png'
  } else if (hour >= 12 && hour < 17) {
    greeting.value = `İyi Günler ${meStore.user.name}`
    imageSrc.value = '/images/iyigunler.png'
  } else if (hour >= 17 && hour < 21) {
    greeting.value = `İyi Akşamlar ${meStore.user.name}`
    imageSrc.value = '/images/iyiaksamlar.png'
  } else {
    greeting.value = `İyi Geceler ${meStore.user.name}`
    imageSrc.value = '/images/iyigeceler.png'
  }
}

onMounted(() => {
  updateGreetingAndImage()
})
</script>

<template>
  <div class="rounded-2xl overflow-hidden relative md:aspect-[400/110] w-full">
    <div
      class="flex items-center justify-between absolute top-0 left-0 w-full p-[10px] text-white md:p-10"
    >
      <div class="font-semibold">
        <div class="text-[20px] md:text-4xl">{{ greeting }}</div>
      </div>
    </div>
    <img class="w-full h-full object-cover" :src="imageSrc" alt="" />
  </div>
</template>
