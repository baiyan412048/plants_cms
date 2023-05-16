<script setup>
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/solid'
import Multiselect from '@vueform/multiselect'
import {
  useProductCatalog,
  useProductSize,
  useProductDiff,
  useProductEnv,
  useProductRelevant,
  useProductDetail
} from '@/stores/product'
import { useMedia } from '@/stores/media'

const route = useRoute()
const { params } = route

// media store
const mediaStore = useMedia()
// media method
const { getMediaImages } = mediaStore
const mediaImagesTemp = await getMediaImages()

// 產品相關 store
const productRelevantStore = useProductRelevant()
// 產品相關 method
const { getProductPurchase } = productRelevantStore
// 加購商品
const { data: purchase } = await getProductPurchase()
const productPurchase = computed(() => {
  if (!purchase.value?.data) return []

  return purchase.value?.data.map((obj) => {
    return {
      value: obj._id,
      label: obj.title
    }
  })
})

// 產品分類 store
const productCatalogStore = useProductCatalog()
// 產品分類 method
const { getProductCatalog } = productCatalogStore
// 產品分類
const { data: catalog } = await getProductCatalog()
const productCatalog = computed(() => catalog.value?.data ?? [])

// 產品尺寸 store
const productSizeStore = useProductSize()
// 產品尺寸 method
const { getProductSize } = productSizeStore
// 取得產品尺寸
const { data: size, refresh: sizeRefresh } = await getProductSize()
const productSize = computed(() => size.value?.data ?? [])

// 產品難易度 store
const productDiffStore = useProductDiff()
// 產品難易度 method
const { getProductDiff } = productDiffStore
// 取得產品難易度
const { data: diff, refresh: diffRefresh } = await getProductDiff()
const productDiff = computed(() => diff.value?.data ?? [])

// 產品環境 store
const productEnvStore = useProductEnv()
// 產品環境 method
const { getProductEnv } = productEnvStore
// 取得產品環境
const { data: env, refresh: envRefresh } = await getProductEnv()
const productEnv = computed(() => env.value?.data ?? [])

// 產品建立 store
const productDetailStore = useProductDetail()
// 產品建立 method
const { getProductDetail, putProductDetail, deleteProductDetail } =
  productDetailStore
// 產品
const { data: detail } = await getProductDetail(params.catalog, params.title)
const productDetail = computed(() => detail.value.data)

// 產品 id
const $id = ref(productDetail.value._id)

// 產品 outline 儲存
const outlineStore = reactive({
  title: productDetail.value.outline.title,
  image: productDetail.value.outline.image,
  catalog: productDetail.value.outline.catalog.catalog,
  type: productDetail.value.outline.catalog.type,
  stock: productDetail.value.outline.stock,
  price: productDetail.value.outline.price
})

// 更新 outline title 設定
const updateOutlineTitle = (value) => {
  outlineStore.title = value
}
// 更新 outline catalog 設定
const updateOutlineCatalog = (value) => {
  outlineStore.catalog = value
}
// 更新 outline type 設定
const updateOutlineType = (value) => {
  outlineStore.type = value
}
// 更新 outline price 設定
const updateOutlinePrice = (value) => {
  outlineStore.price = value
}
// 更新 outline stock 設定
const updateOutlineStock = (value) => {
  outlineStore.stock = value
}
// outline 已選取圖片
const selectedOutlineImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (obj.link == outlineStore.image) {
      obj.selected = true
    }
    return obj
  })
])
// 更新 outline 圖片
const updateOutlineImage = () => {
  outlineStore.image = selectedOutlineImage.filter(
    (obj) => obj.selected
  )[0].link

  // 關閉選擇圖片燈箱
  toggleOutlineModal()
}
// 選擇 outline 圖片
const selectOutlineImage = (id, limit) => {
  const target = selectedOutlineImage.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedOutlineImage.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}
// 取消選擇 outline 圖片
const cancelSelectOutlineImage = (temp) => {
  selectedOutlineImage.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleOutlineModal()
}
// 燈箱開關狀態
const outlineModalState = ref(false)
// 開關 modal
const toggleOutlineModal = () => {
  if (outlineModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  outlineModalState.value = !outlineModalState.value
}

// 其他細項設定
const detailSetting = reactive({
  dep: productDetail.value.dep,
  notes: productDetail.value.notes,
  purchase: productDetail.value?.purchase.map((obj) => obj._id) ?? [],
  slides: productDetail.value?.slides ?? [],
  size: productDetail.value.outline.size.size
})
// 植物類別細項設定
const plantsDetailSetting = reactive({
  diff: productDetail.value.outline.diff.diff,
  env: productDetail.value.outline.env.env
})

// 其他細項輪播 已選取圖片
const selectedSlidersImage = reactive([
  // 深拷貝原陣列
  ...JSON.parse(JSON.stringify(mediaImagesTemp)).map((obj) => {
    obj.selected = false
    if (detailSetting.slides.includes(obj.link)) {
      obj.selected = true
    }
    return obj
  })
])
// 更新 其他細項輪播 圖片
const updateSlidersImage = () => {
  const targets = selectedSlidersImage
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)

  detailSetting.slides.splice(0, selectedSlidersImage.length, ...targets)

  // 關閉選擇圖片燈箱
  toggleSlidersModal()
}
// 選擇 其他細項輪播 圖片
const selectSlidersImage = (id, limit) => {
  const target = selectedSlidersImage.find((obj) => obj.id === id)
  if (target) {
    target.selected = !target.selected
  }
  // 最大選取數量
  if (selectedSlidersImage.filter((obj) => obj.selected).length > limit) {
    target.selected = !target.selected
  }
}
// 取消選擇 其他細項輪播 圖片
const cancelSelectSlidersImage = (temp) => {
  selectedSlidersImage.forEach((obj) => {
    obj.selected = false
    if (temp.includes(obj.id)) {
      obj.selected = true
    }
  })

  // 關閉選擇圖片燈箱
  toggleSlidersModal()
}
// 燈箱開關狀態
const slidesModalState = ref(false)
// 開關 modal
const toggleSlidersModal = () => {
  if (slidesModalState.value) {
    document.body.classList.remove('overflow-hidden')
  } else {
    document.body.classList.add('overflow-hidden')
  }
  slidesModalState.value = !slidesModalState.value
}

// 植物介紹段落儲存
const paragraphStore = reactive([
  ...productDetail.value.contents.map((obj, id) => {
    return {
      id,
      style: obj.style,
      images: obj.images,
      content: obj.content
    }
  })
])
// 更新 paragraph style 設定
const updateParagraphStyle = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).style = value
}
// 更新 paragraph content 設定
const updateParagraphContent = (id, value) => {
  paragraphStore.find((obj) => obj.id == id).content = value
}
// 更新 paragraph 圖片設定
const updateParagraphImages = (id, modalImages) => {
  const store = paragraphStore.find((obj) => obj.id == id).images
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)
  store.splice(0, store.length, ...targets)
}

// 包裝服務段落儲存
const packageStore = reactive([
  ...productDetail.value.package.map((obj, id) => {
    return {
      id,
      style: obj.style,
      images: obj.images,
      content: obj.content
    }
  })
])
// 更新 package style 設定
const updatePackageStyle = (id, value) => {
  packageStore.find((obj) => obj.id == id).style = value
}
// 更新 package content 設定
const updatePackageContent = (id, value) => {
  packageStore.find((obj) => obj.id == id).content = value
}
// 更新 package 圖片設定
const updatePackageImages = (id, modalImages) => {
  const store = packageStore.find((obj) => obj.id == id).images
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)
  store.splice(0, store.length, ...targets)
}

// 照護方式段落儲存
const careStore = reactive([
  ...productDetail.value.care.map((obj, id) => {
    return {
      id,
      style: obj.style,
      images: obj.images,
      content: obj.content
    }
  })
])
// 更新 package style 設定
const updateCareStyle = (id, value) => {
  careStore.find((obj) => obj.id == id).style = value
}
// 更新 package content 設定
const updateCareContent = (id, value) => {
  careStore.find((obj) => obj.id == id).content = value
}
// 更新 package 圖片設定
const updateCareImages = (id, modalImages) => {
  const store = careStore.find((obj) => obj.id == id).images
  const targets = modalImages
    .filter((obj) => obj.selected)
    .map((obj) => obj.link)
  store.splice(0, store.length, ...targets)
}

// 刪除產品
const deleteDetail = async () => {
  await deleteProductDetail($id, params.catalog, params.title)
}

// 送出表單 (修改)
const submitForm = async () => {
  const postData = {}
  postData.id = $id.value
  // outline
  postData.title = outlineStore.title
  postData.image = outlineStore.image
  postData.catalog = outlineStore.catalog
  postData.type = outlineStore.type
  postData.price = outlineStore.price
  postData.stock = outlineStore.stock
  // more detail
  postData.slides = toRaw(detailSetting.slides)
  postData.dep = detailSetting.dep
  postData.notes = detailSetting.notes
  postData.purchase = detailSetting.purchase
  postData.size = detailSetting.size
  // plants type setting
  postData.diff = plantsDetailSetting.diff
  postData.env = plantsDetailSetting.env
  // 內容介紹
  // toRaw 解除響應
  postData.contents = toRaw(paragraphStore)
  postData.package = toRaw(packageStore)
  postData.care = toRaw(careStore)

  await putProductDetail(params.catalog, params.title, postData)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          編輯產品
        </h2>
        <div class="flex items-center justify-between">
          <h1 class="text-l font-bold text-gray-900 dark:text-white">
            {{ productDetail?.outline?.title }}
          </h1>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              @click.prevent="deleteDetail"
            >
              <TrashIcon class="mr-2 h-4 w-4" />
              刪除產品
            </button>
            <button
              type="submit"
              class="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <CheckIcon class="mr-2 h-4 w-4" />
              修改產品
            </button>
          </div>
        </div>
      </div>
      <!-- <pre>{{ outlineStore }}</pre>
      <pre>{{ detailSetting }}</pre>
      <pre>{{ plantsDetailSetting }}</pre> -->
      <ProductOutline
        :outline="outlineStore"
        :catalog="productCatalog"
        @update-title="updateOutlineTitle"
        @update-catalog="updateOutlineCatalog"
        @update-type="updateOutlineType"
        @update-price="updateOutlinePrice"
        @update-stock="updateOutlineStock"
        @toggle-modal="toggleOutlineModal"
      />
      <div class="mt-4 flex gap-4 sm:col-span-2 sm:mt-6 sm:gap-6">
        <div class="shrink-0">
          <label
            for="brand"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >選擇內頁輪播圖</label
          >
          <button
            class="block rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            type="button"
            @click="toggleSlidersModal"
          >
            請選擇圖片
          </button>
        </div>
        <ul v-if="detailSetting.slides" class="grid sm:grid-cols-4 sm:gap-6">
          <li v-for="(src, key) in detailSetting.slides" :key="key">
            <img :src="src" alt="" />
          </li>
        </ul>
      </div>
      <div class="mt-4 sm:col-span-2 sm:mt-6">
        <label
          for="dep"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >產品描述</label
        >
        <textarea
          id="dep"
          v-model="detailSetting.dep"
          rows="4"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder="請輸入產品描述"
          required
        ></textarea>
      </div>
      <div class="mt-4 sm:col-span-2 sm:mt-6">
        <label
          for="notes"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >購物須知</label
        >
        <textarea
          id="notes"
          v-model="detailSetting.notes"
          rows="4"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder="請輸入購物須知"
          required
        ></textarea>
      </div>
      <div class="mt-4 sm:col-span-2 sm:mt-6">
        <label
          for="purchase"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >加購商品</label
        >
        <Multiselect
          v-model="detailSetting.purchase"
          mode="tags"
          placeholder="請選擇加購商品"
          :close-on-select="false"
          :options="productPurchase"
        />
      </div>
      <div class="mt-4 flex gap-4 sm:col-span-2 sm:mt-6 sm:gap-6">
        <div class="w-full">
          <label
            for="size"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >產品尺寸</label
          >
          <select
            id="size"
            v-model="detailSetting.size"
            name="size"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          >
            <option value="" selected disabled hidden>請選擇產品尺寸</option>
            <option
              v-for="(option, key) in productSize"
              :key="key"
              :value="option.size"
            >
              {{ option.size }}
            </option>
          </select>
        </div>
        <div v-if="outlineStore.type == 'plants'" class="w-full">
          <label
            for="diff"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >種植難易度</label
          >
          <select
            id="diff"
            v-model="plantsDetailSetting.diff"
            name="diff"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          >
            <option value="" selected disabled hidden>請選擇種植難易度</option>
            <option
              v-for="(option, key) in productDiff"
              :key="key"
              :value="option.diff"
            >
              {{ option.diff }}
            </option>
          </select>
        </div>
        <div v-if="outlineStore.type == 'plants'" class="w-full">
          <label
            for="env"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >適合環境</label
          >
          <select
            id="env"
            v-model="plantsDetailSetting.env"
            name="env"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            required
          >
            <option value="" selected disabled hidden>請選擇適合環境</option>
            <option
              v-for="(option, key) in productEnv"
              :key="key"
              :value="option.env"
            >
              {{ option.env }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-4 sm:mt-6">
        <h2 class="text-l font-bold text-gray-900 dark:text-white">產品介紹</h2>
        <ProductParagraph
          v-for="(item, key) in paragraphStore"
          :key="key"
          :paragraph="item"
          @update-style="updateParagraphStyle"
          @update-content="updateParagraphContent"
          @update-images="updateParagraphImages"
        />
      </div>
      <div class="mt-4 sm:mt-6">
        <h2 class="text-l font-bold text-gray-900 dark:text-white">包裝服務</h2>
        <ProductParagraph
          v-for="(item, key) in packageStore"
          :key="key"
          :paragraph="item"
          @update-style="updatePackageStyle"
          @update-content="updatePackageContent"
          @update-images="updatePackageImages"
        />
      </div>
      <div class="mt-4 sm:mt-6">
        <h2 class="text-l font-bold text-gray-900 dark:text-white">照護方式</h2>
        <ProductParagraph
          v-for="(item, key) in careStore"
          :key="key"
          :paragraph="item"
          @update-style="updateCareStyle"
          @update-content="updateCareContent"
          @update-images="updateCareImages"
        />
      </div>
    </form>
    <ModalSelectImage
      v-show="outlineModalState"
      :images="selectedOutlineImage"
      @update-image="updateOutlineImage"
      @select-image="selectOutlineImage"
      @cancel-select-image="cancelSelectOutlineImage"
      @toggle-modal="toggleOutlineModal"
    />
    <ModalSelectImage
      v-show="slidesModalState"
      :images="selectedSlidersImage"
      :limit="6"
      @update-image="updateSlidersImage"
      @select-image="selectSlidersImage"
      @cancel-select-image="cancelSelectSlidersImage"
      @toggle-modal="toggleSlidersModal"
    />
  </div>
</template>

<style scoped>
@import '@vueform/multiselect/themes/default.css';
</style>
