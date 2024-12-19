<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import ExpenseItem from '@/components/Expense/ExpenseItem.vue'
import Button from '@/components/Button.vue'
import { onMounted, ref } from 'vue'
import { useAxios } from '@/plugins/axios'

const { axios } = useAxios()
const expenses = ref([])
const currentPage = ref(1)
const lastPage = ref(1)
const loading = ref(true)

const getExpenseList = async (page = 1) => {
  try {
    loading.value = true
    const response = await axios.get(`/expences?page=${page}`)

    if (page === 1) {
      expenses.value = response.data
    } else {
      expenses.value = [...expenses.value, ...response.data]
    }

    currentPage.value = response.meta.current_page
    lastPage.value = response.meta.last_page
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  if (currentPage.value < lastPage.value) {
    getExpenseList(currentPage.value + 1)
  }
}

onMounted(() => {
  getExpenseList()
})
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
      <RouterLink class="mt-auto" to="/dashboard/expense/new">
        <Button class="w-full !py-3" variant="primary">Yeni Masraf Talebi</Button>
      </RouterLink>
      <div class="flex flex-col gap-4 pt-4 flex-1">
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-items-center pt-20">
          <div
            class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
          ></div>
          <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
        </div>

        <!-- Content when not loading -->
        <template v-else>
          <!-- Expense Records -->
          <div v-if="expenses.length > 0">
            <ExpenseItem v-for="expense in expenses" :key="expense._id" :expense="expense" />

            <!-- Load More Button -->
            <button
              v-if="currentPage < lastPage"
              @click="loadMore"
              class="w-full mt-4 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
            >
              Daha Fazla Yükle
            </button>
          </div>
          <div v-else>
            <h2 class="text-center my-2">Kayıt bulunamadı.</h2>
          </div>
        </template>
      </div>
    </div>
    <BottomNavigation />
  </div>
</template>
