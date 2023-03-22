<script setup>
import { useArticleGetOutlines } from '@/stores/article/useArticleGetOutlines'

const articleOutlineStore = useArticleGetOutlines()

onBeforeMount(() => {
  articleOutlineStore.fetchArticleOutlines()
})
</script>

<template>
  <div
    class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
  >
    <TableNavbar />
    <TableContainer :list="articleOutlineStore.articleOutlines" />
    <!-- <TableFooter /> -->
  </div>
</template>
