<script setup>
import BottomNavigation from '@/components/BottomNavigation.vue'
import InfoSlider from '@/components/InfoSlider/Index.vue'
import InfoSliderHeader from '@/components/InfoSlider/Header.vue'
import InfoSliderItemVacation from '@/components/InfoSlider/Item/Vacation.vue'
import InfoSliderItemUpcomingEvent from '@/components/InfoSlider/Item/UpcomingEvent.vue'
import InfoSliderItemUserData from '@/components/InfoSlider/Item/UserData.vue'
import InfoSliderItemUpcomingBirthday from '@/components/InfoSlider/Item/UpcomingBirthday.vue'
import InfoSliderItemUpcomingHoliday from '@/components/InfoSlider/Item/UpcomingHoliday.vue'
import InfoSliderItemUpcomingVacation from '@/components/InfoSlider/Item/UpcomingVacation.vue'
import InfoSliderItemOvertimeRequest from '@/components/InfoSlider/Item/OvertimeRequest.vue'
import WeatcherCard from '@/components/WeatcherCard.vue'
import VideoBox from '@/components/VideoBox.vue'
import QuickActions from '@/components/QıickActions.vue'
</script>

<template>
  <div
    class="flex flex-col max-md:h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white overflow-y-auto md:flex-row-reverse md:justify-center"
  >
    <div class="p-4 flex-1 max-w-5xl">
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

        <Link to="/dashboard/profile" class="flex w-10 h-10">
          <img src="/images/user-avatar.png" alt="" />
        </Link>
      </div>

      <div class="mt-4 flex flex-col gap-4 md:grid md:grid-cols-2">
        <div class="col-span-2 flex justify-center">
          <WeatcherCard class="order-1" />
        </div>
        <div class="order-2 md:order-3 md:col-span-2">
          <div class="flex items-center gap-x-2 mb-4">
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

          <QuickActions />
        </div>

        <InfoSlider class="order-3">
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

        <InfoSlider class="order-4">
          <template #slide0>
            <InfoSliderItemUpcomingBirthday />
          </template>
          <template #slide1>
            <InfoSliderItemUpcomingHoliday />
          </template>
        </InfoSlider>

        <InfoSlider class="order-5">
          <template #slide0>
            <InfoSliderItemUpcomingVacation />
          </template>
          <template #slide1>
            <InfoSliderItemOvertimeRequest />
          </template>
        </InfoSlider>

        <InfoSlider class="order-6">
          <template #slide0>
            <InfoSliderHeader title="Eğitimler">
              <template #icon>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="8" fill="#FF5454" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.9948 13.9878H15.0052C11.9678 13.9878 10.4492 13.9878 9.59609 14.8759C8.74302 15.7641 8.94373 17.1363 9.34516 19.8806L9.72583 22.483C10.0406 24.6351 10.198 25.7111 11.0055 26.3555C11.813 26.9999 13.0039 26.9999 15.3858 26.9999H20.6141C22.9961 26.9999 24.1871 26.9999 24.9945 26.3555C25.802 25.7111 25.9593 24.6351 26.2742 22.483L26.6549 19.8806C27.0563 17.1363 27.257 15.7641 26.4039 14.8759C25.5508 13.9878 24.0322 13.9878 20.9948 13.9878ZM20.3231 21.4148C20.8256 21.1032 20.8256 20.2967 20.3231 19.9851L17.2886 18.104C16.8002 17.8013 16.2 18.1954 16.2 18.8188V22.5811C16.2 23.2045 16.8002 23.5986 17.2886 23.2959L20.3231 21.4148Z"
                    fill="white"
                  />
                  <path
                    opacity="0.4"
                    d="M14.8585 9.00001H21.1406C21.3498 8.99995 21.5103 8.99992 21.6505 9.01363C22.6475 9.11117 23.4636 9.71062 23.8097 10.5181H12.1895C12.5355 9.71062 13.3516 9.11117 14.3486 9.01363C14.4889 8.99992 14.6493 8.99995 14.8585 9.00001Z"
                    fill="white"
                  />
                  <path
                    opacity="0.7"
                    d="M12.8791 11.4504C11.6275 11.4504 10.6013 12.2062 10.2588 13.2089C10.2517 13.2297 10.2448 13.2508 10.2383 13.2719C10.5966 13.1634 10.9695 13.0925 11.3471 13.0441C12.3194 12.9194 13.5482 12.9195 14.9756 12.9196H21.1785C22.6059 12.9195 23.8348 12.9194 24.8071 13.0441C25.1846 13.0925 25.5576 13.1634 25.9159 13.2719C25.9094 13.2508 25.9024 13.2297 25.8953 13.2089C25.5529 12.2062 24.5266 11.4504 23.2751 11.4504H12.8791Z"
                    fill="white"
                  />
                </svg>
              </template>
            </InfoSliderHeader>

            <div class="flex gap-x-2 flex-1 overflow-x-auto mt-2 -mb-[18px]">
              <VideoBox title="Siber Güvenlik Eğitimi" thumbnail="/images/videobox.jpg" />
              <VideoBox title="Siber Güvenlik Eğitimi" thumbnail="/images/videobox.jpg" />
              <VideoBox title="Siber Güvenlik Eğitimi" thumbnail="/images/videobox.jpg" />
            </div>
          </template>
        </InfoSlider>
      </div>
    </div>

    <BottomNavigation />
  </div>
</template>
