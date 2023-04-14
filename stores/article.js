import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

// 取得文章分類
export const useArticleGetCatalogs = defineStore(
  'articleGetCatalogs',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBaseUrl: API_BASE_URL } = runtimeConfig

    const articleCatalogs = reactive([])

    const getArticleCatalogs = async () => {
      try {
        const { data } = await useFetch(
          `${API_BASE_URL}/api/article/catalogs`
        ).json()

        articleCatalogs.splice(0, articleCatalogs.length, ...data.value.data)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      articleCatalogs,
      getArticleCatalogs
    }
  },
  {
    persist: true
  }
)

// 取得文章 outlines
export const useArticleGetOutlines = defineStore('articleGetOutlines', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig

  const articleOutlines = reactive([])

  const getArticleOutlines = async () => {
    try {
      const { data } = await useFetch(`${API_BASE_URL}/api/article`).json()
      articleOutlines.splice(0, articleOutlines.length, ...data.value.data)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    articleOutlines,
    getArticleOutlines
  }
})

// 新增文章
export const useArticlePostDetail = defineStore('articlePostDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig

  const postArticleDetail = async (postData) => {
    try {
      await useFetch(`${API_BASE_URL}/api/article/detail`)
        .post(postData, null)
        .json()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    postArticleDetail
  }
})

// 取得特定文章
export const useArticleGetDetail = defineStore('useArticleGetDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig

  const articleDetail = reactive({})

  const getArticleDetail = async (catalog, title) => {
    try {
      const { data } = await useFetch(
        `${API_BASE_URL}/api/article/${catalog}/${title}`
      ).json()

      Object.keys(articleDetail).forEach((key) => delete articleDetail[key])
      Object.assign(articleDetail, data.value.data)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    articleDetail,
    getArticleDetail
  }
})

// 更新特定文章
export const useArticleUpdateDetail = defineStore(
  'useArticleUpdateDetail',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBaseUrl: API_BASE_URL } = runtimeConfig

    const updateArticleDetail = async (catalog, title, postData) => {
      try {
        await useFetch(`${API_BASE_URL}/api/article/${catalog}/${title}`)
          .post(postData, null)
          .json()
      } catch (error) {
        console.error(error)
      }
    }

    return {
      updateArticleDetail
    }
  }
)
