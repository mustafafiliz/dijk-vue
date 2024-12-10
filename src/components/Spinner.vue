<template>
  <div class="flex justify-center items-center">
    <div
      class="animate-spin rounded-full border-4 border-t-transparent"
      :class="secondary ? 'border-gray-600 h-6 w-6' : 'border-white h-8 w-8'"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    secondary: {
      type: Boolean,
      default: false
    }
  }
}
</script>
