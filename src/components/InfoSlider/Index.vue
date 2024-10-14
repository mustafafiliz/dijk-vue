<script setup>
import { register } from 'swiper/element/bundle'
import { useSlots } from 'vue'
const slots = useSlots()

const paginationStyle = `
  .swiper-pagination {
    bottom: unset;
    top: 100%;
    display: flex;
    justify-content: center;
    column-gap: 4px;
  }

  .swiper-pagination-bullet {
    background: #D9D9D9;
    opacity: 1;
    width: 5px;
    height: 5px;
    border-radius: 9999px;
    margin: 0 !important;
    transition: width 0.3s;
  }

  .swiper-pagination-bullet-active {
    background: #8A8A8A;
    width: 15px;
  }
`

register()
</script>

<template>
  <div>
    <swiper-container
      class="bg-white rounded-2xl h-full"
      pagination="true"
      :injectStyles="[paginationStyle]"
      initialSlide="0"
    >
      <swiper-slide
        class="flex flex-col pt-2 pe-2 ps-2 pb-[26px] h-auto"
        v-for="(_, slide, index) in slots"
        :key="index"
      >
        <slot :name="slide"></slot>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
