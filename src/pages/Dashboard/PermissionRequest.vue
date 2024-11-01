<script setup>
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import { ref, onMounted } from 'vue'
import { useAxios } from '@/plugins/axios'

const { axios } = useAxios()
const today = new Date().toISOString().split('T')[0]
const currentHour = new Date().getHours()
const currentMinute = new Date().getMinutes()

const permitGroups = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/permit-groups')
    permitGroups.value = response.data
  } catch (error) {
    console.error('Veri alınırken bir hata oluştu:', error)
  }
})
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

            <span class="font-semibold text-gentian-flower text-24"> 1 Gün </span>
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">İzin Türü</div>

          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <div>Yıllık İzin</div>

            <div>
              Kalan:
              <select>
                <option value="14 Gün">14 Gün</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Başlangıç Tarihi</div>

          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Input class="text-base !py-0 !px-0 !w-fit text-arch-grey" type="date" :value="today" />
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              :value="`${currentHour}:${currentMinute > 10 ? '' : '0'}${currentMinute}`"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Bitiş Tarihi</div>

          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Input class="text-base !py-0 !px-0 !w-fit text-arch-grey" type="date" :value="today" />
            <Input
              class="!text-12 !py-0 !px-0 !w-fit text-squant"
              type="time"
              :value="`${currentHour}:${currentMinute > 10 ? '' : '0'}${currentMinute}`"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Mesaj</div>

          <Textarea
            class="text-arch-grey"
            placeholder="Eklemek istediğiniz bir şey var mı ?"
            rows="5"
          />
        </div>

        <div>
          <div class="flex items-center gap-x-[10px] font-semibold mb-[10px]">
            Yerine Bakacak Kişi
            <span class="text-[10px] text-metal-armor">Opsiyonel</span>
          </div>

          <Input />
        </div>
      </div>

      <Button class="rounded-none fixed left-0 right-0 bottom-0" variant="primary">
        Devam Et
      </Button>
    </div>
  </div>
</template>
