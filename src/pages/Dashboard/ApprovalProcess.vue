<script setup>
import ApprovalProcessItem from '@/components/ApprovalProcessItem.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useAxios } from '@/plugins/axios'
import { onMounted, ref } from 'vue'
import Button from '@/components/Button.vue'

const { axios } = useAxios()
const approvalProcesses = ref([])
const page = ref(1)
const loading = ref(false)
const hasNextPage = ref(false)

onMounted(async () => {
  await fetchApprovalProcesses()
})

const fetchApprovalProcesses = async () => {
  try {
    const { data } = await axios.get('/processes-in-my-approval', {
      params: {
        page: page.value
      }
    })

    if (data.data.length === 0) {
      refreshApprovalProcesses()
      return
    }

    hasNextPage.value = Boolean(data.next_page_url)

    approvalProcesses.value.push(...data.data)
  } catch (error) {
    console.error('Error fetching team members:', error)
  }
}

const loadMoreApprovalProcesses = async () => {
  if (hasNextPage.value) {
    page.value += 1
  }
  await fetchApprovalProcesses()
}

const refreshApprovalProcesses = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('/processes-in-my-approval', {
      params: {
        page: page.value,
        ['get-from-source']: true
      },
      timeout: 35000
    })

    hasNextPage.value = Boolean(data.next_page_url)

    approvalProcesses.value = data.data
  } catch (error) {
    console.error('Error fetching team members:', error)
  } finally {
    loading.value = false
  }
}
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

      <Button
        :is-disabled="loading"
        :is-loading="loading"
        @click="refreshApprovalProcesses"
        class="!py-2 !text-base mb-5 w-full"
      >
        Yenile
      </Button>

      <div class="flex flex-col gap-4">
        <ApprovalProcessItem
          v-for="item in approvalProcesses"
          :application="{
            id: item._id,
            title: item.title,
            description: item.description,
            start_date: item.start_date,
            is_active: item.is_active,
            status: item.status,
            html: item.html
          }"
        />
      </div>
      <Button
        v-if="hasNextPage && !isLoading"
        class="!py-2 !text-base mt-5 w-full"
        @click="loadMoreApprovalProcesses"
        >Daha Fazla Yükle</Button
      >
    </div>

    <BottomNavigation />
  </div>
</template>
c
