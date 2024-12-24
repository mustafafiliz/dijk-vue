<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import VideoBox from '@/components/VideoBox.vue'
import { useAxios } from '@/plugins/axios'
import { ref, onMounted } from 'vue'

const videos = ref([])
const { axios } = useAxios()
const loading = ref(true)
const showModal = ref(false)
const iframeContent = ref('')

const openModal = (video) => {
  iframeContent.value = video?.iframe
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const getVideos = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('/videos')

    videos.value = data.data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getVideos()
})
</script>

<template>
  <button class="py-2" type="button" @click="$router.go(-1)">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 25.5L13.5 18L21 10.5"
        stroke="black"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
  <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Eğitimler</div>
  <div v-if="!loading" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div :key="video._id" v-for="video in videos" class="relative">
      <VideoBox :title="video.title" :iframe="video.iframe" />
      <div
        @click="openModal(video)"
        class="absolute inset-0 z-10 cursor-pointer bg-white bg-opacity-30 flex items-center juistfy-center"
      >
        <div class="bg-white mx-auto w-20 h-20 flex items-center justify-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#292D32"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-play-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-items-center">
    <div
      class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
    ></div>
    <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white p-4 rounded-lg">
      <button
        @click="closeModal"
        class="absolute top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div v-html="iframeContent" class="iframeModalContainer"></div>
    </div>
  </div>
</template>
