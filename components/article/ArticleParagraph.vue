<script setup>
const props = defineProps({
  paragraph: {
    type: Object,
    default() {
      return {}
    }
  }
})

const emit = defineEmits(['onUpdateStyle', 'onUpdateContent', 'onUpdateImages'])

const style = computed(() => props.paragraph?.style)
const content = computed(() => props.paragraph?.content)
const images = computed(() => props.paragraph?.images)

// 確定選擇圖片
const updateImage = (modalImages) => {
  emit('onUpdateImages', props.paragraph.id, modalImages)
  toggleModal()
}

// 取消選擇圖片
const cancelSelectImage = (modalImages) => {
  modalImages.forEach((obj) => {
    obj.selected = false
    if (images.value.includes(obj.link)) {
      obj.selected = true
    }
  })

  toggleModal()
}

// 燈箱開關狀態
const modalState = ref(false)
// 開關 modal
const toggleModal = () => {
  if (modalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  modalState.value = !modalState.value
}
</script>

<template>
  <div class="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6">
    <div class="w-full">
      <label
        for="category"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >段落圖片樣式</label
      >
      <select
        id="category"
        :value="style"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        @change="
          $emit('onUpdateStyle', props.paragraph.id, $event.target.value)
        "
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
        class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
        @click="toggleModal"
      >
        請選擇圖片
      </button>
      <div class="mt-1 text-sm text-gray-500 dark:text-gray-300">
        最多選擇 4 張圖片
      </div>
    </div>
    <div v-if="images.length" class="sm:col-span-2">
      <div
        for="description"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        已選擇圖片
      </div>
      <ul class="grid sm:grid-cols-4 sm:gap-6">
        <li v-for="(src, key) in images" :key="key">
          <img :src="src" alt="" />
        </li>
      </ul>
    </div>
    <div class="sm:col-span-2">
      <label
        for="description"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >段落內容</label
      >
      <textarea
        id="description"
        :value="content"
        rows="8"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        placeholder="Your description here"
        @input="
          $emit('onUpdateContent', props.paragraph.id, $event.target.value)
        "
      ></textarea>
    </div>
    <ModalSelectImage
      v-show="modalState"
      :selected-image="images"
      :limit="4"
      @update-image="updateImage"
      @cancel-select-image="cancelSelectImage"
      @toggle-modal="toggleModal"
    />
  </div>
</template>
