<script setup>
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'

import { useProductCatalogs, useProductDetail } from '@/stores/product'
import { useMedia } from '@/stores/media'

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 產品分類 store
const productCatalogsStore = useProductCatalogs()
// 產品分類 method
const { getProductCatalogs } = productCatalogsStore
// 產品分類
const { data: catalog } = await getProductCatalogs()
const productCatalogs = computed(() => catalog.value?.data ?? [])

// 產品建立 store
const productDetailStore = useProductDetail()
// 產品建立 method
const { postProductDetail } = productDetailStore

// 產品 outline 儲存
const outlineStore = reactive({
  title: '',
  image: '',
  catalog: '',
  type: '',
  stock: 0,
  price: 0
})

// 更新 outline title 設定
const updateOutlineTitle = (value) => {
  outlineStore.title = value
}
// 更新 outline catalog 設定
const updateOutlineCatalog = (value) => {
  outlineStore.catalog = value
}
// 更新 outline type 設定
const updateOutlineType = (value) => {
  outlineStore.type = value
}
// 更新 outline price 設定
const updateOutlinePrice = (value) => {
  outlineStore.price = value
}
// 更新 outline stock 設定
const updateOutlineStock = (value) => {
  outlineStore.stock = value
}
// outline 已選取圖片
const selectedOutlineImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == outlineStore.image) {
      obj.selected = true
    }
    return obj
  })
])
// 更新 outline 圖片
const updateOutlineImage = () => {
  outlineStore.image = selectedOutlineImage.filter(
    (obj) => obj.selected
  )[0].link

  // 關閉選擇圖片燈箱
  toggleOutlineModal()
}
// 選擇 outline 圖片
const selectOutlineImage = (id, limit) => {
  const target = selectedOutlineImage.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedOutlineImage.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}
// 取消選擇 outline 圖片
const cancelSelectOutlineImage = (temp) => {
  selectedOutlineImage.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleOutlineModal()
}
// 燈箱開關狀態
const outlineModalState = ref(false)
// 開關 modal
const toggleOutlineModal = () => {
  if (outlineModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  outlineModalState.value = !outlineModalState.value
}

// 其他細項設定
const detailSetting = reactive({
  dep: '',
  sliders: [],
  size: ''
})
// 植物類別細項設定
const plantsDetailSetting = reactive({
  diff: '',
  env: ''
})

// 其他細項輪播 已選取圖片
const selectedSlidersImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == outlineStore.image) {
      obj.selected = true
    }
    return obj
  })
])
// 更新 其他細項輪播 圖片
const updateSlidersImage = () => {
  const targets = selectedSlidersImage
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)

  detailSetting.sliders.splice(0, store.length, ...targets)

  // 關閉選擇圖片燈箱
  toggleSlidersModal()
}
// 選擇 其他細項輪播 圖片
const selectSlidersImage = (id, limit) => {
  const target = selectedSlidersImage.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedSlidersImage.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}
// 取消選擇 其他細項輪播 圖片
const cancelSelectSlidersImage = (temp) => {
  selectedSlidersImage.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleSlidersModal()
}
// 燈箱開關狀態
const slidersModalState = ref(false)
// 開關 modal
const toggleSlidersModal = () => {
  if (slidersModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  slidersModalState.value = !slidersModalState.value
}

// 植物介紹段落儲存
const paragraphStore = reactive([
  {
    id: 0,
    style: 'single',
    images: [],
    content: ''
  }
])
// 更新 paragraph style 設定
const updateParagraphStyle = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).style = value
}
// 更新 paragraph content 設定
const updateParagraphContent = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).content = value
}
// 更新 paragraph 圖片設定
const updateParagraphImages = (id, modalImages) => {
  const store = paragraphStore.find((obj) => obj.id == id).images
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)
  store.splice(0, store.length, ...targets)
}
// 新增植物介紹段落
const addParagraph = () => {
  paragraphStore.push({
    id: paragraphStore.length,
    style: 'single',
    images: [],
    content: ''
  })
}

// 包裝服務段落儲存
const packageStore = reactive([
  {
    id: 0,
    style: 'single',
    images: [],
    content: ''
  }
])
// 更新 package style 設定
const updatePackageStyle = (id, value) => {
  packageStore.find((obj) => obj.id == id).style = value
}
// 更新 package content 設定
const updatePackageContent = (id, value) => {
  packageStore.find((obj) => obj.id == id).content = value
}
// 更新 package 圖片設定
const updatePackageImages = (id, modalImages) => {
  const store = packageStore.find((obj) => obj.id == id).images
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)
  store.splice(0, store.length, ...targets)
}
// 新增包裝服務段落
const addPackage = () => {
  packageStore.push({
    id: packageStore.length,
    style: 'single',
    images: [],
    content: ''
  })
}

// 照護方式段落儲存
const careStore = reactive([
  {
    id: 0,
    style: 'single',
    images: [],
    content: ''
  }
])
// 更新 package style 設定
const updateCareStyle = (id, value) => {
  careStore.find((obj) => obj.id == id).style = value
}
// 更新 package content 設定
const updateCareContent = (id, value) => {
  careStore.find((obj) => obj.id == id).content = value
}
// 更新 package 圖片設定
const updateCareImages = (id, modalImages) => {
  const store = careStore.find((obj) => obj.id == id).images
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)
  store.splice(0, store.length, ...targets)
}
// 新增照護方式段落
const addCare = () => {
  careStore.push({
    id: careStore.length,
    style: 'single',
    images: [],
    content: ''
  })
}

// 送出表單 (新增)
const submitForm = async () => {
  const postData = {}
  // outline
  postData.title = outlineStore.title
  postData.image = outlineStore.image
  postData.catalog = outlineStore.catalog
  postData.type = outlineStore.type
  postData.price = outlineStore.price
  postData.stock = outlineStore.stock
  // more detail
  postData.sliders = detailSetting.sliders
  postData.dep = detailSetting.dep
  postData.size = detailSetting.size
  // plants type setting
  postData.diff = plantsDetailSetting.diff
  postData.env = plantsDetailSetting.env
  // 內容介紹
  // toRaw 解除響應
  postData.contents = toRaw(paragraphStore)
  postData.package = toRaw(packageStore)
  postData.care = toRaw(careStore)

  await postProductDetail(postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4 flex justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          新增產品
        </h2>
        <button
          type="submit"
          class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <CheckIcon class="mr-2 h-4 w-4" />
          送出產品
        </button>
      </div>
      <pre>{{ outlineStore }}</pre>
      <pre>{{ detailSetting }}</pre>
      <pre>{{ plantsDetailSetting }}</pre>
      <ProductOutline
        :outline="outlineStore"
        :catalogs="productCatalogs"
        @update-title="updateOutlineTitle"
        @update-catalog="updateOutlineCatalog"
        @update-type="updateOutlineType"
        @update-price="updateOutlinePrice"
        @update-stock="updateOutlineStock"
        @toggle-modal="toggleOutlineModal"
      />
      <div class="mt-4 flex gap-4 sm:col-span-2 sm:mt-6 sm:gap-6">
        <div class="shrink-0">
          <label
            for="brand"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >選擇內頁輪播圖</label
          >
          <button
            class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
            @click="toggleSlidersModal"
          >
            請選擇圖片
          </button>
        </div>
        <ul v-if="detailSetting.sliders" class="grid sm:grid-cols-4 sm:gap-6">
          <li v-for="(src, key) in detailSetting.sliders" :key="key">
            <img :src="src" alt="" />
          </li>
        </ul>
      </div>
      <div class="mt-4 sm:col-span-2 sm:mt-6">
        <label
          for="dep"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >產品描述</label
        >
        <textarea
          id="dep"
          v-model="detailSetting.dep"
          rows="4"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder="請輸入產品描述"
          required
        ></textarea>
      </div>
      <div class="mt-4 flex gap-4 sm:col-span-2 sm:mt-6 sm:gap-6">
        <div class="w-full">
          <label
            for="size"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >產品尺寸</label
          >
          <select
            id="size"
            v-model="detailSetting.size"
            name="size"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          >
            <option value="" selected disabled hidden>請選擇產品尺寸</option>
            <option value="s">S ( 15 cm 以下 )</option>
            <option value="m">M ( 15 - 59 cm )</option>
            <option value="l">L ( 60 - 149 cm )</option>
            <option value="xl">XL ( 150 - 199 cm )</option>
            <option value="xxl">XXL ( 200 cm 以上 )</option>
          </select>
        </div>
        <div v-if="outlineStore.type == 'plants'" class="w-full">
          <label
            for="diff"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >種植難易度</label
          >
          <select
            id="diff"
            v-model="plantsDetailSetting.diff"
            name="diff"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          >
            <option value="" selected disabled hidden>請選擇種植難易度</option>
            <option value="初學者">初學者</option>
            <option value="簡單">簡單</option>
            <option value="中等">中等</option>
            <option value="困難">困難</option>
          </select>
        </div>
        <div v-if="outlineStore.type == 'plants'" class="w-full">
          <label
            for="env"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >適合環境</label
          >
          <select
            id="env"
            v-model="plantsDetailSetting.env"
            name="env"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          >
            <option value="" selected disabled hidden>請選擇適合環境</option>
            <option value="室內">室內</option>
            <option value="室外">室外</option>
            <option value="不限">不限</option>
          </select>
        </div>
      </div>
      <div class="mt-4 sm:mt-6">
        <h2 class="text-l font-bold text-gray-900 dark:text-white">產品介紹</h2>
        <ProductParagraph
          v-for="(item, key) in paragraphStore"
          :key="key"
          :paragraph="item"
          @update-style="updateParagraphStyle"
          @update-content="updateParagraphContent"
          @update-images="updateParagraphImages"
        />
        <div
          class="mx-auto mt-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-700 text-white"
          @click="addParagraph"
        >
          <PlusIcon class="h-5 w-5" />
        </div>
      </div>
      <div class="mt-4 sm:mt-6">
        <h2 class="text-l font-bold text-gray-900 dark:text-white">包裝服務</h2>
        <ProductParagraph
          v-for="(item, key) in packageStore"
          :key="key"
          :paragraph="item"
          @update-style="updatePackageStyle"
          @update-content="updatePackageContent"
          @update-images="updatePackageImages"
        />
        <div
          class="mx-auto mt-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-700 text-white"
          @click="addPackage"
        >
          <PlusIcon class="h-5 w-5" />
        </div>
      </div>
      <div class="mt-4 sm:mt-6">
        <h2 class="text-l font-bold text-gray-900 dark:text-white">照護方式</h2>
        <ProductParagraph
          v-for="(item, key) in careStore"
          :key="key"
          :paragraph="item"
          @update-style="updateCareStyle"
          @update-content="updateCareContent"
          @update-images="updateCareImages"
        />
        <div
          class="mx-auto mt-8 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-700 text-white"
          @click="addCare"
        >
          <PlusIcon class="h-5 w-5" />
        </div>
      </div>
    </form>
    <ModalSelectImage
      v-show="outlineModalState"
      :images="selectedOutlineImage"
      @update-image="updateOutlineImage"
      @select-image="selectOutlineImage"
      @cancel-select-image="cancelSelectOutlineImage"
      @toggle-modal="toggleOutlineModal"
    />
    <ModalSelectImage
      v-show="slidersModalState"
      :images="selectedSlidersImage"
      :limit="6"
      @update-image="updateSlidersImage"
      @select-image="selectSlidersImage"
      @cancel-select-image="cancelSelectSlidersImage"
      @toggle-modal="toggleSlidersModal"
    />
  </div>
</template>
