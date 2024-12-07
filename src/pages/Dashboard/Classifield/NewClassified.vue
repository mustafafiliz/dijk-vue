<script setup>
import { ref, computed, watch } from 'vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import { useAxios } from '@/plugins/axios'
import { toast } from 'vue3-toastify'
import router from '@/router'
import { formatPrice } from '@/helpers/format'

const title = ref('')
const description = ref('')
const price = ref('')
const condition = ref('1')
const images = ref([])
const showModal = ref(false)
const isLoading = ref(false)
const { axios } = useAxios()

const isFormValid = computed(() => {
  return (
    title.value.trim() !== '' &&
    description.value.trim() !== '' &&
    price.value !== '' &&
    condition.value !== '' &&
    images.value.length > 0
  )
})

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  if (images.value.length + files.length > 5) {
    alert('En fazla 5 resim yükleyebilirsiniz')
    return
  }

  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      images.value.push({
        blob: e.target.result,
        file: file
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  images.value.splice(index, 1)
}

const submitClassified = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('description', description.value)

  const cleanPrice = price.value.replace(/\./g, '').replace(',', '.')
  formData.append('price', cleanPrice)

  formData.append('condition', condition.value)

  images.value.forEach((image, index) => {
    formData.append(`images[${index}]`, image.file)
  })

  try {
    isLoading.value = true
    await axios.post('/classifieds', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    toast.success('İlanınız başarıyla oluşturuldu.')
    router.back()
  } catch (error) {
    // todo: Handle error
  } finally {
    isLoading.value = false
  }
}

watch(price, (newValue) => {
  if (newValue) {
    price.value = formatPrice(newValue)
  }
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
        Yeni İlan Oluştur
      </div>

      <div class="flex flex-col gap-4 pt-8">
        <div class="space-y-4">
          <div>
            <label class="block font-semibold mb-2">Başlık</label>
            <Input v-model="title" class="!text-[12px] lg:text-base !py-4" />
          </div>

          <div>
            <label class="block font-semibold mb-2">Açıklama</label>
            <Textarea v-model="description" />
          </div>

          <div>
            <label class="block font-semibold mb-2">Fiyat</label>
            <Input
              v-model="price"
              type="text"
              class="!text-[12px] lg:text-base !py-4"
              @keypress="
                (e) => {
                  const charCode = e.which ? e.which : e.keyCode
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault()
                  }
                }
              "
            />
          </div>

          <div class="bg-white px-2 rounded-3xl h-[45.5px] flex flex-col">
            <label class="block font-semibold mb-2">Durum</label>
            <div class="pr-2 bg-white rounded-3xl">
              <select
                v-model="condition"
                class="w-full rounded-3xl text-[12px] lg:text-base py-4 px-4"
              >
                <option value="1">Sıfır</option>
                <option value="2">İkinci El</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold mb-2">Resimler (Max 5)</label>
            <div class="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
                id="file-input"
              />
              <label
                for="file-input"
                class="cursor-pointer bg-white border rounded-3xl py-2 px-4 inline-block text-sm hover:bg-gray-50"
              >
                Resim Seç
              </label>
            </div>

            <div class="flex flex-wrap gap-4 mt-4">
              <div v-for="(image, index) in images" :key="index" class="relative">
                <img :src="image.blob" class="w-20 h-20 object-cover rounded-lg" />
                <button
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        class="rounded-none fixed left-0 right-0 bottom-0"
        variant="primary"
        :disabled="!isFormValid || isLoading"
        :is-loading="isLoading"
        @click="submitClassified"
      >
        İlanı Oluştur
      </Button>
    </div>
  </div>
</template>

<style scoped>
input[type='file']::file-selector-button {
  display: none;
}
</style>
