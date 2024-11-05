<script>
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import { useAxios } from '@/plugins/axios'
import { toast } from 'vue3-toastify'
import Datepicker from 'vue3-datepicker'
import { tr } from 'date-fns/locale'

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
      selectedPermit: '11', // default permit code
      permitStartDate: new Date(),
      permitEndDate: new Date(),
      permitStartTime: '09:00',
      permitEndTime: '18:00',
      remainingDays: 0,
      permitMessage: '',
      substitutePerson: '',
      loading: false
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
        this.remainingDays = response.data.remaining_days
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },

    formatDateTime(date, time) {
      return `${date.toISOString().split('T')[0]}T${time}`
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

    async createPermit() {
      const { axios } = useAxios()
      this.loading = true
      try {
        const response = await axios.post('/permits', {
          permit_code: this.selectedPermit,
          permit_start_date: this.formatDateTime(this.permitStartDate, this.permitStartTime),
          permit_end_date: this.formatDateTime(this.permitEndDate, this.permitEndTime),
          permit_message: `${this.permitMessage} Yerine Bakacak Kişi: ${this.substitutePerson}` // Combine messages
        })
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    permitStartDate: 'validateDatesAndTimes',
    permitEndDate: 'validateDatesAndTimes',
    permitStartTime: 'validateDatesAndTimes',
    permitEndTime: 'validateDatesAndTimes',
    selectedPermit: 'calculateRemainingDays'
  },

  mounted() {
    this.getPermitGroups()
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
          <div class="font-semibold mb-[10px]">İzin Türü</div>
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
          <div class="font-semibold mb-[10px]">Başlangıç Tarihi</div>
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
          <div class="font-semibold mb-[10px]">Bitiş Tarihi</div>
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
          <div class="font-semibold mb-[10px]">Mesaj</div>
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
        :disabled="loading || permitMessage.length < 1"
        :is-loading="loading"
        @click="createPermit"
      >
        Devam Et
      </Button>
    </div>
  </div>
</template>
