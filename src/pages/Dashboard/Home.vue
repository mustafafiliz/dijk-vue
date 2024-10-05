<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import InfoSlider from '@/components/InfoSlider/Index.vue'
import InfoSliderItemVacation from '@/components/InfoSlider/Item/Vacation.vue'
import InfoSliderItemUpcomingEvent from '@/components/InfoSlider/Item/UpcomingEvent.vue'
import InfoSliderItemUserData from '@/components/InfoSlider/Item/UserData.vue'
import InfoSliderItemUpcomingBirthday from '@/components/InfoSlider/Item/UpcomingBirthday.vue'
import InfoSliderItemUpcomingHoliday from '@/components/InfoSlider/Item/UpcomingHoliday.vue'
import InfoSliderItemUpcomingVacation from '@/components/InfoSlider/Item/UpcomingVacation.vue'
import InfoSliderItemOvertimeRequest from '@/components/InfoSlider/Item/OvertimeRequest.vue'
import WeatcherCard from '@/components/WeatcherCard.vue'
</script>

<template>
  <div
    class="flex flex-col h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto"
  >
    <div class="p-4 flex-1">
      <div class="flex items-center">
        <img class="me-auto" src="/images/logo.png" alt="" />

        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.9432 29.9984C36.8265 29.8577 36.7119 29.7171 36.5994 29.5814C35.0525 27.7104 34.1167 26.5812 34.1167 21.2845C34.1167 18.5423 33.4606 16.2923 32.1676 14.6048C31.2142 13.3582 29.9253 12.4125 28.2266 11.7136C28.2047 11.7014 28.1852 11.6855 28.1689 11.6665C27.5579 9.62039 25.8859 8.25 24.0001 8.25C22.1143 8.25 20.443 9.62039 19.832 11.6644C19.8157 11.6827 19.7964 11.6981 19.775 11.7101C15.8108 13.342 13.8842 16.473 13.8842 21.2824C13.8842 26.5812 12.9498 27.7104 11.4015 29.5793C11.289 29.715 11.1744 29.8528 11.0577 29.9962C10.7562 30.3598 10.5651 30.8022 10.5072 31.271C10.4493 31.7398 10.5268 32.2153 10.7307 32.6414C11.1645 33.5555 12.0892 34.1229 13.1445 34.1229H34.8634C35.9138 34.1229 36.8321 33.5562 37.2674 32.6463C37.4721 32.2201 37.5504 31.7442 37.493 31.2749C37.4355 30.8056 37.2447 30.3626 36.9432 29.9984Z"
            fill="#292D32"
          />
          <path
            d="M24.0001 39.75C25.0162 39.7492 26.013 39.4734 26.885 38.9518C27.757 38.4303 28.4716 37.6825 28.9529 36.7877C28.9756 36.7449 28.9868 36.6968 28.9854 36.6483C28.9841 36.5999 28.9702 36.5525 28.9452 36.511C28.9201 36.4695 28.8847 36.4351 28.8425 36.4113C28.8002 36.3875 28.7525 36.375 28.704 36.375H19.2976C19.2491 36.3748 19.2013 36.3872 19.1589 36.411C19.1166 36.4348 19.0811 36.4691 19.056 36.5107C19.0308 36.5523 19.0169 36.5996 19.0155 36.6482C19.0141 36.6967 19.0253 36.7448 19.048 36.7877C19.5293 37.6824 20.2438 38.4301 21.1156 38.9517C21.9875 39.4732 22.9842 39.7491 24.0001 39.75Z"
            fill="#292D32"
          />
          <circle cx="32" cy="14" r="8" fill="#FF5555" />
          <path
            d="M32.9766 9.87109V17H31.6826V11.3799L29.9688 11.9463V10.9014L32.8301 9.87109H32.9766Z"
            fill="white"
          />
        </svg>

        <img src="/images/user-avatar.png" alt="" />
      </div>

      <div class="mt-4">
        <WeatcherCard />

        <div class="flex items-center gap-x-2 mt-4">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="8" fill="#FF8000" />
            <g clip-path="url(#clip0_280_4126)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.2597 18.9H21.5597C20.0683 18.9 18.9 20.1168 18.9 21.6081V24.3081C18.9 25.7994 20.0683 27 21.5597 27H24.2597C25.7511 27 27 25.7994 27 24.3081V21.6081C27 20.1168 25.7511 18.9 24.2597 18.9ZM14.3597 18.9H11.6597C10.1683 18.9 9 20.1168 9 21.6081V24.3081C9 25.7994 10.1683 27 11.6597 27H14.3597C15.8511 27 17.1 25.7994 17.1 24.3081V21.6081C17.1 20.1168 15.8511 18.9 14.3597 18.9ZM24.2597 9H21.5597C20.0683 9 18.9 10.2168 18.9 11.7081V14.4081C18.9 15.8994 20.0683 17.1 21.5597 17.1H24.2597C25.7511 17.1 27 15.8994 27 14.4081V11.7081C27 10.2168 25.7511 9 24.2597 9ZM14.3597 9H11.6597C10.1683 9 9 10.2168 9 11.7081V14.4081C9 15.8994 10.1683 17.1 11.6597 17.1H14.3597C15.8511 17.1 17.1 15.8994 17.1 14.4081V11.7081C17.1 10.2168 15.8511 9 14.3597 9Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_280_4126">
                <rect width="18" height="18" fill="white" transform="translate(9 9)" />
              </clipPath>
            </defs>
          </svg>

          <span class="text-[18px] font-semibold"> Hızlı Alanım </span>
        </div>

        <!-- quick actions -->
        <div class="flex gap-x-[10px] -mx-4 px-4 mt-3 overflow-x-auto">
          <div
            class="flex flex-col items-center justify-center gap-y-2 bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] h-24 min-w-24 px-1 shrink-0"
          >
            <img src="/images/izin.svg" alt="" />
            <span class="font-semibold text-night-sky"> İzin </span>
          </div>

          <div
            class="flex flex-col items-center justify-center gap-y-2 bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] h-24 min-w-24 px-1 shrink-0"
          >
            <img src="/images/surecler.svg" alt="" />
            <span class="font-semibold text-night-sky"> Süreçler </span>
          </div>

          <div
            class="flex flex-col items-center justify-center gap-y-2 bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] h-24 min-w-24 px-1 shrink-0"
          >
            <img src="/images/avans.svg" alt="" />
            <span class="font-semibold text-night-sky"> Avans </span>
          </div>

          <div
            class="flex flex-col items-center justify-center gap-y-2 bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] h-24 min-w-24 px-1 shrink-0"
          >
            <img src="/images/harcama.svg" alt="" />
            <span class="font-semibold text-night-sky"> Harcamalar </span>
          </div>

          <div
            class="flex flex-col items-center justify-center gap-y-2 bg-white rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.05)] h-24 min-w-24 px-1 shrink-0"
          >
            <img src="/images/ayarlar.svg" alt="" />
            <span class="font-semibold text-night-sky"> Ayarlar </span>
          </div>
        </div>
        <!-- quick actions -->

        <InfoSlider class="mt-4">
          <template #slide0>
            <InfoSliderItemVacation
              total-annual-leave="14"
              remaining-annual-leave="11"
              annual-leave-end-date="11.11.2011"
            />
          </template>
          <template #slide1>
            <InfoSliderItemVacation
              total-annual-leave="14"
              remaining-annual-leave="5"
              annual-leave-end-date="11.11.2011"
              :current-vacation="{ startDate: '01.01.2021', endDate: '01.01.2021', type: 'Yıllık' }"
            />
          </template>
          <template #slide2>
            <InfoSliderItemUpcomingEvent
              :upcoming-events="[
                {
                  startDate: '01.01.2021',
                  endDate: '01.01.2021',
                  title: 'İnsan Kaynakları uygulaması hakkında toplantı.'
                },
                {
                  startDate: '01.01.2021',
                  endDate: '01.01.2021',
                  title: 'İnsan Kaynakları uygulaması hakkında toplantı.'
                }
              ]"
            />
          </template>
          <template #slide3>
            <InfoSliderItemUpcomingEvent />
          </template>
          <template #slide4>
            <InfoSliderItemUserData
              :user-data="{
                name: 'Mehmet Yılmaz',
                startDate: '1 Nisan 2022',
                experience: '2 Yıl 4 Ay 25 Gün',
                jobTitle: 'CTO',
                company: 'ByteWave Inno...',
                workType: 'Tam Zamanlı'
              }"
            />
          </template>
        </InfoSlider>

        <InfoSlider class="mt-4">
          <template #slide0>
            <InfoSliderItemUpcomingBirthday />
          </template>
          <template #slide1>
            <InfoSliderItemUpcomingHoliday />
          </template>
        </InfoSlider>

        <InfoSlider class="mt-4">
          <template #slide0>
            <InfoSliderItemUpcomingVacation />
          </template>
          <template #slide1>
            <InfoSliderItemOvertimeRequest />
          </template>
        </InfoSlider>
      </div>
    </div>
    <BottomNavigation />
  </div>
</template>
