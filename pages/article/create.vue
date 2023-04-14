<script setup>
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'

import { storeToRefs } from 'pinia'
import { useArticleGetCatalogs, useArticlePostDetail } from '@/stores/article'

// 文章分類 store
const articleCatalogsStore = useArticleGetCatalogs()
// 文章分類
const { articleCatalogs } = storeToRefs(articleCatalogsStore)
// 取得文章分類
const { getArticleCatalogs } = articleCatalogsStore

// 文章建立 store
const postArticleDetailStore = useArticlePostDetail()
// 上傳文章內容
const { postArticleDetail } = postArticleDetailStore

// 文章 outline 儲存
const outlineStore = reactive({
  title: '',
  image: '',
  catalog: '請選擇文章分類'
})

// 更新 outline title 設定
const onUpdateTitle = (value) => {
  outlineStore.title = value
}
// 更新 outline catalog 設定
const onUpdateCatalog = (value) => {
  outlineStore.catalog = value
}
// 更新 outline image 設定
const onUpdateImage = (value) => {
  outlineStore.image = value
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
const onUpdateStyle = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).style = value
}
// 更新 paragraph content 設定
const onUpdateContent = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).content = value
}
// 更新 paragraph 圖片設定
const onUpdateImages = (id, modalImages) => {
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

// 確定選擇列表縮圖
const updateImage = (modalImages) => {
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)

  outlineStore.image = targets[0]

  toggleOutlineModal()
}

// 取消選擇列表縮圖
const cancelSelectImage = (modalImages) => {
  modalImages.forEach((obj) => {
    obj.selected = false
  })

  toggleOutlineModal()
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

onMounted(async () => {
  await getArticleCatalogs()
})
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
        :catalogs="articleCatalogs"
        @on-update-title="onUpdateTitle"
        @on-update-catalog="onUpdateCatalog"
        @on-update-image="onUpdateImage"
        @toggle-modal="toggleOutlineModal"
      />
      <ArticleParagraph
        v-for="(item, key) in paragraphStore"
        :key="key"
        :paragraph="item"
        @on-update-style="onUpdateStyle"
        @on-update-content="onUpdateContent"
        @on-update-images="onUpdateImages"
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
      @update-image="updateImage"
      @cancel-select-image="cancelSelectImage"
      @toggle-modal="toggleOutlineModal"
    />
  </div>
</template>