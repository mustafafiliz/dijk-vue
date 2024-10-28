<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import ErrorLabel from '@/components/ErrorLabel.vue'
import { ref, computed } from 'vue'
import { useAxios } from '@/plugins/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const { axios } = useAxios()

const currentPassword = ref('')
const newPassword = ref('')
const newPasswordConfirm = ref('')
const isLoading = ref(false)
const confirmError = ref('')

const isFormValid = computed(() => {
  return (
    currentPassword.value.length > 0 &&
    newPassword.value.length > 0 &&
    newPasswordConfirm.value.length > 0
  )
})

const handleChangePassword = async () => {
  if (!isFormValid.value) return

  if (newPassword.value !== newPasswordConfirm.value) {
    confirmError.value = 'Parolalar eşleşmiyor'
    return
  }

  confirmError.value = ''
  isLoading.value = true

  try {
    const response = await axios.post('/auth/change-password', {
      current_password: currentPassword.value,
      new_password: newPassword.value,
      new_password_confirm: newPasswordConfirm.value
    })

    toast.success(response.message)

    currentPassword.value = ''
    newPassword.value = ''
    newPasswordConfirm.value = ''
  } catch (error) {
    toast.error(error.response.data.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 pb-20 flex-1 max-w-5xl">
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
          Parola Değiştir
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <div>
          <div
            class="inline-flex bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
          >
            Mevcut Parola
          </div>
          <Input v-model="currentPassword" class="md:border md:border-gray-300" type="password" />
        </div>

        <div>
          <div
            class="inline-flex bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
          >
            Yeni Parola
          </div>
          <Input v-model="newPassword" class="md:border md:border-gray-300" type="password" />
        </div>

        <div>
          <div
            class="inline-flex bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
          >
            Yeni Parola Tekrar
          </div>
          <Input
            v-model="newPasswordConfirm"
            class="md:border md:border-gray-300"
            type="password"
          />
          <ErrorLabel v-if="confirmError" :text="confirmError" />
        </div>

        <div>
          <Button
            :is-loading="isLoading"
            :disabled="!isFormValid"
            class="w-full lg:w-auto"
            @click="handleChangePassword"
          >
            Parolayı Güncelle
          </Button>
        </div>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
