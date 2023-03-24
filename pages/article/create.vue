<script setup>
import { initFlowbite } from 'flowbite'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { useArticleGetCatalogs } from '@/stores/article'

// 段落儲存
const paragraph = reactive([])
// 段落預產
const paragraphModel = reactive({
  style: 'single',
  images: [],
  content: ''
})

// 文章分類 store
const articleCatalogsStore = useArticleGetCatalogs()

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

onBeforeMount(() => {
  // 取得文章分類
  articleCatalogsStore.getArticleCatalogs()
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form action="#">
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
            data-modal-target="mediaModal"
            data-modal-toggle="mediaModal"
            class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
          >
            請選擇圖片
          </button>
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
            v-model="paragraphModel.style"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          >
            <option value="single">single</option>
            <option value="double">double</option>
          </select>
        </div>
        <div class="w-full">
          <label
            for="brand"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >選擇段落圖片</label
          >
          <button
            data-modal-target="mediaModal"
            data-modal-toggle="mediaModal"
            class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
          >
            請選擇圖片
          </button>
          <div
            id="user_avatar_help"
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
          >
            最多選擇 4 張圖片
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
            v-model="paragraphModel.content"
            rows="8"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Your description here"
          ></textarea>
        </div>
      </div>
    </form>
    <ModalSelectImage />
  </div>
</template>
