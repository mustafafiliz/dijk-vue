<script setup>
import ExpenseItem from '@/components/ExpenseItem.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Datepicker from 'vue3-datepicker'
import { ref, watch } from 'vue'
import { formatPrice } from '@/helpers/format'
import tr from 'date-fns/locale/tr'

const title = ref('')
const showModal = ref(false)
const expenseLines = ref([])
const editingIndex = ref(null)
const dateLocale = ref(tr)

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

const expenseTypes = ref([
  { id: 1, title: 'Yemek' },
  { id: 2, title: 'Ulaşım' }
  // ... other expense types
])

const vatRates = ref([
  { id: 1, rate: 0 },
  { id: 2, rate: 10 },
  { id: 3, rate: 20 }
])

const openModal = (index = null) => {
  if (index !== null) {
    editingIndex.value = index
    currentExpenseLine.value = { ...expenseLines.value[index] }
  } else {
    editingIndex.value = null
    currentExpenseLine.value = {
      receipt_no: '',
      receipt_date: new Date(),
      expense_type_id: '',
      price: '',
      currency: 'TL',
      vat_id: '',
      document: null,
      description: ''
    }
  }
  showModal.value = true
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    currentExpenseLine.value.document = file
  }
}

const saveExpenseLine = () => {
  if (editingIndex.value !== null) {
    expenseLines.value[editingIndex.value] = { ...currentExpenseLine.value }
  } else {
    expenseLines.value.push({ ...currentExpenseLine.value })
  }
  showModal.value = false
}

watch(
  () => currentExpenseLine.value.price,
  (newValue) => {
    if (newValue) {
      currentExpenseLine.value.price = formatPrice(newValue)
    }
  }
)
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
          <div class="font-semibold mb-[10px]">Masraf Adı</div>
          <Input
            v-model="title"
            class="!text-[12px] lg:text-base !py-4 h-[45.5px] !border-gray-200"
          />
        </div>

        <Button
          variant="primary"
          @click="openModal()"
          class="flex items-center justify-center gap-2 !py-3"
        >
          Yeni Kalem
        </Button>

        <div v-for="(line, index) in expenseLines" :key="index" @click="openModal(index)">
          <ExpenseItem :expense="line" />
        </div>
      </div>

      <div class="fixed bottom-0 left-0 right-0 border-t">
        <Button variant="primary" class="w-full !rounded-none">Masraf Talebini Kaydet</Button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-60"></div>

      <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3 relative">
        <div class="p-4 pb-0">
          <div class="flex items-center mb-4">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="8" fill="#2F69FF" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.4357 24.491C11.4372 23.9007 11.7727 23.3235 12.319 22.6775L9.15934 20.6794C8.96012 20.593 8.96451 20.4714 9.08023 20.3278L9.74968 19.7565C9.87126 19.6818 10.0002 19.6496 10.1393 19.6877L14.0388 20.3469L17.2879 16.8282L9.7028 11.6968C9.5109 11.584 9.49479 11.4565 9.69255 11.3086L10.7868 10.4355L20.6746 13.2144L23.5956 10.0913C24.5756 9.24312 25.5277 8.86372 26.2587 9.0439C26.6615 9.14351 26.8036 9.26363 26.9281 9.64157C27.1698 10.3828 26.7948 11.3789 25.9086 12.4043L22.7855 15.3253L25.5644 25.2132L24.6913 26.3074C24.5433 26.5037 24.4159 26.4876 24.3031 26.2972L19.1702 18.7135L15.6516 21.9612L16.3108 25.8607C16.3489 25.9984 16.3181 26.1273 16.242 26.2503L15.6707 26.9198C15.5286 27.0355 15.4055 27.0399 15.3191 26.8407L13.321 23.6809C12.6721 24.2288 12.0949 24.5642 11.5017 24.5642C11.4475 24.5628 11.4357 24.5437 11.4357 24.491Z"
                fill="white"
              />
            </svg>
            <h2 class="text-base font-semibold ml-2">
              {{ editingIndex !== null ? 'Masraf Düzenle' : 'Yeni Masraf' }}
            </h2>
          </div>

          <div class="space-y-3 max-h-[60vh] overflow-y-auto">
            <div>
              <div class="font-semibold mb-[10px]">Fiş No</div>
              <div class="border border-gray-200 rounded-20">
                <Input
                  v-model="currentExpenseLine.receipt_no"
                  class="!text-[12px] lg:text-base !py-4 h-[45.5px]"
                />
              </div>
            </div>

            <div>
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
                  <option value="">Seçiniz</option>
                  <option v-for="type in expenseTypes" :key="type.id" :value="type.id">
                    {{ type.title }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">Tutar</div>
              <div class="relative border !border-gray-200 rounded-20">
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
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{{
                  currentExpenseLine.currency
                }}</span>
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">KDV Oranı</div>
              <div class="bg-white px-2 rounded-3xl h-[45.5px] flex !border !border-gray-200">
                <select
                  v-model="currentExpenseLine.vat_id"
                  class="w-full rounded-3xl text-[12px] lg:text-base h-full px-1 outline-none"
                >
                  <option value="">Seçiniz</option>
                  <option v-for="vat in vatRates" :key="vat.id" :value="vat.id">
                    %{{ vat.rate }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <div class="font-semibold mb-[10px]">Dosya</div>
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
                  rows="5"
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
            class="!rounded-tl-none !rounded-bl-none !rounded-tr-none text-white !w-full !py-3"
            @click="saveExpenseLine"
            >Kaydet</Button
          >
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
