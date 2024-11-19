<script setup>
import { defineProps, ref } from 'vue'
import Textarea from '@/components/Textarea.vue'
import { toast } from 'vue3-toastify'

const props = defineProps({
  application: Object
})

const showRejectModal = ref(false)
const showApproveModal = ref(false)
const showHtmlModal = ref(false)
const rejectMessage = ref('')
const approveMessage = ref('')
const isActive = ref(props.application.is_active)
const status = ref(props.application.status)

const html = ref(props.application.html)

const handleStatusChange = async (_status, message) => {
  try {
    await axios.put(`/processes-in-my-approval/${props.application.id}`, {
      status: _status,
      message: message
    })
    showRejectModal.value = false
    showApproveModal.value = false

    isActive.value = false
    status.value = _status

    toast.success(props.application.title + ' başvurusu' + (_status ? 'onaylandı.' : 'reddedildi.'))
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return
  }
}

const handleShowHtmlModal = () => {
  showHtmlModal.value = true
}

const handleCloseHtmlModal = () => {
  showHtmlModal.value = false
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-x-4 bg-white rounded-2xl py-3 px-4">
      <div class="text-squant cursor-pointer" @click="handleShowHtmlModal">
        <div class="text-14 font-semibold">
          <div class="text-black mb-1">
            {{ application.title }}
          </div>
          <div class="font-medium text-gray-800 text-xs mb-2">
            {{ application.description || 'Açıklama mevdut değil.' }}
          </div>
        </div>

        <div class="text-12 font-medium">
          <div>Başlangıç: {{ application.start_date }}</div>
        </div>
      </div>
      <div class="flex mt-2 gap-x-3">
        <template v-if="isActive">
          <button
            @click="showRejectModal = true"
            class="flex-1 flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] p-1 text-lusty-red font-medium text-14"
            type="button"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_213_887)">
                <path
                  d="M19.25 12C19.2511 13.5309 18.7291 15.0162 17.7706 16.2099L8.29009 6.7294C9.2824 5.935 10.479 5.43718 11.742 5.29333C13.0049 5.14947 14.2828 5.36544 15.4284 5.91633C16.5739 6.46722 17.5405 7.33061 18.2166 8.40698C18.8928 9.48335 19.251 10.7289 19.25 12ZM5.75 12C5.749 13.2711 6.10723 14.5167 6.78338 15.593C7.45954 16.6694 8.42609 17.5328 9.57164 18.0837C10.7172 18.6346 11.9951 18.8505 13.2581 18.7067C14.521 18.5628 15.7176 18.065 16.7099 17.2706L7.22941 7.79008C6.27085 8.98376 5.74889 10.4691 5.75 12ZM22.625 12C22.625 14.0025 22.0312 15.9601 20.9186 17.6251C19.8061 19.2902 18.2248 20.5879 16.3747 21.3543C14.5246 22.1206 12.4888 22.3211 10.5247 21.9305C8.56066 21.5398 6.75656 20.5755 5.34055 19.1595C3.92454 17.7434 2.96023 15.9393 2.56955 13.9753C2.17888 12.0112 2.37939 9.97543 3.14572 8.12533C3.91206 6.27523 5.20981 4.69392 6.87486 3.58137C8.5399 2.46882 10.4975 1.875 12.5 1.875C15.1844 1.87804 17.758 2.94575 19.6561 4.8439C21.5543 6.74205 22.622 9.31562 22.625 12ZM20.75 12C20.75 10.3683 20.2661 8.77325 19.3596 7.41655C18.4531 6.05984 17.1646 5.00242 15.6571 4.37799C14.1497 3.75357 12.4909 3.59019 10.8905 3.90852C9.29017 4.22685 7.82016 5.01259 6.66637 6.16637C5.51259 7.32015 4.72685 8.79016 4.40853 10.3905C4.0902 11.9908 4.25358 13.6496 4.878 15.1571C5.50242 16.6646 6.55984 17.9531 7.91655 18.8596C9.27326 19.7661 10.8683 20.25 12.5 20.25C14.6873 20.2475 16.7843 19.3775 18.3309 17.8309C19.8775 16.2843 20.7475 14.1873 20.75 12Z"
                  fill="#B13A3A"
                />
              </g>
              <defs>
                <clipPath id="clip0_213_887">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
            Reddet
          </button>
          <button
            @click="showApproveModal = true"
            class="flex-1 flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] p-2 text-gamora font-medium text-14"
            type="button"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 2C7 2 2.5 6.5 2.5 12C2.5 17.5 7 22 12.5 22C18 22 22.5 17.5 22.5 12C22.5 6.5 18 2 12.5 2ZM16.7 10.3L11.9 15.1C11.5 15.5 10.9 15.5 10.5 15.1L8.3 12.9C7.9 12.5 7.9 11.9 8.3 11.5C8.7 11.1 9.3 11.1 9.7 11.5L11.2 13L15.3 8.9C15.7 8.5 16.3 8.5 16.7 8.9C17.1 9.3 17.1 9.9 16.7 10.3Z"
                fill="#0FBA00"
              />
            </svg>
            Onayla
          </button>
        </template>
        <template v-else>
          <div
            v-if="status"
            class="flex-1 flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] p-2 text-gamora font-medium text-14"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 2C7 2 2.5 6.5 2.5 12C2.5 17.5 7 22 12.5 22C18 22 22.5 17.5 22.5 12C22.5 6.5 18 2 12.5 2ZM16.7 10.3L11.9 15.1C11.5 15.5 10.9 15.5 10.5 15.1L8.3 12.9C7.9 12.5 7.9 11.9 8.3 11.5C8.7 11.1 9.3 11.1 9.7 11.5L11.2 13L15.3 8.9C15.7 8.5 16.3 8.5 16.7 8.9C17.1 9.3 17.1 9.9 16.7 10.3Z"
                fill="#0FBA00"
              />
            </svg>
            Onayladınız
          </div>
          <div
            v-else
            class="flex-1 flex items-center justify-center gap-x-2 bg-white rounded-[10px] p-2 text-lusty-red font-medium text-14"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_213_887)">
                <path
                  d="M19.25 12C19.2511 13.5309 18.7291 15.0162 17.7706 16.2099L8.29009 6.7294C9.2824 5.935 10.479 5.43718 11.742 5.29333C13.0049 5.14947 14.2828 5.36544 15.4284 5.91633C16.5739 6.46722 17.5405 7.33061 18.2166 8.40698C18.8928 9.48335 19.251 10.7289 19.25 12ZM5.75 12C5.749 13.2711 6.10723 14.5167 6.78338 15.593C7.45954 16.6694 8.42609 17.5328 9.57164 18.0837C10.7172 18.6346 11.9951 18.8505 13.2581 18.7067C14.521 18.5628 15.7176 18.065 16.7099 17.2706L7.22941 7.79008C6.27085 8.98376 5.74889 10.4691 5.75 12ZM22.625 12C22.625 14.0025 22.0312 15.9601 20.9186 17.6251C19.8061 19.2902 18.2248 20.5879 16.3747 21.3543C14.5246 22.1206 12.4888 22.3211 10.5247 21.9305C8.56066 21.5398 6.75656 20.5755 5.34055 19.1595C3.92454 17.7434 2.96023 15.9393 2.56955 13.9753C2.17888 12.0112 2.37939 9.97543 3.14572 8.12533C3.91206 6.27523 5.20981 4.69392 6.87486 3.58137C8.5399 2.46882 10.4975 1.875 12.5 1.875C15.1844 1.87804 17.758 2.94575 19.6561 4.8439C21.5543 6.74205 22.622 9.31562 22.625 12ZM20.75 12C20.75 10.3683 20.2661 8.77325 19.3596 7.41655C18.4531 6.05984 17.1646 5.00242 15.6571 4.37799C14.1497 3.75357 12.4909 3.59019 10.8905 3.90852C9.29017 4.22685 7.82016 5.01259 6.66637 6.16637C5.51259 7.32015 4.72685 8.79016 4.40853 10.3905C4.0902 11.9908 4.25358 13.6496 4.878 15.1571C5.50242 16.6646 6.55984 17.9531 7.91655 18.8596C9.27326 19.7661 10.8683 20.25 12.5 20.25C14.6873 20.2475 16.7843 19.3775 18.3309 17.8309C19.8775 16.2843 20.7475 14.1873 20.75 12Z"
                  fill="#B13A3A"
                />
              </g>
              <defs>
                <clipPath id="clip0_213_887">
                  <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
            Reddettiniz
          </div>
        </template>
      </div>
    </div>
    <!-- Reject Modal -->
    <div
      v-if="showRejectModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3">
        <div class="p-4">
          <h2 class="text-lg font-semibold">Reddet</h2>
          <p class="my-4 text-sm text-gray-700">
            <strong>{{ application.title }}</strong> başvurusunu reddetmek istediğinize emin
            misiniz?
          </p>
          <div class="mb-4">
            <div class="font-semibold mb-2 text-sm">Mesaj</div>
            <Textarea
              class="text-arch-grey border border-gray-200 rounded-xl"
              placeholder="Eklemek istediğiniz bir şey var mı ?"
              rows="4"
              v-model="rejectMessage"
            />
          </div>
          <div class="flex items-center gap-x-3">
            <Button
              @click="showRejectModal = false"
              class="flex-1 h-12 w-full flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] py-2 text-gray-800 font-medium text-14"
              >İptal</Button
            >
            <button
              @click="handleStatusChange(false, rejectMessage)"
              class="flex-1 w-full h-12 flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] py-2 text-lusty-red font-medium text-14"
              type="button"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_213_887)">
                  <path
                    d="M19.25 12C19.2511 13.5309 18.7291 15.0162 17.7706 16.2099L8.29009 6.7294C9.2824 5.935 10.479 5.43718 11.742 5.29333C13.0049 5.14947 14.2828 5.36544 15.4284 5.91633C16.5739 6.46722 17.5405 7.33061 18.2166 8.40698C18.8928 9.48335 19.251 10.7289 19.25 12ZM5.75 12C5.749 13.2711 6.10723 14.5167 6.78338 15.593C7.45954 16.6694 8.42609 17.5328 9.57164 18.0837C10.7172 18.6346 11.9951 18.8505 13.2581 18.7067C14.521 18.5628 15.7176 18.065 16.7099 17.2706L7.22941 7.79008C6.27085 8.98376 5.74889 10.4691 5.75 12ZM22.625 12C22.625 14.0025 22.0312 15.9601 20.9186 17.6251C19.8061 19.2902 18.2248 20.5879 16.3747 21.3543C14.5246 22.1206 12.4888 22.3211 10.5247 21.9305C8.56066 21.5398 6.75656 20.5755 5.34055 19.1595C3.92454 17.7434 2.96023 15.9393 2.56955 13.9753C2.17888 12.0112 2.37939 9.97543 3.14572 8.12533C3.91206 6.27523 5.20981 4.69392 6.87486 3.58137C8.5399 2.46882 10.4975 1.875 12.5 1.875C15.1844 1.87804 17.758 2.94575 19.6561 4.8439C21.5543 6.74205 22.622 9.31562 22.625 12ZM20.75 12C20.75 10.3683 20.2661 8.77325 19.3596 7.41655C18.4531 6.05984 17.1646 5.00242 15.6571 4.37799C14.1497 3.75357 12.4909 3.59019 10.8905 3.90852C9.29017 4.22685 7.82016 5.01259 6.66637 6.16637C5.51259 7.32015 4.72685 8.79016 4.40853 10.3905C4.0902 11.9908 4.25358 13.6496 4.878 15.1571C5.50242 16.6646 6.55984 17.9531 7.91655 18.8596C9.27326 19.7661 10.8683 20.25 12.5 20.25C14.6873 20.2475 16.7843 19.3775 18.3309 17.8309C19.8775 16.2843 20.7475 14.1873 20.75 12Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_213_887">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              Reddet
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Approve Modal -->
    <div
      v-if="showApproveModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-3xl shadow-lg w-11/12 md:w-1/3">
        <div class="p-4">
          <h2 class="text-lg font-semibold">Onayla</h2>
          <p class="my-4 text-sm text-gray-700">
            <strong>{{ application.title }}</strong> başvurusunu onaylamak istediğinize emin
            misiniz?
          </p>
          <div class="mb-4">
            <div class="font-semibold mb-2 text-sm">Mesaj</div>
            <Textarea
              class="text-arch-grey border border-gray-200 rounded-xl"
              placeholder="Eklemek istediğiniz bir şey var mı ?"
              rows="4"
              v-model="approveMessage"
            />
          </div>
          <div class="flex items-center gap-x-3">
            <Button
              @click="showApproveModal = false"
              class="flex-1 h-12 w-full flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] py-2 text-gray-800 font-medium text-14"
              >İptal</Button
            >
            <button
              @click="handleStatusChange(true, approveMessage)"
              class="flex-1 flex items-center justify-center gap-x-2 bg-gray-100 rounded-[10px] p-2 text-gamora font-medium text-14"
              type="button"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 2C7 2 2.5 6.5 2.5 12C2.5 17.5 7 22 12.5 22C18 22 22.5 17.5 22.5 12C22.5 6.5 18 2 12.5 2ZM16.7 10.3L11.9 15.1C11.5 15.5 10.9 15.5 10.5 15.1L8.3 12.9C7.9 12.5 7.9 11.9 8.3 11.5C8.7 11.1 9.3 11.1 9.7 11.5L11.2 13L15.3 8.9C15.7 8.5 16.3 8.5 16.7 8.9C17.1 9.3 17.1 9.9 16.7 10.3Z"
                  fill="#0FBA00"
                />
              </svg>
              Onayla
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- HTML Modal -->
    <div
      v-if="showHtmlModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div class="bg-white w-[100vw] h-[100dvh]">
        <div class="relative">
          <button @click="handleCloseHtmlModal" class="absolute top-2 right-2">
            <svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6l12 12" stroke="black" stroke-width="2" />
            </svg>
          </button>
          <div class="overflow-auto w-[100vw] h-[100dvh] pt-4" v-html="html"></div>
        </div>
      </div>
    </div>
  </div>
</template>
