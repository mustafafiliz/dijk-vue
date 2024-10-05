<script setup>
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import { defineProps } from 'vue'

defineProps({})
</script>

<template>
  <div class="flex flex-col h-full">
    <InfoSliderHeader title="Fazla Mesai Talepleri" to="/#">
      <template #icon>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="8" fill="#B13A3A" />
          <path
            d="M18 8C12.5 8 8 12.5 8 18C8 23.5 12.5 28 18 28C23.5 28 28 23.5 28 18C28 12.5 23.5 8 18 8ZM19 18C19 18.4 18.8 18.7 18.5 18.9L15.15 20.9C14.65 21.2 14.05 21 13.75 20.5C13.45 20 13.65 19.4 14.15 19.1L17 17.4V13C17 12.4 17.4 12 18 12C18.6 12 19 12.4 19 13V18Z"
            fill="white"
          />
        </svg>
      </template>
    </InfoSliderHeader>

    <div class="flex flex-col mt-4 gap-y-2">
      <div class="flex items-center gap-x-2 text-night-sky text-14 font-semibold">
        <div>
          <svg
            width="36"
            height="37"
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 36.5C27.9414 36.5 36 28.4414 36 18.5C36 8.5586 27.9414 0.5 18 0.5C8.0586 0.5 0 8.5586 0 18.5C0 28.4414 8.0586 36.5 18 36.5ZM23.4 14.9C23.4 16.3322 22.8311 17.7057 21.8184 18.7184C20.8057 19.7311 19.4322 20.3 18 20.3C16.5678 20.3 15.1943 19.7311 14.1816 18.7184C13.1689 17.7057 12.6 16.3322 12.6 14.9C12.6 13.4678 13.1689 12.0943 14.1816 11.0816C15.1943 10.0689 16.5678 9.5 18 9.5C19.4322 9.5 20.8057 10.0689 21.8184 11.0816C22.8311 12.0943 23.4 13.4678 23.4 14.9ZM7.2 27.5C8.45642 25.8222 10.0868 24.4605 11.9616 23.5231C13.8364 22.5857 15.9039 22.0985 18 22.1C20.0961 22.0985 22.1636 22.5857 24.0384 23.5231C25.9132 24.4605 27.5436 25.8222 28.8 27.5C27.5436 29.1778 25.9132 30.5395 24.0384 31.4769C22.1636 32.4143 20.0961 32.9015 18 32.9C15.9039 32.9015 13.8364 32.4143 11.9616 31.4769C10.0868 30.5395 8.45642 29.1778 7.2 27.5Z"
              fill="#292D32"
            />
          </svg>
        </div>

        <div>
          Hasan Güner
          <div class="text-wild-dove text-12">Bugün, 2 saat</div>
        </div>

        <div class="ms-auto text-end">
          18:00 - 20:00
          <div class="text-12 text-wild-dove">Ofiste</div>
        </div>
      </div>
      <div class="flex items-center gap-x-2 text-night-sky text-14 font-semibold">
        <div>
          <svg
            width="36"
            height="37"
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 36.5C27.9414 36.5 36 28.4414 36 18.5C36 8.5586 27.9414 0.5 18 0.5C8.0586 0.5 0 8.5586 0 18.5C0 28.4414 8.0586 36.5 18 36.5ZM23.4 14.9C23.4 16.3322 22.8311 17.7057 21.8184 18.7184C20.8057 19.7311 19.4322 20.3 18 20.3C16.5678 20.3 15.1943 19.7311 14.1816 18.7184C13.1689 17.7057 12.6 16.3322 12.6 14.9C12.6 13.4678 13.1689 12.0943 14.1816 11.0816C15.1943 10.0689 16.5678 9.5 18 9.5C19.4322 9.5 20.8057 10.0689 21.8184 11.0816C22.8311 12.0943 23.4 13.4678 23.4 14.9ZM7.2 27.5C8.45642 25.8222 10.0868 24.4605 11.9616 23.5231C13.8364 22.5857 15.9039 22.0985 18 22.1C20.0961 22.0985 22.1636 22.5857 24.0384 23.5231C25.9132 24.4605 27.5436 25.8222 28.8 27.5C27.5436 29.1778 25.9132 30.5395 24.0384 31.4769C22.1636 32.4143 20.0961 32.9015 18 32.9C15.9039 32.9015 13.8364 32.4143 11.9616 31.4769C10.0868 30.5395 8.45642 29.1778 7.2 27.5Z"
              fill="#292D32"
            />
          </svg>
        </div>

        <div>
          Hasan Güner
          <div class="text-wild-dove text-12">Bugün, 2 saat</div>
        </div>

        <div class="ms-auto text-end">
          18:00 - 20:00
          <div class="text-12 text-wild-dove">Ofiste</div>
        </div>
      </div>
    </div>
  </div>
</template>
