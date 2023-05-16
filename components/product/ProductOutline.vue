<script setup>
const props = defineProps({
  outline: {
    type: Object,
    default() {
      return {}
    }
  },
  catalog: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits([
  'updateTitle',
  'updateCatalog',
  'updateType',
  'updatePrice',
  'updateStock',
  'toggleModal'
])

const title = computed(() => props.outline?.title)
const image = computed(() => props.outline?.image)
const catalog = computed(() => props.outline?.catalog)
const type = computed(() => props.outline?.type)
const price = computed(() => props.outline?.price)
const stock = computed(() => props.outline?.stock)
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
    <div class="sm:col-span-2">
      <label
        for="name"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >產品名稱</label
      >
      <input
        id="name"
        :value="title"
        type="text"
        name="name"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        placeholder="請輸入產品名稱"
        required
        @input="$emit('updateTitle', $event.target.value)"
      />
    </div>
    <div class="w-full">
      <label
        for="catalog"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >產品分類</label
      >
      <select
        id="catalog"
        name="catalog"
        :value="catalog"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        required
        @change="$emit('updateCatalog', $event.target.value)"
      >
        <option selected disabled hidden>請選擇產品分類</option>
        <option
          v-for="(option, key) in props.catalog"
          :key="key"
          :value="option.catalog"
        >
          {{ option.catalog }}
        </option>
      </select>
    </div>
    <div class="w-full">
      <label
        for="type"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >產品類型</label
      >
      <select
        id="type"
        name="type"
        :value="type"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        required
        @change="$emit('updateType', $event.target.value)"
      >
        <option value="" selected disabled hidden>請選擇產品類型</option>
        <option value="plants">plants</option>
        <option value="other">other</option>
      </select>
    </div>
    <div class="w-full">
      <label
        for="price"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >產品價格</label
      >
      <input
        id="price"
        :value="price"
        type="number"
        min="0"
        max="999999"
        name="price"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        placeholder="請輸入產品價格"
        required
        @input="$emit('updatePrice', $event.target.value)"
      />
    </div>
    <div class="w-full">
      <label
        for="stock"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >庫存數量</label
      >
      <input
        id="stock"
        :value="stock"
        type="number"
        name="stock"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        placeholder="請輸入庫存數量"
        required
        @input="$emit('updateStock', $event.target.value)"
      />
    </div>
    <div class="flex gap-4 sm:col-span-2 sm:gap-6">
      <div class="shrink-0">
        <label
          for="brand"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >選擇列表縮圖</label
        >
        <button
          class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          @click="$emit('toggleModal')"
        >
          請選擇圖片
        </button>
      </div>
      <div v-if="image" class="flex-auto">
        <img :src="image" alt="" />
      </div>
    </div>
  </div>
</template>
