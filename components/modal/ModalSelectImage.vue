<script setup>
import { PlusIcon, CheckCircleIcon } from '@heroicons/vue/24/solid'
import { useMedia } from '@/stores/media'

const props = defineProps({
  images: {
    type: Array,
    default() {
      return []
    }
  },
  limit: {
    type: Number,
    default() {
      return 1
    }
  }
})

const emit = defineEmits([
  'updateImage',
  'selectImage',
  'cancelSelectImage',
  'toggleModal'
])

// media store
const mediaStore = useMedia()
// media method
const { uploadMediaImage } = mediaStore

// 已選取圖片
const selectedImages = computed(() =>
  props.images.filter((obj) => obj.selected)
)

// 圖片渲染 computed
const modalImages = computed(() => props.images)

// 已選擇圖片暫存 ( 上一步 )
const selectTemp = reactive([])

const onUpdateImage = () => {
  selectTemp.splice(
    0,
    selectTemp.length,
    ...selectedImages.value.map((obj) => obj.id)
  )
  emit('updateImage', selectTemp)
}

const onSelectImage = (id) => {
  emit('selectImage', id, props.limit)
}

const onCancelSelectImage = () => {
  emit('cancelSelectImage', selectTemp)
}

// 更新圖片
// const refreshImages = async () => {
//   const temp = await getMediaImages()
//   images.splice(0, images.length, ...temp)
// }

const onUploadImage = async (event) => {
  await uploadMediaImage(event)
}
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 flex h-[calc(100%-1rem)] w-full items-center justify-center overflow-x-hidden bg-gray-900 bg-opacity-50 p-4 dark:bg-opacity-80 md:inset-0 md:h-full"
    role="dialog"
  >
    <div class="relative h-full w-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            已上傳圖片
          </h3>
          <button
            type="button"
            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            @click="$emit('toggleModal')"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div
          class="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto p-6 md:grid-cols-3"
        >
          <div
            v-for="(image, key) in modalImages"
            :key="key"
            class="modal-images relative rounded-lg bg-white shadow dark:bg-gray-800"
            :class="{ active: image.selected }"
            @click="onSelectImage(image.id)"
          >
            <CheckCircleIcon
              v-show="image.selected"
              class="absolute top-1 right-1 z-10 h-6 w-6 rounded-full bg-white text-primary-700"
            />
            <div class="pointer-events-none relative">
              <img
                class="rounded-t-lg"
                :src="image.link"
                :alt="image.name"
                referrerpolicy="no-referrer"
              />
            </div>
            <div class="pointer-events-none p-2">
              <p
                class="break-words text-sm tracking-tight text-gray-900 dark:text-white"
              >
                {{ image.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center justify-between space-x-6 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
        >
          <div class="flex items-center space-x-2">
            <button
              type="button"
              class="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click="onUpdateImage"
            >
              選取
            </button>
            <button
              type="button"
              class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              @click="onCancelSelectImage"
            >
              取消
            </button>
          </div>
          <label
            class="flex cursor-pointer items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <input type="file" class="hidden" @change="onUploadImage" />
            <PlusIcon class="mr-2 h-4 w-4" />
            新增圖片
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-images.active::before {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: block;
  border: 2px solid #0369a1;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  content: '';
}
</style>
