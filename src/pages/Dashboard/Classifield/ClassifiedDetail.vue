<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative flex flex-col p-4 pb-20 flex-1 max-w-5xl">
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
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">İlan Detayı</div>
      <div v-if="classified" class="max-w-4xl mx-auto">
        <div v-if="isOwnClassified || classified.statu === 1" class="grid grid-cols-2 gap-3 mb-4">
          <RouterLink :to="`/dashboard/classifieds/${classified._id}/edit`">
            <Button
              class="flex w-full items-center gap-2 h-[40px] !text-sm bg-gentian-flower text-white rounded-lg hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Düzenle
            </Button>
          </RouterLink>

          <Button
            @click="handleDelete"
            class="flex items-center h-[40px] !text-sm gap-2 px-4 py-2 bg-lusty-red text-white rounded-lg hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Kaldır
          </Button>
        </div>

        <!-- Image Gallery -->
        <div class="max-w-[calc(100vw-28px)] lg:max-w-4xl">
          <swiper
            :modules="[Navigation, Pagination]"
            :navigation="{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }"
            :pagination="{
              el: '.swiper-pagination',
              clickable: true
            }"
            :slides-per-view="1"
            :space-between="5"
          >
            <swiper-slide v-for="slide in classified.images" :key="slide">
              <div class="pb-8">
                <img
                  :src="slide"
                  :alt="`Image ${index + 1}`"
                  class="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </swiper-slide>

            <div class="swiper-pagination"></div>
          </swiper>
        </div>

        <!-- Main Info -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-semibold mb-2">{{ classified.title }}</h1>
              <div class="text-xl font-semibold text-blue-600">
                {{ formatPrice(classified?.price?.toString().replace('.', ',')) }} TL
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
          <p class="mt-4 text-gray-500">
            {{ classified.description }}
          </p>
          <div class="mt-4 text-gray-500">İlan Tarihi: {{ formatDate(classified.created_at) }}</div>
        </div>

        <!-- Seller Info -->
        <h2 class="text-lg font-semibold mb-4">Satıcı Bilgileri</h2>
        <PersonBox
          :person="{
            _id: classified.seller._id,
            name: classified.seller.full_name,
            role: classified.seller.work_title_text,
            image: classified.seller?.image,
            email: classified.seller.email,
            whatsapp: classified.seller.phone,
            phone: classified.seller.phone,
            statu: classified.seller.statu
          }"
        />
      </div>

      <div v-else class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3">
          <div class="p-4">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-lusty-red grid place-items-center rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#fff"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <h2 class="text-lg font-semibold ml-2">İlanı Kaldır</h2>
            </div>
            <p class="mb-4 text-sm text-gray-700">Bu ilanı kaldırmak istediğinize emin misiniz?</p>
          </div>
          <div class="flex">
            <Button
              class="!rounded-tr-none !rounded-br-none !rounded-tl-none bg-gray-700 text-white !w-full !py-3"
              @click="showDeleteModal = false"
            >
              İptal
            </Button>
            <Button
              :is-loading="isDeleting"
              class="!rounded-tl-none !rounded-bl-none !rounded-tr-none bg-lusty-red text-white !w-full !py-3"
              @click="confirmDelete"
            >
              Kaldır
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import { toast } from 'vue3-toastify'
import PersonBox from '@/components/PersonBox.vue'
import Button from '@/components/Button.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { formatPrice } from '@/helpers/format'

const route = useRoute()
const router = useRouter()
const { axios } = useAxios()
const classified = ref(null)
const meStore = useMeStore()
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const isOwnClassified = computed(() => {
  return classified.value?.seller?._id === meStore.user?._id
})

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

const handleDelete = () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  isDeleting.value = true
  try {
    await axios.delete(`/classifieds/${route.params.id}`)
    toast.success('İlan başarıyla kaldırıldı')
    router.replace('/dashboard/classifieds')
  } catch (error) {
    toast.error(error.response?.data?.message || 'İlan kaldırılırken bir hata oluştu')
  } finally {
    isDeleting.value = false
    showDeleteModal.value = false
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
