<script setup>
import { ref, defineEmits, nextTick, watch, onMounted } from 'vue'
import PersonBox from '@/components/PersonBox.vue'

const props = defineProps(['member', 'parentId', 'firstChild'])
const collapse = ref(false)

onMounted(() => {
  if (props.firstChild) {
    toggleSubMembers()
  }
})

const toggleSubMembers = () => {
  collapse.value = !collapse.value

  nextTick(() => {
    const subElement = document.getElementById('sub-member_' + props.parentId)

    if (subElement) {
      subElement.querySelectorAll('div').forEach((div) => {
        div.classList.remove('active')
      })
    }
    const innerDiv = document.getElementById('sub-member_' + props.member._id)

    if (innerDiv) {
      const element = document.getElementById('member_' + props.member._id)
      element.classList.add('active')
      innerDiv.classList.add('active')

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      console.warn('Element bulunamadı:', 'sub-member_' + props.member._id)
    }
  })
}
</script>

<template>
  <div :id="'member_' + member._id" class="relative flex items-center">
    <PersonBox
      vertical
      :person="{
        name: member.full_name,
        role: member.work_title_text,
        image: member?.image,
        email: member.email,
        whatsapp: member.phone,
        phone: member.phone
      }"
    />
    <button
      v-if="member.subMembers.length > 0"
      class="absolute top-[98%] left-1/2 -translate-x-1/2"
      @click="toggleSubMembers"
    >
      <svg
        class="-rotate-90"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 25.5L13.5 18L21 10.5"
          stroke="#e2e2e2"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div
      v-show="collapse"
      :id="'sub-member_' + member._id"
      class="absolute hidden gap-4 items-center top-full mt-10 left-1/2 -translate-1/2 -translate-x-1/2"
    >
      <template v-for="subMember in member.subMembers" :key="subMember._id">
        <MemberNode
          v-show="subMember && !subMember.collapse"
          :member="subMember"
          :parentId="member._id"
        />
      </template>
    </div>
  </div>
</template>

<style>
.active {
  display: flex !important;
}
.active > button > svg > path {
  stroke: black !important;
}
</style>
