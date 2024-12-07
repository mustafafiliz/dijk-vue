<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import Input from '@/components/Input.vue'
import { useAxios } from '@/plugins/axios'
import { ref, onMounted } from 'vue'
import VButton from '@/components/Button.vue'
import ClassifiedCard from '@/components/Classfieds/ClassifiedCard.vue'

const classifieds = ref([])
const { axios } = useAxios()
const loading = ref(true)

// Filter states
const search = ref('')
const condition = ref(undefined)
const myClassifieds = ref('0')
const minPrice = ref('')
const maxPrice = ref('')

const getClassifieds = async (params) => {
  loading.value = true
  try {
    const { data } = await axios.get('/classifieds', {
      params: {
        search: search.value,
        condition: condition?.value,
        my_classifieds: myClassifieds.value,
        min_price: minPrice.value,
        max_price: maxPrice.value,
        ...params
      }
    })
    classifieds.value = data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

const handleFilter = () => {
  getClassifieds()
}

onMounted(() => {
  getClassifieds()
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative p-4 flex-1 max-w-5xl">
      <!-- Header Section -->
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
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">İlanlar</div>

      <!-- Create New Classified Button -->
      <!-- Filter Section -->
      <div class="mb-4 space-y-4">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-2">
          <div class="col-span-2 lg:col-span-1">
            <Input
              class="!text-xs lg:!text-sm"
              v-model="search"
              placeholder="İlan Ara"
              type="text"
              :maxLength="50"
            />
          </div>
          <div class="bg-white pr-2 rounded-3xl h-[44px] flex">
            <select v-model="condition" class="w-full rounded-3xl text-sm py-3 px-4 outline-none">
              <option :value="undefined">Sıfır / İkinci El</option>
              <option value="1">Sıfır</option>
              <option value="2">İkinci El</option>
            </select>
          </div>
          <div class="bg-white pr-2 rounded-3xl h-[44px] flex">
            <select
              v-model="myClassifieds"
              class="w-full rounded-3xl text-sm py-3 px-4 outline-none"
            >
              <option value="0">Tüm İlanlar</option>
              <option value="1">Kendi İlanlarım</option>
            </select>
          </div>
          <Input
            class="!text-xs lg:!text-sm"
            v-model="minPrice"
            placeholder="Min Fiyat"
            type="number"
            :maxLength="10"
          />
          <Input
            class="!text-xs lg:!text-sm"
            v-model="maxPrice"
            placeholder="Max Fiyat"
            type="number"
            :maxLength="10"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="block">
            <VButton
              @click="handleFilter"
              class="w-full !text-xs lg:!text-sm !py-3 bg-white border border-gray-200 !text-gray-900 block"
            >
              Filtreyi Uygula
            </VButton>
          </div>
          <RouterLink to="/dashboard/classifieds/new" class="block">
            <VButton
              class="w-full !text-xs lg:!text-sm !py-3 bg-gentian-flower border border-gentian-flower"
            >
              Yeni İlan Oluştur
            </VButton>
          </RouterLink>
        </div>
      </div>

      <!-- Content Section -->
      <div v-if="loading" class="flex flex-col items-center justify-items-center mt-10">
        <div
          class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
        ></div>
        <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
      </div>

      <div v-else>
        <div
          v-if="classifieds.length === 0"
          class="bg-white rounded-2xl p-4 h-32 flex items-center justify-center"
        >
          <div class="text-center text-sm">Yeni ilan bulunmamaktadır.</div>
        </div>
        <template v-else>
          <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            <ClassifiedCard
              v-for="classified in classifieds"
              :key="classified._id"
              :classified="classified"
            />
          </div>
        </template>
      </div>
    </div>
    <BottomNavigation />
  </div>
</template>
