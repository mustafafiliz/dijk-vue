<template>
  <div
    v-if="showQuickMenu"
    class="fixed inset-0 bg-black/30 z-20"
    @click="showQuickMenu = false"
  ></div>

  <div
    v-if="showQuickMenu"
    class="fixed bottom-[108px] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-4 z-30 w-auto after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px] after:border-t-white"
  >
    <div class="flex flex-col gap-3">
      <RouterLink
        v-for="link in quickLinks"
        :key="link.path"
        :to="link.path"
        class="flex items-center text-night-sky hover:text-gentian-flower"
        @click="showQuickMenu = false"
      >
        <span class="text-xs font-medium">{{ link.title }}</span>
      </RouterLink>
    </div>
  </div>
  <div
    class="md:hidden h-[60px] min-h-[55px] flex md:top-5 sticky left-0 bottom-0 w-full z-10 mt-5"
  >
    <CurvedBottomNavigation
      :key="meStore"
      foreground-color="#008CFF"
      :options="navigationOptions"
      v-model="selected"
      color="#4b5563"
    >
      <template #icon="{ props }">
        <svg
          v-show="props.id === 1"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.90244 7.54994C0.253888 8.90275 0.481552 10.485 0.93688 13.6495L1.2714 15.9742C1.8563 20.0392 2.14875 22.0717 3.55883 23.2858C4.9689 24.5 7.03684 24.5 11.1727 24.5H13.8273C17.9631 24.5 20.0311 24.5 21.4412 23.2858C22.8512 22.0717 23.1436 20.0392 23.7286 15.9742L24.0631 13.6495C24.5185 10.485 24.7461 8.90275 24.0975 7.54994C23.449 6.19712 22.0686 5.37481 19.3077 3.73017L17.6458 2.74024C15.1388 1.24675 13.8852 0.5 12.5 0.5C11.1148 0.5 9.86125 1.24675 7.3541 2.74024L5.69229 3.73017C2.93142 5.37481 1.55099 6.19712 0.90244 7.54994ZM8.00012 19.6998C8.00012 19.2027 8.40307 18.7998 8.90012 18.7998H16.1001C16.5972 18.7998 17.0001 19.2027 17.0001 19.6998C17.0001 20.1968 16.5972 20.5998 16.1001 20.5998H8.90012C8.40307 20.5998 8.00012 20.1968 8.00012 19.6998Z"
            :fill="selected === props.id ? '#2F69FF' : '#292D32'"
          />
        </svg>

        <svg
          v-show="props.id === 2"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.833252"
            y="0.5"
            width="24"
            height="24"
            rx="8"
            :fill="selected === props.id ? '#2F69FF' : '#292D32'"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0064 13.1H15.2064C14.2121 13.1 13.4333 13.9112 13.4333 14.9054V16.7054C13.4333 17.6996 14.2121 18.5 15.2064 18.5H17.0064C18.0007 18.5 18.8333 17.6996 18.8333 16.7054V14.9054C18.8333 13.9112 18.0007 13.1 17.0064 13.1ZM10.4064 13.1H8.60639C7.61211 13.1 6.83325 13.9112 6.83325 14.9054V16.7054C6.83325 17.6996 7.61211 18.5 8.60639 18.5H10.4064C11.4007 18.5 12.2333 17.6996 12.2333 16.7054V14.9054C12.2333 13.9112 11.4007 13.1 10.4064 13.1ZM17.0064 6.5H15.2064C14.2121 6.5 13.4333 7.3112 13.4333 8.3054V10.1054C13.4333 11.0996 14.2121 11.9 15.2064 11.9H17.0064C18.0007 11.9 18.8333 11.0996 18.8333 10.1054V8.3054C18.8333 7.3112 18.0007 6.5 17.0064 6.5ZM10.4064 6.5H8.60639C7.61211 6.5 6.83325 7.3112 6.83325 8.3054V10.1054C6.83325 11.0996 7.61211 11.9 8.60639 11.9H10.4064C11.4007 11.9 12.2333 11.0996 12.2333 10.1054V8.3054C12.2333 7.3112 11.4007 6.5 10.4064 6.5Z"
            fill="white"
          />
        </svg>

        <svg
          v-show="props.id === 3"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 2.5V22.5M22.5 12.5H2.5"
            stroke-width="2"
            stroke-linecap="round"
            :stroke="selected === props.id ? '#2F69FF' : '#292D32'"
          />
        </svg>

        <svg
          v-show="props.id === 4"
          width="23"
          height="25"
          viewBox="0 0 23 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.874821 8.62681C0.807358 7.28705 1.16177 5.96368 1.87896 4.85409L2.06578 4.58126L2.08122 4.56631L2.21092 4.41412L2.3468 4.25872L2.36224 4.24271C2.62164 3.97678 2.90883 3.74289 3.21866 3.54317L3.30616 3.48777L3.39365 3.43637L3.59952 3.31783C3.6829 3.27831 3.77348 3.23132 3.85686 3.1918C3.91759 3.16831 3.97833 3.13733 4.03906 3.11384C4.15332 3.06578 4.27478 3.01879 4.39624 2.97927C4.43742 2.95898 4.48065 2.94296 4.52491 2.93228L4.57406 2.91252L4.62785 2.89276C5.18164 2.72723 5.75087 2.61295 6.32628 2.56062L6.2667 2.5676V1.37404C6.2667 0.895468 6.65273 0.508518 7.13016 0.508518C7.60759 0.508518 7.9947 0.895468 7.9947 1.37404V5.14653C7.9947 5.62509 7.60759 6.01312 7.13016 6.01312C6.65273 6.01312 6.2667 5.62509 6.2667 5.14653L6.26676 4.27435C5.69994 4.3311 5.14337 4.47214 4.6155 4.69553C3.2533 5.30835 2.60364 6.47538 2.54208 8.32483L2.53723 8.62254V9.08711H20.797V8.61079C20.832 7.75426 20.66 6.902 20.2957 6.13198C19.9457 5.47303 19.3857 4.96146 18.7094 4.68379C18.2787 4.49838 17.8276 4.36903 17.3666 4.29845L17.0667 4.262L17.0667 5.14217C17.0667 5.61868 16.6801 6.00462 16.2027 6.00462C15.7254 6.00462 15.3387 5.61868 15.3387 5.14217L15.3387 4.1972L8.0031 4.19785V2.48159L15.3387 2.4812L15.3387 1.36896C15.3344 0.892455 15.7189 0.503275 16.1963 0.50002C16.6736 0.496806 17.0635 0.879518 17.0667 1.35602L17.0674 2.56096C17.4867 2.60233 17.9025 2.67547 18.3118 2.77997L18.7187 2.8949C18.7516 2.90131 18.7763 2.90985 18.8216 2.92587C18.8669 2.94189 18.905 2.95791 18.9503 2.97286C19.0707 3.01238 19.1829 3.05937 19.2992 3.10743C19.3661 3.13093 19.4279 3.1619 19.4804 3.18539C19.571 3.22491 19.6636 3.2719 19.7377 3.31142C19.8139 3.35093 19.887 3.39472 19.9508 3.42996C20.0146 3.46521 20.0641 3.50472 20.1176 3.53676C20.3507 3.68735 20.5723 3.85716 20.7792 4.04394L20.9812 4.2363L20.9905 4.25232L21.1316 4.4021L21.2643 4.5599L21.2715 4.57485C22.0478 5.64843 22.4653 6.95224 22.4667 8.28803L22.4583 8.62254V9.08711H22.4667V18.3922C22.4667 22.4499 20.2006 24.5 15.7096 24.5H7.61348C3.13279 24.5 0.866699 22.4499 0.866699 18.3922V9.08711H0.874821V8.62681Z"
            :fill="selected === props.id ? '#2F69FF' : '#292D32'"
          />
        </svg>

        <svg
          v-show="props.id === 5"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.5 24.5C19.1276 24.5 24.5 19.1276 24.5 12.5C24.5 5.8724 19.1276 0.5 12.5 0.5C5.8724 0.5 0.5 5.8724 0.5 12.5C0.5 19.1276 5.8724 24.5 12.5 24.5ZM16.1 10.1C16.1 11.0548 15.7207 11.9705 15.0456 12.6456C14.3705 13.3207 13.4548 13.7 12.5 13.7C11.5452 13.7 10.6295 13.3207 9.95442 12.6456C9.27928 11.9705 8.9 11.0548 8.9 10.1C8.9 9.14522 9.27928 8.22955 9.95442 7.55442C10.6295 6.87928 11.5452 6.5 12.5 6.5C13.4548 6.5 14.3705 6.87928 15.0456 7.55442C15.7207 8.22955 16.1 9.14522 16.1 10.1ZM5.3 18.5C6.13761 17.3815 7.22452 16.4737 8.47438 15.8488C9.72424 15.2238 11.1026 14.899 12.5 14.9C13.8974 14.899 15.2758 15.2238 16.5256 15.8488C17.7755 16.4737 18.8624 17.3815 19.7 18.5C18.8624 19.6185 17.7755 20.5263 16.5256 21.1512C15.2758 21.7762 13.8974 22.101 12.5 22.1C11.1026 22.101 9.72424 21.7762 8.47438 21.1512C7.22452 20.5263 6.13761 19.6185 5.3 18.5Z"
            :fill="selected === props.id ? '#2F69FF' : '#292D32'"
          />
        </svg>
      </template>

      <template #title="{ props }">
        <span
          class="text-[10px] font-medium"
          :class="selected === props.id ? 'text-gentian-flower' : 'text-gray-800'"
        >
          {{ props.title }}
        </span>
      </template>

      <template #child-icon="{ props }">
        <img
          v-if="props.id === 301"
          src="/images/izin.svg"
          alt="İzin icon"
          width="20"
          height="20"
        />
        <img
          v-if="props.id === 302"
          src="/images/mesai.svg"
          alt="Mesai icon"
          width="20"
          height="20"
        />
        <img
          v-if="props.id === 303"
          src="/images/classifieds.png"
          alt="İlan icon"
          width="20"
          height="20"
        />
        <img
          v-if="props.id === 304"
          src="/images/avans.svg"
          alt="Avans icon"
          width="20"
          height="20"
        />
        <img
          v-if="props.id === 305"
          src="/images/harcama.svg"
          alt="Masraf icon"
          width="20"
          height="20"
        />
      </template>

      <template #child-title="{ props }">
        <span class="text-[10px] font-medium text-gray-800">{{ props.title }}</span>
      </template>
    </CurvedBottomNavigation>
  </div>
  <div
    class="hidden md:flex py-[10px] bg-white px-6 md:top-5 sticky left-0 bottom-0 w-full shadow-[0_0_4px_0_rgba(0,0,0,0.25)] z-10 h-fit md:flex-col md:w-auto md:min-w-52 md:mt-4 md:p-6 md:gap-y-4 md:rounded-b-20 md:rounded-t-20 ro md:before:hidden"
  >
    <RouterLink
      class="py-2 flex flex-col items-center flex-1 gap-1 md:flex-row"
      to="/dashboard/home"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.90244 7.54994C0.253888 8.90275 0.481552 10.485 0.93688 13.6495L1.2714 15.9742C1.8563 20.0392 2.14875 22.0717 3.55883 23.2858C4.9689 24.5 7.03684 24.5 11.1727 24.5H13.8273C17.9631 24.5 20.0311 24.5 21.4412 23.2858C22.8512 22.0717 23.1436 20.0392 23.7286 15.9742L24.0631 13.6495C24.5185 10.485 24.7461 8.90275 24.0975 7.54994C23.449 6.19712 22.0686 5.37481 19.3077 3.73017L17.6458 2.74024C15.1388 1.24675 13.8852 0.5 12.5 0.5C11.1148 0.5 9.86125 1.24675 7.3541 2.74024L5.69229 3.73017C2.93142 5.37481 1.55099 6.19712 0.90244 7.54994ZM8.00012 19.6998C8.00012 19.2027 8.40307 18.7998 8.90012 18.7998H16.1001C16.5972 18.7998 17.0001 19.2027 17.0001 19.6998C17.0001 20.1968 16.5972 20.5998 16.1001 20.5998H8.90012C8.40307 20.5998 8.00012 20.1968 8.00012 19.6998Z"
          :fill="$route.fullPath == '/dashboard/home' ? '#2F69FF' : '#292D32'"
        />
      </svg>
      <span
        class="text-[10px] text-gentian-flower font-semibold"
        :class="$route.fullPath == '/dashboard/home' ? 'text-gentian-flower' : 'text-night-sky'"
      >
        Ana Sayfa
      </span>
    </RouterLink>

    <RouterLink class="flex flex-col items-center flex-1 gap-1 md:flex-row" to="/dashboard/fields">
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.833252"
          y="0.5"
          width="24"
          height="24"
          rx="8"
          :fill="$route.fullPath == '/dashboard/fields' ? '#2F69FF' : '#292D32'"
        />
        <g clip-path="url(#clip0_2054_332)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0064 13.1H15.2064C14.2121 13.1 13.4333 13.9112 13.4333 14.9054V16.7054C13.4333 17.6996 14.2121 18.5 15.2064 18.5H17.0064C18.0007 18.5 18.8333 17.6996 18.8333 16.7054V14.9054C18.8333 13.9112 18.0007 13.1 17.0064 13.1ZM10.4064 13.1H8.60639C7.61211 13.1 6.83325 13.9112 6.83325 14.9054V16.7054C6.83325 17.6996 7.61211 18.5 8.60639 18.5H10.4064C11.4007 18.5 12.2333 17.6996 12.2333 16.7054V14.9054C12.2333 13.9112 11.4007 13.1 10.4064 13.1ZM17.0064 6.5H15.2064C14.2121 6.5 13.4333 7.3112 13.4333 8.3054V10.1054C13.4333 11.0996 14.2121 11.9 15.2064 11.9H17.0064C18.0007 11.9 18.8333 11.0996 18.8333 10.1054V8.3054C18.8333 7.3112 18.0007 6.5 17.0064 6.5ZM10.4064 6.5H8.60639C7.61211 6.5 6.83325 7.3112 6.83325 8.3054V10.1054C6.83325 11.0996 7.61211 11.9 8.60639 11.9H10.4064C11.4007 11.9 12.2333 11.0996 12.2333 10.1054V8.3054C12.2333 7.3112 11.4007 6.5 10.4064 6.5Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2054_332">
            <rect width="12" height="12" fill="white" transform="translate(6.83325 6.5)" />
          </clipPath>
        </defs>
      </svg>

      <span
        class="text-[10px] font-semibold"
        :class="$route.fullPath == '/dashboard/fields' ? 'text-gentian-flower' : 'text-night-sky'"
      >
        Alanım
      </span>
    </RouterLink>
    <RouterLink
      class="flex flex-col items-center flex-1 gap-1 md:flex-row"
      to="/dashboard/calendar"
    >
      <svg
        width="23"
        height="25"
        viewBox="0 0 23 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.874821 8.62681C0.807358 7.28705 1.16177 5.96368 1.87896 4.85409L2.06578 4.58126L2.08122 4.56631L2.21092 4.41412L2.3468 4.25872L2.36224 4.24271C2.62164 3.97678 2.90883 3.74289 3.21866 3.54317L3.30616 3.48777L3.39365 3.43637L3.59952 3.31783C3.6829 3.27831 3.77348 3.23132 3.85686 3.1918C3.91759 3.16831 3.97833 3.13733 4.03906 3.11384C4.15332 3.06578 4.27478 3.01879 4.39624 2.97927C4.43742 2.95898 4.48065 2.94296 4.52491 2.93228L4.57406 2.91252L4.62785 2.89276C5.18164 2.72723 5.75087 2.61295 6.32628 2.56062L6.2667 2.5676V1.37404C6.2667 0.895468 6.65273 0.508518 7.13016 0.508518C7.60759 0.508518 7.9947 0.895468 7.9947 1.37404V5.14653C7.9947 5.62509 7.60759 6.01312 7.13016 6.01312C6.65273 6.01312 6.2667 5.62509 6.2667 5.14653L6.26676 4.27435C5.69994 4.3311 5.14337 4.47214 4.6155 4.69553C3.2533 5.30835 2.60364 6.47538 2.54208 8.32483L2.53723 8.62254V9.08711H20.797V8.61079C20.832 7.75426 20.66 6.902 20.2957 6.13198C19.9457 5.47303 19.3857 4.96146 18.7094 4.68379C18.2787 4.49838 17.8276 4.36903 17.3666 4.29845L17.0667 4.262L17.0667 5.14217C17.0667 5.61868 16.6801 6.00462 16.2027 6.00462C15.7254 6.00462 15.3387 5.61868 15.3387 5.14217L15.3387 4.1972L8.0031 4.19785V2.48159L15.3387 2.4812L15.3387 1.36896C15.3344 0.892455 15.7189 0.503275 16.1963 0.50002C16.6736 0.496806 17.0635 0.879518 17.0667 1.35602L17.0674 2.56096C17.4867 2.60233 17.9025 2.67547 18.3118 2.77997L18.7187 2.8949C18.7516 2.90131 18.7763 2.90985 18.8216 2.92587C18.8669 2.94189 18.905 2.95791 18.9503 2.97286C19.0707 3.01238 19.1829 3.05937 19.2992 3.10743C19.3661 3.13093 19.4279 3.1619 19.4804 3.18539C19.571 3.22491 19.6636 3.2719 19.7377 3.31142C19.8139 3.35093 19.887 3.39472 19.9508 3.42996C20.0146 3.46521 20.0641 3.50472 20.1176 3.53676C20.3507 3.68735 20.5723 3.85716 20.7792 4.04394L20.9812 4.2363L20.9905 4.25232L21.1316 4.4021L21.2643 4.5599L21.2715 4.57485C22.0478 5.64843 22.4653 6.95224 22.4667 8.28803L22.4583 8.62254V9.08711H22.4667V18.3922C22.4667 22.4499 20.2006 24.5 15.7096 24.5H7.61348C3.13279 24.5 0.866699 22.4499 0.866699 18.3922V9.08711H0.874821V8.62681ZM16.6058 17.5955C16.0495 17.5955 15.6066 18.0523 15.6066 18.6153C15.6169 19.1783 16.0598 19.635 16.6058 19.635C17.1517 19.635 17.5946 19.1783 17.5946 18.6153C17.5946 18.0523 17.1517 17.5955 16.6058 17.5955ZM11.6718 17.5849C11.1156 17.5955 10.6727 18.0523 10.6727 18.6153C10.6727 19.1783 11.1259 19.635 11.6718 19.635C12.2178 19.635 12.6607 19.1783 12.6607 18.6047C12.6504 18.0523 12.2178 17.5955 11.6718 17.5849ZM6.72764 17.5849C6.17142 17.5849 5.7285 18.0523 5.7388 18.6153C5.7388 19.1783 6.18172 19.635 6.72764 19.635C7.27357 19.635 7.71649 19.1676 7.71649 18.6047C7.71649 18.0417 7.27357 17.5849 6.72764 17.5849ZM16.6058 13.2404C16.0495 13.2404 15.6169 13.6972 15.6169 14.2601C15.6169 14.8231 16.0598 15.2799 16.6058 15.2799C17.1517 15.2799 17.5946 14.8231 17.5946 14.2601C17.5946 13.6972 17.1517 13.2404 16.6058 13.2404ZM11.6718 13.2298C11.1156 13.2404 10.6727 13.6972 10.6727 14.2601C10.6727 14.8231 11.1259 15.2799 11.6718 15.2799C12.2178 15.2799 12.6607 14.8231 12.6607 14.2495C12.6607 13.6972 12.2178 13.2404 11.6718 13.2298ZM6.73794 13.2298C6.18172 13.2298 5.7388 13.6972 5.7388 14.2601C5.7388 14.8231 6.18172 15.2799 6.72764 15.2799C7.28387 15.2799 7.72679 14.8125 7.71649 14.2495C7.71649 13.6865 7.27357 13.2298 6.73794 13.2298Z"
          :fill="$route.fullPath == '/dashboard/calendar' ? '#2F69FF' : '#292D32'"
        />
      </svg>

      <span
        class="text-[10px] font-semibold"
        :class="$route.fullPath == '/dashboard/calendar' ? 'text-gentian-flower' : 'text-night-sky'"
      >
        Takvim
      </span>
    </RouterLink>

    <RouterLink
      class="flex flex-col items-center flex-1 gap-1 md:flex-row"
      :to="`/dashboard/profile/${meStore?.getUser?._id}`"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2054_340)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.5 24.5C19.1276 24.5 24.5 19.1276 24.5 12.5C24.5 5.8724 19.1276 0.5 12.5 0.5C5.8724 0.5 0.5 5.8724 0.5 12.5C0.5 19.1276 5.8724 24.5 12.5 24.5ZM16.1 10.1C16.1 11.0548 15.7207 11.9705 15.0456 12.6456C14.3705 13.3207 13.4548 13.7 12.5 13.7C11.5452 13.7 10.6295 13.3207 9.95442 12.6456C9.27928 11.9705 8.9 11.0548 8.9 10.1C8.9 9.14522 9.27928 8.22955 9.95442 7.55442C10.6295 6.87928 11.5452 6.5 12.5 6.5C13.4548 6.5 14.3705 6.87928 15.0456 7.55442C15.7207 8.22955 16.1 9.14522 16.1 10.1ZM5.3 18.5C6.13761 17.3815 7.22452 16.4737 8.47438 15.8488C9.72424 15.2238 11.1026 14.899 12.5 14.9C13.8974 14.899 15.2758 15.2238 16.5256 15.8488C17.7755 16.4737 18.8624 17.3815 19.7 18.5C18.8624 19.6185 17.7755 20.5263 16.5256 21.1512C15.2758 21.7762 13.8974 22.101 12.5 22.1C11.1026 22.101 9.72424 21.7762 8.47438 21.1512C7.22452 20.5263 6.13761 19.6185 5.3 18.5Z"
            :fill="$route.fullPath.includes('/dashboard/profile') ? '#2F69FF' : '#292D32'"
          />
        </g>
        <defs>
          <clipPath id="clip0_2054_340">
            <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)" />
          </clipPath>
        </defs>
      </svg>

      <span
        class="text-[10px] font-semibold"
        :class="
          $route.fullPath.includes('/dashboard/profile/') ? 'text-gentian-flower' : 'text-night-sky'
        "
      >
        Profilim
      </span>
    </RouterLink>

    <button
      class="hidden md:flex flex-row items-center flex-1 gap-1 mt-4 pt-4 border-t border-gray-200"
      @click="handleLogout"
    >
      <svg
        class="-ml-1"
        width="25"
        height="25"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21,0H10A3.009,3.009,0,0,0,7,3V9h9a3,3,0,0,1,0,6H7v6a3.009,3.009,0,0,0,3,3H21a3.009,3.009,0,0,0,3-3V3A3.009,3.009,0,0,0,21,0Z"
        ></path>
        <path
          d="M3.41,13H16a1,1,0,0,0,0-2H3.41l1.3-1.29A1,1,0,0,0,3.29,8.29l-3,3a1.037,1.037,0,0,0,0,1.42l3,3a1.03,1.03,0,0,0,1.42,0,1.008,1.008,0,0,0,0-1.42Z"
        ></path>
      </svg>

      <span class="text-[10px] font-semibold text-[#292D32]"> Çıkış Yap </span>
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useMeStore } from '@/stores/me'
import { useRouter } from 'vue-router'
import { CurvedBottomNavigation } from 'bottom-navigation-vue'
import 'bottom-navigation-vue/dist/style.css'

const router = useRouter()
const meStore = useMeStore()
const showQuickMenu = ref(false)
const selected = ref(null)

const handleLogout = async () => {
  await meStore.logout()
}

const navigationOptions = [
  {
    id: 1,
    icon: 'fas fa-home',
    title: 'Ana Sayfa',
    path: '/dashboard/home'
  },
  {
    id: 2,
    icon: 'fas fa-th-large',
    title: 'Alanım',
    path: '/dashboard/fields'
  },
  {
    id: 3,
    icon: 'fas fa-plus',
    title: 'Ekle',
    childs: [
      {
        id: 301,
        title: 'İzin',
        icon: 'fas fa-calendar-plus',
        path: '/dashboard/permission-request/new'
      },
      {
        id: 302,
        title: 'Mesai',
        icon: 'fas fa-business-time',
        path: '/dashboard/overtime-request/new'
      },
      { id: 303, title: 'İlan', icon: 'fas fa-ad', path: '/dashboard/classifieds/new' },
      {
        id: 304,
        title: 'Avans',
        icon: 'fas fa-money-bill-wave',
        path: '/dashboard/prepay-request/new'
      },
      {
        id: 305,
        title: 'Masraf',
        icon: 'fas fa-receipt',
        path: '/dashboard/expense/new'
      }
    ]
  },
  {
    id: 4,
    icon: 'fas fa-calendar-alt',
    title: 'Takvim',
    path: '/dashboard/calendar'
  },
  {
    id: 5,
    icon: 'fas fa-user-circle',
    title: 'Profilim',
    path: `/dashboard/profile/${meStore?.user?._id}`
  }
]

const quickLinks = [
  {
    title: 'Yeni İzin Talebi',
    path: '/dashboard/permission-request/new'
  },
  {
    title: 'Yeni Mesai Talebi',
    path: '/dashboard/overtime-request/new'
  },
  {
    title: 'Yeni İlan',
    path: '/dashboard/classifieds/new'
  },
  {
    title: 'Yeni Avans Talebi',
    path: '/dashboard/prepay-request/new'
  },
  {
    title: 'Yeni Masraf Talebi',
    path: '/dashboard/expense/new'
  }
]

// Initialize selected based on current route
const initializeSelected = () => {
  const currentPath = router.currentRoute.value.path
  const option = navigationOptions.find((opt) => opt.path === currentPath)
  if (option) {
    selected.value = option.id
  }
}

// Watch for route changes
watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    const option = navigationOptions.find((opt) => opt.path === newPath)
    if (option) {
      selected.value = option.id
    }
  }
)

// Call on component mount
onMounted(() => {
  initializeSelected()
}, [])
</script>

<style scoped>
.curve {
  flex-basis: auto !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='M99,0A36.33,36.33,0,0,0,70,15,25,25,0,0,1,30,15,36.33,36.33,0,0,0,1,0H0V50H100V0Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: contain;
  width: 100px;
  height: 64px;
}
.shadow-t {
  box-shadow:
    0px 1px 10px #e7e7e7,
    0px -1px 10px #e7e7e7;
}
</style>
