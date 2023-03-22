<script setup>
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

console.log(...props.list)
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="p-4">
            <div class="flex items-center">
              <input
                id="checkbox-all"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
              />
              <label for="checkbox-all" class="sr-only">checkbox</label>
            </div>
          </th>
          <th scope="col" class="px-4 py-3">Product</th>
          <th scope="col" class="px-4 py-3">Category</th>
          <th scope="col" class="px-4 py-3">Last Update</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(tr, key) in props.list"
          :key="key"
          class="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
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
        </tr>
      </tbody>
    </table>
  </div>
</template>
