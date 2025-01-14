<script>
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import Datepicker from 'vue3-datepicker'
import { useMeStore } from '@/stores/me'
import { toast } from 'vue3-toastify'
import { useAxios } from '@/plugins/axios'
import tr from 'date-fns/locale/tr'


export default {
  components: {
    Input,
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
      showConfirmModal: false,
      submitted: false,
      overtime_code: '',
      isEndTimeUpdating: false,
      dateLocale:tr,
      overtimeGroups:null
    }
  },
  mounted() {
    const { user } = useMeStore()
    this.getOvertimeGroups()
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
    openConfirmModal() {
      if (!this.endTime) {
        toast.error('Lütfen bitiş saatini seçiniz')
        return
      }
      this.showConfirmModal = true
    },

    async getOvertimeGroups() {
      try {
        const { axios } = useAxios()
        const { data } = await axios.get('/overtime-groups')
        this.overtimeGroups = data
        // Set default selection to first item's ID
        if (data && data.length > 0) {
          this.overtime_code = data[0]._id
        }
      } catch (error) {
        return error
      }
    },

    async confirmOvertime() {
      this.loading = true
      try {
        const { axios } = useAxios()
        await axios.post('/overtimes', {
          overtime_group_id: this.overtime_code,
          overtime_start_date: this.formatDateTime(this.overtimeDate, this.startTime),
          overtime_end_date: this.formatDateTime(this.overtimeDate, this.endTime),
          overtime_message: this.overtimeMessage
        })
        this.submitted = true
        this.showConfirmModal = false
        this.showModal = true
      } catch (error) {
        toast.error(error.response.data.message)
        this.showConfirmModal = false
      } finally {
        this.loading = false
      }
    },
 
    formatDateTime(date, time) {
      const formattedDate = date.toISOString().split('T')[0]
      return `${formattedDate} ${time}`  
    }

  }
}
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 pb-20 flex-1 max-w-5xl">
      <!-- Header -->
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

      <!-- Form Content -->
      <div class="flex flex-col gap-y-5">
        <div class="flex items-center justify-between text-night-sky">
          <div class="font-semibold text-24">Mesai Talebi</div>
        </div>

        <!-- Date Picker -->
        <div>
          <div class="font-semibold mb-[10px]">Mesai Tarihi <span class="text-red-500">*</span></div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Datepicker v-model="overtimeDate" :locale="dateLocale" class="outline-none w-full" />
          </div>
        </div>

        <div>
      <div class="font-semibold mb-[10px]">Mesai Türü <span class="text-red-500">*</span></div>
      <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
        <select 
          v-model="overtime_code" 
          class="w-full outline-none bg-transparent"
        >
          <option value="" disabled>Seçiniz</option>
          <option 
            v-for="group in overtimeGroups" 
            :key="group._id" 
            :value="group._id"
          >
            {{ group.title }}
          </option>
        </select>
      </div>
    </div>

        <!-- Start Time -->
        <div>
          <div class="font-semibold mb-[10px]">Başlangıç Saati <span class="text-red-500">*</span></div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              :value="startTime"
              @input="startTime = $event.target.value"
            />
          </div>
        </div>

        <!-- End Time -->
        <div>
          <div class="font-semibold mb-[10px]">Bitiş Saati <span class="text-red-500">*</span></div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              :value="endTime"
              @input="endTime = $event.target.value"
            />
          </div>
        </div>

        <!-- Message -->
        <div>
          <div class="font-semibold mb-[10px]">Mesaj <span class="text-red-500">*</span></div>
          <Textarea
            class="text-arch-grey"
            placeholder="Eklemek istediğiniz bir şey var mı ?"
            rows="5"
            v-model="overtimeMessage"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <Button
        class="rounded-none fixed left-0 right-0 bottom-0"
        variant="primary"
        :disabled="loading || overtimeMessage.length < 1"
        @click="openConfirmModal"
      >
        Devam Et
      </Button>
    </div>
  </div>

  <!-- Confirmation Modal -->
  <div
    v-if="showConfirmModal"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3">
      <div class="p-4">
        <div class="flex items-center mb-4">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="8" fill="#2F69FF"></rect>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4357 24.491C11.4372 23.9007 11.7727 23.3235 12.319 22.6775L9.15934 20.6794C8.96012 20.593 8.96451 20.4714 9.08023 20.3278L9.74968 19.7565C9.87126 19.6818 10.0002 19.6496 10.1393 19.6877L14.0388 20.3469L17.2879 16.8282L9.7028 11.6968C9.5109 11.584 9.49479 11.4565 9.69255 11.3086L10.7868 10.4355L20.6746 13.2144L23.5956 10.0913C24.5756 9.24312 25.5277 8.86372 26.2587 9.0439C26.6615 9.14351 26.8036 9.26363 26.9281 9.64157C27.1698 10.3828 26.7948 11.3789 25.9086 12.4043L22.7855 15.3253L25.5644 25.2132L24.6913 26.3074C24.5433 26.5037 24.4159 26.4876 24.3031 26.2972L19.1702 18.7135L15.6516 21.9612L16.3108 25.8607C16.3489 25.9984 16.3181 26.1273 16.242 26.2503L15.6707 26.9198C15.5286 27.0355 15.4055 27.0399 15.3191 26.8407L13.321 23.6809C12.6721 24.2288 12.0949 24.5642 11.5017 24.5642C11.4475 24.5628 11.4357 24.5437 11.4357 24.491Z"
              fill="white"
            ></path>
          </svg>
          <h2 class="text-lg font-semibold ml-2">Mesai Talebi</h2>
        </div>
        <p class="mb-4 text-sm text-gray-700">Girdiğiniz bilgilere göre mesai oluşturulacak.</p>
        <div class="mb-2 text-xs text-gray-700">
          <strong class="text-gray-900 text-sm">Mesai tarihi:</strong>
          <div class="mt-1">{{ overtimeDate.toISOString().split('T')[0] }}</div>
        </div>
        <div class="mb-2 text-xs text-gray-700">
          <strong class="text-gray-900 text-sm">Mesai aralığı:</strong>
          <div class="mt-1">{{ startTime }} - {{ endTime }}</div>
        </div>
      </div>
      <div class="flex">
        <Button
          class="!rounded-tr-none !rounded-br-none !rounded-tl-none bg-gray-700 text-white !w-full !py-3"
          @click="showConfirmModal = false"
        >
          İptal
        </Button>
        <Button
          :is-loading="loading"
          class="!rounded-tl-none !rounded-bl-none !rounded-tr-none text-white !w-full !py-3"
          @click="confirmOvertime"
        >
          Onayla
        </Button>
      </div>
    </div>
  </div>

  <!-- Success Modal -->
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
          <div class="mt-2 text-xs">{{ overtimeDate.toISOString().split('T')[0] }}</div>
        </p>
        <p class="mb-2 text-xs text-gray-700">
          <strong class="text-gray-900 text-sm">Mesai aralığı:</strong>
          <div class="mt-2 text-xs">{{ startTime }} - {{ endTime }}</div>
        </p>
      </div>
      <Button
        @click="$router.push('/dashboard/overtime-request/list')"
        class="!w-full !py-3 !rounded-t-none bg-green-500"
      >
        Tamam
      </Button>
    </div>
  </div>
</template>

