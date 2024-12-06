<template>
  <RouterLink
    :to="`/dashboard/profile/${meStore.user?._id}`"
    class="cursor flex items-center justify-center w-10 h-10 rounded-full"
    :class="avatarClass"
  >
    <img
      v-if="meStore.user?.image"
      :src="meStore.user?.image"
      :alt="meStore.user?.full_name"
      :class="meStore?.user?.statu ? 'border-gamora' : 'border-gray-500'"
      class="w-full h-full rounded-full border-[2px]"
    />

    <span v-else>{{ userName }}</span>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useMeStore } from '@/stores/me'

const meStore = useMeStore()

const avatarClass = computed(() => {
  const user = meStore.getUser

  return user?.photo ? 'bg-transparent' : 'bg-white text-gray-700 shadow-sm'
})

// userName computed property olarak tanımlandı
const userName = computed(() => {
  const user = meStore.getUser
  const name = user?.full_name.split(' ')[0] || ''
  const surname = user?.full_name.split(' ')[1] || ''
  return (name.charAt(0) + surname.charAt(0)).toUpperCase()
})
</script>
