<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useAxios } from '@/plugins/axios'
import { useMeStore } from '@/stores/me'
import { ref, onMounted, computed } from 'vue'
import { toast } from 'vue3-toastify'

const meStore = useMeStore()
const loading = ref(true)
const uploadLoadingMap = ref(new Map())
const documents = ref([])

const hasRequiredDocuments = computed(() => {
  return documents.value.some((doc) => doc.statu === 0)
})

const getStatusColor = (status) => {
  switch (status) {
    case 0:
      return 'bg-red-100 text-red-800'
    case 1:
      return 'bg-green-100 text-green-800'
    case 2:
      return 'bg-gray-100 text-gray-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Teslim Edilmedi (Zorunlu)'
    case 1:
      return 'Teslim Edildi'
    case 2:
      return 'Teslim Edilmedi (Zorunlu Değil)'
    default:
      return 'Teslim Edilmedi (Zorunlu Değil)'
  }
}

const handleFileUpload = async (documentId, event) => {
  const files = event.target.files
  if (!files.length || files.length > 3) {
    toast.error('En fazla 3 dosya yükleyebilirsiniz.')
    return
  }

  uploadLoadingMap.value.set(documentId, true)
  const formData = new FormData()

  Array.from(files).forEach((file, index) => {
    if (index < 3) {
      formData.append(`documents[${index}]`, file)
    }
  })
  formData.append('document_id', documentId)

  try {
    const { axios } = useAxios()
    await axios.post('/auth/upload-missing-documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const docIndex = documents.value.findIndex((doc) => doc._id === documentId)
    if (docIndex !== -1) {
      documents.value[docIndex].statu = 1
    }
    toast.success('Dosyalar başarıyla yüklendi.')

    await meStore.fetchUserProfile()
  } catch (error) {
    toast.error(error?.response?.data?.message)
  } finally {
    uploadLoadingMap.value.delete(documentId)
  }
}

const fetchDocuments = async () => {
  loading.value = true
  try {
    const response = await meStore.fetchUserProfile()
    documents.value = response.data.missing_documents
  } catch (error) {
    console.error('Error fetching documents:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDocuments()
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
  <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Evraklarım</div>

  <div
    v-if="hasRequiredDocuments"
    class="lg:mt-6 mb-2 lg:mb-4 p-2 lg:p-4 bg-amber-50 border border-amber-200 rounded-xl"
  >
    <div class="flex gap-1 lg:gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 lg:h-8 lg:w-8 text-amber-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <div>
        <h3 class="font-medium text-amber-800 lg:text-base text-sm">
          Teslim Edilmesi Gereken Evraklar Mevcut
        </h3>
        <p class="text-xs lg:text-sm text-amber-700 mt-1">
          Lütfen zorunlu evrakları en kısa sürede teslim ediniz.
        </p>
      </div>
    </div>
  </div>

  <div v-if="loading" class="flex flex-col items-center justify-items-center pt-20">
    <div
      class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
    ></div>
    <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
  </div>

  <div v-else class="mt-4 lg:mt-8 grid grid-cols-1 gap-2 lg:gap-4 pb-4">
    <div v-for="doc in documents" :key="doc._id" class="bg-white rounded-xl p-2 lg:p-4 shadow-sm">
      <div class="flex justify-between items-center">
        <div class="flex-1">
          <div class="font-medium text-night-sky lg:text-base text-sm">{{ doc.title }}</div>
          <span
            :class="[
              'inline-block mt-2 px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium',
              getStatusColor(doc.statu)
            ]"
          >
            {{ getStatusText(doc.statu) }}
          </span>
        </div>

        <div v-if="doc.statu === 0" class="ml-3">
          <label :for="doc._id" class="cursor-pointer inline-flex items-center">
            <div
              class="bg-gentian-flower hover:bg-blue-700 transition-colors text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center"
              :class="{ 'opacity-75 cursor-not-allowed': uploadLoadingMap.get(doc._id) }"
            >
              <template v-if="uploadLoadingMap.get(doc._id)">
                <svg
                  class="animate-spin h-4 w-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Yükleniyor...
              </template>
              <template v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Yükle
              </template>
            </div>
            <input
              :id="doc._id"
              type="file"
              class="hidden"
              @change="(e) => handleFileUpload(doc._id, e)"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
              :disabled="uploadLoadingMap.get(doc._id)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
