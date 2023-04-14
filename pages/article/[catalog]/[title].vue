<script setup>
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/solid'

import { storeToRefs } from 'pinia'
import {
  useArticleGetCatalogs,
  useArticleGetDetail,
  useArticleUpdateDetail
} from '@/stores/article'

const route = useRoute()
const { catalog, title } = route.params

// 文章 id
const $id = ref('')

// 文章分類 store
const articleCatalogsStore = useArticleGetCatalogs()
// 文章分類
const { articleCatalogs } = storeToRefs(articleCatalogsStore)
// 取得文章分類
const { getArticleCatalogs } = articleCatalogsStore

// 文章內容 store
const articleDetailStore = useArticleGetDetail()
// 文章內容
const { articleDetail } = storeToRefs(articleDetailStore)
// 取得文章內容
const { getArticleDetail } = articleDetailStore

// 文章更新 store
const articleUpdateDetailStore = useArticleUpdateDetail()
// 更新文章內容
const { updateArticleDetail } = articleUpdateDetailStore

// 文章 outline 儲存
const outlineStore = reactive({
  title: articleDetail.value?.outline?.title,
  image: articleDetail.value?.outline?.image,
  catalog: articleDetail.value?.outline?.catalog
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
const paragraphStore = reactive([])

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
const clearImage = (modalImages) => {
  modalImages.forEach((obj) => {
    obj.selected = false
  })

  toggleOutlineModal()
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

  await updateArticleDetail(catalog, title, postData)
}

onMounted(async () => {
  await getArticleCatalogs()
  await getArticleDetail(catalog, title)

  $id.value = articleDetail.value._id

  outlineStore.title = articleDetail.value?.outline?.title
  outlineStore.image = articleDetail.value?.outline?.image
  outlineStore.catalog = articleDetail.value?.outline?.catalog.catalog

  articleDetail.value?.contents?.forEach((obj, id) => {
    paragraphStore.push({
      id,
      style: obj.style,
      images: obj.images,
      content: obj.content
    })
  })
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm($event)">
      <div class="mb-4">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          編輯文章
        </h2>
        <div class="flex justify-between">
          <h1 class="text-l font-bold text-gray-900 dark:text-white">
            {{ articleDetail?.outline?.title }}
          </h1>
          <div class="grid grid-cols-2 gap-4">
            <button
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <TrashIcon class="mr-2 h-4 w-4" />
              刪除文章
            </button>
            <button
              type="submit"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <CheckIcon class="mr-2 h-4 w-4" />
              修改文章
            </button>
          </div>
        </div>
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
    </form>
    <ModalSelectImage
      v-show="outlineModalState"
      @update-image="updateImage"
      @clear-image="clearImage"
      @toggle-modal="toggleOutlineModal"
    />
  </div>
</template>
