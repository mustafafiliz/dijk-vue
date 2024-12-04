<script setup>
import ExpenseItem from '@/components/ExpenseItem.vue'
import Button from '@/components/Button.vue'
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
        Masraf Süreçleri
      </div>

      <div class="flex flex-col gap-4 pt-4 flex-1">
        <ExpenseItem
          :is-new="true"
          description="Masraf Açıklaması"
          date="2 Aralık 2024"
          amount="390 TL"
          :permissives="[
            { name: 'John Doe', value: 'true' },
            { name: 'Jane Doe', value: 'false' },
            { name: 'Jane Doe', value: 'pending' }
          ]"
        />
        <ExpenseItem
          :is-new="true"
          description="Masraf Açıklaması"
          date="2 Aralık 2024"
          amount="390 TL"
          :permissives="[
            { name: 'John Doe', value: 'true' },
            { name: 'Jane Doe', value: 'false' },
            { name: 'Jane Doe', value: 'pending' }
          ]"
        />
        <ExpenseItem
          :is-new="true"
          description="Masraf Açıklaması"
          date="2 Aralık 2024"
          amount="390 TL"
          :permissives="[
            { name: 'John Doe', value: 'true' },
            { name: 'Jane Doe', value: 'false' },
            { name: 'Jane Doe', value: 'pending' }
          ]"
        />
        <ExpenseItem
          :is-new="true"
          description="Masraf Açıklaması"
          date="2 Aralık 2024"
          amount="390 TL"
          :permissives="[
            { name: 'John Doe', value: 'true' },
            { name: 'Jane Doe', value: 'false' },
            { name: 'Jane Doe', value: 'pending' }
          ]"
        />

        <RouterLink class="mt-auto" to="/dashboard/expense/new">
          <Button class="w-full !py-3" variant="primary"> Yeni Masraf Talebi </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
