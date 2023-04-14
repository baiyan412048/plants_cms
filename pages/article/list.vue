<script setup>
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon
} from '@heroicons/vue/24/solid'

import { initFlowbite } from 'flowbite'
import { storeToRefs } from 'pinia'
import { useArticleGetCatalogs, useArticleGetOutlines } from '@/stores/article'

// 文章分類 store
const articleCatalogsStore = useArticleGetCatalogs()
// 文章分類
const { articleCatalogs } = storeToRefs(articleCatalogsStore)
// 取得文章分類
const { getArticleCatalogs } = articleCatalogsStore

// 文章 outline store
const articleOutlineStore = useArticleGetOutlines()
// 文章 outline
const { articleOutlines } = storeToRefs(articleOutlineStore)
// 取得文章 outline
const { getArticleOutlines } = articleOutlineStore

const filterCatalog = reactive([])

const changeFilter = (target) => {
  console.log(target, 'target')
  console.log(target.checked, 'checked')
  console.log(target.value, 'value')
  console.log(
    filterCatalog.findIndex((value) => value == target.value),
    'index'
  )

  if (target.checked) {
    filterCatalog.push(target.value)
  } else {
    filterCatalog.splice(
      filterCatalog.findIndex((value) => value == target.value),
      1
    )
  }
}

onMounted(async () => {
  await getArticleCatalogs()
  await getArticleOutlines()

  initFlowbite()

  filterCatalog.splice(
    0,
    filterCatalog.length,
    ...articleCatalogs.value.map((obj) => obj.catalog)
  )
})
</script>

<template>
  <div
    class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
  >
    <TableNavbar>
      <template #left>
        <div class="w-full md:w-1/2">
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
      </template>
      <template #right>
        <div
          class="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3"
        >
          <div class="flex w-full items-center space-x-3 md:w-auto">
            <NuxtLink
              to="/article/create"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <PlusIcon class="mr-2 h-4 w-4" />
              新增文章
            </NuxtLink>
            <button
              id="actionsDropdownButton"
              data-dropdown-toggle="actionsDropdown"
              class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
              type="button"
            >
              <svg
                class="-ml-1 mr-1.5 h-5 w-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
              功能
            </button>
            <div
              id="actionsDropdown"
              class="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
            >
              <ul
                class="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="actionsDropdownButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >刪除全部</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >刪除已選取</a
                  >
                </li>
              </ul>
              <!-- <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >刪除已選取</a
                >
              </div> -->
            </div>
            <button
              id="filterDropdownButton"
              data-dropdown-toggle="filterDropdown"
              class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
              type="button"
            >
              <FunnelIcon class="mr-2 h-4 w-4 text-gray-500" />
              篩選
              <svg
                class="-mr-1 ml-1.5 h-5 w-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              id="filterDropdown"
              class="z-10 hidden w-48 rounded-lg bg-white p-3 shadow dark:bg-gray-700"
            >
              <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                <li
                  v-for="(catalog, key) in articleCatalogs"
                  :key="key"
                  class="flex items-center"
                >
                  <input
                    :id="catalog.catalog"
                    type="checkbox"
                    checked
                    :value="catalog.catalog"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                    @input="changeFilter($event.target)"
                  />
                  <label
                    :for="catalog.catalog"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ catalog.catalog }}
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </TableNavbar>
    <TableContainer>
      <template #thead>
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                />
                <label for="checkbox-all" class="sr-only">checkbox</label>
              </div>
            </th>
            <th class="px-4 py-3">Product</th>
            <th class="px-4 py-3">Category</th>
            <th class="px-4 py-3">Last Update</th>
            <th class="px-4 py-3">Action</th>
          </tr>
        </thead>
      </template>
      <template #tbody>
        <tbody>
          <template v-for="(tr, key) in articleOutlines" :key="key">
            <tr
              v-if="filterCatalog.includes(tr.catalog.catalog)"
              class="border-b dark:border-gray-600"
            >
              <td class="w-4 px-4 py-3">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    onclick="event.stopPropagation()"
                    class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only"
                    >checkbox</label
                  >
                </div>
              </td>
              <td
                class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
              >
                {{ tr.title }}
              </td>
              <td class="px-4 py-2">
                <span
                  class="rounded bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                  >{{ tr.catalog.catalog }}</span
                >
              </td>
              <td
                class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
              >
                Just now
              </td>
              <td
                class="whitespace-nowrap px-4 py-2 font-bold text-gray-900 dark:text-white"
              >
                <NuxtLink
                  :to="`/article/${tr.catalog.catalog}/${tr.title}`"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  編輯
                </NuxtLink>
              </td>
            </tr>
          </template>
        </tbody>
      </template>
    </TableContainer>
  </div>
</template>
