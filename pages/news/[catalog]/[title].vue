<script setup>
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/solid'

import { useNewsCatalogs, useNewsDetail } from '@/stores/news'
import { useMedia } from '@/stores/media'

const route = useRoute()
const { catalog, title } = route.params

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 最新消息分類 store
const newsCatalogsStore = useNewsCatalogs()
// 最新消息分類 method
const { getNewsCatalogs } = newsCatalogsStore
// 最新消息分類
const { data: catalogs } = await getNewsCatalogs()
const newsCatalogs = computed(() => catalogs.value.data)

// 最新消息 detail 建立 store
const newsDetailStore = useNewsDetail()
// 最新消息 detail 建立 method
const { getNewsDetail, putNewsDetail, deleteNewsDetail } = newsDetailStore
// 最新消息 detail
const { data: detail } = await getNewsDetail(catalog, title)
const newsDetail = computed(() => detail.value.data)

// 最新消息 id
const $id = ref(newsDetail.value._id)

// 最新消息 outline 儲存
const outlineStore = reactive({
  title: newsDetail.value.outline.title,
  image: newsDetail.value.outline.image,
  catalog: newsDetail.value.outline.catalog.catalog
})

// 更新 outline title 設定
const updateOutlineTitle = (value) => {
  outlineStore.title = value
}
// 更新 outline catalog 設定
const updateOutlineCatalog = (value) => {
  outlineStore.catalog = value
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

// 段落儲存
const paragraphStore = reactive([
  ...newsDetail.value.contents.map((obj, id) => {
    return {
      id,
      style: obj.style,
      images: obj.images,
      content: obj.content
    }
  })
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

// 刪除最新消息
const deleteDetail = async () => {
  await deleteNewsDetail($id, catalog, title)
}

// 送出表單 (修改)
const submitForm = async () => {
  const postData = {}
  postData.id = $id.value
  postData.title = outlineStore.title
  postData.image = outlineStore.image
  postData.catalog = outlineStore.catalog
  // toRaw 解除響應
  postData.contents = toRaw(paragraphStore)
  postData.contents.forEach((obj) => {
    obj.images = toRaw(obj.images)
  })

  await putNewsDetail(catalog, title, postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm($event)">
      <div class="mb-4">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          編輯最新消息
        </h2>
        <div class="flex justify-between">
          <h1 class="text-l font-bold text-gray-900 dark:text-white">
            {{ newsDetail?.outline?.title }}
          </h1>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="deleteDetail"
            >
              <TrashIcon class="mr-2 h-4 w-4" />
              刪除最新消息
            </button>
            <button
              type="submit"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <CheckIcon class="mr-2 h-4 w-4" />
              修改最新消息
            </button>
          </div>
        </div>
      </div>
      <NewsOutline
        :outline="outlineStore"
        :catalogs="newsCatalogs"
        @update-title="updateOutlineTitle"
        @update-catalog="updateOutlineCatalog"
        @toggle-modal="toggleOutlineModal"
      />
      <NewsParagraph
        v-for="(item, key) in paragraphStore"
        :key="key"
        :paragraph="item"
        @update-style="updateParagraphStyle"
        @update-content="updateParagraphContent"
        @update-images="updateParagraphImages"
      />
    </form>
    <ModalSelectImage
      v-show="outlineModalState"
      :images="selectedOutlineImage"
      @update-image="updateOutlineImage"
      @select-image="selectOutlineImage"
      @cancel-select-image="cancelSelectOutlineImage"
      @toggle-modal="toggleOutlineModal"
    />
  </div>
</template>
