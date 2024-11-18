<script setup>
import ApprovalProcessItem from '@/components/ApprovalProcessItem.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
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
          Onayımdaki Süreçler
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <ApprovalProcessItem
          :application="{
            userName: 'Mehmet Yılmaz',
            userImage: '/images/user-image.jpg',
            type: 'Yıllık İzin',
            startDate: '17.09.2024 09:00',
            endDate: '17.09.2024 18:00'
          }"
        />
        <ApprovalProcessItem
          :application="{
            userName: 'Mehmet Yılmaz',
            userImage: '/images/user-image.jpg',
            type: 'Yıllık İzin',
            startDate: '17.09.2024 09:00',
            endDate: '17.09.2024 18:00'
          }"
        />
        <ApprovalProcessItem
          :application="{
            userName: 'Mehmet Yılmaz',
            userImage: '/images/user-image.jpg',
            type: 'Yıllık İzin',
            startDate: '17.09.2024 09:00',
            endDate: '17.09.2024 18:00'
          }"
        />
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
