<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    try {
      const response = await this.$axios.get('/me')
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async fetchData() {
      const data = await this.$axios.post('/api/data', { key: 'value' })
      return data
    }
  }
}
</script>

<style lang="scss" scoped></style>
