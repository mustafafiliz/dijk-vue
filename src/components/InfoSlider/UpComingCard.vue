<template>
  <RouterLink
    :to="`/dashboard/profile/${item?.user?._id || item._id}`"
    class="flex items-center gap-x-2 text-night-sky text-14 font-semibold"
  >
    <div>
      <span class="text-[13px]">{{ displayName }}</span>
      <div class="text-wild-dove text-12">
        {{ displayStatus }}
      </div>
    </div>

    <div class="ms-auto">
      <div v-if="item.type === 'overtime'" class="text-wild-dove text-12 text-right">
        {{ item.dateRange }}
      </div>
      <div class="font-semibold">
        {{ displayDate }}
      </div>
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

const displayName = computed(() => {
  return props.item?.full_name || props.item?.title
})

const todayFormatted = computed(() => {
  return dayjs().format('YYYY-MM-DD')
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

const displayStatus = computed(() => {
  if (isCurrentDay.value || calculateDaysUntil.value === 0) {
    return 'Bugün'
  }
  return `${calculateDaysUntil.value} Gün Sonra`
})

const displayDate = computed(() => {
  if (isCurrentDay.value) {
    return todayFormatted.value
  }
  return props.item.date.split(' ')[0]
})
</script>
