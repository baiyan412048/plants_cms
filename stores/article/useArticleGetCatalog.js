import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useArticleGetCatalog = defineStore('articleGetCatalog', () => {
  const articleCatalogs = reactive([])

  const fetchArticleCatalog = async () => {
    try {
      const { data } = await useFetch(
        'http://localhost:3000/api/article/catalogs'
      ).json()

      articleCatalogs.push(...data.value.data)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    articleCatalogs,
    fetchArticleCatalog
  }
})
