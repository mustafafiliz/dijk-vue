<script setup>
defineProps({
  expense: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg p-4 shadow mb-4">
    <h3 class="font-semibold text-lg mb-3">{{ expense.title }}</h3>

    <!-- Expense Lines -->
    <div v-for="line in expense.expence_lines" :key="line._id" class="border-b last:border-0 py-3">
      <div class="flex justify-between items-start mb-2">
        <div>
          <p class="font-medium">{{ line.description }}</p>
          <p class="text-sm text-gray-600">Fiş No: {{ line.receipt_no }}</p>
          <p class="text-sm text-gray-600">Tarih: {{ line.receipt_date }}</p>
        </div>
        <div class="text-right flex flex-col gap-3">
          <span
            class="text-xs md:text-sm px-2 py-1 rounded-full"
            :class="
              line.status === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            "
          >
            {{ line.status_text }}
          </span>
          <p class="font-semibold md:text-base text-xs">{{ line.price }} {{ line.currency }}</p>
        </div>
      </div>

      <!-- Document Link -->
      <a
        v-if="line.document"
        :href="line.document"
        target="_blank"
        class="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
      >
        <span>{{ line.document_type === 'pdf' ? 'PDF Görüntüle' : 'Görsel Görüntüle' }}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
</template>
