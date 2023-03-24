<script setup>
import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon
} from '@heroicons/vue/24/solid'

const props = defineProps({
  catalogs: {
    type: Array,
    default() {
      return []
    }
  }
})
</script>

<template>
  <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-t-lg">
    <div
      class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4"
    >
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
      <div
        class="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3"
      >
        <NuxtLink
          to="/article/create"
          class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <PlusIcon class="mr-2 h-4 w-4" />
          Add product
        </NuxtLink>
        <div class="flex w-full items-center space-x-3 md:w-auto">
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
            Actions
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
                  >Mass Edit</a
                >
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >Delete all</a
              >
            </div>
          </div>
          <button
            id="filterDropdownButton"
            data-dropdown-toggle="filterDropdown"
            class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
            type="button"
          >
            <FunnelIcon class="mr-2 h-4 w-4 text-gray-500" />
            Filter
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
                v-for="(catalog, key) in catalogs"
                :key="key"
                class="flex items-center"
              >
                <input
                  id="apple"
                  type="checkbox"
                  value=""
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary-600"
                />
                <label
                  for="apple"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {{ catalog.catalog }}
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
