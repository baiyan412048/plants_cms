<script setup></script>

<template>
  <div class="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-t-lg">
    <div
      class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4"
    >
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>
