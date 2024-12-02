<script>
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import { useAxios } from '@/plugins/axios'
import { toast } from 'vue3-toastify'
import Datepicker from 'vue3-datepicker'
import { useMeStore } from '@/stores/me'

export default {
  components: {
    Input,
    Textarea,
    Button,
    Datepicker
  },
  data() {
    return {
      today: new Date().toISOString().split('T')[0],
      permitGroups: [],
      selectedPermit: '',
      permitStartDate: new Date(),
      permitEndDate: new Date(),
      permitStartTime: '09:00',
      permitEndTime: '18:00',
      remainingDays: 0,
      permitMessage: '',
      substitutePerson: '',
      loading: false,
      showModal: false,
      submitted:false
    }
  },
  methods: {
    async getPermitGroups() {
      const { axios } = useAxios()
      try {
        const response = await axios.get('/permit-groups')
        this.permitGroups = response.data.map((item) => ({
          id: item.code,
          title: item.title,
          available_day: item.available_day
        }))
        this.selectedPermit = response.data.find((item) => item?.is_annual_permit)?.code
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },

    async calculateRemainingDays() {
      const { axios } = useAxios()
      try {
        const response = await axios.post('/permit-day-calculate', {
          permit_code: this.selectedPermit,
          permit_start_date: this.formatDateTime(this.permitStartDate, this.permitStartTime),
          permit_end_date: this.formatDateTime(this.permitEndDate, this.permitEndTime)
        })
        this.remainingDays = response.data
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },

    dateOnly(date) {
      const d = new Date(date)

      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]
    },

    formatDateTime(date, time) {
      return `${this.dateOnly(date)}T${time}`
    },

    validateDatesAndTimes() {
      if (this.permitEndDate < this.permitStartDate) {
        this.permitEndDate = this.permitStartDate
      } else {
        this.calculateRemainingDays()
      }

      const startDateTime = new Date(
        this.formatDateTime(this.permitStartDate, this.permitStartTime)
      )
      const endDateTime = new Date(this.formatDateTime(this.permitEndDate, this.permitEndTime))

      if (endDateTime < startDateTime) {
        this.permitEndTime = this.permitStartTime
      }
    },

    openModal() {
      this.showModal = true
    },

    async confirmPermit() {
      const { axios } = useAxios()
      this.loading = true
      try {
        await axios.post('/permits', {
          permit_code: this.selectedPermit,
          permit_start_date: this.formatDateTime(this.permitStartDate, this.permitStartTime),
          permit_end_date: this.formatDateTime(this.permitEndDate, this.permitEndTime),
          permit_message: `${this.permitMessage} Yerine Bakacak Kişi: ${this.substitutePerson}` 
        })

        this.loading = false
        this.submitted = true        
      } catch (error) {
        toast.error(error.response.data.message)
        this.showModal = false
        return error
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    permitStartDate: 'validateDatesAndTimes',
    permitEndDate: 'validateDatesAndTimes',
    permitStartTime: 'validateDatesAndTimes',
    permitEndTime: 'validateDatesAndTimes'
  },

  mounted() {
    this.getPermitGroups()
    const meStore = useMeStore()
    this.permitStartTime = meStore.getUser?.job_start_time || '09:00'
    this.permitEndTime = meStore.getUser?.job_end_time || '18:00'
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
          İzin Oluştur
        </div>
      </div>

      <div class="flex flex-col gap-y-5">
        <div class="flex items-center justify-between text-night-sky">
          <div class="font-semibold text-24">İzin Talebi</div>
          <div class="text-20 font-medium">
            Seçilen:
            <span class="font-semibold text-gentian-flower text-24">{{ remainingDays }} Gün</span>
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">İzin Türü <span class="text-red-500">*</span></div>
          <div
            class="relative flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium"
          >
            <select v-model="selectedPermit" class="w-full h-full outline-none">
              <option v-for="group in permitGroups" :key="group.id" :value="group.id">
                {{ group.title }}
              </option>
            </select>
            <span class="absolute right-4 text-12 lg:text-sm pr-5 pointer-events-none">
              Kalan:
              {{ permitGroups?.find((group) => group.id === selectedPermit)?.available_day }} gün
            </span>
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">
            Başlangıç Tarihi <span class="text-red-500">*</span>
          </div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Datepicker v-model="permitStartDate" :locale="tr" class="outline-none w-full" />
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              v-model="permitStartTime"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">
            Bitiş Tarihi <span class="text-red-500">*</span>
          </div>
          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Datepicker v-model="permitEndDate" :locale="tr" class="outline-none w-full" />
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              v-model="permitEndTime"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Mesaj <span class="text-red-500">*</span></div>
          <Textarea
            class="text-arch-grey"
            placeholder="Eklemek istediğiniz bir şey var mı ?"
            rows="5"
            v-model="permitMessage"
          />
        </div>

        <div>
          <div class="flex items-center gap-x-[10px] font-semibold mb-[10px]">
            Yerine Bakacak Kişi <span class="text-[10px] text-metal-armor">Opsiyonel</span>
          </div>
          <Input v-model="substitutePerson" class="!text-12" />
        </div>
      </div>

      <Button
        class="rounded-none fixed left-0 right-0 bottom-0"
        variant="primary"
        :disabled="loading || permitMessage.length < 1 || remainingDays===0"
        @click="openModal"
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
        <h2 class="text-lg font-semibold ml-2">İstenilen İzni Doğrulama</h2>
      </div>
      <p class="mb-4 text-sm text-gray-700">Girdiğiniz bilgilere göre izin oluşturulacak.</p>
      <p class="mb-2 text-xs text-gray-700">
        <strong class="text-gray-900 text-sm">İzin aralığı:</strong> 
        <div class="mt-1">{{ dateOnly(permitStartDate) }} {{ permitStartTime }} -
          {{ dateOnly(permitEndDate) }} {{ permitEndTime }}</div>
      </p>
      <p class="mb-2 text-base text-blue-700"> <strong class="text-gray-900 text-sm">Toplam:</strong>  <b>{{ remainingDays }} gün</b></p>
     </div>
      <div class="flex">
        <Button v-if="!submitted" class="!rounded-tr-none !rounded-br-none !rounded-tl-none bg-gray-700 text-white !w-full !py-3" @click="showModal=false">İptal</Button>
        <Button v-if="!submitted" :is-loading="loading" class="!rounded-tl-none !rounded-bl-none !rounded-tr-none text-white !w-full !py-3 " @click="confirmPermit"> Onayla</Button>
        <Button v-else @click="$router.push('/dashboard/permission-request/list')" class="!rounded-t-none bg-green-600 !w-full !py-3">İzin Oluşturuldu</Button>
      </div>
    </div>
  </div>
</template>
s