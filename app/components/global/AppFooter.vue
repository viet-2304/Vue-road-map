<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
      <p>&copy; {{ new Date().getFullYear() }} Vue Advanced Concepts</p>
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-white transition-colors">
          Home
        </NuxtLink>
        <a
          href="https://roadmap.sh/vue"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          roadmap.sh/vue
        </a>
      </div>
    </div>
  </footer>
</template>
