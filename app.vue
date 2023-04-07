<template>
  <div>
    <NuxtLoadingIndicator />
    <BaseNavbar />
    <div class="flex">
      <BaseAside />
      <section
        class="min-h-screen w-10/12 border-l border-gray-200 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-900 sm:py-5 lg:py-16"
      >
        <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <NuxtPage />
        </div>
      </section>
    </div>
  </div>
</template>
