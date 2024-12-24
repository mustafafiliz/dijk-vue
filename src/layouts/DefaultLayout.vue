<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
</script>

<template>
  <div
    class="flex flex-col max-md:h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 flex-1 max-w-5xl lg:min-h-dvh relative">
      <slot></slot>
    </div>
    <BottomNavigation />
  </div>
</template>
