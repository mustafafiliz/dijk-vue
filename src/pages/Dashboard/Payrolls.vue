<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import { ref, onMounted, computed, watch } from 'vue'

const meStore = useMeStore()
const startYear = new Date(meStore.user.work_start_date).getFullYear()
const endYear = ref(new Date().getFullYear())
const showPdfModal = ref(false)
const pdfUrl = ref('')
const yearOptions = computed(() => {
  const options = []
  for (let year = startYear; year <= endYear.value; year++) {
    options.push({
      value: year,
      label: year.toString()
    })
  }
  return options
})
const selectedYear = ref(endYear.value)
const payrolls = ref([])
const { axios } = useAxios()

const getPayrolls = async () => {
  try {
    const { data } = await axios.get(`/payrolls/${selectedYear.value}`)

    payrolls.value = data
  } catch (error) {
    return error
  }
}

const getPayrollDetail = async (payrolId) => {
  try {
    const { data } = await axios.get(`/payrolls/detail/${payrolId}`)

    pdfUrl.value = data.url
    showPdfModal.value = true
  } catch (error) {
    return error
  }
}

watch(selectedYear, () => {
  getPayrolls()
})

onMounted(() => {
  getPayrolls()
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
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Bordrolarım</div>

      <div class="grid grid-cols-1 gap-4">
        <div
          class="relative flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium"
        >
          <select v-model="selectedYear" class="w-full h-full outline-none">
            <option v-for="option in yearOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-2 text-left text-sm font-semibold text-gray-700">Yıl</th>
                <th class="px-6 py-2 text-left text-sm font-semibold text-gray-700">Ay</th>
                <th class="px-6 py-2 text-right text-sm font-semibold text-gray-700">İşlem</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in payrolls" :key="item._id" class="hover:bg-gray-50">
                <td class="px-6 py-3 text-sm text-gray-700">{{ item.year }}</td>
                <td class="px-6 py-3 text-sm text-gray-700">
                  {{
                    new Date(item.year, item.month - 1).toLocaleString('tr-TR', { month: 'long' })
                  }}
                </td>
                <td class="px-6 py-3 text-right">
                  <button
                    @click="getPayrollDetail(item._id)"
                    class="underline py-2 rounded-full text-xs font-semibold transition-colors"
                  >
                    Bordro Görüntüle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
  <div
    v-if="showPdfModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded-lg w-11/12 h-5/6 relative">
      <button
        @click="showPdfModal = false"
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        ✕
      </button>
      <iframe :src="pdfUrl" class="w-full h-full" frameborder="0"></iframe>
    </div>
  </div>
</template>
