<script setup>
import {
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/vue/24/solid'

import { useFileSizeFormat } from '@/stores/filters'
import { useMedia } from '@/stores/media'

// 圖片尺寸單位
const fileSizeFormat = useFileSizeFormat()
const { formatBytes } = fileSizeFormat
// media store
const mediaStore = useMedia()
// media method
const { getMediaImages, uploadMediaImage, deleteMediaImage } = mediaStore
// 取得所有圖片
// const images = await getMediaImages()
const images = reactive([...(await getMediaImages())])

// 更新圖片
const refreshImages = async () => {
  const temp = await getMediaImages()
  images.splice(0, images.length, ...temp)
}

// 上傳圖片
const uploadImage = async (event) => {
  await uploadMediaImage(event)
  await refreshImages()
}

// 刪除圖片
const deleteIImage = async (hash) => {
  await deleteMediaImage(hash)
  await refreshImages()
}
</script>

<template>
  <div
    class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
  >
    <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-t-lg">
      <div
        class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4"
      >
        <div class="w-full md:w-1/4">
          <form class="flex items-center">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3"
              >
                <MagnifyingGlassIcon class="h-4 w-4 text-gray-900" />
              </div>
              <input
                id="simple-search"
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Search"
                required=""
              />
            </div>
          </form>
        </div>
        <div
          class="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3"
        >
          <label
            class="flex cursor-pointer items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <input type="file" class="hidden" @change="uploadImage" />
            <PlusIcon class="mr-2 h-4 w-4" />
            新增圖片
          </label>
        </div>
      </div>
    </div>
    <ul class="grid gap-5 p-5 md:grid-cols-4">
      <li v-for="(image, key) in images" :key="key">
        <div class="rounded-lg bg-white shadow dark:bg-gray-800">
          <div class="relative">
            <img
              class="rounded-t-lg"
              :src="image.link"
              :alt="image.name"
              referrerpolicy="no-referrer"
            />
            <div
              class="absolute bottom-2 right-2 z-10 cursor-pointer rounded-full bg-red-500 p-2"
              @click="deleteIImage(image.deletehash)"
            >
              <TrashIcon class="h-5 w-5 text-white" />
            </div>
          </div>
          <div class="p-5">
            <div class="mb-2 flex">
              <span
                class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
              >
                {{ image.type }}</span
              >
              <span
                class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
              >
                {{ formatBytes(image.size) }}</span
              >
            </div>
            <p
              class="break-words text-lg font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ image.name }}
            </p>
            <!-- <pre>{{ image }}</pre> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="sass"></style>
