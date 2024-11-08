<template>
  <div class="flex items-center justify-center h-dvh">
    <div
      class="relative flex flex-col h-dvh max-md:w-dvw max-h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white px-4 pt-[4.8125rem] pb-24 md:!p-0 md:bg-none md:w-full md:text-center md:flex-row"
    >
      <div class="flex-1 md:flex md:flex-col md:items-center md:justify-center">
        <img
          class="max-w-full w-[28.5rem] md:mx-auto"
          src="/images/welcome-splash.png"
          alt="Dijik"
        />
        <div class="flex flex-col mt-8">
          <div class="text-night-sky text-28 font-semibold">
            Daha Hızlı İletişim <br />
            <span class="text-36 text-gentian-flower font-bold"> Daha Güçlü Gelecek </span>
          </div>

          <div class="font-medium text-18 text-squant mt-2 mb-6 md:mt-8 md:mb-12">
            İnsan Kaynakları, Basitleştirildi!
          </div>

          <VButton class="md:hidden" @click="isModalOpen = true"> Hadi Başalayalım </VButton>
        </div>
      </div>

      <div
        class="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-30 backdrop-blur-2xl transition-transform md:static md:backdrop-blur-[100px] md:flex-1 md:bg-gray-50 md:bg-opacity-100"
        :class="{
          'transform -translate-x-0 md:opacity-100': isModalOpen,
          'max-md:-translate-x-full': !isModalOpen
        }"
      >
        <VButton
          class="absolute top-[57px] left-4 px-[6px] pb-[6px] pt-[6px] rounded-xl md:hidden"
          variant="light"
          @click="isModalOpen = false"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 25.5L13.5 18L21 10.5"
              stroke="#292D32"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </VButton>

        <div class="flex flex-col items-center justify-center h-full p-4">
          <div class="bg-white rounded-full">
            <svg
              width="108"
              height="108"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 48C10.7452 48 0 37.2548 0 24C0 37.2552 10.7448 48 24 48ZM1.72886e-05 23.9709C0.0147578 11.5576 9.45342 1.35201 21.5461 0.123905C9.45313 1.35195 0.0147574 11.5573 1.72886e-05 23.9709ZM48 24C48 10.7448 37.2552 0 24 0C37.2548 0 48 10.7452 48 24ZM29.0912 24.2912C30.4414 22.9409 31.2 21.1096 31.2 19.2C31.2 17.2904 30.4414 15.4591 29.0912 14.1088C27.7409 12.7586 25.9096 12 24 12C22.0904 12 20.2591 12.7586 18.9088 14.1088C17.5586 15.4591 16.8 17.2904 16.8 19.2C16.8 21.1096 17.5586 22.9409 18.9088 24.2912C20.2591 25.6414 22.0904 26.4 24 26.4C25.9096 26.4 27.7409 25.6414 29.0912 24.2912ZM15.9488 30.6975C13.449 31.9474 11.2752 33.763 9.6 36C11.2752 38.2371 13.449 40.0526 15.9488 41.3025C18.4485 42.5523 21.2052 43.2021 24 43.2C26.7948 43.2021 29.5515 42.5523 32.0512 41.3025C34.551 40.0526 36.7248 38.2371 38.4 36C36.7248 33.763 34.551 31.9474 32.0512 30.6975C29.5515 29.4477 26.7948 28.7979 24 28.8C21.2052 28.7979 18.4485 29.4477 15.9488 30.6975Z"
                fill="#292D32"
              />
            </svg>
          </div>

          <div class="flex flex-col items-start w-full md:w-[355px]">
            <div
              class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
            >
              Telefon Numarası
            </div>
            <div class="relative flex items-center w-full mb-4">
              <PhoneInput v-model="phoneNumber" />
            </div>

            <div
              class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
              v-show="!isOpenOtp"
            >
              Parola
            </div>
            <VInput
              class="md:border md:border-gray-300"
              v-model="password"
              v-show="!isOpenOtp"
              type="password"
            />
            <div
              class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
              v-show="isOpenOtp && phoneNumber"
            >
              Doğrulama Kodu
            </div>
            <v-otp-input
              :key="resetOtpInput"
              v-show="isOpenOtp && phoneNumber"
              ref="otpInput"
              id="otpInput"
              class="w-full bg-white py-2 px-3 gap-x-3 text-24 font-semibold rounded-3xl [&>div]:flex-1 [&>div>input]:w-full [&>div>input]:outline-none [&>div>input]:text-center [&>div>input]:bg-smoke [&>div>input]:rounded [&>div>input]:h-12 md:border md:border-gray-300"
              inputmode="tel"
              :num-inputs="6"
              :should-focus-order="true"
              @on-change="isActiveLoginButton = false"
              @on-complete="handleOTP"
            />
            <ErrorLabel :text="errorMessage" centered />
            <div v-if="countdownActive" class="my-4 w-full flex flex-col items-center gap-2">
              <div class="text-24 font-semibold text-center">
                {{ countdown }}
              </div>
              <button
                @click="getSmsCode"
                class="text-xs underline disabled:text-gray-600 text-gray-700 font-medium disabled:cursor-not-allowed cursor-pointer"
                :disabled="countdown !== 0"
              >
                Kodu Tekrar Gönder
              </button>
            </div>
            <router-link
              v-if="!isOpenOtp"
              to="/auth/reset-password"
              class="underline font-medium text-12 mt-4 ml-3"
            >
              Şifremi Unuttum
            </router-link>
            <VButton
              :is-loading="isLoading"
              :disabled="!isSmsFormValid"
              class="w-full mt-4"
              @click="getSmsCode"
              v-show="!isOpenOtp"
            >
              Giriş Kodu Gönder
            </VButton>
            <VButton
              :is-loading="isLoading"
              :disabled="!isOtpFormValid || countdown === 0"
              class="w-full mt-4"
              @click="sendOTP"
              v-show="isActiveLoginButton"
            >
              Giriş Yap
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from '@/components/Button.vue'
import PhoneInput from '@/components/PhoneInput.vue'
import VOtpInput from 'vue3-otp-input'
import VInput from '@/components/Input.vue'
import ErrorLabel from '@/components/ErrorLabel.vue'
import { useSessionStore } from '@/stores/session'

export default {
  name: 'Login',

  components: {
    VButton,
    PhoneInput,
    VOtpInput,
    VInput,
    ErrorLabel
  },

  data() {
    return {
      phoneNumber: '',
      isValidPhoneNumber: false,
      password: '',
      isModalOpen: false,
      isOpenOtp: false,
      isActiveLoginButton: false,
      smsCode: '',
      errorMessage: '',
      isLoading: false,
      countdown: 120,
      countdownActive: false,
      countdownInterval: null,
      resetOtpInput: false
    }
  },

  watch: {
    phoneNumber() {
      this.errorMessage = ''
    },
    password() {
      this.errorMessage = ''
    },
    smsCode() {
      this.errorMessage = ''
    }
  },

  methods: {
    startCountdown() {
      this.countdownActive = true
      this.countdown = 120
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.countdownInterval)
        }
      }, 1000)
    },

    getSmsCode() {
      const sessionStore = useSessionStore()

      this.isLoading = true
      const phone = this.phoneNumber.replace(/\D/g, '')
      this.$axios
        .post('/auth/get-sms', {
          phone,
          password: this.password
        })
        .then((_) => {
          this.isOpenOtp = true
          this.startCountdown()
          this.$nextTick(() => {
            const firstInput = document.querySelector('#otpInput input[type="tel"]')
            if (firstInput) {
              firstInput.focus()
            }
          })
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    sendOTP() {
      this.isLoading = true
      const sessionStore = useSessionStore()
      const phone = this.phoneNumber.replace(/\D/g, '')

      this.$axios
        .post('/auth/login', {
          phone,
          password: this.password,
          sms_verification_code: this.smsCode
        })
        .then((response) => {
          sessionStore.setSession(response.data)
          window.location.href = '/dashboard/home'
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
          this.smsCode = ''
          this.resetOtpInput = !this.resetOtpInput

          this.$nextTick(() => {
            //reset otp input

            const firstInput = document.querySelector('#otpInput input[type="tel"]')
            if (firstInput) {
              firstInput.focus()
            }
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    handleOTP(value) {
      if (!value || value.length !== 6) {
        this.isActiveLoginButton = false
        return
      }

      this.smsCode = value
      this.isActiveLoginButton = true
    }
  },

  beforeDestroy() {
    clearInterval(this.countdownInterval)
  },

  computed: {
    isSmsFormValid() {
      const phone = this.phoneNumber.replace(/\D/g, '')
      return phone.length >= 1 && this.password.length >= 1
    },

    isOtpFormValid() {
      return this.smsCode.length === 6
    }
  }
}
</script>
