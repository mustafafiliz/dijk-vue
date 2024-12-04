<template>
  <RouterLink
    :to="`/dashboard/profile/${item._id}`"
    class="flex items-center gap-x-2 text-night-sky text-14 font-semibold"
  >
    <div>
      <span class="text-[13px]">{{ item?.full_name || item?.title }}</span>
      <div v-if="isCurrentDay || calculateDaysUntil === 0" class="text-wild-dove text-12">
        Bugün
      </div>
      <div v-else class="text-wild-dove text-12">{{ calculateDaysUntil }} Gün Sonra</div>
    </div>

    <div class="ms-auto">
      <div v-if="item.type === 'overtime'" class="text-wild-dove text-12 text-right">
        {{ item.dateRange }}
      </div>
      <div class="font-semibold">{{ item.date.split(' ')[0] }}</div>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const isCurrentDay = computed(() => {
  if (props.item.type === 'permit') {
    const today = dayjs()
    const startDate = dayjs(props.item.date)
    const endDate = dayjs(props.item.end_date)
    return (
      (today.isAfter(startDate) && today.isBefore(endDate)) ||
      today.isSame(startDate) ||
      today.isSame(endDate)
    )
  }
  return false
})

const calculateDaysUntil = computed(() => {
  const today = dayjs()
  const targetDate = dayjs(props.item.date)
  return targetDate.diff(today, 'day')
})
</script>
