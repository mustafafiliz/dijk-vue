<script setup>
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import Button from '@/components/Button.vue'
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
import { tr } from 'date-fns/locale'
import Timepicker from 'vue3-timepicker'

const overtimeDate = ref(new Date())
const startTime = ref('')
const endTime = ref('')
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
            <Timepicker
              v-model="startTime"
              :minuteInterval="15"
              class="outline-none border-0"
              placeholder="_ _ : _ _"
            />
          </div>
        </div>

        <div>
          <div class="font-semibold mb-[10px]">Bitiş Saati</div>

          <div class="flex items-center justify-between bg-white rounded-2xl py-3 px-4 font-medium">
            <Timepicker
              v-model="endTime"
              :minuteInterval="15"
              class="outline-none border-0"
              placeholder="_ _ : _ _"
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
      </div>

      <Button class="rounded-none fixed left-0 right-0 bottom-0" variant="primary">
        Devam Et
      </Button>
    </div>
  </div>
</template>
