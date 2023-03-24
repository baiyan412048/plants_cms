<script setup>
import { useArticleGetCatalogs, useArticleGetOutlines } from '@/stores/article'

const articleCatalogsStore = useArticleGetCatalogs()
const articleOutlineStore = useArticleGetOutlines()

onBeforeMount(() => {
  articleCatalogsStore.getArticleCatalogs()
  articleOutlineStore.getArticleOutlines()
})
</script>

<template>
  <div
    class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
  >
    <TableNavbar :catalogs="articleCatalogsStore.articleCatalogs" />
    <TableContainer :list="articleOutlineStore.articleOutlines" />
    <!-- <TableFooter /> -->
  </div>
</template>
