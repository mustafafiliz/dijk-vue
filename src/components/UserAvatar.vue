src/components/UserAvatar.vue
<template>
  <RouterLink
    to="/dashboard/profile"
    class="cursor flex items-center justify-center w-10 h-10 rounded-full"
    :class="avatarClass"
  >
    <img
      v-if="user?.photo"
      :src="user.photo"
      alt="User Avatar"
      class="w-full h-full rounded-full"
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
  const name = user?.name || ''
  const surname = user?.surname || ''
  return (name.charAt(0) + surname.charAt(0)).toUpperCase()
})
</script>
