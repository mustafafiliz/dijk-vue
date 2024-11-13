<script setup>
import PersonBox from '@/components/PersonBox.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Input from '@/components/Input.vue'
import { useAxios } from '@/plugins/axios'
import { computed, onMounted, ref } from 'vue'
import { useMeStore } from '@/stores/me'

const { axios } = useAxios()
const { user } = useMeStore()
const teamMembers = ref([])
const searchQuery = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get('/my-team')

    const teams = [user, ...data.subordinates]

    teamMembers.value = teams
  } catch (error) {
    console.error('Error fetching team members:', error)
  }
})

const filteredTeamMembers = computed(() => {
  return teamMembers.value.filter((member) =>
    member.full_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
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
        <Input class="!text-sm !placeholder::text-sm" placeholder="Ara..." v-model="searchQuery" />
        <PersonBox
          v-for="member in filteredTeamMembers"
          :key="member._id"
          :person="{
            name:
              user.full_name === member.full_name ? member.full_name + ' - Siz' : member.full_name,
            role: member.work_title_text,
            image: member?.image,
            email: member.email,
            whatsapp: member.phone,
            phone: member.phone
          }"
        />
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
