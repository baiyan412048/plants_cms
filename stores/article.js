import { defineStore } from 'pinia'

// 單元設定
export const useArticleSetting = defineStore('articleSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getArticleSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/setting`,
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
  const putArticleSetting = async (postData) => {
    try {
      await useFetch(`${API_BASE_URL}/api/article/setting`, {
        method: 'POST',
        body: postData,
        pick: ['data']
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { getArticleSetting, putArticleSetting }
})

// 文章分類
export const useArticleCatalog = defineStore('articleCatalog', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得文章分類
  const getArticleCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增文章分類
  const postArticleCatalog = async (catalog) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog`,
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

  // 刪除文章分類
  const deleteArticleCatalog = async ({ catalog, id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog/${id}`,
        {
          method: 'DELETE',
          body: {
            catalog
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 修改文章分類
  const putArticleCatalog = async (catalogs, { catalog, id }) => {
    // 是否為新的分類名稱
    if (catalogs.value.some((obj) => obj._id == id && obj.catalog == catalog)) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog/${id}`,
        {
          method: 'PUT',
          body: {
            catalog
          }
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getArticleCatalog,
    postArticleCatalog,
    deleteArticleCatalog,
    putArticleCatalog
  }
})

// 文章 outlines
export const useArticleOutline = defineStore('articleOutline', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getArticleOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article`,
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
    getArticleOutline
  }
})

// 文章 Detail
export const useArticleDetail = defineStore('articleDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getArticleDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/${catalog}/${title}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const postArticleDetail = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/detail`,
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

  const putArticleDetail = async (postData) => {
    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/${id}`,
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

  const deleteArticleDetail = async (id) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/${id}`,
        {
          method: 'DELETE',
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getArticleDetail,
    postArticleDetail,
    putArticleDetail,
    deleteArticleDetail
  }
})
