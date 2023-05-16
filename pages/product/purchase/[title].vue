<script setup>
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/solid'

import { useProductRelevant } from '@/stores/product'
import { useMedia } from '@/stores/media'

const route = useRoute()
const { params } = route

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 產品相關 store
const productRelevantStore = useProductRelevant()
// 產品相關 method
const { getProductPurchase, deleteProductPurchase, putProductPurchase } =
  productRelevantStore
// 加購商品
const { data: detail } = await getProductPurchase(params.title)
const productPurchase = computed(() => detail.value.data)

// 購物須知 id
const $id = ref(productPurchase.value?._id)
const title = ref(productPurchase.value?.title ?? '')
const dep = ref(productPurchase.value?.dep ?? '')
const image = ref(productPurchase.value?.image ?? '')
const price = ref(productPurchase.value?.price ?? '')
const stock = ref(productPurchase.value?.stock ?? '')

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

// 刪除產品
const deleteDetail = async () => {
  await deleteProductPurchase($id.value, title.value)
}

// 送出表單 (新增)
const submitForm = async () => {
  const postData = {}
  postData.id = $id.value
  postData.title = title.value
  postData.dep = dep.value
  postData.image = image.value
  postData.price = price.value
  postData.stock = stock.value

  await putProductPurchase(postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          編輯加購商品
        </h2>
        <div class="flex items-center justify-between">
          <h1 class="text-l font-bold text-gray-900 dark:text-white">
            {{ productPurchase.title }}
          </h1>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="deleteDetail"
            >
              <TrashIcon class="mr-2 h-4 w-4" />
              刪除加購商品
            </button>
            <button
              type="submit"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <CheckIcon class="mr-2 h-4 w-4" />
              修改加購商品
            </button>
          </div>
        </div>
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
