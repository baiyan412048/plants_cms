<script setup>
import { useFileSizeFormat } from '@/stores/filters'
import { useMediaStore } from '@/stores/media'

import {
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/vue/24/solid'

// media store
const mediaStore = useMediaStore()

const fileSizeFormat = useFileSizeFormat()

onBeforeMount(() => {
  // 取得所有圖片
  mediaStore.getImages()
})
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
            <input
              type="file"
              class="hidden"
              @change="mediaStore.uploadImage"
            />
            <PlusIcon class="mr-2 h-4 w-4" />
            新增圖片
          </label>
        </div>
      </div>
    </div>
    <ul class="mb-6 grid gap-8 p-5 md:grid-cols-4 lg:mb-16">
      <li v-for="(image, key) in mediaStore.images" :key="key">
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
              @click="mediaStore.deleteImage(image.deletehash)"
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
                {{ fileSizeFormat.formatBytes(image.size) }}</span
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
    <nav
      class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">1000</span>
      </span>
      <ul class="inline-flex items-stretch -space-x-px">
        <li>
          <a
            href="#"
            class="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white py-1.5 px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="z-10 flex items-center justify-center border border-primary-300 bg-primary-50 px-3 py-2 text-sm leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >...</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >100</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white py-1.5 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="sass"></style>
