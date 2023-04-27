<script setup>
import { useMedia } from '@/stores/media'

const props = defineProps({
  paragraph: {
    type: Object,
    default() {
      return {}
    }
  }
})

const emit = defineEmits(['updateStyle', 'updateContent', 'updateImages'])

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

const style = computed(() => props.paragraph?.style)
const content = computed(() => props.paragraph?.content)
const images = computed(() => props.paragraph?.images)

// paragraph 已選取圖片
const selectedParagraphImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (images.value.includes(obj.link)) {
      obj.selected = true
    }
    return obj
  })
])
// 更新 paragraph 圖片
const updateParagraphImage = () => {
  emit('updateImages', props.paragraph.id, selectedParagraphImage)

  // 關閉選擇圖片燈箱
  toggleParagraphModal()
}
// 選擇 paragraph 圖片
const selectParagraphImage = (id, limit) => {
  const target = selectedParagraphImage.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedParagraphImage.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}
// 取消選擇 paragraph 圖片
const cancelSelectParagraphImage = (temp) => {
  selectedParagraphImage.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleParagraphModal()
}
// 燈箱開關狀態
const paragraphModalState = ref(false)
// 開關 modal
const toggleParagraphModal = () => {
  if (paragraphModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  paragraphModalState.value = !paragraphModalState.value
}
</script>

<template>
  <div class="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
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
        required
        @change="$emit('updateStyle', props.paragraph.id, $event.target.value)"
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
        @click="toggleParagraphModal"
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
        @input="$emit('updateContent', props.paragraph.id, $event.target.value)"
      ></textarea>
    </div>
    <ModalSelectImage
      v-show="paragraphModalState"
      :images="selectedParagraphImage"
      :limit="4"
      @update-image="updateParagraphImage"
      @select-image="selectParagraphImage"
      @cancel-select-image="cancelSelectParagraphImage"
      @toggle-modal="toggleParagraphModal"
    />
  </div>
</template>
