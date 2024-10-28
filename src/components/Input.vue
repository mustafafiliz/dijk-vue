<template>
  <input
    class="w-full relative outline-none rounded-3xl text-24 py-[14px] px-4"
    :type="type"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style>
input[type='date']::-webkit-inner-spin-button,
input[type='time']::-webkit-calendar-picker-indicator,
input[type='date']::-webkit-calendar-picker-indicator {
  background: none;
  position: absolute;
  left: 0;
  width: 100%;
}
</style>
