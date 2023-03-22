<script setup>
import { useArticleGetCatalog } from '@/stores/article/useArticleGetCatalog'

// 段落儲存
const paragraph = reactive([])
// 段落預產
const paragraphModel = reactive({})
// 取得文章分類
const articleCatalogStore = useArticleGetCatalog()

onBeforeMount(() => {
  articleCatalogStore.fetchArticleCatalog()
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      新增一則文章
    </h2>
    <form action="#">
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
              v-for="(option, key) in articleCatalogStore.articleCatalogs"
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
            >文章列表縮圖</label
          >
          <input
            id="user_avatar"
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            type="file"
          />
        </div>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div class="w-full">
          <label
            for="category"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >段落圖片樣式</label
          >
          <select
            id="category"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option selected value="single">single</option>
            <option value="double">double</option>
          </select>
        </div>
        <div class="w-full">
          <label
            for="brand"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >段落圖片上傳</label
          >
          <input
            id="user_avatar"
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            type="file"
            multiple
            accept="image/*"
          />
          <div
            id="user_avatar_help"
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
          >
            最多上傳 4 張圖片
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="description"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >段落內容</label
          >
          <textarea
            id="description"
            rows="8"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Your description here"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        class="mt-4 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 sm:mt-6"
      >
        Add product
      </button>
    </form>
  </div>
</template>
