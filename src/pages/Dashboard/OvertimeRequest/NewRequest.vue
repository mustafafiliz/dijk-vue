<script>
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import Datepicker from 'vue3-datepicker'
import { useMeStore } from '@/stores/me'
import { toast } from 'vue3-toastify'
import { useAxios } from '@/plugins/axios'

export default {
  components: {
    Textarea,
    Button,
    Datepicker
  },
  data() {
    return {
      overtimeDate: new Date(),
      startTime: '18:00',
      endTime: '',
      overtimeMessage: '',
      loading: false,
      showModal: false,
      overtime_code: 'FM01',
      isEndTimeUpdating: false
    }
  },
  mounted() {
    const { user } = useMeStore()
    this.startTime = user?.value?.work_end_hour || '18:00'
  },
  watch: {
    endTime(newValue) {
      if (this.isEndTimeUpdating) {
        this.isEndTimeUpdating = false
        return
      }

      const newEndTime = newValue.split(':').map(Number)
      const startEndTime = this.startTime.split(':').map(Number)
      if (
        newEndTime[0] < startEndTime[0] ||
        (newEndTime[0] === startEndTime[0] && newEndTime[1] < startEndTime[1])
      ) {
        toast.error('Bitiş saati başlangıç saatinden önce olamaz.')
        this.endTime = ''
        this.isEndTimeUpdating = true
      }
    }
  },
  methods: {
    async confirmOvertime() {
      this.loading = true
      try {
        const { axios } = useAxios()
        await axios.post('/overtimes', {
          overtime_code: this.overtime_code,
          overtime_start_date: this.formatDateTime(this.overtimeDate, this.startTime),
          overtime_end_date: this.formatDateTime(this.overtimeDate, this.endTime),
          overtime_message: this.overtimeMessage
        })
        this.showModal = true
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        this.loading = false
      }
    },
    formatDateTime(date, time) {
      return `${date.toISOString().split('T')[0]}T${time}`
    }
  }
}
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 pb-20 flex-1 max-w-5xl">
      <div class="relative">
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
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
          Mesai Oluştur
        </div>
      </div>

      <div class="flex flex-col gap-y-5">
        <div class="flex items-center justify-between text-night-sky">
          <div class="font-semibold text-24">Mesai Talebi</div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Mesai Tarihi</div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Datepicker v-model="overtimeDate" :locale="tr" class="outline-none w-full" />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Başlangıç Saati</div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              :value="startTime"
              @input="startTime = $event.target.value"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Bitiş Saati</div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              :value="endTime"
              @input="endTime = $event.target.value"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Mesaj</div>
          <Textarea
            class="text-arch-grey"
            placeholder="Eklemek istediğiniz bir şey var mı ?"
            rows="5"
            v-model="overtimeMessage"
          />
        </div>
      </div>

      <Button
        class="rounded-none fixed left-0 right-0 bottom-0"
        variant="primary"
        :disabled="loading || overtimeMessage.length < 1"
        @click="confirmOvertime"
      >
        Devam Et
      </Button>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3">
      <div class="p-4">
        <h2 class="text-lg font-semibold">Mesai Oluşturuldu</h2>
        <p class="mb-4 text-sm text-gray-700">Mesai talebiniz başarıyla oluşturuldu.</p>
        <p class="mb-2 text-xs text-gray-700">
        <strong class="text-gray-900 text-sm">Mesai tarihi:</strong> 
        <div class="mt-2 text-xs">
          {{ overtimeDate.toISOString().split('T')[0] }}</div>
      </p>
      <p class="mb-2 text-xs text-gray-700">
        <strong class="text-gray-900 text-sm">Mesai aralığı:</strong> 
        <div class="mt-2 text-xs">
          {{ startTime }} -
          {{ endTime }}</div>
      </p>
      </div>
      <Button
        @click="(showModal = false), $router.push('/dashboard/overtime-request/list')"
        class="!w-full !py-3 !rounded-t-none"
        >Tamam</Button
      >
    </div>
  </div>
</template>
