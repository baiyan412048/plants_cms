import { defineStore } from 'pinia'

// 單元設定
export const useNewsSetting = defineStore('newsSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getNewsSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/setting`,
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
  const putNewsSetting = async (postData) => {
    try {
      await useFetch(`${API_BASE_URL}/api/news/setting`, {
        method: 'POST',
        body: postData,
        pick: ['data']
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { getNewsSetting, putNewsSetting }
})

// 最新消息分類
export const useNewsCatalogs = defineStore('newsCatalogs', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得最新消息分類
  const getNewsCatalogs = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/catalogs`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  // 新增最新消息分類
  const postNewsCatalogs = async ({ catalog }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/catalog`,
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

  // 刪除最新消息分類
  const deleteNewsCatalogs = async ({ catalog, id }) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/catalog/${id}`,
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

  // 修改最新消息分類
  const putNewsCatalogs = async (catalogs, { catalog, id }) => {
    // 是否為新的分類名稱
    if (catalogs.value.some((obj) => obj._id == id && obj.catalog == catalog)) {
      return
    }

    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/catalog/${id}`,
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
    getNewsCatalogs,
    postNewsCatalogs,
    deleteNewsCatalogs,
    putNewsCatalogs
  }
})

// 最新消息 outlines
export const useNewsOutlines = defineStore('newsOutlines', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getNewsOutlines = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news`,
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
    getNewsOutlines
  }
})

// 最新消息 Detail
export const useNewsDetail = defineStore('newsDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getNewsDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/${catalog}/${title}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const postNewsDetail = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/detail`,
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

  const putNewsDetail = async (postData) => {
    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/${id}`,
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

  const deleteNewsDetail = async (id) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/${title}`,
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
    getNewsDetail,
    postNewsDetail,
    putNewsDetail,
    deleteNewsDetail
  }
})
