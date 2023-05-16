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
const { postProductPurchase } = productRelevantStore

const title = ref('')
const dep = ref('')
const image = ref('')
const price = ref(0)
const stock = ref(0)

// 已選取圖片
const selectedImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == image.value) {
      obj.selected = true
    }
    return obj
  })
])
// 更新圖片
const updateImage = () => {
  image.value = selectedImage.filter((obj) => obj.selected)[0].link

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
  postData.title = title.value
  postData.dep = dep.value
  postData.image = image.value
  postData.price = price.value
  postData.stock = stock.value

  await postProductPurchase(postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4 flex justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          新增加購商品
        </h2>
        <button
          type="submit"
          class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <CheckIcon class="mr-2 h-4 w-4" />
          送出加購商品
        </button>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >名稱</label
          >
          <input
            id="name"
            v-model="title"
            type="text"
            name="name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入名稱"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="dep"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >描述</label
          >
          <textarea
            id="dep"
            v-model="dep"
            rows="8"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請填入描述"
            required
          ></textarea>
        </div>
        <div class="w-full">
          <label
            for="price"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >產品價格</label
          >
          <input
            id="price"
            v-model="price"
            type="number"
            min="0"
            max="999999"
            name="price"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入產品價格"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="stock"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >庫存數量</label
          >
          <input
            id="stock"
            v-model="stock"
            type="number"
            name="stock"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入庫存數量"
            required
          />
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
