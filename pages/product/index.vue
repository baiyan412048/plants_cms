<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

import {
  useProductSetting,
  useProductCatalog,
  useProductSize,
  useProductDiff,
  useProductEnv
} from '@/stores/product'
import { useMedia } from '@/stores/media'

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 單元設定 store
const productSettingStore = useProductSetting()
// 單元設定 method
const { getProductSetting, putProductSetting } = productSettingStore
const { data: setting, refresh: settingRefresh } = await getProductSetting()

// 產品分類 store
const productCatalogStore = useProductCatalog()
// 產品分類 method
const {
  getProductCatalog,
  postProductCatalog,
  deleteProductCatalog,
  putProductCatalog
} = productCatalogStore
// 取得產品分類
const { data: catalog, refresh: catalogRefresh } = await getProductCatalog()

// 若沒設定則預設為空陣列
const productCatalog = computed(() => catalog.value?.data ?? [])
// 待操作分類儲存
const productCatalogTemp = reactive({
  catalog: '',
  _id: ''
})
// 產品分類操作
const productCatalogMethods = {
  // 選擇待操作分類
  select(value, id) {
    productCatalogTemp.catalog = value
    productCatalogTemp._id = id
  },
  // 新增產品分類
  async post() {
    const { data } = await postProductCatalog(productCatalogTemp)
    await catalogRefresh()
    productCatalogTemp.catalog = data.value.data.catalog
    productCatalogTemp._id = data.value.data._id
  },
  // 刪除產品分類
  async delete() {
    await deleteProductCatalog(productCatalogTemp)
    await catalogRefresh()
    productCatalogTemp.catalog = ''
    productCatalogTemp._id = ''
  },
  // 修改產品分類
  async put() {
    const { data } = await putProductCatalog(productCatalog, productCatalogTemp)
    await catalogRefresh()
    productCatalogTemp.catalog = data.value.data.catalog
    productCatalogTemp._id = data.value.data._id
  }
}

// 產品尺寸 store
const productSizeStore = useProductSize()
// 產品尺寸 method
const { getProductSize, postProductSize, deleteProductSize, putProductSize } =
  productSizeStore
// 取得產品尺寸
const { data: size, refresh: sizeRefresh } = await getProductSize()

// 若沒設定則預設為空陣列
const productSize = computed(() => size.value?.data ?? [])
// 待操作尺寸儲存
const productSizeTemp = reactive({
  size: '',
  _id: ''
})
// 產品尺寸操作
const productSizeMethods = {
  // 選擇待操作尺寸
  select(value, id) {
    productSizeTemp.size = value
    productSizeTemp._id = id
  },
  // 新增產品尺寸
  async post() {
    const { data } = await postProductSize(productSizeTemp)
    await sizeRefresh()
    productSizeTemp.size = data.value.data.size
    productSizeTemp._id = data.value.data._id
  },
  // 刪除產品尺寸
  async delete() {
    await deleteProductSize(productSizeTemp)
    await sizeRefresh()
    productSizeTemp.size = ''
    productSizeTemp._id = ''
  },
  // 修改產品尺寸
  async put() {
    const { data } = await putProductSize(productSize, productSizeTemp)
    await sizeRefresh()
    productSizeTemp.size = data.value.data.size
    productSizeTemp._id = data.value.data._id
  }
}

// 產品難易度 store
const productDiffStore = useProductDiff()
// 產品難易度 method
const { getProductDiff, postProductDiff, deleteProductDiff, putProductDiff } =
  productDiffStore
// 取得產品難易度
const { data: diff, refresh: diffRefresh } = await getProductDiff()

// 若沒設定則預設為空陣列
const productDiff = computed(() => diff.value?.data ?? [])
// 待操作難易度儲存
const productDiffTemp = reactive({
  diff: '',
  _id: ''
})
// 產品難易度操作
const productDiffMethods = {
  // 選擇待操作難易度
  select(value, id) {
    productDiffTemp.diff = value
    productDiffTemp._id = id
  },
  // 新增產品難易度
  async post() {
    const { data } = await postProductDiff(productDiffTemp)
    await diffRefresh()
    productDiffTemp.diff = data.value.data.diff
    productDiffTemp._id = data.value.data._id
  },
  // 刪除產品難易度
  async delete() {
    await deleteProductDiff(productDiffTemp)
    await diffRefresh()
    productDiffTemp.diff = ''
    productDiffTemp._id = ''
  },
  // 修改產品難易度
  async put() {
    const { data } = await putProductDiff(productDiff, productDiffTemp)
    await diffRefresh()
    productDiffTemp.diff = data.value.data.diff
    productDiffTemp._id = data.value.data._id
  }
}

// 產品環境 store
const productEnvStore = useProductEnv()
// 產品環境 method
const { getProductEnv, postProductEnv, deleteProductEnv, putProductEnv } =
  productEnvStore
// 取得產品環境
const { data: env, refresh: envRefresh } = await getProductEnv()

// 若沒設定則預設為空陣列
const productEnv = computed(() => env.value?.data ?? [])
// 待操作環境儲存
const productEnvTemp = reactive({
  env: '',
  _id: ''
})
// 產品環境操作
const productEnvMethods = {
  // 選擇待操作環境
  select(value, id) {
    productEnvTemp.env = value
    productEnvTemp._id = id
  },
  // 新增產品環境
  async post() {
    const { data } = await postProductEnv(productEnvTemp)
    await envRefresh()
    productEnvTemp.env = data.value.data.env
    productEnvTemp._id = data.value.data._id
  },
  // 刪除產品環境
  async delete() {
    await deleteProductEnv(productEnvTemp)
    await envRefresh()
    productEnvTemp.env = ''
    productEnvTemp._id = ''
  },
  // 修改產品環境
  async put() {
    const { data } = await putProductEnv(productEnv, productEnvTemp)
    await envRefresh()
    productEnvTemp.env = data.value.data.env
    productEnvTemp._id = data.value.data._id
  }
}

// 產品單元標題
// 若沒設定則預設為空字串
const title = ref(setting.value?.data[0]?.name ?? '')

// banner 儲存
// 若沒設定則預設為空字串
const banner = reactive({
  desktop: setting.value?.data[0]?.banner?.desktop ?? '',
  mobile: setting.value?.data[0]?.banner?.mobile ?? '',
  color: setting.value?.data[0]?.banner?.color ?? 'black'
})

// desktop banner 已選取圖片
const selectedDesktopBanner = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == banner.desktop) {
      obj.selected = true
    }
    return obj
  })
])

// 更新 desktop banner 圖片
const updateDesktopBanner = () => {
  banner.desktop = selectedDesktopBanner.filter((obj) => obj.selected)[0].link

  // 關閉選擇圖片燈箱
  toggleDesktopBannerModal()
}

// 選擇 desktop banner 圖片
const selectDesktopBanner = (id, limit) => {
  const target = selectedDesktopBanner.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedDesktopBanner.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}

// 取消選擇 desktop banner 圖片
const cancelSelectDesktopBanner = (temp) => {
  selectedDesktopBanner.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleDesktopBannerModal()
}

// banner desktop 選擇燈箱開關狀態
const desktopBannerModalState = ref(false)
// banner desktop 開關 modal
const toggleDesktopBannerModal = () => {
  if (desktopBannerModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  desktopBannerModalState.value = !desktopBannerModalState.value
}

// mobile banner 已選取圖片
const selectedMobileBanner = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == banner.mobile) {
      obj.selected = true
    }
    return obj
  })
])

// 更新 mobile banner 圖片
const updateMobileBanner = () => {
  banner.mobile = selectedMobileBanner.filter((obj) => obj.selected)[0].link

  // 關閉選擇圖片燈箱
  toggleMobileBannerModal()
}

// 選擇 mobile banner 圖片
const selectMobileBanner = (id, limit) => {
  const target = selectedMobileBanner.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedMobileBanner.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}

// 取消選擇 mobile banner 圖片
const cancelSelectMobileBanner = (temp) => {
  selectedMobileBanner.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleMobileBannerModal()
}

// mobile desktop 選擇燈箱開關狀態
const mobileBannerModalState = ref(false)
// mobile desktop 開關 modal
const toggleMobileBannerModal = () => {
  if (mobileBannerModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  mobileBannerModalState.value = !mobileBannerModalState.value
}

// 送出表單
const submitForm = async () => {
  const postData = {}
  postData.name = title.value
  // toRaw 解除響應
  postData.banner = toRaw(banner)
  await putProductSetting(postData)
  await settingRefresh()
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          單元設定
        </h2>
        <div class="flex justify-between">
          <h1 class="text-l font-bold text-gray-900 dark:text-white">
            產品專欄
          </h1>
          <button
            type="submit"
            class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <CheckIcon class="mr-2 h-4 w-4" />
            儲存修改
          </button>
        </div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="title"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >單元標題</label
          >
          <input
            id="title"
            v-model="title"
            type="text"
            name="title"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入單元標題"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <p
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            產品分類
          </p>
          <div v-if="productCatalog.length" class="mb-4 w-full">
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(item, key) in productCatalog"
                :key="key"
                class="cursor-pointer"
                @click="productCatalogMethods.select(item.catalog, item._id)"
              >
                <span
                  class="mr-2 rounded border border-blue-400 bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-gray-700 dark:text-blue-400"
                  >{{ item.catalog }} : {{ item.type }}</span
                >
              </li>
            </ul>
          </div>
          <div class="flex w-full">
            <div class="relative w-full">
              <input
                v-model="productCatalogTemp.catalog"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="請選擇分類"
              />
            </div>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productCatalogMethods.post()"
            >
              <span>新增</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productCatalogMethods.delete()"
            >
              <span>刪除</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productCatalogMethods.put()"
            >
              <span>修改</span>
            </button>
          </div>
        </div>
        <div class="sm:col-span-2">
          <p
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            產品尺寸
          </p>
          <div v-if="productSize.length" class="mb-4 w-full">
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(item, key) in productSize"
                :key="key"
                class="cursor-pointer"
                @click="productSizeMethods.select(item.size, item._id)"
              >
                <span
                  class="mr-2 rounded border border-blue-400 bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-gray-700 dark:text-blue-400"
                  >{{ item.size }}</span
                >
              </li>
            </ul>
          </div>
          <div class="flex w-full">
            <div class="relative w-full">
              <input
                v-model="productSizeTemp.size"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="請選擇分類"
              />
            </div>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productSizeMethods.post()"
            >
              <span>新增</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productSizeMethods.delete()"
            >
              <span>刪除</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productSizeMethods.put()"
            >
              <span>修改</span>
            </button>
          </div>
        </div>
        <div class="sm:col-span-2">
          <p
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            產品難易度
          </p>
          <div v-if="productDiff.length" class="mb-4 w-full">
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(item, key) in productDiff"
                :key="key"
                class="cursor-pointer"
                @click="productDiffMethods.select(item.diff, item._id)"
              >
                <span
                  class="mr-2 rounded border border-blue-400 bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-gray-700 dark:text-blue-400"
                  >{{ item.diff }}</span
                >
              </li>
            </ul>
          </div>
          <div class="flex w-full">
            <div class="relative w-full">
              <input
                v-model="productDiffTemp.diff"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="請選擇分類"
              />
            </div>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productDiffMethods.post()"
            >
              <span>新增</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productDiffMethods.delete()"
            >
              <span>刪除</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productDiffMethods.put()"
            >
              <span>修改</span>
            </button>
          </div>
        </div>
        <div class="sm:col-span-2">
          <p
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            產品環境
          </p>
          <div v-if="productEnv.length" class="mb-4 w-full">
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(item, key) in productEnv"
                :key="key"
                class="cursor-pointer"
                @click="productEnvMethods.select(item.env, item._id)"
              >
                <span
                  class="mr-2 rounded border border-blue-400 bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-gray-700 dark:text-blue-400"
                  >{{ item.env }}</span
                >
              </li>
            </ul>
          </div>
          <div class="flex w-full">
            <div class="relative w-full">
              <input
                v-model="productEnvTemp.env"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="請選擇分類"
              />
            </div>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productEnvMethods.post()"
            >
              <span>新增</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productEnvMethods.delete()"
            >
              <span>刪除</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="productEnvMethods.put()"
            >
              <span>修改</span>
            </button>
          </div>
        </div>
        <div class="sm:col-span-2">
          <p
            class="mb-4 block text-sm font-medium text-gray-900 dark:text-white"
          >
            選擇單元 banner 圖片
          </p>
          <p
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            banner 文字顏色
          </p>
          <div class="mb-4 flex items-center gap-4">
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                v-model="banner.color"
                type="radio"
                name="fontColor"
                value="black"
                class="peer sr-only"
              />
              <div
                class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
              ></div>
              <span
                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >黑色</span
              >
            </label>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                v-model="banner.color"
                type="radio"
                name="fontColor"
                value="white"
                class="peer sr-only"
              />
              <div
                class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
              ></div>
              <span
                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >白色</span
              >
            </label>
          </div>
          <div
            class="grid gap-4 rounded-lg border border-dashed border-primary-700 p-4 sm:grid-cols-2"
          >
            <div
              class="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-primary-100 p-4 text-sm hover:bg-primary-200 dark:bg-primary-700 dark:hover:bg-primary-800"
              @click="toggleDesktopBannerModal()"
            >
              <img
                v-if="banner.desktop"
                class="h-full w-full object-contain"
                :src="banner.desktop"
                alt=""
              />
              <div v-else class="text-center">
                <p class="mb-1 text-sm">請選擇電腦版，單元 banner 圖片</p>
                <p class="text-xs">PNG, JPG or GIF / 1920 * 600</p>
              </div>
            </div>
            <div
              class="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-primary-100 p-4 text-sm hover:bg-primary-200 dark:bg-primary-700 dark:hover:bg-primary-800"
              @click="toggleMobileBannerModal()"
            >
              <img
                v-if="banner.mobile"
                class="h-full w-full object-contain"
                :src="banner.mobile"
                alt=""
              />
              <div v-else class="text-center">
                <p class="mb-1 text-sm">請選擇手機版，單元 banner 圖片</p>
                <p class="text-xs">PNG, JPG or GIF / ??? * ???</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- banner desktop -->
    <ModalSelectImage
      v-show="desktopBannerModalState"
      :images="selectedDesktopBanner"
      @update-image="updateDesktopBanner"
      @select-image="selectDesktopBanner"
      @cancel-select-image="cancelSelectDesktopBanner"
      @toggle-modal="toggleDesktopBannerModal"
    />
    <!-- banner mobile -->
    <ModalSelectImage
      v-show="mobileBannerModalState"
      :images="selectedMobileBanner"
      @update-image="updateMobileBanner"
      @select-image="selectMobileBanner"
      @cancel-select-image="cancelSelectMobileBanner"
      @toggle-modal="toggleMobileBannerModal"
    />
  </div>
</template>
