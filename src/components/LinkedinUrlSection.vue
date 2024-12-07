<template>
  <div class="flex flex-col gap-2 mb-2">
    <!-- Header section with title and action button -->
    <div class="flex items-center gap-2">
      <div class="font-semibold pl-4">Linkedin</div>
      <button v-if="isOwnProfile" @click="openModal" class="text-black-800 hover:text-gray-900">
        <svg
          v-if="!hasLinkedIn"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-plus-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-edit"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
    </div>

    <!-- URL display section with copy functionality -->
    <div v-if="hasLinkedIn" class="flex items-center gap-2">
      <div
        @click="copyToClipboard"
        class="bg-white flex items-center gap-2 p-4 rounded-2xl mx-3 text-xs cursor-pointer hover:bg-gray-50 flex-grow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-copy"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        {{ linkedInUrl }}
      </div>
    </div>
    <div v-else class="text-gray-700 text-center text-sm bg-white p-2 rounded-2xl mx-2">
      Bulunamadı.
    </div>

    <!-- Copy success notification -->
    <div v-if="showCopied" class="text-green-700 text-xs font-medium mx-4">Kopyalandı.</div>

    <!-- Edit/Create Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-4 mx-4 rounded-lg w-96">
        <h3 class="text-base font-semibold mb-4">
          {{ hasLinkedIn ? 'Linkedin Adresini Güncelle' : 'Linkedin Adresini Ekle' }}
        </h3>
        <input
          v-model="editUrl"
          type="text"
          class="w-full border outline-0 rounded-xl text-sm placeholder-text-sm p-3 mb-4"
          placeholder="https://linkedin.com/in/username"
        />
        <div class="flex justify-end gap-2">
          <Button @click="closeModal" class="!bg-gray-300 !text-black !py-2 !text-sm !w-full"
            >İptal</Button
          >
          <Button
            :is-loading="isLoading"
            :is-disabled="loading || editUrl.length === 0"
            class="!py-2 !text-sm !w-full"
            @click="saveUrl"
            >Kaydet</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMeStore } from '@/stores/me'
import { useAxios } from '@/plugins/axios'
import Button from './Button.vue'

// Props definition
const props = defineProps({
  defaultUser: {
    type: Object,
    required: true
  }
})

console.log(props.defaultUser.social_links)

// Store and API setup
const meStore = useMeStore()
const { axios } = useAxios()

// Reactive references
const showModal = ref(false)
const showCopied = ref(false)
const editUrl = ref('')
const isLoading = ref(false)
const linkedInUrl = ref(props.defaultUser?.social_links?.[0]?.link || '')

// Computed properties
const isOwnProfile = computed(() => {
  return props.defaultUser?._id === meStore.user?._id
})

const hasLinkedIn = computed(() => {
  return (
    props.defaultUser?.social_links?.length > 0 &&
    props.defaultUser.social_links[0]?.name === 'Linkedin'
  )
})

// Modal handlers
const openModal = () => {
  if (!isOwnProfile.value) return
  editUrl.value = linkedInUrl.value
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editUrl.value = ''
}

// Save URL handler - creates or updates LinkedIn URL
const saveUrl = async () => {
  if (!isOwnProfile.value) return

  isLoading.value = true
  const formData = new FormData()
  formData.append('social_links[0][name]', 'Linkedin')
  formData.append('social_links[0][link]', editUrl.value)

  try {
    await axios.post('/auth/social-links-update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    linkedInUrl.value = editUrl.value
    await meStore.fetchUserProfile()
    closeModal()
  } catch (error) {
    console.error('Error while processing LinkedIn URL:', error)
  } finally {
    isLoading.value = false
  }
}

// Clipboard functionality
const copyToClipboard = () => {
  if (linkedInUrl.value) {
    navigator.clipboard.writeText(linkedInUrl.value)
    showCopied.value = true
    setTimeout(() => {
      showCopied.value = false
    }, 2000)
  }
}

watch(
  () => props.defaultUser?.social_links?.[0]?.link,
  (newValue) => {
    linkedInUrl.value = newValue || ''
  }
)
</script>
