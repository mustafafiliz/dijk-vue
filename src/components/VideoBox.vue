<script setup>
defineProps({
  title: String,
  video: String,
  thumbnail: String
})
</script>

<template>
  <div
    class="cursor-pointer relative min-h-36 h-full w-fit rounded-lg overflow-hidden shrink-0 before:absolute before:inset-0 before:bg-black before:opacity-70 before:-z-[1]"
  >
    <div class="absolute top-2 left-2 font-semibold text-[10px] text-white">{{ title }}</div>
    <img :src="thumbnail" :alt="title" class="w-full h-full" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <svg
        width="38"
        height="40"
        viewBox="0 0 38 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.92 36.162C27.6276 36.162 34.6867 28.889 34.6867 19.9175C34.6867 10.946 27.6276 3.6731 18.92 3.6731C10.2123 3.6731 3.15332 10.946 3.15332 19.9175C3.15332 28.889 10.2123 36.162 18.92 36.162ZM16.8601 26.1648L24.3023 21.6378C25.5347 20.888 25.5347 18.9471 24.3023 18.1973L16.8601 13.6702C15.6621 12.9415 14.19 13.89 14.19 15.3905V24.4445C14.19 25.945 15.6621 26.8936 16.8601 26.1648Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
</template>
