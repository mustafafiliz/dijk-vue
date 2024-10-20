<script setup>
import PersonBox from '@/components/PersonBox.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Input from '@/components/Input.vue'
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 flex-1 max-w-5xl">
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
          Takımım
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <Input placeholder="Ara..." />
        <PersonBox
          :person="{
            name: 'Mehmet Yılmaz - Siz',
            role: 'CTO',
            image: '/images/user-image.jpg'
          }"
        />
        <PersonBox
          v-for="i in 10"
          :key="i"
          :person="{
            name: 'Kişi A',
            role: 'Team Lead of Yaz-1',
            image: '/images/user-image.jpg',
            email: '1',
            whatsapp: '1',
            phone: '1'
          }"
        />
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
