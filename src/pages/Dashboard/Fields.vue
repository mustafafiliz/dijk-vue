<script setup>
import FieldItem from '@/components/FieldItem.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { ref, onMounted } from 'vue'
import Sortable from 'sortablejs'

const sortableList = ref(null)

onMounted(() => {
  new Sortable(sortableList.value, {
    animation: 150,
    ghostClass: 'sortable-ghost'
  })
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 flex-1 max-w-5xl">
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

      <div class="grid grid-cols-2 gap-4" ref="sortableList">
        <FieldItem title="İzin" to="/dashboard/permission-request" image="/images/izin.svg" />
        <FieldItem title="Avans" image="/images/avans.svg" />
        <FieldItem title="Harcama" image="/images/harcama.svg" />
        <FieldItem title="Ekstra Mesai" image="/images/mesai.svg" />
        <FieldItem title="Takımım" image="/images/team.svg" to="/dashboard/team" />
        <FieldItem title="Rehber" image="/images/rehber.svg" to="/dashboard/directory" />
        <FieldItem
          title="Onayımdaki Süreçler"
          image="/images/surecler.svg"
          to="/dashboard/approval-process"
        />
        <FieldItem title="Ayarlar" image="/images/ayarlar.svg" />
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
