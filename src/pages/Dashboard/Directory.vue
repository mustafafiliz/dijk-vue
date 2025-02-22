<script setup>
import PersonBox from '@/components/PersonBox.vue'
import Button from '@/components/Button.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Input from '@/components/Input.vue'
import { useAxios } from '@/plugins/axios'
import { watch, onMounted, ref } from 'vue'
import { debounce } from 'lodash'

const { axios } = useAxios()
const contacts = ref([])
const searchQuery = ref('')
const page = ref(1)
const hasNextPage = ref(false)
const isLoading = ref(false)

const fetchContacts = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`/contacts`, {
      params: {
        page: page.value,
        search: searchQuery.value
      }
    })

    hasNextPage.value = Boolean(response.next_page_url)
    contacts.value.push(...response.data)
  } catch (error) {
    console.error('Error fetching team members:', error)
  } finally {
    isLoading.value = false
  }
}

const loadMoreContacts = async () => {
  if (hasNextPage.value) {
    page.value += 1
  }
  await fetchContacts()
}

const fetchContactsDebounced = debounce(async () => {
  page.value = 1
  contacts.value = []
  await fetchContacts()
}, 300)

onMounted(async () => {
  await fetchContacts()
})

watch(searchQuery, (newQuery) => {
  fetchContactsDebounced()
})
</script>

<template>
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
      Rehber
    </div>
  </div>

  <div class="flex flex-col gap-4">
    <Input
      class="!text-sm !placeholder::text-sm"
      placeholder="Ad, Soyad, Telefon, Görev ..."
      v-model="searchQuery"
    />
    <div v-if="isLoading" class="flex flex-col items-center justify-items-center pt-10">
      <div
        class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
      ></div>
      <div class="text-sm text-gray-700 font-medium">Yükleniyor...</div>
    </div>
    <div v-else-if="contacts.length === 0" class="h-[60dvh] flex items-center justify-center">
      Kayıt bulunamadı.
    </div>
    <PersonBox
      v-for="member in contacts"
      :key="member._id"
      :person="{
        _id: member._id,
        name: member.full_name,
        role: member.work_title_text,
        image: member?.image,
        email: member.email,
        whatsapp: member.phone,
        phone: member.phone,
        statu: member.statu
      }"
    />
    <Button
      v-if="hasNextPage && !isLoading"
      class="!py-2 !rounded-xl !text-base"
      @click="loadMoreContacts"
      >Daha Fazla Yükle</Button
    >
  </div>
</template>
