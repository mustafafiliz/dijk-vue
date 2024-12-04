<script setup>
import ExpenseItem from '@/components/ExpenseItem.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Textarea from '@/components/Textarea.vue'
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative flex flex-col p-4 flex-1 max-w-5xl">
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
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">
        Yeni Masraf Talebi
      </div>

      <div class="flex flex-col gap-4 pt-4 flex-1">
        <ExpenseItem
          description="Masraf Açıklaması"
          date="2 Aralık 2024"
          amount="390 TL"
          expense-type="Yemek"
          vat-rate="%10"
          company="McDonald's"
          image="/images/videobox.jpg"
        />

        <div class="mt-auto flex flex-col gap-2">
          <Button variant="light" @click="showModal = true"> Talep Oluştur </Button>
          <Button variant="primary"> Talebi Gönder </Button>
        </div>
      </div>
    </div>

    <!-- new req modal start -->
    <div
      v-if="showModal"
      class="fixed flex items-center justify-center left-0 top-0 w-full h-full bg-black bg-opacity-30 p-4"
    >
      <div class="flex flex-col gap-y-3 bg-white rounded-20 w-full p-4 text-12">
        <div class="font-bold self-center text-18 mb-5">Talep Oluştur</div>
        <div class="flex items-center gap-x-2">
          <div class="w-2/6 shrink-0 font-semibold">Masraf Tarihi</div>
          <Input class="!text-12 !py-2 !px-4 text-squant bg-slate-100" type="date" />
        </div>
        <div class="flex items-center gap-x-2">
          <div class="w-2/6 shrink-0 font-semibold">Masraf Türü</div>
          <select class="text-12 flex-1 px-4 py-2 rounded-2xl bg-slate-100">
            <option value="">Otopark Gideri</option>
          </select>
        </div>
        <div class="flex items-center gap-x-2">
          <div class="w-2/6 shrink-0 font-semibold">KDV Dahil Tutar</div>
          <Input class="!text-12 !py-2 !px-4 text-squant bg-slate-100" />
        </div>
        <div class="flex items-center gap-x-2">
          <div class="w-2/6 shrink-0 font-semibold">KDV Oranı</div>
          <select class="text-12 flex-1 px-4 py-2 rounded-2xl bg-slate-100">
            <option value="">%10</option>
          </select>
        </div>
        <div class="flex items-center gap-x-2">
          <div class="w-2/6 shrink-0 font-semibold">Masraf Yapılan Firma</div>
          <Input class="!text-12 !py-2 !px-4 text-squant bg-slate-100" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="font-semibold">Açıklama</div>
          <Textarea class="text-12 bg-slate-100 rounded-20" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="font-semibold">Masraf Fişi Görseli</div>
          <Input class="!text-12 !p-0 rounded-none" type="file" />
        </div>
        <Button class="!py-2 !text-14 mt-5" variant="primary"> Talebi Oluştur </Button>
        <Button class="!py-2 !text-14" variant="soft" @click="showModal = false"> İptal </Button>
      </div>
    </div>
    <!-- new req modal end -->
  </div>
</template>
