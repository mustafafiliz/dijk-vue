<template>
  <div class="flex items-center justify-center h-dvh">
    <div
      class="relative flex flex-col h-dvh max-md:w-dvw max-h-dvh bg-gradient-to-b from-cornflower via-lucid-dreams via-25% to-lynx-white px-4 pt-[4.8125rem] pb-24 md:!p-0 md:bg-none md:w-full md:text-center md:flex-row"
    >
      <div class="flex-1 md:flex md:flex-col md:items-center md:justify-center justify-evenly">
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
          @click="$router.go(-1)"
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
          <img src="/images/logo.png" alt="dijiportal" class="md:flex hidden w-80 mb-10" />
          <img src="/favicon.ico" alt="dijiportal" class="md:hidden w-20 mb-10" />

          <div class="flex flex-col items-start w-full md:w-[355px]">
            <div
              v-show="!isOpenOtp"
              class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
            >
              Telefon Numarası
            </div>
            <div v-show="!isOpenOtp" class="relative flex items-center w-full mb-4">
              <PhoneInput v-model="phoneNumber" />
            </div>

            <div
              class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
              v-show="!isOpenOtp"
            >
              TC Kimlik Numarası
            </div>
            <VInput
              class="md:border md:border-gray-300"
              v-model="idNumber"
              v-show="!isOpenOtp"
              type="text"
            />

            <ErrorLabel :text="errorMessage" centered />
            <div v-show="isOpenOtp" class="flex flex-col items-start w-full mb-4">
              <div
                class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
              >
                Yeni Parola
              </div>
              <VInput
                id="newPassword"
                class="mt-1 block w-full md:border md:border-gray-300"
                v-model="newPassword"
                type="password"
              />
            </div>
            <div v-show="isOpenOtp" class="flex flex-col items-start w-full mb-4">
              <div
                class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-1"
              >
                Yeni Parola Tekrar
              </div>
              <VInput
                id="newPasswordConfirmation"
                class="mt-1 block w-full md:border md:border-gray-300"
                v-model="newPasswordConfirmation"
                type="password"
              />
            </div>
            <div
              class="bg-white py-1 px-3 rounded-full text-12 font-semibold text-night-sky md:border md:border-gray-300 mb-4"
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
            <div class="pl-3">
              <ErrorLabel v-for="message in errorMessages" :text="message" />
            </div>
            <VButton
              v-if="isOpenOtp"
              :is-loading="isLoading"
              :disabled="isChangePasswordButtonDisabled"
              class="w-full mt-4"
              @click="changePassword"
            >
              Parolayı Değiştir
            </VButton>
            <VButton
              v-if="!isOpenOtp"
              :is-loading="isLoading"
              :disabled="!isSmsFormValid"
              class="w-full mt-4"
              @click="getSmsCode"
              v-show="!isOpenOtp"
            >
              Sıfırlama Kodu Gönder
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
import { toast } from 'vue3-toastify'

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
      idNumber: '',
      isModalOpen: true,
      isOpenOtp: false,
      isActiveLoginButton: false,
      smsCode: '',
      errorMessage: '',
      errorMessages: [],
      isLoading: false,
      countdown: 120,
      countdownActive: false,
      countdownInterval: null,
      resetOtpInput: false,
      newPassword: '',
      newPasswordConfirmation: ''
    }
  },

  watch: {
    phoneNumber() {
      this.errorMessage = ''
    },
    idNumber() {
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
      this.isLoading = true
      const phone = this.phoneNumber.replace(/\D/g, '')
      this.$axios
        .post('/auth/forgot-password-send-sms', {
          phone,
          tc_no: this.idNumber
        })
        .then((_) => {
          this.isOpenOtp = true
          this.startCountdown()
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    changePassword() {
      this.isLoading = true
      const phone = this.phoneNumber.replace(/\D/g, '')

      this.$axios
        .post('/auth/forgot-password', {
          phone,
          tc_no: this.idNumber,
          sms_verification_code: this.smsCode,
          new_password: this.newPassword,
          new_password_confirmation: this.newPasswordConfirmation
        })
        .then((response) => {
          // Redirect to login page on success
          toast.success(response?.data?.data?.message)
          window.location.href = '/auth/login'
        })
        .catch((error) => {
          const errorMessage = error.response.data.data
          const fields = ['sms_verification_code', 'new_password', 'new_password_confirmation']

          this.smsCode = ''
          this.resetOtpInput = !this.resetOtpInput

          fields.forEach((field) => {
            if (errorMessage[field]) {
              errorMessage[field].forEach((message) => {
                this.errorMessages.push(message)
              })
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
      return phone.length >= 1 && this.idNumber.length === 11
    },

    isOtpFormValid() {
      return this.smsCode.length === 6
    },

    isChangePasswordButtonDisabled() {
      return (
        !this.isSmsFormValid ||
        !this.newPassword ||
        this.newPassword !== this.newPasswordConfirmation ||
        !this.smsCode
      )
    }
  }
}
</script>
