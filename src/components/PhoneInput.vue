<script setup>
import { ref } from 'vue'
import IntlTelInput from 'intl-tel-input/vueWithUtils'
import 'intl-tel-input/styles'
import { en } from 'intl-tel-input/i18n'

const phoneNumber = ref('')
const isValidPhoneNumber = ref(false)
const emit = defineEmits(['updatePhoneNumber', 'updateValidity'])

const handlePhoneNumberChange = () => {
  emit('updatePhoneNumber', phoneNumber)
}

const handleValidityChange = () => {
  emit('updateValidity', isValidPhoneNumber)
}
</script>

<template>
  <IntlTelInput
    class="w-full outline-none h-16 bg-transparent leading-[3] !pl-2"
    :options="{
      initialCountry: 'tr',
      separateDialCode: true,
      useFullscreenPopup: false,
      strictMode: true,
      i18n: {
        ...en,
        searchPlaceholder: 'Search'
      }
    }"
    @changeNumber="phoneNumber = $event"
    @input="[handlePhoneNumberChange(), handleValidityChange()]"
    @changeValidity="isValidPhoneNumber = $event"
  />
</template>

<style>
:root {
  --iti-path-flags-1x: var(--iti-path-flags-2x);
}

.iti {
  @apply flex items-center;
  @apply w-full;
  @apply text-24 font-semibold;
  @apply px-4;
  @apply bg-white;
  @apply rounded-3xl;
}

.iti__country-container {
  @apply p-0;
  @apply static;
}

.iti__dropdown-content {
  @apply !w-full;
  @apply left-0;
  @apply border-0;
  @apply m-0;
  @apply top-[calc(100%+0.5rem)];
  @apply text-base;
}

.iti__dropdown-content .iti__search-input {
  @apply p-4;
  @apply outline-none;
}

.iti__selected-country-primary .iti__flag {
  @apply scale-[2];
  @apply rounded;
}

.iti__arrow {
  @apply hidden;
}

.iti--inline-dropdown .iti__country-list {
  @apply max-h-40;
}
</style>
