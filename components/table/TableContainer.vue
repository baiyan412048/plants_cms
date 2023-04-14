<script setup></script>

<template>
  <div class="min-h-[20vh] overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <slot name="thead"></slot>
      <slot name="tbody"></slot>
    </table>
  </div>
</template>
