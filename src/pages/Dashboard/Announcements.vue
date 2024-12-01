<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import AnnouncementAccordion from '@/components/InfoSlider/AnnouncementAccordion.vue'
import { useAxios } from '@/plugins/axios'
import { ref, onMounted } from 'vue'

const announcements = ref([])
const { axios } = useAxios()
const loading = ref(true)

const getArticles = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('/announcements')

    announcements.value = data.data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getArticles()
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative p-4 flex-1 max-w-5xl">
      <button class="py-2" type="button" @click="$router.go(-1)">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 25.5L13.5 18L21 10.5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Duyurular</div>

      <div v-if="!loading" class="flex flex-col gap-2 mt-5 max-h-[400px] overflow-y-auto">
        <AnnouncementAccordion
          v-for="announcement in announcements"
          :key="announcement._id"
          :announcement="announcement"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-items-center">
        <div
          class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
        ></div>
        <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
      </div>
    </div>
    <BottomNavigation />
  </div>
</template>
