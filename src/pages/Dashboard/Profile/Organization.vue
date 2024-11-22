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

const { axios } = useAxios()
const { user } = useMeStore()
const allMembers = ref([])
const buildHierarchy = (members) => {
  const map = new Map()
  members.forEach((member) => {
    map.set(member._id, { ...member, subMembers: [] })
  })

  members.forEach((member) => {
    if (member.manager_person_id) {
      map.get(member.manager_person_id)?.subMembers.push(map.get(member._id))
    }
  })
  return Array.from(map.values())
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/my-team')

    const hierarchy = buildHierarchy([...data.subordinates, data.manager])
    allMembers.value = hierarchy
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

      <VueZoomable
        class="w-full h-[calc(100dvh-5.5rem)] border border-gray-300 bg-white rounded-2xl"
        selector="#organization-schema"
        :minZoom="0.01"
        :maxZoom="10"
      >
        <div
          id="organization-schema"
          class="bg-white w-full h-full flex gap-4 items-center justify-center"
        >
          <div v-for="member in allMembers" :key="member._id" class="relative flex items-center">
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
              class="absolute top-full left-1/2 -translate-x-1/2"
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
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div
              class="absolute flex gap-4 items-center top-full mt-10 left-1/2 -translate-1/2 -translate-x-1/2"
            >
              <template v-for="subMember in member?.subMembers">
                <PersonBox
                  v-if="subMember"
                  :key="subMember._id"
                  vertical
                  :person="{
                    name: subMember.full_name,
                    role: subMember.work_title_text,
                    image: subMember?.image,
                    email: subMember.email,
                    whatsapp: subMember.phone,
                    phone: subMember.phone
                  }"
                />
              </template>
            </div>
          </div>
        </div>
      </VueZoomable>
    </div>
  </div>
</template>

<style>
.btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
}

.node-item {
  display: flex;
  width: 12rem;
  border-radius: 0.35rem;
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
}

.node-item > :not([hidden]) ~ :not([hidden]) {
  margin-left: 1rem;
}
.node-item:hover {
  background-color: rgb(226 232 240);
}
.node-item.active {
  border-color: rgb(165 180 252);
  background-color: rgb(224 231 255);
}
.node-item.passive {
  background-color: rgb(248 250 252);
}

.node-item .avatar {
  height: 3rem;
  width: 3rem;
  border-radius: 9999px;
}

.node-btn-toggle {
  padding: 1px;
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  border: 1px solid #e2e8f0;
  background-color: rgb(255 255 255);
  font-size: 0.75rem;
  line-height: 10px;
}
</style>
