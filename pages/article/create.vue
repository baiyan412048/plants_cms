<script setup>
import { CheckIcon, PlusIcon } from '@heroicons/vue/24/solid'

import { useArticleGetCatalogs } from '@/stores/article'

// 段落儲存
const paragraphStore = reactive([
  {
    id: 0,
    style: 'single',
    images: [],
    content: ''
  }
])

// 新增段落
const addParagraph = () => {
  paragraphStore.push({
    id: paragraphStore.length,
    style: 'single',
    images: [],
    content: ''
  })
}

// 文章分類 store
const articleCatalogsStore = useArticleGetCatalogs()

// 更新 style 設定
const onUpdateStyle = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).style = value
}
// 更新 content 設定
const onUpdateContent = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).content = value
}
// 更新圖片設定
const onUpdateImages = (id, src, add) => {
  if (add) {
    paragraphStore.find((obj) => obj.id == id).images.push(src)
  } else {
    const images = paragraphStore.find((obj) => obj.id == id).images
    const index = images.findIndex((img) => img == src)
    images.splice(index, 1)
  }
}

onBeforeMount(() => {
  // 取得文章分類
  articleCatalogsStore.getArticleCatalogs()
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form action="#">
      <pre v-for="(item, key) in paragraphStore" :key="key">{{ item }}</pre>
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
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="sm:col-span-2">
          <label
            for="name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >文章標題</label
          >
          <input
            id="name"
            type="text"
            name="name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="請輸入文章標題"
            required
          />
        </div>
        <div class="w-full">
          <label
            for="category"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >文章分類</label
          >
          <select
            id="category"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option selected>請選擇文章分類</option>
            <option
              v-for="(option, key) in articleCatalogsStore.articleCatalogs"
              :key="key"
              :value="option"
            >
              {{ option.catalog }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <label
            for="brand"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >選擇列表縮圖</label
          >
          <button
            class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
          >
            請選擇圖片
          </button>
        </div>
      </div>
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
  </div>
</template>
