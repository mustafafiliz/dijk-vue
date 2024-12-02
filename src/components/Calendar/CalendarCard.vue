<script setup>
import { eventColors } from '@/helpers/eventColors'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink
    v-if="item"
    :to="item?.type === 'holiday' ? '#' : `/dashboard/profile/${item?.user?._id || item?._id}`"
    class="bg-white relative pt-1 pb-2 px-4 font-medium text-12 rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
  >
    <div v-if="!item.now_birthday" class="flex items-center justify-between text-[10px]">
      <div>Baş: {{ item.start_date }} {{ item.start_hour ? `/ ${item.start_hour}` : '' }}</div>
      <div>Bit: {{ item.end_date }} {{ item.end_hour ? `/ ${item.end_hour}` : '' }}</div>
    </div>
    <div v-else-if="item?.type === 'holiday'"></div>
    <div v-else class="flex items-center justify-between text-[10px]">
      <div>Tarih: {{ item.now_birthday }}</div>
    </div>

    <div class="flex items-center gap-x-[10px] mt-[10px]">
      <div
        :style="`background-color:${eventColors[item.type].badgeColor}`"
        class="shrink-0 h-9 w-9 rounded-md flex items-center justify-center"
      >
        <span class="text-wrap text-[8px] text-center text-white">
          {{ eventColors[item.type].name }}
        </span>
      </div>

      <div class="w-full">
        <div class="text-night-sky">
          {{ item?.full_name || item?.user?.full_name || item?.title }}
        </div>
        <div class="text-[10px] text-squant flex items-center justify-between w-full">
          <span v-if="item.type !== 'holiday' && item.type !== 'birthday'" class="flex-1">{{
            item.message || 'Mesaj yok.'
          }}</span>
          <span
            v-if="!item.now_birthday && item.confirm_statu"
            :class="
              item.confirm_statu === 1
                ? 'bg-success text-green-900'
                : item.confirm_statu === 2
                  ? 'bg-danger text-red-900'
                  : 'bg-gray-200'
            "
            class="px-2 py-1 text-[10px] rounded-md"
            >{{ item.confirm_text }}</span
          >
          <span
            v-if="!item.now_birthday && item.statu"
            :class="
              item.statu === 1
                ? 'bg-success text-green-900'
                : item.statu === 2
                  ? 'bg-danger text-red-900'
                  : 'bg-gray-200'
            "
            class="px-2 py-1 text-[10px] rounded-md"
            >{{ item.statu_text }}</span
          >
        </div>
      </div>
    </div>
  </RouterLink>
</template>
