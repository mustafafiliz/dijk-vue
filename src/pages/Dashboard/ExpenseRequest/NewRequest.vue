<script setup>
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Datepicker from 'vue3-datepicker'
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { formatPrice } from '@/helpers/format'
import tr from 'date-fns/locale/tr'
import { useAxios } from '@/plugins/axios'
import { toast } from 'vue3-toastify'

const { axios } = useAxios()
const title = ref('')
const showModal = ref(false)
const showSuccessModal = ref(false)
const expenseLines = ref([])
const editingIndex = ref(null)
const dateLocale = ref(tr)
const expenseTypes = ref([])
const vatRates = ref([])
const showConfirmModal = ref(false)
const isLoading = ref(false)

const currentExpenseLine = ref({
  receipt_no: '',
  receipt_date: new Date(),
  expense_type_id: '',
  price: '',
  currency: 'TL',
  vat_id: '',
  document: null,
  description: ''
})

const baseCurrencies = ref([
  { id: 1, code: 'TL' },
  { id: 2, code: 'USD' },
  { id: 3, code: 'EUR' }
])

const currencies = ref(baseCurrencies.value)

watch(
  expenseLines,
  (newLines) => {
    if (newLines.length > 0) {
      currencies.value = [baseCurrencies.value.find((c) => c.code === newLines[0].currency)]
    } else {
      currencies.value = baseCurrencies.value
    }
  },
  { deep: true }
)

watch(editingIndex, (newIndex) => {
  if (newIndex === 0) {
    currencies.value = baseCurrencies.value
  }
})

const isModalFormValid = computed(() => {
  return (
    currentExpenseLine.value.receipt_no &&
    currentExpenseLine.value.expense_type_id &&
    currentExpenseLine.value.price &&
    currentExpenseLine.value.vat_id &&
    currentExpenseLine.value.description &&
    currentExpenseLine.value.document
  )
})

const isMainFormValid = computed(() => {
  return title.value && expenseLines.value.length > 0
})

const openModal = (index = null) => {
  if (index !== null) {
    editingIndex.value = index
    currentExpenseLine.value = {
      ...expenseLines.value[index]
    }
  } else {
    editingIndex.value = null
    currentExpenseLine.value = {
      receipt_no: '',
      receipt_date: new Date(),
      expense_type_id: '',
      price: '',
      currency: currencies.value[0]?.code || 'TL',
      vat_id: '',
      document: null,
      description: ''
    }
  }
  showModal.value = true
}

const deleteExpenseLine = (index) => {
  expenseLines.value.splice(index, 1)
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    currentExpenseLine.value.document = file
  }
}

const totalAmount = computed(() => {
  return expenseLines.value.reduce((acc, line) => {
    const price = parseFloat(line.price.replace(/\./g, '').replace(',', '.')) || 0
    return {
      ...acc,
      [line.currency]: (acc[line.currency] || 0) + price
    }
  }, {})
})

const saveExpenseLine = () => {
  if (editingIndex.value !== null) {
    expenseLines.value[editingIndex.value] = { ...currentExpenseLine.value }
  } else {
    expenseLines.value.push({ ...currentExpenseLine.value })
  }
  showModal.value = false
}

const getExpenseTypes = async () => {
  try {
    const response = await axios.get('/expence-types')

    expenseTypes.value = response?.data?.expence_types
    vatRates.value = response?.data?.vats

    currentExpenseLine.value.expense_type_id = response.data.expence_types[0]._id
    currentExpenseLine.value.vat_id = response.data.vats[0]._id
  } catch (error) {
    return error
  }
}

const saveExpenseRequest = () => {
  showConfirmModal.value = true
}

const submitExpenseRequest = async () => {
  isLoading.value = true
  const formData = new FormData()
  formData.append('title', title.value)

  expenseLines.value.forEach((line, index) => {
    formData.append(`expence_lines[${index}][receipt_no]`, line.receipt_no)
    formData.append(
      `expence_lines[${index}][receipt_date]`,
      line.receipt_date.toISOString().split('T')[0]
    )
    formData.append(`expence_lines[${index}][expence_type_id]`, line.expense_type_id)
    formData.append(`expence_lines[${index}][price]`, line.price.replace(/[,.]/g, ''))
    formData.append(`expence_lines[${index}][currency]`, line.currency)
    formData.append(`expence_lines[${index}][vat_id]`, line.vat_id)
    formData.append(`expence_lines[${index}][description]`, line.description)

    if (line.document) {
      formData.append(`expence_lines[${index}][document]`, line.document)
    }
  })

  try {
    await axios.post('/expences', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    showConfirmModal.value = false
    showSuccessModal.value = true
  } catch (error) {
    toast.error(error?.response?.data?.message)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => currentExpenseLine.value.price,
  (newValue) => {
    if (newValue) {
      currentExpenseLine.value.price = formatPrice(newValue)
    }
  }
)

onMounted(() => {
  getExpenseTypes()
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-hidden md:flex-row-reverse md:justify-center"
  >
    <div class="relative flex flex-col p-4 flex-1 max-w-5xl">
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
        Yeni Masraf Talebi
      </div>

      <div class="flex flex-col gap-4 pt-8 overflow-y-auto pb-24">
        <div>
          <div class="font-semibold mb-[10px]">Masraf Belge Başlığı</div>
          <Input
            v-model="title"
            class="!text-[12px] lg:text-base !py-4 h-[45.5px] !border-gray-200"
          />
        </div>

        <Button
          variant="primary"
          @click="openModal()"
          class="flex items-center justify-center gap-2 !py-3 md:text-lg text-base"
        >
          Yeni Masraf Kalemi
        </Button>

        <div
          v-for="(line, index) in expenseLines"
          :key="index"
          @click="openModal(index)"
          class="bg-white rounded-lg overflow-hidden shadow mb-1"
        >
          <div class="border-b last:border-0 py-2 p-3">
            <div class="flex flex-col gap-2 relative">
              <p class="font-semibold text-sm absolute top-0 right-0">
                {{ line.price }} {{ line.currency }}
              </p>
              <p class="text-sm font-medium">{{ index + 1 }} - {{ line.description }}</p>

              <div class="flex flex-col gap-2 text-xs text-gray-600">
                <p>Fiş No: {{ line.receipt_no }}</p>
                <p>KDV: %{{ vatRates.find((vat) => vat?._id === line.vat_id).rate }}</p>
                <p>Tarih: {{ line.receipt_date.toISOString().split('T')[0] }}</p>
              </div>

              <div
                v-if="line.document"
                class="text-xs text-blue-600 flex items-center justify-between gap-1"
              >
                <div>
                  <span class="text-gray-600 text-xs">Dosya:</span> {{ line.document.name }}
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="text-blue-600 text-xs flex items-center gap-1"
                    @click.stop="openModal(index)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Düzenle
                  </button>

                  <button
                    class="text-red-600 text-xs flex items-center gap-1"
                    @click.stop="deleteExpenseLine(index)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 border-t">
        <Button
          variant="primary"
          :disabled="!isMainFormValid"
          @click="saveExpenseRequest"
          class="w-full !rounded-none"
        >
          Masraf Talebini Kaydet
        </Button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-60"></div>

      <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3 relative">
        <div class="rounded-2xl overflow-hidden">
          <div class="flex items-center p-4 bg-gray-100">
            <h2 class="text-base font-semibold ml-2">
              {{ editingIndex !== null ? 'Masraf Kalemini Düzenle' : 'Yeni Masraf Kalemi' }}
            </h2>
          </div>

          <div class="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
            <div>
              <div class="font-semibold mb-[10px]">Fiş No</div>
              <div class="border border-gray-200 rounded-20">
                <Input
                  v-model="currentExpenseLine.receipt_no"
                  class="!text-[12px] lg:text-base !py-4 h-[45.5px]"
                />
              </div>
            </div>

            <div class="relative z-[11]">
              <div class="font-semibold mb-[10px]">Fiş Tarihi</div>
              <div
                class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium !border !border-gray-200"
              >
                <Datepicker
                  v-model="currentExpenseLine.receipt_date"
                  :locale="dateLocale"
                  class="outline-none w-full"
                />
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">Masraf Türü</div>
              <div class="bg-white px-2 rounded-3xl h-[45.5px] flex !border !border-gray-200">
                <select
                  v-model="currentExpenseLine.expense_type_id"
                  class="w-full rounded-3xl text-[12px] lg:text-base h-full px-1 outline-none"
                >
                  <option v-for="type in expenseTypes" :key="type._id" :value="type._id">
                    {{ type.title }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">Tutar</div>
              <div class="flex gap-2">
                <div class="relative border !border-gray-200 rounded-20 flex-1">
                  <Input
                    v-model="currentExpenseLine.price"
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
                  <div
                    class="bg-white absolute top-0 rounded-tr-20 rounded-br-20 right-0 bottom-0 z-10 px-2 border-l border-gray-200 h-[45.5px] flex w-20"
                  >
                    <select
                      v-model="currentExpenseLine.currency"
                      class="w-full rounded-3xl text-[12px] lg:text-base h-full px-1 outline-none"
                    >
                      <option
                        v-for="currency in currencies"
                        :key="currency.id"
                        :value="currency.code"
                      >
                        {{ currency.code }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">KDV Oranı</div>
              <div class="bg-white px-2 rounded-3xl h-[45.5px] flex !border !border-gray-200">
                <select
                  v-model="currentExpenseLine.vat_id"
                  class="w-full rounded-3xl text-[12px] lg:text-base h-full px-1 outline-none"
                >
                  <option v-for="vat in vatRates" :key="vat._id" :value="vat._id">
                    %{{ vat.rate }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">Dosya</div>
              <div class="flex flex-col gap-2">
                <div class="relative">
                  <input
                    type="file"
                    @change="handleFileUpload"
                    accept="image/*,.pdf"
                    class="hidden"
                    id="file-input"
                  />
                  <label
                    for="file-input"
                    class="cursor-pointer bg-white border border-gray-200 rounded-3xl py-2 px-4 inline-block text-[12px] lg:text-base hover:bg-gray-50"
                  >
                    Dosya Seç
                  </label>
                </div>
                <span v-if="currentExpenseLine.document" class="ml-2 text-sm">
                  {{ currentExpenseLine.document.name }}
                  <button @click="currentExpenseLine.document = null" class="ml-2 text-red-500">
                    &times;
                  </button>
                </span>
              </div>
            </div>

            <div class="pb-4">
              <div class="font-semibold mb-[10px]">Açıklama</div>
              <div class="border rounded-20 border-gray-200">
                <Textarea
                  v-model="currentExpenseLine.description"
                  class="text-arch-grey"
                  placeholder="Eklemek istediğiniz bir şey var mı ?"
                  :rows="5"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex">
          <Button
            variant="soft"
            class="!rounded-tr-none !rounded-br-none !rounded-tl-none !bg-gray-100 !text-gray-700 !w-full !py-3"
            @click="showModal = false"
            >İptal</Button
          >
          <Button
            variant="primary"
            :disabled="!isModalFormValid"
            class="!rounded-tl-none !rounded-bl-none !rounded-tr-none text-white !w-full !py-3"
            @click="saveExpenseLine"
            >Kaydet</Button
          >
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-60"></div>
      <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3 relative">
        <div class="p-6">
          <h2 class="text-lg font-semibold mb-4">Masraf Talebi</h2>
          <p class="text-gray-600">Masraf talebi başarıyla onaya gönderildi.</p>
        </div>
        <Button
          class="!rounded-t-none bg-green-600 !w-full !py-3"
          @click="$router.push('/dashboard/expense/list')"
          >Tamam</Button
        >
      </div>
    </div>
    <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-60"></div>
      <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3 relative">
        <div class="p-6">
          <h2 class="text-lg font-semibold mb-4">Masraf Talebi</h2>
          <p class="text-gray-600 mb-2">
            <strong>{{ title }}</strong> başlıklı
            <span v-for="(amount, currency) in totalAmount" :key="currency">
              <strong>{{ amount.toLocaleString('tr-TR') }} {{ currency }}</strong>
            </span>
            tutarlı masraf talebinizi kaydetmek istediğinize emin misiniz?
          </p>
        </div>
        <div class="flex">
          <Button
            variant="soft"
            class="!rounded-tr-none !rounded-br-none !rounded-tl-none !bg-gray-100 !text-gray-700 !w-full !py-3"
            @click="showConfirmModal = false"
          >
            İptal
          </Button>
          <Button
            :is-loading="isLoading"
            :is-disabled="isLoading"
            variant="primary"
            class="!rounded-tl-none !rounded-bl-none !rounded-tr-none text-white !w-full !py-3"
            @click="submitExpenseRequest"
          >
            Devam Et
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='file']::file-selector-button {
  display: none;
}
</style>
