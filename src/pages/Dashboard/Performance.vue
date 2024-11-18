<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import CompetenceItem from '@/components/Performance/CompetenceItem.vue'

const activeTab = ref('competences')
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="flex flex-col p-4 flex-1 max-w-5xl">
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
          Performans
        </div>
      </div>

      <div class="flex gap-x-4 mt-4">
        <Button
          class="flex-1 !py-3 !rounded-2xl"
          :variant="activeTab === 'goals' ? 'primary' : 'light'"
          @click="activeTab = 'goals'"
        >
          Hedefler
        </Button>
        <Button
          class="flex-1 !py-3 !rounded-2xl"
          :variant="activeTab === 'competences' ? 'primary' : 'light'"
          @click="activeTab = 'competences'"
        >
          Yetkinlik
        </Button>
      </div>

      <div v-if="activeTab === 'goals'" class="flex flex-col mt-4 flex-1">
        <div class="bg-white rounded-2xl p-4">
          <table class="w-full text-14 text-left border-separate border-spacing-y-3">
            <tr class="bg-black bg-opacity-5">
              <th class="rounded-s-md"></th>
              <th class="font-medium py-1">Ağırlık</th>
              <th class="font-medium">Hedef</th>
              <th class="font-medium">Gerçekl.</th>
              <th class="font-medium pe-4 rounded-e-md">Puan</th>
            </tr>
            <tr class="bg-black bg-opacity-[3%]">
              <th class="font-medium ps-4 rounded-s-md py-1">Hedef 1</th>
              <td class="font-light">50</td>
              <td class="font-light">100</td>
              <td class="font-light">93</td>
              <td class="font-light pe-4 rounded-e-md">98</td>
            </tr>
            <tr class="bg-black bg-opacity-[3%]">
              <th class="font-medium ps-4 rounded-s-md py-1">Hedef 1</th>
              <td class="font-light">50</td>
              <td class="font-light">100</td>
              <td class="font-light">93</td>
              <td class="font-light pe-4 rounded-e-md">98</td>
            </tr>
            <tr class="bg-black bg-opacity-[3%]">
              <th class="font-medium ps-4 rounded-s-md py-1">Hedef 1</th>
              <td class="font-light">50</td>
              <td class="font-light">100</td>
              <td class="font-light">93</td>
              <td class="font-light pe-4 rounded-e-md">98</td>
            </tr>
            <tr class="bg-black bg-opacity-[3%]">
              <th class="font-medium ps-4 rounded-s-md py-1">Hedef 1</th>
              <td class="font-light">50</td>
              <td class="font-light">100</td>
              <td class="font-light">93</td>
              <td class="font-light pe-4 rounded-e-md">98</td>
            </tr>
            <tr>
              <th></th>
              <th>100</th>
              <th></th>
              <th></th>
              <th>127</th>
            </tr>
          </table>
        </div>

        <Button variant="light" class="!text-black mt-4 ml-auto !text-12 !py-4 !px-10">
          Hedef Ekle
        </Button>

        <select class="text-14 font-medium p-4 rounded-2xl mt-4">
          <option value="">Onay Bekliyor (Ali Soğan)</option>
        </select>

        <div class="flex flex-col gap-y-2 mt-auto">
          <Button class="!text-base" variant="soft"> Taslak Kaydet </Button>
          <Button class="!text-base"> Kaydet ve Gönder </Button>
        </div>
      </div>

      <div v-else class="flex flex-col mt-4 flex-1">
        <div class="bg-white rounded-2xl p-4 flex flex-col gap-y-3">
          <CompetenceItem name="Yetkinlik 1" />
          <CompetenceItem name="Yetkinlik 2" />
          <CompetenceItem name="Yetkinlik 3" />
          <CompetenceItem name="Yetkinlik 4" />
          <CompetenceItem name="Yetkinlik 5" />
        </div>

        <select class="text-14 font-medium p-4 rounded-2xl mt-4">
          <option value="">Onay Bekliyor (Ali Soğan)</option>
        </select>

        <div class="flex flex-col gap-y-2 mt-auto">
          <Button class="!text-base" variant="soft"> Taslak Kaydet </Button>
          <Button class="!text-base"> Kaydet ve Gönder </Button>
        </div>
      </div>
    </div>
  </div>
</template>
