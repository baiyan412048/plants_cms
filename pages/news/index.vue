<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'

import { useNewsSetting, useNewsCatalogs } from '@/stores/news'
import { useMedia } from '@/stores/media'

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 單元設定 store
const newsSettingStore = useNewsSetting()
// 單元設定 method
const { getNewsSetting, putNewsSetting } = newsSettingStore
const { data: setting, refresh: settingRefresh } = await getNewsSetting()

// 最新消息分類 store
const newsCatalogsStore = useNewsCatalogs()
// 最新消息分類 method
const {
  getNewsCatalogs,
  postNewsCatalogs,
  deleteNewsCatalogs,
  putNewsCatalogs
} = newsCatalogsStore
// 取得最新消息分類
const { data: res, refresh: catalogRefresh } = await getNewsCatalogs()

// 最新消息單元標題
// 若沒設定則預設為空字串
const title = ref(setting.value?.data[0].name ?? '')

// 最新消息分類
// 若沒設定則預設為空陣列
const catalogs = computed(() => res.value?.data ?? [])

// 待操作分類儲存
const catalogTemp = reactive({
  catalog: '',
  _id: ''
})
// 選擇待操作分類
const selectCatalog = (value, id) => {
  catalogTemp.catalog = value
  catalogTemp._id = id
}
// 新增最新消息分類
const postCatalog = async () => {
  const { data } = await postNewsCatalogs(catalogTemp)
  await catalogRefresh()
  catalogTemp.catalog = data.value.data.catalog
  catalogTemp._id = data.value.data._id
}
// 刪除最新消息分類
const deleteCatalog = async () => {
  await deleteNewsCatalogs(catalogTemp)
  await catalogRefresh()
  catalogTemp.catalog = ''
  catalogTemp._id = ''
}
// 修改最新消息分類
const putCatalog = async () => {
  const { data } = await putNewsCatalogs(catalogs, catalogTemp)
  await catalogRefresh()
  catalogTemp.catalog = data.value.data.catalog
  catalogTemp._id = data.value.data._id
}

// banner 儲存
// 若沒設定則預設為空字串
const banner = reactive({
  desktop: setting.value?.data[0]?.banner?.desktop ?? '',
  mobile: setting.value?.data[0]?.banner?.mobile ?? ''
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
  await putNewsSetting(postData)
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
            最新消息專欄
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
            for="name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >單元標題</label
          >
          <input
            id="name"
            v-model="title"
            type="text"
            name="name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入單元標題"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label
            for="catalog"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >最新消息分類</label
          >
          <div v-if="catalogs.length" class="mb-4 w-full">
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="(catalog, key) in catalogs"
                :key="key"
                class="cursor-pointer"
                @click="selectCatalog(catalog.catalog, catalog._id)"
              >
                <span
                  class="mr-2 rounded border border-blue-400 bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-gray-700 dark:text-blue-400"
                  >{{ catalog.catalog }}</span
                >
              </li>
            </ul>
          </div>
          <div class="flex w-full">
            <label for="simple-search" class="sr-only">請選擇分類</label>
            <div class="relative w-full">
              <input
                id="simple-search"
                v-model="catalogTemp.catalog"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="請選擇分類"
              />
            </div>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="postCatalog"
            >
              <span>新增</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="deleteCatalog"
            >
              <span>刪除</span>
            </button>
            <button
              class="ml-2 block shrink-0 rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="putCatalog"
            >
              <span>修改</span>
            </button>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="brand"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >選擇單元 banner 圖片</label
          >
          <div
            class="grid gap-4 rounded-lg border border-dashed border-primary-700 p-4 sm:grid-cols-2 sm:gap-6"
          >
            <div
              class="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-primary-100 p-4 text-sm hover:bg-primary-200 dark:bg-primary-700 dark:hover:bg-primary-800"
              @click="toggleDesktopBannerModal()"
            >
              <img
                v-if="banner.desktop"
                class="object-contain"
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
                class="object-contain"
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
