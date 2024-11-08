<template>
  <div></div>
</template>

<script setup>
import { useAxios } from '@/plugins/axios'

const { axios } = useAxios()

const fetchData = async () => {
  const data = await axios.get('/me')
  return data
}

fetchData()
</script>

<style lang="scss" scoped></style>
