<script setup>
import { ref } from 'vue'
import { formatPrice } from '@/helpers/format'
import { computed } from 'vue'
import { VPdfViewer } from '@vue-pdf-viewer/viewer'

const props = defineProps({
  expense: {
    type: Object,
    required: true
  }
})

const isModalOpen = ref(false)
const selectedDocument = ref(null)
const documentType = ref(null)

const openDocumentModal = (document, type) => {
  selectedDocument.value = document
  documentType.value = type
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedDocument.value = null
}

const totalAmount = computed(() => {
  const total = props.expense?.expence_lines.reduce((acc, line) => {
    const normalizedPrice = line.price.toString().replace(/\./g, ',')
    const price = parseFloat(normalizedPrice.replace(/,/g, '.')) || 0
    return acc + price
  }, 0)

  return formatPrice(total.toString())
})
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow mb-3">
    <h3
      v-if="expense?.title"
      class="font-semibold flex items-center justify-between gap-1 text-base mb-2 pb-2 bg bg-gray-100 p-3"
    >
      {{ expense.title }}
      <span class="text-sm"
        >Toplam: {{ totalAmount }} {{ expense?.expence_lines?.[0]?.currency }}</span
      >
    </h3>

    <div
      v-for="line in expense.expence_lines"
      :key="line._id"
      class="border-b last:border-0 py-2 p-3"
    >
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <span
            class="text-[10px] px-2 py-0.5 rounded-full"
            :class="
              line.status
                ? 'opacity-0'
                : line.status === 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
            "
          >
            {{ line.status_text }}
          </span>
          <p class="font-semibold text-sm">
            {{ formatPrice(line.price.toString().replace('.', ',')) }} {{ line.currency }}
          </p>
        </div>

        <p class="text-sm font-medium">{{ line.description }}</p>

        <div class="flex gap-2 text-[11px] text-gray-600">
          <p>Fiş No: {{ line.receipt_no }}</p>
          <p>{{ line.receipt_date }}</p>
        </div>

        <a
          v-if="line.document"
          @click.prevent="openDocumentModal(line.document, line.document_type)"
          href="#"
          class="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <span>{{ line.document_type === 'pdf' ? 'PDF' : 'Görsel' }}</span>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- Document Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <button
        @click="closeModal"
        class="fixed top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center"
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
        class="bg-white w-full h-full p-4 !pt-6 overflow-y-auto max-w-[90vw] max-h-[90vh] rounded-xl"
      >
        <!-- PDF Viewer -->
        <div v-if="documentType === 'pdf'" class="flex justify-center items-center h-full">
          <div class="max-h-[80vh] w-full h-full">
            <VPdfViewer :src="selectedDocument" class="w-full h-full" />
          </div>
        </div>

        <!-- Image Viewer -->
        <div v-else class="flex justify-center items-center h-full">
          <img :src="selectedDocument" alt="Döküman" class="object-cover max-h-[80vh]" />
        </div>
      </div>
    </div>
  </div>
</template>
