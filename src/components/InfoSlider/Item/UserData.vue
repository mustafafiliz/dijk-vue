<script setup>
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import { defineProps } from 'vue'

defineProps({
  userData: {
    type: Object,
    default: () => ({
      name: '',
      startDate: '',
      experience: '',
      jobTitle: '',
      company: '',
      workType: ''
    })
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <InfoSliderHeader title="Bilgilerim">
      <template #icon>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="8" fill="#FF5454" />
          <path
            d="M18 9C13.0294 9 9 13.0295 9 17.9999C9 22.9705 13.0294 27 18 27C22.9706 27 27 22.9705 27 17.9999C27 13.0295 22.9706 9 18 9ZM17.9999 23.1297C15.5654 23.1287 13.8261 22.7979 13.8668 22.4949C14.0879 20.8387 15.4234 20.6795 16.2715 20.0009C16.6523 19.6962 16.8374 19.7724 16.8374 19.2645C16.8374 19.0869 16.8374 18.7567 16.8374 18.452C16.6088 18.1982 16.5257 18.23 16.3324 17.2334C15.9417 17.2334 15.9669 16.7256 15.7826 16.2752C15.6388 15.9242 15.7479 15.7727 15.8685 15.7069C15.8034 15.3599 15.8445 14.1949 16.3442 13.5885L16.2654 13.0383C16.2654 13.0383 16.4225 13.0777 16.8154 12.9988C17.2085 12.9206 18.1515 12.6849 18.7017 13.1562C20.0221 13.3504 20.3727 14.4348 20.1151 15.699C20.2416 15.7597 20.3675 15.9086 20.2171 16.2752C20.033 16.7256 20.0582 17.2334 19.6675 17.2334C19.4743 18.23 19.3911 18.1982 19.1624 18.452C19.1624 18.7567 19.1624 19.0869 19.1624 19.2645C19.1624 19.7724 19.3474 19.6962 19.7282 20.0009C20.5764 20.6794 21.9118 20.8387 22.1331 22.4949C22.1736 22.7979 20.4344 23.1287 17.9999 23.1297Z"
            fill="white"
          />
        </svg>
      </template>
    </InfoSliderHeader>

    <div class="text-12 font-semibold mt-2">{{ userData.name }}</div>
    <table class="text-12 font-semibold">
      <tbody>
        <tr>
          <td class="py-2">
            İşe Başlama Tarihi
            <div class="text-gentian-flower mt-1">{{ userData.startDate }}</div>
          </td>

          <td class="py-2">
            Deneyim
            <div class="text-gentian-flower mt-1">{{ userData.experience }}</div>
          </td>

          <td class="py-2">
            Çalışma Ünvanı
            <div class="text-gentian-flower mt-1">{{ userData.jobTitle }}</div>
          </td>
        </tr>
        <tr>
          <td class="py-2">
            Çalıştığı Şirket
            <div class="text-gentian-flower mt-1">{{ userData.company }}</div>
          </td>

          <td class="py-2">
            Çalışma Şekli
            <div class="text-gentian-flower mt-1 text-[11px]">{{ userData.workType }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
