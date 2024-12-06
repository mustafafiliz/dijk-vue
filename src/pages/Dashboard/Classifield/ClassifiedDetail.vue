<template>
  <div class="relative">
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
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
      İlan Detayı
    </div>
  </div>

  <div v-if="classified" class="max-w-4xl mx-auto p-4">
    <!-- Image Gallery -->
    <div class="overflow-x-auto flex gap-2 scrollbar-hide scroll-smooth" ref="sliderContainer">
      <div v-for="(image, index) in classified.images" class="flex w-full min-w-[100%]">
        <img
          :key="index"
          :src="image"
          :alt="`Image ${index + 1}`"
          class="w-full h-64 object-cover rounded-lg flex-shrink-0"
        />
      </div>
    </div>

    <!-- Main Info -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ classified.title }}</h1>
          <div class="text-xl font-semibold text-blue-600">
            {{ formatPrice(classified.price) }} ₺
          </div>
        </div>
        <div
          class="px-3 py-1 rounded-full"
          :class="
            classified.statu === 1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          "
        >
          {{ classified.statu_text }}
        </div>
      </div>

      <div class="mt-4 text-gray-500">İlan Tarihi: {{ formatDate(classified.created_at) }}</div>
    </div>

    <!-- Seller Info -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Satıcı Bilgileri</h2>
      <div class="flex items-center">
        <img
          :src="classified.seller.image"
          :alt="classified.seller.full_name"
          class="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 class="font-medium">{{ classified.seller.full_name }}</h3>
          <p class="text-gray-600">{{ classified.seller.department_text }}</p>
          <p class="text-gray-600">{{ classified.seller.work_title_text }}</p>
          <div class="mt-2 space-y-1">
            <a
              :href="`mailto:${classified.seller.email}`"
              class="text-blue-600 hover:underline block"
            >
              {{ classified.seller.email }}
            </a>
            <a :href="`tel:${classified.seller.phone}`" class="text-blue-600 hover:underline block">
              +90{{ classified.seller.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAxios } from '@/plugins/axios'

const route = useRoute()
const { axios } = useAxios()
const classified = ref(null)

const formatPrice = (price) => {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchClassifiedDetail = async () => {
  try {
    const response = await axios.get(`/classifieds/${route.params.id}`)
    classified.value = response.data
  } catch (error) {
    console.error('Error fetching classified details:', error)
  }
}

onMounted(() => {
  fetchClassifiedDetail()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
