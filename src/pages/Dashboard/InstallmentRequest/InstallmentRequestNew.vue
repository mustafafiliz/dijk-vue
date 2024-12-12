<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Datepicker from 'vue3-datepicker'
import { useAxios } from '@/plugins/axios'
import { toast } from 'vue3-toastify'
import router from '@/router'
import { formatPrice } from '@/helpers/format'
import dayjs from 'dayjs'

const today = dayjs(new Date()).format('YYYY-MM-DD')
const date = ref(new Date())
const price = ref('')
const loan_type_id = ref('')
const loan_options = ref([])
const showModal = ref(false)
const showConfirmModal = ref(false)
const isLoading = ref(false)
const { axios } = useAxios()

const selectedCurrency = computed(() => {
  const selected = loan_options.value.find((option) => option._id === loan_type_id.value)
  return selected?.currency || ''
})

const selectedPrePayType = computed(() => {
  return loan_options.value.find((option) => option._id === loan_type_id.value)?.title || ''
})

const isFormValid = computed(() => {
  return loan_type_id.value !== '' && date.value !== '' && price.value !== ''
})

const getPrePayOptions = async () => {
  try {
    const { data } = await axios.get('/loan-types')
    loan_options.value = data
    loan_type_id.value = data[0]._id
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}

const openConfirmModal = () => {
  showConfirmModal.value = true
}

const onSubmit = async () => {
  try {
    isLoading.value = true
    await axios.post('/loans', {
      loan_type_id: loan_type_id.value,
      date: dayjs(date.value).format('YYYY-MM-DD'),
      price: price.value.replace(/\./g, '').replace(',', '.')
    })
    showConfirmModal.value = false
    toast.success('Taksitli borç talebiniz oluşturuldu.')
    router.back()
  } catch (error) {
    toast.error(error?.response?.data?.message)
    showConfirmModal.value = false
  } finally {
    isLoading.value = false
  }
}

watch(price, (newValue) => {
  if (newValue) {
    price.value = formatPrice(newValue)
  }
})

onMounted(() => {
  getPrePayOptions()
})
</script>

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

      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">
        Taksitli Borç Talebi Oluştur
      </div>

      <div class="flex flex-col gap-4 pt-8">
        <div>
          <div class="font-semibold mb-[10px]">
            Taksitli Borç Türü <span class="text-red-500">*</span>
          </div>
          <div class="bg-white px-2 rounded-3xl h-[45.5px] flex">
            <select
              v-model="loan_type_id"
              class="w-full rounded-3xl text-[12px] lg:text-base h-full px-1 outline-none"
            >
              <option value="">Seçiniz</option>
              <option v-for="option in loan_options" :key="option._id" :value="option._id">
                {{ option.title }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Tarih <span class="text-red-500">*</span></div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Datepicker v-model="date" :locale="tr" class="outline-none w-full" />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Tutar <span class="text-red-500">*</span></div>
          <div class="relative">
            <Input
              v-model="price"
              type="text"
              class="!text-[12px] lg:text-base !py-4 h-[45.5px]"
              @keypress="
                (e) => {
                  const charCode = e.which ? e.which : e.keyCode
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault()
                  }
                }
              "
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">
              {{ selectedCurrency }}
            </span>
          </div>
        </div>
      </div>

      <Button
        class="rounded-none fixed left-0 right-0 bottom-0"
        variant="primary"
        :disabled="!isFormValid || isLoading"
        :is-loading="isLoading"
        @click="openConfirmModal"
      >
        Oluştur
      </Button>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div
    v-if="showConfirmModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3">
      <div class="p-4">
        <div class="flex items-center mb-4">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="8" fill="#2F69FF"></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4357 24.491C11.4372 23.9007 11.7727 23.3235 12.319 22.6775L9.15934 20.6794C8.96012 20.593 8.96451 20.4714 9.08023 20.3278L9.74968 19.7565C9.87126 19.6818 10.0002 19.6496 10.1393 19.6877L14.0388 20.3469L17.2879 16.8282L9.7028 11.6968C9.5109 11.584 9.49479 11.4565 9.69255 11.3086L10.7868 10.4355L20.6746 13.2144L23.5956 10.0913C24.5756 9.24312 25.5277 8.86372 26.2587 9.0439C26.6615 9.14351 26.8036 9.26363 26.9281 9.64157C27.1698 10.3828 26.7948 11.3789 25.9086 12.4043L22.7855 15.3253L25.5644 25.2132L24.6913 26.3074C24.5433 26.5037 24.4159 26.4876 24.3031 26.2972L19.1702 18.7135L15.6516 21.9612L16.3108 25.8607C16.3489 25.9984 16.3181 26.1273 16.242 26.2503L15.6707 26.9198C15.5286 27.0355 15.4055 27.0399 15.3191 26.8407L13.321 23.6809C12.6721 24.2288 12.0949 24.5642 11.5017 24.5642C11.4475 24.5628 11.4357 24.5437 11.4357 24.491Z"
              fill="white"
            ></path>
          </svg>
          <h2 class="text-lg font-semibold ml-2">Taksitli Borç Talebi</h2>
        </div>
        <p class="mb-4 text-sm text-gray-700">
          Girdiğiniz bilgilere göre taksitli borç talebi oluşturulacak.
        </p>
        <div class="mb-2 text-xs text-gray-700">
          <strong class="text-gray-900 text-sm">Taksitli Borç Türü:</strong>
          <div class="mt-1">{{ selectedPrePayType }}</div>
        </div>
        <div class="mb-2 text-xs text-gray-700">
          <strong class="text-gray-900 text-sm">Tarih:</strong>
          <div class="mt-1">{{ dayjs(date).format('YYYY-MM-DD') }}</div>
        </div>
        <div class="mb-2 text-xs text-gray-700">
          <strong class="text-gray-900 text-sm">Tutar:</strong>
          <div class="mt-1">{{ price }} {{ selectedCurrency }}</div>
        </div>
      </div>
      <div class="flex">
        <Button
          class="!rounded-tr-none !rounded-br-none !rounded-tl-none bg-gray-700 text-white !w-full !py-3"
          @click="showConfirmModal = false"
        >
          İptal
        </Button>
        <Button
          :is-loading="isLoading"
          class="!rounded-tl-none !rounded-bl-none !rounded-tr-none text-white !w-full !py-3"
          @click="onSubmit"
        >
          Onayla
        </Button>
      </div>
    </div>
  </div>
</template>
