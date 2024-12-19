<script setup>
defineProps({
  expense: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow mb-3">
    <h3 class="font-semibold text-base mb-2 pb-2 bg bg-gray-100 p-3">{{ expense.title }}</h3>

    <div
      v-for="line in expense.expence_lines"
      :key="line._id"
      class="border-b last:border-0 py-2 p-3"
    >
      <div class="flex flex-col gap-2">
        <!-- Status and Amount Row -->
        <div class="flex justify-between items-center">
          <span
            class="text-[10px] px-2 py-0.5 rounded-full"
            :class="
              line.status === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            "
          >
            {{ line.status_text }}
          </span>
          <p class="font-semibold text-sm">{{ line.price }} {{ line.currency }}</p>
        </div>

        <!-- Description -->
        <p class="text-sm font-medium">{{ line.description }}</p>

        <!-- Receipt Details -->
        <div class="flex gap-2 text-[11px] text-gray-600">
          <p>Fiş No: {{ line.receipt_no }}</p>
          <p>{{ line.receipt_date }}</p>
        </div>

        <!-- Document Link -->
        <a
          v-if="line.document"
          :href="line.document"
          target="_blank"
          class="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
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
  </div>
</template>
