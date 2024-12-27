<script setup>
import { ref, computed } from 'vue'
import { formatPrice } from '@/helpers/format'
import { useMeStore } from '@/stores/me'
import { jsPDF } from 'jspdf'
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
  expense: {
    type: Object,
    required: true
  }
})

const meStore = useMeStore()
const user = meStore.user
const isModalOpen = ref(false)
const selectedDocument = ref(null)
const documentType = ref(null)
const generatedPdfUrl = ref(null)

const totalAmount = computed(() => {
  const total = props.expense?.expence_lines.reduce((acc, line) => {
    const price = parseFloat(line.price) || 0
    return acc + price
  }, 0)
  return formatPrice(total.toString().replace('.', ','))
})

const generateExpensePDF = (expense) => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16
  })

  doc.addFont('https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5Q.ttf', 'Roboto', 'normal')
  doc.setFont('Roboto')
  doc.setLanguage('tr')

  const drawValueBox = (text, value, x, y, width = 140) => {
    doc.setFont('Roboto', 'normal')
    const padding = 10

    doc.text(text, x, y)

    const splitText = doc.splitTextToSize(value || '-', width - padding * 2)
    const lineHeight = 15
    const boxHeight = Math.max(25, splitText.length * lineHeight + padding * 2)

    doc.rect(x + 70, y - 15, width, boxHeight)
    splitText.forEach((line, i) => {
      doc.text(line, x + 70 + padding, y - 10 + padding + i * lineHeight)
    })

    return boxHeight
  }

  // Title
  doc.setFontSize(20)
  doc.text('Masraf Belgesi', 297, 40, { align: 'center' })

  // Personnel Info Section
  doc.setFontSize(14)
  doc.text('Personel Bilgileri', 40, 80)
  doc.line(40, 85, 557, 85)

  // Personnel Info Content
  const leftCol = 40
  const rightCol = 320
  const startY = 110
  const lineHeight = 45

  doc.setFontSize(11)
  drawValueBox('Talep Eden:', user?.full_name, leftCol, startY)
  drawValueBox('Ünvan:', user?.work_title_text, leftCol, startY + lineHeight)
  drawValueBox('Şirket:', user?.erp_company_text, leftCol, startY + lineHeight * 2)

  drawValueBox('Pozisyon:', user?.work_title_text, rightCol, startY)
  drawValueBox('Telefon:', user?.phone ? `+90 ${user?.phone}` : '-', rightCol, startY + lineHeight)
  drawValueBox('TC No:', user?.tc_no, rightCol, startY + lineHeight * 2)

  // Expense Details Section
  doc.setFontSize(14)
  doc.text('Fiş/Fatura Bilgileri', 40, 280)
  doc.line(40, 285, 557, 285)

  // Table Setup
  const headers = ['Tarih', 'Fiş/Fatura No', 'Açıklama', 'Tutar', 'Durum']
  const colWidths = [90, 90, 157, 90, 90]
  let tableY = 310

  // Table Header
  doc.setFillColor(240, 240, 240)
  doc.rect(40, tableY - 15, 517, 25, 'F')
  doc.setFontSize(12)

  let currentX = 40
  headers.forEach((header, i) => {
    doc.line(currentX, tableY - 15, currentX, tableY + 10)
    doc.text(header, currentX + 5, tableY)
    currentX += colWidths[i]
  })
  doc.line(currentX, tableY - 15, currentX, tableY + 10)

  doc.line(40, tableY - 15, 557, tableY - 15)
  doc.line(40, tableY + 10, 557, tableY + 10)

  // Table Content
  doc.setFontSize(11)
  let totalApprovedAmount = 0

  expense.expence_lines.forEach((line) => {
    tableY += 25
    currentX = 40

    doc.line(40, tableY - 15, 557, tableY - 15)
    headers.forEach((_, i) => {
      doc.line(currentX, tableY - 15, currentX, tableY + 10)
      currentX += colWidths[i]
    })
    doc.line(currentX, tableY - 15, currentX, tableY + 10)

    currentX = 40
    doc.text(line.receipt_date, currentX + 5, tableY)
    doc.text(line.receipt_no, currentX + colWidths[0] + 5, tableY)

    const description = doc.splitTextToSize(line.description, colWidths[2] - 10)
    doc.text(description, currentX + colWidths[0] + colWidths[1] + 5, tableY)

    doc.text(
      `${formatPrice(line.price.toString().replace('.', ','))} ${line.currency}`,
      currentX + colWidths[0] + colWidths[1] + colWidths[2] + 5,
      tableY
    )
    doc.text(
      line.status_text,
      currentX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 5,
      tableY
    )

    if (line.status === 1) {
      totalApprovedAmount += parseFloat(line.price.toString().replace(/\./g, '').replace(/,/g, '.'))
    }
  })

  doc.line(40, tableY + 10, 557, tableY + 10)

  // Summary amounts
  doc.setFontSize(12)
  doc.text(
    `Toplam Fiş Tutarı: ${totalAmount.value} ${expense.expence_lines[0]?.currency}`,
    557,
    tableY + 35,
    { align: 'right' }
  )
  doc.text(
    `Onaylanan Tutar: ${formatPrice(totalApprovedAmount.toString().replace('.', ','))} ${expense.expence_lines[0]?.currency}`,
    557,
    tableY + 55,
    { align: 'right' }
  )

  // Footer
  doc.setFontSize(10)
  doc.text('Bu belge otomatik olarak oluşturulmuştur.', 297, 800, { align: 'center' })

  const pdfBlob = doc.output('blob')
  return URL.createObjectURL(pdfBlob)
}

const openPdfModal = (expense) => {
  generatedPdfUrl.value = generateExpensePDF(expense)
  documentType.value = 'generated-pdf'
  isModalOpen.value = true
}

const openDocumentModal = (line) => {
  selectedDocument.value = line.document
  documentType.value = line.document_type
  isModalOpen.value = true
}

const downloadGeneratedPDF = () => {
  const a = document.createElement('a')
  a.href = generatedPdfUrl.value
  a.download = `Masraf_${user?.full_name}_${new Date().toISOString()}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const closeModal = () => {
  isModalOpen.value = false
  selectedDocument.value = null
  generatedPdfUrl.value = null
}
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow mb-3">
    <h3
      v-if="expense?.title"
      class="font-semibold flex justify-between gap-1 text-base mb-2 pb-2 bg-gray-100 p-3"
    >
      <div class="flex flex-col gap-2">
        {{ expense.title }}
      </div>
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
          <div class="flex gap-2">
            <a
              v-if="line.document"
              @click.prevent="openDocumentModal(line)"
              href="#"
              class="text-blue-600 hover:underline cursor-pointer"
            >
              {{ line.document_type === 'pdf' ? 'PDF Görüntüle' : 'Resmi Görüntüle' }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center p-3 bg-gray-50 gap-3">
      <button
        @click="openPdfModal(expense)"
        class="w-full text-blue-700 text-xs font-medium transition-colors flex items-center gap-0.5"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Belge Oluştur
      </button>
      <span class="text-xs font-semibold flex items-center gap-1 text-nowrap">
        Toplam: {{ totalAmount }} {{ expense?.expence_lines?.[0]?.currency }}
      </span>
    </div>
    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <button
        @click="closeModal"
        class="fixed top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
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

      <button
        v-if="documentType === 'generated-pdf'"
        @click="downloadGeneratedPDF"
        class="fixed top-2.5 left-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        PDF İndir
      </button>

      <div
        class="bg-white w-full h-full p-4 !pt-6 overflow-y-auto max-w-[90vw] max-h-[85vh] rounded-xl"
      >
        <div class="flex justify-center items-center h-full">
          <div class="max-h-[80vh] w-full h-full">
            <template v-if="documentType === 'generated-pdf' || documentType === 'pdf'">
              <VuePdfEmbed
                :source="documentType === 'generated-pdf' ? generatedPdfUrl : selectedDocument"
                :page="1"
                class="w-full h-full max-h-[80vh]"
              />
            </template>
            <template v-else-if="documentType === 'image'">
              <img
                :src="selectedDocument"
                alt="Document"
                class="max-w-full max-h-[80vh] object-contain"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
