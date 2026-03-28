<template>
  <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      <div class="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2" style="height: 400px">
      <div class="p-4 space-y-2 border-r border-gray-200 dark:border-gray-700">
        <div v-for="i in 8" :key="i" class="h-3 rounded animate-pulse" :class="i % 3 === 0 ? 'w-2/3 bg-gray-200 dark:bg-gray-700' : 'w-full bg-gray-200 dark:bg-gray-700'" />
      </div>
      <div class="flex items-center justify-center text-gray-400 dark:text-gray-500">
        Loading playground...
      </div>
    </div>
  </div>
</template>
