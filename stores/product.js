import { defineStore } from 'pinia'

// 單元設定
export const useProductSetting = defineStore('productSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getProductSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/setting`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改單元設定
  const putProductSetting = async (postData) => {
    try {
      await useFetch(`${API_BASE_URL}/api/product/setting`, {
        method: 'POST',
        body: postData,
        pick: ['data']
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { getProductSetting, putProductSetting }
})

// 產品分類
export const useProductCatalog = defineStore('productCatalog', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得產品分類
  const getProductCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/catalog`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增產品分類
  const postProductCatalog = async ({ catalog }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/catalog`,
        {
          method: 'POST',
          body: {
            catalog
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除產品分類
  const deleteProductCatalog = async ({ catalog, _id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/catalog/${catalog}`,
        {
          method: 'DELETE',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改產品分類
  const putProductCatalog = async (catalogs, { catalog, _id }) => {
    // 是否為新的分類名稱
    if (
      catalogs.value.some((obj) => obj._id == _id && obj.catalog == catalog)
    ) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/catalog/${catalog}`,
        {
          method: 'PUT',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductCatalog,
    postProductCatalog,
    deleteProductCatalog,
    putProductCatalog
  }
})

// 產品尺寸
export const useProductSize = defineStore('productSize', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得產品分類
  const getProductSize = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/size`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增產品分類
  const postProductSize = async ({ size }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/size`,
        {
          method: 'POST',
          body: {
            size
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除產品分類
  const deleteProductSize = async ({ size, _id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/size/${size}`,
        {
          method: 'DELETE',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改產品分類
  const putProductSize = async (sizes, { size, _id }) => {
    // 是否為新的分類名稱
    if (sizes.value.some((obj) => obj._id == _id && obj.size == size)) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/size/${size}`,
        {
          method: 'PUT',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductSize,
    postProductSize,
    deleteProductSize,
    putProductSize
  }
})

// 產品難易度
export const useProductDiff = defineStore('productDiff', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得產品難易度
  const getProductDiff = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/diff`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增產品難易度
  const postProductDiff = async ({ diff }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/diff`,
        {
          method: 'POST',
          body: {
            diff
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除產品難易度
  const deleteProductDiff = async ({ diff, _id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/diff/${diff}`,
        {
          method: 'DELETE',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改產品難易度
  const putProductDiff = async (diffs, { diff, _id }) => {
    // 是否為新的難易度名稱
    if (diffs.value.some((obj) => obj._id == _id && obj.diff == diff)) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/diff/${diff}`,
        {
          method: 'PUT',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductDiff,
    postProductDiff,
    deleteProductDiff,
    putProductDiff
  }
})

// 產品環境
export const useProductEnv = defineStore('productEnv', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得產品環境
  const getProductEnv = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/env`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增產品環境
  const postProductEnv = async ({ env }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/env`,
        {
          method: 'POST',
          body: {
            env
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除產品環境
  const deleteProductEnv = async ({ env, _id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/env/${env}`,
        {
          method: 'DELETE',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改產品環境
  const putProductEnv = async (catalogs, { env, _id }) => {
    // 是否為新的環境名稱
    if (catalogs.value.some((obj) => obj._id == _id && obj.env == env)) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/env/${env}`,
        {
          method: 'PUT',
          body: {
            _id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductEnv,
    postProductEnv,
    deleteProductEnv,
    putProductEnv
  }
})

// 產品相關
export const useProductRelevant = defineStore('useProductRelevant', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得產品優惠
  const getProductDiscount = async (title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/discount${title ? `/${title}` : ''}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增產品優惠
  const postProductDiscount = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/discount`,
        {
          method: 'POST',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除產品優惠
  const deleteProductDiscount = async (postData) => {
    const { title } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/discount/${title}`,
        {
          method: 'DELETE',
          body: postData
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改產品優惠
  const putProductDiscount = async (postData) => {
    const { title } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/discount/${title}`,
        {
          method: 'PUT',
          body: postData
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 取得加購商品
  const getProductPurchase = async (title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/purchase${title ? `/${title}` : ''}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增加購商品
  const postProductPurchase = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/purchase`,
        {
          method: 'POST',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除加購商品
  const deleteProductPurchase = async (id, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/purchase/${title}`,
        {
          method: 'DELETE',
          body: {
            id
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改加購商品
  const putProductPurchase = async (postData) => {
    const { title } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/purchase/${title}`,
        {
          method: 'PUT',
          body: postData
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductDiscount,
    postProductDiscount,
    deleteProductDiscount,
    putProductDiscount,
    getProductPurchase,
    postProductPurchase,
    deleteProductPurchase,
    putProductPurchase
  }
})

// 產品 outline
export const useProductOutline = defineStore('productOutline', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getProductOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductOutline
  }
})

// 產品 Detail
export const useProductDetail = defineStore('productDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得產品 Detail
  const getProductDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/${catalog}${title ? `/${title}` : ''}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增產品 Detail
  const postProductDetail = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/detail`,
        {
          method: 'POST',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 刪除產品 Detail
  const deleteProductDetail = async (id, catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/${catalog}/${title}`,
        {
          method: 'DELETE',
          body: {
            id
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 更新產品 Detail
  const putProductDetail = async (catalog, title, postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/${catalog}/${title}`,
        {
          method: 'PUT',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getProductDetail,
    postProductDetail,
    deleteProductDetail,
    putProductDetail
  }
})
