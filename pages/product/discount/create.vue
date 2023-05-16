<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

import { useProductRelevant } from '@/stores/product'
import { useMedia } from '@/stores/media'

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 產品相關 store
const productRelevantStore = useProductRelevant()
// 產品相關 method
const { postProductDiscount } = productRelevantStore

const title = ref('')
const content = ref('')
const image = ref('')
const mixed = reactive({
  target: '',
  criteria: '',
  result: ''
})
const method = computed(() => {})

// 已選取圖片
const selectedImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == image) {
      obj.selected = true
    }
    return obj
  })
])
// 更新圖片
const updateImage = () => {
  image = selectedImage.filter((obj) => obj.selected)[0].link

  // 關閉選擇圖片燈箱
  toggleModal()
}
// 選擇圖片
const selectImage = (id, limit) => {
  const target = selectedImage.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedImage.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}
// 取消選擇圖片
const cancelSelectImage = (temp) => {
  selectedImage.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleModal()
}
// 燈箱開關狀態
const modalState = ref(false)
// 開關 modal
const toggleModal = () => {
  if (modalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  modalState.value = !modalState.value
}

// 送出表單 (新增)
const submitForm = async () => {
  const postData = {}
  // toRaw 解除響應
  postData.title = title.value
  postData.content = content.value
  postData.image = image.value
  postData.method = method.value

  await postProductDiscount(postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4 flex justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          新增產品優惠
        </h2>
        <button
          type="submit"
          class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <CheckIcon class="mr-2 h-4 w-4" />
          送出產品優惠
        </button>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="title"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >名稱</label
          >
          <input
            id="title"
            v-model="title"
            type="text"
            name="title"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入名稱"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="content"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >內容</label
          >
          <textarea
            id="content"
            v-model="content"
            rows="8"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請填入內容"
            required
          ></textarea>
        </div>
        <div class="flex gap-4 sm:col-span-2 sm:gap-6">
          <div class="shrink-0">
            <label
              for="brand"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >選擇列表縮圖</label
            >
            <button
              class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="button"
              @click="toggleModal"
            >
              請選擇圖片
            </button>
          </div>
          <div v-if="image" class="flex-auto">
            <img :src="image" alt="" />
          </div>
        </div>
        <div class="mt-4 flex gap-4 sm:col-span-2 sm:mt-6 sm:gap-6">
          <div class="w-full">
            <label
              for="size"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >優惠目標</label
            >
            <select
              id="size"
              v-model="mixed.target"
              name="size"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              required
            >
              <option value="" selected disabled hidden>請選擇優惠目標</option>
              <option value="運費">運費</option>
            </select>
          </div>
          <div class="w-full">
            <label
              for="diff"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >優惠條件</label
            >
            <select
              id="diff"
              v-model="mixed.criteria"
              name="diff"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              required
            >
              <option value="" selected disabled hidden>請選擇優惠條件</option>
              <option value="滿額">滿額</option>
            </select>
          </div>
          <div class="w-full">
            <label
              for="env"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >優惠折扣</label
            >
            <input
              id="title"
              v-model="mixed.result"
              type="text"
              name="title"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder="請輸入優惠折扣"
              required
            />
          </div>
        </div>
      </div>
    </form>
    <ModalSelectImage
      v-show="modalState"
      :images="selectedImage"
      @update-image="updateImage"
      @select-image="selectImage"
      @cancel-select-image="cancelSelectImage"
      @toggle-modal="toggleModal"
    />
  </div>
</template>
