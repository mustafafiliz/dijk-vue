<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import PDFViewer from 'pdf-viewer-vue'
import { ref, onMounted, computed, watch } from 'vue'

const meStore = useMeStore()
const loading = ref(true)
const startYear = new Date(meStore.user.work_start_date).getFullYear()
const endYear = ref(new Date().getFullYear())
const showPdfModal = ref(false)
const detailLoading = ref(false)
const pdfData = ref(null)

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
  loading.value = true
  try {
    const { data } = await axios.get(`/payrolls/${selectedYear.value}`)

    payrolls.value = data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

const getPayrollDetail = async (payrolId) => {
  detailLoading.value = true
  showPdfModal.value = true
  try {
    const { data } = await axios.get(`/payrolls/detail/${payrolId}`)

    pdfData.value = data
  } catch (error) {
    return error
  } finally {
    detailLoading.value = false
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
        <div v-if="!loading" class="overflow-x-auto">
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
                    Detay
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="flex flex-col items-center justify-items-center pt-20">
          <div
            class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
          ></div>
          <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
  <div
    v-if="showPdfModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <button
      @click="showPdfModal = false"
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
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div
      class="bg-white p-4 !pt-4 max-h-[90vh] max-w-[275px] w-11/12 overflow-y-auto rounded-lg relative"
    >
      <h3 class="!text-lg !text-center font-medium mb-6">Bordro Detayı</h3>

      <div v-if="detailLoading" class="flex flex-col items-center justify-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500 mb-3"
        ></div>
        <div class="text-gray-700">Yükleniyor...</div>
      </div>

      <div v-else class="flex justify-center gap-4 px-4">
        <a
          @click="showPdfModal = false"
          :href="pdfData?.url"
          target="_blank"
          class="px-6 py-3 text-sm w-full text-center bg-gentian-flower text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Görüntüle
        </a>
      </div>
    </div>
  </div>
</template>
