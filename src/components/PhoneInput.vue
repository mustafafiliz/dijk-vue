<script setup>
import { ref, onMounted } from 'vue'
import intlTelInput from 'intl-tel-input/intlTelInputWithUtils'
import 'intl-tel-input/styles'
import { tr } from 'intl-tel-input/i18n'

const phoneNumber = ref('')

const checkPhoneNumberFirstChar = () => {
  if (phoneNumber.value[0] == '0') {
    phoneNumber.value = ''
  }
}

onMounted(() => {
  const input = document.querySelector('#phone')

  intlTelInput(input, {
    initialCountry: 'tr',
    strictMode: true,
    i18n: tr,
    separateDialCode: true
  })
})
</script>

<template>
  <div>
    <input
      class="w-full outline-none h-16 bg-transparent leading-[3] !ps-1"
      id="phone"
      type="tel"
      v-model="phoneNumber"
      @input="checkPhoneNumberFirstChar"
    />
  </div>
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
  @apply md:border md:border-gray-300;
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
