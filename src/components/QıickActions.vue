<script setup>
import { register } from 'swiper/element/bundle'
import { onMounted } from 'vue'

const actionItems = [
  {
    image: '/images/izin.svg',
    label: 'İzin'
  },
  {
    image: '/images/surecler.svg',
    label: 'Süreçler'
  },
  {
    image: '/images/avans.svg',
    label: 'Avans'
  },
  {
    image: '/images/harcama.svg',
    label: 'Harcamalar'
  },
  {
    image: '/images/ayarlar.svg',
    label: 'Ayarlar'
  },
  {
    image: '/images/izin.svg',
    label: 'İzin'
  },
  {
    image: '/images/surecler.svg',
    label: 'Süreçler'
  },
  {
    image: '/images/avans.svg',
    label: 'Avans'
  },
  {
    image: '/images/avans.svg',
    label: 'Avans'
  },
  {
    image: '/images/harcama.svg',
    label: 'Harcamalar'
  },
  {
    image: '/images/ayarlar.svg',
    label: 'Ayarlar'
  },
  {
    image: '/images/izin.svg',
    label: 'İzin'
  },
  {
    image: '/images/surecler.svg',
    label: 'Süreçler'
  },
  {
    image: '/images/avans.svg',
    label: 'Avans'
  },
  {
    image: '/images/harcama.svg',
    label: 'Harcamalar'
  }
]

register()

onMounted(() => {
  const swiper = document.querySelector('swiper-container').swiper
  swiper.params.navigation.nextEl = '.custom-button-next'
  swiper.params.navigation.prevEl = '.custom-button-prev'
  swiper.navigation.init()
  swiper.navigation.update()
})
</script>

<template>
  <div class="flex items-center gap-x-[10px]">
    <div class="custom-button-prev cursor-pointer max-md:hidden">
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
    </div>
    <swiper-container
      class="overflow-hidden"
      slides-per-view="auto"
      space-between="10"
      free-mode="true"
    >
      <swiper-slide class="w-fit" v-for="(item, i) in actionItems" :key="i">
        <div
          class="flex flex-col items-center justify-center gap-y-2 bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] h-24 min-w-24 px-1"
        >
          <img :src="item.image" :alt="item.label" />
          <span class="font-semibold text-night-sky"> {{ item.label }} </span>
        </div>
      </swiper-slide>
    </swiper-container>
    <div class="custom-button-next cursor-pointer max-md:hidden">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.459 28.0425C12.7532 28.3362 13.1518 28.5011 13.5675 28.5011C13.9832 28.5011 14.3818 28.3362 14.676 28.0425L23.541 19.1865C23.883 18.8445 24.036 18.3825 23.994 17.9355C23.994 17.5305 23.8425 17.127 23.535 16.8195L14.6745 7.959C14.529 7.81353 14.3563 7.69813 14.1663 7.6194C13.9762 7.54067 13.7725 7.50015 13.5667 7.50015C13.361 7.50015 13.1573 7.54067 12.9672 7.6194C12.7772 7.69813 12.6045 7.81353 12.459 7.959C12.3135 8.10447 12.1981 8.27717 12.1194 8.46724C12.0407 8.65731 12.0001 8.86102 12.0001 9.06675C12.0001 9.27248 12.0407 9.47619 12.1194 9.66626C12.1981 9.85633 12.3135 10.029 12.459 10.1745L20.289 18.0045L12.459 25.8285C12.3135 25.9738 12.1981 26.1464 12.1193 26.3363C12.0406 26.5263 12 26.7299 12 26.9355C12 27.1411 12.0406 27.3447 12.1193 27.5347C12.1981 27.7246 12.3135 27.8972 12.459 28.0425Z"
          fill="black"
        />
      </svg>
    </div>
  </div>
</template>
