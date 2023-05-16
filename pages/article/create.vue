<script setup>
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'

import { useArticleCatalog, useArticleDetail } from '@/stores/article'
import { useMedia } from '@/stores/media'

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 文章分類 store
const articleCatalogStore = useArticleCatalog()
// 文章分類 method
const { getArticleCatalog } = articleCatalogStore
// 文章分類
const { data: catalog } = await getArticleCatalog()
const articleCatalog = computed(() => catalog.value.data)

// 文章建立 store
const articleDetailStore = useArticleDetail()
// 文章建立 method
const { postArticleDetail } = articleDetailStore

// 文章 outline 儲存
const outlineStore = reactive({
  title: '',
  image: '',
  catalog: '請選擇文章分類'
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
// 新增段落
const addParagraph = () => {
  paragraphStore.push({
    id: paragraphStore.length,
    style: 'single',
    images: [],
    content: ''
  })
}

// 送出表單 (新增)
const submitForm = async () => {
  const postData = {}
  postData.title = outlineStore.title
  postData.image = outlineStore.image
  postData.catalog = outlineStore.catalog
  // toRaw 解除響應
  postData.contents = toRaw(paragraphStore)

  await postArticleDetail(postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4 flex justify-between">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          新增一則文章
        </h2>
        <button
          type="submit"
          class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <CheckIcon class="mr-2 h-4 w-4" />
          送出文章
        </button>
      </div>
      <ArticleOutline
        :outline="outlineStore"
        :catalog="articleCatalog"
        @update-title="updateOutlineTitle"
        @update-catalog="updateOutlineCatalog"
        @toggle-modal="toggleOutlineModal"
      />
      <ArticleParagraph
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
