import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

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

export const useArticleGetCatalogs = defineStore('articleGetCatalogs', () => {
  const articleCatalogs = reactive([])

  const getArticleCatalogs = async () => {
    try {
      const { data } = await useFetch(
        'https://api.baiyan777.com/api/article/catalogs'
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
})
