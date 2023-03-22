import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useArticleGetOutlines = defineStore('ArticleGetOutlines', () => {
  const articleOutlines = reactive([])

  const fetchArticleOutlines = async () => {
    try {
      const { data } = await useFetch(
        'http://localhost:3000/api/article'
      ).json()

      articleOutlines.push(...data.value.data)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    articleOutlines,
    fetchArticleOutlines
  }
})
