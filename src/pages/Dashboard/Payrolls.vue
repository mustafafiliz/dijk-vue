<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useAxios } from '@/plugins/axios'
import { ref, onMounted } from 'vue'

const payrolls = ref([])
const { axios } = useAxios()
const year = ref(new Date().getFullYear())

const getPayrolls = async () => {
  try {
    const { data } = await axios.get(`/payrolls/${year.value}`)

    payrolls.value = data.data
  } catch (error) {
    return error
  }
}

const getPayrollDetail = async (id) => {
  try {
    const { data } = await axios.get(`/payrolls/detail/${id}`)
  } catch (error) {
    return error
  }
}

onMounted(() => {
  getPayrolls()
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative p-4 flex-1 max-w-5xl">
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
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Bordrolarım</div>

      <div class="grid grid-cols-1 gap-4">
        <template v-for="item in payrolls"> </template>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
