<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const items: { label: string; to: string }[] = [{ label: 'Home', to: '/' }]

  let path = ''
  for (const segment of segments) {
    path += `/${segment}`
    const label = segment
      .replace(/^\d+\./, '') // strip number prefix
      .replace(/-/g, ' ')   // replace dashes with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize words
    items.push({ label, to: path })
  }

  return items
})
</script>

<template>
  <nav class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
    <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
      <UIcon v-if="index > 0" name="i-heroicons-chevron-right" class="w-3 h-3 shrink-0" />
      <NuxtLink
        v-if="index < breadcrumbs.length - 1"
        :to="crumb.to"
        class="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {{ crumb.label }}
      </NuxtLink>
      <span v-else class="text-gray-900 dark:text-white font-medium">
        {{ crumb.label }}
      </span>
    </template>
  </nav>
</template>
