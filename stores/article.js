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
export const useArticleCatalogs = defineStore('articleCatalogs', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得文章分類
  const getArticleCatalogs = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalogs`,
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
  const postArticleCatalogs = async ({ catalog }) => {
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
  const deleteArticleCatalogs = async ({ catalog, _id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog/${catalog}`,
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

  // 修改文章分類
  const putArticleCatalogs = async (catalogs, { catalog, _id }) => {
    // 是否為新的分類名稱
    if (
      catalogs.value.some((obj) => obj._id == _id && obj.catalog == catalog)
    ) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog/${catalog}`,
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
    getArticleCatalogs,
    postArticleCatalogs,
    deleteArticleCatalogs,
    putArticleCatalogs
  }
})

// 文章 outlines
export const useArticleOutlines = defineStore('articleOutlines', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getArticleOutlines = async () => {
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
    getArticleOutlines
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

  const putArticleDetail = async (catalog, title, postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/${catalog}/${title}`,
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

  const deleteArticleDetail = async (id, catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/${catalog}/${title}`,
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

  return {
    getArticleDetail,
    postArticleDetail,
    putArticleDetail,
    deleteArticleDetail
  }
})
