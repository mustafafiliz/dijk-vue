<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMeStore } from '@/stores/me'
import QrcodeVue from 'qrcode.vue'
import BottomNavigation from '@/components/BottomNavigation.vue'
import Button from '@/components/Button.vue'
import { useAxios } from '@/plugins/axios'
import { useRoute } from 'vue-router'

const meStore = useMeStore()
const storeUser = computed(() => meStore.getUser)
const user = ref(null)
const { axios } = useAxios()
const manager = ref(null)

const userId = useRoute().params.id

const handleLogout = async () => {
  const meStore = useMeStore()
  await meStore.logout()
}

onMounted(async () => {
  try {
    if (userId !== storeUser.value._id) {
      const { data: userData } = await axios.get(`/auth/me/${userId}`)
      user.value = userData
    } else {
      user.value = storeUser.value
    }

    const { data: teamData } = await axios.get(`/my-team/${userId}`)
    manager.value = teamData.manager
  } catch (error) {
    console.error('Error fetching team members:', error)
  }
})

const qrIsActive = ref(false)
const contactInfo = computed(() => {
  if (!user.value) return ''

  return `BEGIN:VCARD
VERSION:3.0
N:${user.value.full_name}
FN:${user.value.full_name}
ORG:${user.value.erp_company_text}
TITLE:${user.value.work_title_text}
TEL:+90${user.value.phone}
EMAIL:${user.value.email}
ADR:;;${user.value.city || ''};Türkiye
END:VCARD`
})

function getAvatarInitials(fullName) {
  if (!fullName) return ''

  const names = fullName.split(' ')

  return names
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join('')
}

const level = ref('M')
const renderAs = ref('svg')
const background = ref('#ffffff')
const foreground = ref('#000000')
const imageSettings = ref({
  src: '/images/company-logo.jpg',
  width: 50,
  height: 50,
  x: 75,
  y: 75,
  excavate: true
})
</script>

<template v-if="!user">
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="relative p-4 flex-1 max-w-5xl">
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

      <div class="absolute lg:top-5 top-7 left-1/2 -translate-x-1/2 font-semibold">Profil</div>
      <div class="flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="relative">
            <img
              v-if="user?.photo"
              :class="user?.is_active ? 'border-gamora' : 'border-gray-500'"
              class="border-[6px] w-24 h-24 object-cover rounded-20"
              src="/images/user-image.jpg"
              alt=""
            />
            <div
              v-else
              :class="user?.is_active ? 'border-gamora' : 'border-gray-500'"
              class="w-24 h-24 rounded-20 border-[6px] bg-white flex items-center justify-center"
            >
              <span class="text-gray-500 text-2xl lg:text-3xl font-medium">{{
                (user?.name?.charAt(0) || '') + (user?.surname?.charAt(0) || '')
              }}</span>
            </div>
            <span
              :class="user?.is_active ? 'bg-gamora' : 'bg-gray-500'"
              class="text-white font-semibold text-14 rounded-lg py-[2px] px-[13px] absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {{ user?.is_active ? 'Aktif' : 'Pasif' }}
            </span>
          </div>

          <div class="text-center mt-6">
            <div class="font-semibold">{{ user?.full_name }}</div>
            <div class="text-12 font-bold">
              {{ user?.erp_company_text }} - {{ user?.work_title_text }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2 p-2">
        <RouterLink
          :to="`/dashboard/profile/organization/${user?._id}`"
          class="!text-black !py-3 lg:text-base text-sm text-center w-full bg-white rounded-full font-semibold"
        >
          Organizasyon
        </RouterLink>
        <!-- QR Start -->
        <Button
          @click="qrIsActive = true"
          class="!text-black !py-3 lg:text-base text-sm"
          variant="light"
        >
          QR Kod Oluştur
        </Button>
        <Button
          v-if="userId === storeUser?._id"
          @click="handleLogout"
          class="lg:hidden !py-3 lg:text-base text-sm"
          variant="primary"
        >
          Çıkış Yap
        </Button>

        <div
          v-show="qrIsActive"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          @click="qrIsActive = false"
        >
          <div class="bg-white w-full max-w-md mx-4 rounded-20 p-6 relative md:mx-0" @click.stop>
            <button @click="qrIsActive = false" class="absolute right-4 top-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <div class="flex flex-col items-center gap-6">
              <div class="flex flex-col items-center gap-2">
                <img
                  v-if="user?.photo"
                  :src="user.photo"
                  alt="Profil Fotoğrafı"
                  class="w-20 h-20 rounded-full object-cover border-4 border-gamora"
                />
                <div
                  v-else
                  :class="user?.is_active ? 'border-gamora' : 'border-gray-500'"
                  class="w-24 h-24 rounded-full border-[4px] bg-white flex items-center justify-center"
                >
                  <span class="text-gray-500 text-2xl lg:text-3xl font-medium">{{
                    (user?.name?.charAt(0) || '') + (user?.surname?.charAt(0) || '')
                  }}</span>
                </div>
                <div class="text-center">
                  <h3 class="font-bold text-xl">{{ user?.full_name }}</h3>
                  <p class="text-squant">
                    {{ user?.erp_company_text }} - {{ user?.work_title_text }}
                  </p>
                </div>
              </div>

              <qrcode-vue
                v-if="contactInfo"
                :value="contactInfo"
                :level="level"
                :render-as="renderAs"
                :background="background"
                :foreground="foreground"
                :image-settings="imageSettings"
                :size="200"
              />

              <div class="w-full space-y-3 text-14">
                <div class="flex items-center gap-2 text-squant">
                  <span>Kişisel Bilgiler</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M17 3.5H7c-3 0-5 1.5-5 5v7c0 3.5 2 5 5 5h10c3 0 5-1.5 5-5v-7c0-3.5-2-5-5-5zm-13.25 4c0-.41.34-.75.75-.75h13c.41 0 .75.34.75.75s-.34.75-.75.75h-13c-.41 0-.75-.34-.75-.75z"
                    />
                  </svg>
                  <span>+90 {{ user?.phone }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M17 3H7C4 3 2 4.5 2 8v7c0 3.5 2 5 5 5h10c3 0 5-1.5 5-5V8c0-3.5-2-5-5-5zm0 4.75l-3.75 3c-.75.6-1.75.6-2.5 0L7 7.75V7l3.75 3c.75.6 1.75.6 2.5 0L17 7v.75z"
                    />
                  </svg>
                  <span>{{ user?.email }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 13.43c3.03 0 5.5-2.47 5.5-5.5S15.03 2.43 12 2.43s-5.5 2.47-5.5 5.5 2.47 5.5 5.5 5.5zm0-9c1.93 0 3.5 1.57 3.5 3.5S13.93 11.43 12 11.43s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5z"
                    />
                    <path
                      d="M12 22.43c-4.04 0-7.5-1.83-7.5-4.5v-1c0-2.67 3.46-4.5 7.5-4.5s7.5 1.83 7.5 4.5v1c0 2.67-3.46 4.5-7.5 4.5z"
                    />
                  </svg>
                  <span>{{ user?.city || 'İstanbul' }}, Türkiye</span>
                </div>
              </div>

              <Button @click="qrIsActive = false" class="w-full" variant="light"> Kapat </Button>
            </div>
          </div>
        </div>
        <!-- QR End -->
        <template v-if="manager">
          <div class="font-semibold ps-2">Yöneticisi</div>
          <a
            :href="`/dashboard/profile/${manager?._id}`"
            class="flex items-center bg-white rounded-2xl py-3 px-4 gap-x-[18px]"
          >
            <img
              v-if="manager?.logo"
              class="rounded-full border-[3px] border-gamora w-16 h-16 object-cover"
              src="/images/user-image.jpg"
            />
            <div
              v-else
              class="w-12 h-12 min-w-12 min-h-12 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <span class="text-white">
                {{ getAvatarInitials(manager?.full_name) }}
              </span>
            </div>
            <div class="text-14 text-squant font-semibold">
              <div class="text-black">{{ manager.full_name }}</div>
              <div class="font-medium">{{ manager.work_title_text }}</div>
            </div>
          </a>
          <div class="flex gap-x-2">
            <a
              v-if="manager?.phone"
              target="_blank"
              :href="`tel:${manager?.phone}`"
              class="flex items-center flex-1 justify-center text-14 font-medium gap-x-2 bg-white rounded-[10px] p-2 text-gamora"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0181 16.167 11.0631 13.0559C8.10812 9.94484 9.1907 8.80507 9.1907 8.80507L9.47752 8.50311C10.1841 7.75924 10.2507 6.56497 9.63424 5.6931L8.37326 3.90961C7.61028 2.8305 6.13596 2.68795 5.26145 3.60864L3.69185 5.26114C3.25823 5.71766 2.96765 6.30945 3.00289 6.96594C3.09304 8.64546 3.81071 12.259 7.81536 16.4752C12.0621 20.9462 16.0468 21.1239 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1672 13.7486 16.1858 13.8848 15.5562 14.5477Z"
                  fill="#0FBA00"
                />
                <path
                  d="M13.2595 1.87983C13.3257 1.47094 13.7122 1.19357 14.1211 1.25976C14.1464 1.26461 14.2279 1.27983 14.2705 1.28933C14.3559 1.30834 14.4749 1.33759 14.6233 1.38082C14.9201 1.46726 15.3347 1.60967 15.8323 1.8378C16.8286 2.29456 18.1544 3.09356 19.5302 4.46936C20.906 5.84516 21.705 7.17097 22.1617 8.16725C22.3899 8.66487 22.5323 9.07947 22.6187 9.37625C22.6619 9.52466 22.6912 9.64369 22.7102 9.72901C22.7197 9.77168 22.7267 9.80594 22.7315 9.83125L22.7373 9.86245C22.8034 10.2713 22.5286 10.6739 22.1197 10.7401C21.712 10.8061 21.3279 10.53 21.2601 10.1231C21.258 10.1121 21.2522 10.0828 21.2461 10.0551C21.2337 9.9997 21.2124 9.91188 21.1786 9.79572C21.1109 9.56339 20.9934 9.21806 20.7982 8.79238C20.4084 7.94207 19.7074 6.76789 18.4695 5.53002C17.2317 4.29216 16.0575 3.59117 15.2072 3.20134C14.7815 3.00618 14.4362 2.88865 14.2038 2.82097C14.0877 2.78714 13.9417 2.75363 13.8863 2.7413C13.4793 2.67347 13.1935 2.28755 13.2595 1.87983Z"
                  fill="#0FBA00"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4856 5.32931C13.5994 4.93103 14.0145 4.70041 14.4128 4.8142L14.2068 5.53535C14.4128 4.8142 14.4128 4.8142 14.4128 4.8142L14.4143 4.81462L14.4158 4.81507L14.4191 4.81603L14.4269 4.81835L14.4467 4.82452C14.4617 4.82934 14.4806 4.83562 14.503 4.84359C14.5479 4.85953 14.6073 4.88219 14.6801 4.91339C14.8258 4.97583 15.0248 5.07224 15.2694 5.21695C15.7588 5.50663 16.427 5.98781 17.212 6.77278C17.997 7.55777 18.4781 8.22594 18.7678 8.71541C18.9125 8.95992 19.0089 9.15898 19.0714 9.30467C19.1026 9.37747 19.1253 9.43684 19.1412 9.48175C19.1492 9.5042 19.1554 9.52302 19.1603 9.5381L19.1664 9.5579L19.1687 9.56564L19.1697 9.56897L19.1701 9.57052C19.1701 9.57052 19.1706 9.57195 18.4494 9.77799L19.1706 9.57196C19.2844 9.97023 19.0537 10.3853 18.6555 10.4991C18.2606 10.6119 17.8491 10.3862 17.7312 9.99414L17.7275 9.98336C17.7222 9.96833 17.7112 9.93876 17.6927 9.89556C17.6557 9.80922 17.5886 9.66798 17.477 9.47939C17.254 9.10265 16.8513 8.5334 16.1513 7.83344C15.4514 7.13349 14.8821 6.7308 14.5054 6.50783C14.3168 6.39621 14.1756 6.3291 14.0892 6.2921C14.046 6.27359 14.0164 6.26255 14.0014 6.25722L13.9906 6.25354C13.5986 6.13566 13.3728 5.7242 13.4856 5.32931Z"
                  fill="#0FBA00"
                />
              </svg>

              Arama Yap
            </a>
            <a
              v-if="manager?.phone"
              target="_blank"
              :href="`https://wa.me/${user?.phone}`"
              class="flex items-center flex-1 justify-center text-14 font-medium gap-x-2 bg-white rounded-[10px] p-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2083_227)">
                  <path
                    d="M19.0701 4.92999C17.4293 3.27849 15.2638 2.2512 12.9467 2.02523C10.6297 1.79926 8.30647 2.38877 6.3775 3.69212C4.44854 4.99548 3.03475 6.931 2.37988 9.165C1.72501 11.399 1.87009 13.7915 2.79012 15.93C2.88601 16.1288 2.91747 16.3525 2.88012 16.57L2.00012 20.8C1.96621 20.9622 1.97314 21.1302 2.02027 21.2891C2.06739 21.4479 2.15325 21.5925 2.27012 21.71C2.36592 21.8051 2.47999 21.8798 2.60545 21.9297C2.73091 21.9795 2.86516 22.0034 3.00012 22H3.20012L7.48012 21.14C7.69765 21.1138 7.91824 21.1449 8.12012 21.23C10.2586 22.15 12.6511 22.2951 14.8851 21.6402C17.1191 20.9854 19.0546 19.5716 20.358 17.6426C21.6613 15.7136 22.2508 13.3904 22.0249 11.0734C21.7989 8.75635 20.7716 6.59078 19.1201 4.94999L19.0701 4.92999ZM8.00012 13C7.80234 13 7.609 12.9413 7.44455 12.8315C7.2801 12.7216 7.15193 12.5654 7.07624 12.3827C7.00055 12.2 6.98075 11.9989 7.01933 11.8049C7.05792 11.6109 7.15316 11.4327 7.29301 11.2929C7.43286 11.153 7.61105 11.0578 7.80503 11.0192C7.99901 10.9806 8.20008 11.0004 8.3828 11.0761C8.56553 11.1518 8.72171 11.28 8.83159 11.4444C8.94147 11.6089 9.00012 11.8022 9.00012 12C9.00012 12.2652 8.89476 12.5196 8.70722 12.7071C8.51969 12.8946 8.26533 13 8.00012 13ZM12.0001 13C11.8023 13 11.609 12.9413 11.4445 12.8315C11.2801 12.7216 11.1519 12.5654 11.0762 12.3827C11.0006 12.2 10.9807 11.9989 11.0193 11.8049C11.0579 11.6109 11.1532 11.4327 11.293 11.2929C11.4329 11.153 11.611 11.0578 11.805 11.0192C11.999 10.9806 12.2001 11.0004 12.3828 11.0761C12.5655 11.1518 12.7217 11.28 12.8316 11.4444C12.9415 11.6089 13.0001 11.8022 13.0001 12C13.0001 12.2652 12.8948 12.5196 12.7072 12.7071C12.5197 12.8946 12.2653 13 12.0001 13ZM16.0001 13C15.8023 13 15.609 12.9413 15.4445 12.8315C15.2801 12.7216 15.1519 12.5654 15.0762 12.3827C15.0006 12.2 14.9807 11.9989 15.0193 11.8049C15.0579 11.6109 15.1532 11.4327 15.293 11.2929C15.4329 11.153 15.611 11.0578 15.805 11.0192C15.999 10.9806 16.2001 11.0004 16.3828 11.0761C16.5655 11.1518 16.7217 11.28 16.8316 11.4444C16.9415 11.6089 17.0001 11.8022 17.0001 12C17.0001 12.2652 16.8948 12.5196 16.7072 12.7071C16.5197 12.8946 16.2653 13 16.0001 13Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2083_227">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Mesaj Gönder
            </a>
          </div>
        </template>
      </div>

      <template v-if="userId === storeUser?._id">
        <div class="flex flex-col gap-y-2 p-2">
          <div class="font-semibold ps-2">İş Deneyimleri</div>
          <div
            v-for="(experience, index) in user?.personel_experiences"
            :key="index"
            class="flex items-center bg-white rounded-20 py-3 px-4 gap-x-[18px] mb-1 last:mb-0"
          >
            <div class="text-[13px] text-squant font-semibold">
              <div class="text-black">{{ experience?.company_title }}</div>
              <div class="text-black text-12">{{ experience?.work_title }}</div>
              <div class="text-12">
                {{ new Date(experience?.start_date).toLocaleDateString('tr-TR') }} -
                {{ new Date(experience?.end_date).toLocaleDateString('tr-TR') }}
              </div>
            </div>
          </div>
          <div
            v-if="!user?.personel_experiences || user?.personel_experiences.length === 0"
            class="bg-white rounded-20 py-3 px-4 text-center text-gray-500 text-xs"
          >
            Bulunamadı
          </div>
        </div>

        <div class="flex flex-col gap-y-2 p-2">
          <div class="font-semibold ps-2">Eğitimler</div>

          <template v-for="education in user?.personel_schools" :key="education.id">
            <div
              class="flex items-center bg-white rounded-20 py-3 px-4 gap-x-[18px] mb-1 last:mb-0"
            >
              <div class="text-12 text-squant font-semibold">
                <div class="text-black text-[13px]">
                  {{ education.school_title ? education.school_title : 'Okul Bilgisi Yok' }}
                </div>
                <div class="font-medium">
                  {{ education.education_section }} - {{ education.description }}
                </div>
                <div class="font-medium">
                  {{ new Date(education.start_date).toLocaleDateString('tr-TR') }} -
                  {{ new Date(education.end_date).toLocaleDateString('tr-TR') }}
                </div>
              </div>
            </div>
          </template>
          <div
            v-if="!user?.personel_schools || user?.personel_schools.length === 0"
            class="bg-white rounded-20 py-3 px-4 text-center text-gray-500 text-xs"
          >
            Bulunamadı
          </div>
        </div>

        <div class="flex flex-col gap-y-2 p-2">
          <div class="font-semibold ps-2">Sertifikalar</div>

          <template v-for="education in user?.personel_educations" :key="education.id">
            <div
              class="flex items-center bg-white rounded-20 py-3 px-4 gap-x-[18px] mb-1 last:mb-0"
            >
              <div class="text-12 text-squant font-semibold">
                <div class="text-black text-[13px]">{{ education.title }}</div>
                <div class="font-medium">
                  {{ new Date(education.start_date).toLocaleDateString('tr-TR') }} -
                  {{ new Date(education.end_date).toLocaleDateString('tr-TR') }}
                </div>
              </div>
            </div>
          </template>
          <div
            v-if="!user?.personel_educations || user?.personel_educations.length === 0"
            class="bg-white rounded-20 py-3 px-4 text-center text-gray-500 text-xs"
          >
            Bulunamadı
          </div>
        </div>

        <div class="flex flex-col gap-y-1 p-2">
          <div class="flex items-center justify-between font-semibold px-2">Yabancı Diller</div>
          <div class="flex flex-col gap-2 bg-white rounded-2xl overflow-hidden">
            <table
              v-if="user?.personel_langs && user?.personel_langs.length > 0"
              class="table-auto w-full text-xs"
            >
              <thead>
                <tr>
                  <th class="p-2 font-semibold border">Dil</th>
                  <th class="p-2 font-semibold border">Okuma</th>
                  <th class="p-2 font-semibold border">Yazma</th>
                  <th class="p-2 font-semibold border">Konuşma</th>
                  <th class="p-2 font-semibold border">Dinleme</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lang in user?.personel_langs" :key="lang.title">
                  <td class="border p-2 text-center">{{ lang.title }}</td>
                  <td class="border p-2 text-center">{{ lang.reading }}</td>
                  <td class="border p-2 text-center">{{ lang.writing }}</td>
                  <td class="border p-2 text-center">{{ lang.speaking }}</td>
                  <td class="border p-2 text-center">{{ lang.listening }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-if="!user?.personel_langs || user?.personel_langs.length === 0"
            class="bg-white rounded-2xl py-3 px-4 text-center text-gray-500 text-xs"
          >
            Bulunamadı
          </div>
        </div>
        <div class="flex flex-col gap-y-[10px] p-2">
          <div class="flex items-center justify-between font-semibold px-2">Ödüller</div>
          <template v-for="reward in user?.personel_rewards_and_punishments" :key="reward.id">
            <div
              class="flex items-center bg-white rounded-20 py-3 px-4 gap-x-[18px] mb-1 last:mb-0"
            >
              <div class="text-12 text-squant font-semibold">
                <div class="text-black text-[13px]">{{ reward.type }}</div>
                <div class="font-medium">
                  {{ reward.action }},
                  {{ new Date(reward.document_date).toLocaleDateString('tr-TR') }}
                </div>
              </div>
            </div>
          </template>
          <div
            v-if="
              !user?.personel_rewards_and_punishments ||
              user?.personel_rewards_and_punishments.length === 0
            "
            class="bg-white rounded-20 py-3 px-4 text-center text-gray-500 text-xs"
          >
            Bulunamadı
          </div>
        </div>

        <div class="flex flex-col gap-y-2 p-2">
          <div class="font-semibold ps-2">Sertifikalar</div>

          <template v-for="education in user?.personel_educations" :key="education.id">
            <div
              class="flex items-center bg-white rounded-20 py-3 px-4 gap-x-[18px] mb-1 last:mb-0"
            >
              <div class="text-12 text-squant font-semibold">
                <div class="text-black text-[13px]">{{ education.title }}</div>
                <div class="font-medium">
                  {{ new Date(education.start_date).toLocaleDateString('tr-TR') }} -
                  {{ new Date(education.end_date).toLocaleDateString('tr-TR') }}
                </div>
              </div>
            </div>
          </template>
          <div
            v-if="!user?.personel_educations || user?.personel_educations.length === 0"
            class="bg-white rounded-20 py-3 px-4 text-center text-gray-500 text-xs"
          >
            Bulunamadı
          </div>
        </div>
        <div class="flex flex-col gap-y-[10px] p-2">
          <div class="flex items-center justify-between font-semibold px-2">Kişisel Bilgiler</div>

          <div class="grid grid-cols-2 gap-4 p-2 bg-white rounded-xl">
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Telefon:</div>
              <div class="font-medium">{{ user?.phone ? `+90 ${user?.phone}` : '' }}</div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Senior Tarih:</div>
              <div class="font-medium">
                {{ new Date(user?.senior_date).toLocaleDateString('tr-TR') }}
              </div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Soyadı:</div>
              <div class="font-medium">{{ user?.surname }}</div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">TC No:</div>
              <div class="font-medium">{{ user?.tc_no }}</div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Çalışma Bitiş Tarihi:</div>
              <div class="font-medium">
                {{ new Date(user?.work_end_date).toLocaleDateString('tr-TR') }}
              </div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Çalışma Başlangıç Tarihi:</div>
              <div class="font-medium">
                {{ new Date(user?.work_start_date).toLocaleDateString('tr-TR') }}
              </div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Çalışma Ünvanı:</div>
              <div class="font-medium">{{ user?.work_title }}</div>
            </div>
            <div class="text-12 text-squant font-semibold">
              <div class="text-black text-[13px]">Çalışma Ünvanı Metni:</div>
              <div class="font-medium">{{ user?.work_title_text }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <BottomNavigation />
  </div>
</template>
