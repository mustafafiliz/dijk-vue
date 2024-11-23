<script setup>
import FieldItem from '@/components/FieldItem.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { useFieldsStore } from '@/stores/fields'
import PersonBox from '@/components/PersonBox.vue'
import Input from '@/components/Input.vue'
import { useAxios } from '@/plugins/axios'
import { computed, onMounted, ref, watch } from 'vue'
import { useMeStore } from '@/stores/me'
import VueZoomable from 'vue-zoomable'
import 'vue-zoomable/dist/style.css'
import MemberNode from '@/components/Organization/MemberNode.vue'
import { useRoute } from 'vue-router'
import Button from '@/components/Button.vue'

const { axios } = useAxios()
const { user } = useMeStore()
const allMembers = ref([])
const organizations = ref([])

const managerId = useRoute().params.id

const showUpperManager = () => {
  if (allMembers.value.length > 0) {
    const newManagerId = allMembers.value[0].manager_person_id
    buildHierarchy(organizations.value, newManagerId)
  }
}

// Function to build the organization hierarchy
const buildHierarchy = (members, managerId) => {
  const map = new Map()

  // Map all members
  members.forEach((member) => {
    map.set(member._id, {
      ...member,
      subMembers: [],
      collapse: member.id === managerId
    })
  })

  // Check each member's manager and add sub members
  members.forEach((member) => {
    if (member.manager_person_id) {
      const manager = map.get(member.manager_person_id)
      if (manager) {
        manager.subMembers.push(map.get(member._id))
      }
    }
  })

  // Return the top element with the specified managerId
  const hierarchy = map.get(managerId)

  allMembers.value = hierarchy ? [hierarchy] : []
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/organization')
    organizations.value = data

    buildHierarchy(data, managerId)
  } catch (error) {
    console.error('Error fetching team members:', error)
  }
})
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative p-4 flex-1 max-w-6xl">
      <button class="py-2" type="button" @click="$router.go(-1)">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 25.5L13.5 18L21 10.5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">
        Organizasyon Şeması
      </div>
      <Button
        class="!py-1 !text-xs mb-5 absolute bottom-1 right-9 z-10 border border-gray-300"
        type="button"
        variant="soft"
        @click="buildHierarchy(organizations, managerId)"
        >Sıfırla</Button
      >
      <VueZoomable
        class="w-full h-[calc(100dvh-5.5rem)] flex flex-col items-center justify-center border border-gray-300 bg-white rounded-2xl"
        selector="#organization-schema"
        :minZoom="0.01"
        :maxZoom="10"
        :initial-zoom="1"
      >
        <div
          id="organization-schema"
          class="bg-white w-full h-full flex gap-4 items-start pt-10 justify-center"
        >
          <div class="relative flex flex-col items-center">
            <Button
              v-if="allMembers?.[0]?.manager_person_id"
              class="!py-2 !text-xs mb-5"
              type="button"
              @click="showUpperManager"
              >Üst Yöneticiye Git</Button
            >
            <MemberNode
              v-for="member in allMembers"
              :key="member._id"
              :member="member"
              :parentId="managerId"
              :firstChild="true"
            />
          </div>
        </div>
      </VueZoomable>
    </div>
  </div>
</template>
