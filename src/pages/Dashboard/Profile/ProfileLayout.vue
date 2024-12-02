<script setup>
import Profile from './Index.vue'
</script>

<template>
  <Profile :key="$route.params.id" />
</template>
