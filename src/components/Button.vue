<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const variantClasses = {
  primary: 'bg-gentian-flower pt-[19px] pb-[18px] px-5 text-white text-18 font-semibold rounded-20',
  light: 'bg-white pt-[19px] pb-[18px] px-5 text-gentian-flower text-18 font-semibold rounded-20'
}
</script>

<template>
  <button
    class="flex items-center justify-center"
    :class="[variantClasses[variant], { 'opacity-50 cursor-not-allowed': isDisabled }]"
    :type="type"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>
