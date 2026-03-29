<script setup lang="ts">
const appConfig = useAppConfig() as any
const siteTitle = appConfig?.site?.title ?? 'Vue Advanced Concepts'
const navLinks = appConfig?.nav ?? [
  { label: 'Home', to: '/' },
  { label: 'Lessons', to: '/docs/fundamentals/single-file-components' },
]

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo / Title -->
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
        <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-primary" />
        {{ siteTitle }}
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden sm:flex items-center gap-6">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search trigger (placeholder, wired in Phase 4) -->
        <UButton
          icon="i-heroicons-magnifying-glass"
          variant="ghost"
          color="neutral"
          size="sm"
          aria-label="Search"
        />

        <!-- Color mode toggle -->
        <UButton
          :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          variant="ghost"
          color="neutral"
          size="sm"
          aria-label="Toggle color mode"
          @click="toggleColorMode"
        />
      </div>
    </div>
  </header>
</template>
