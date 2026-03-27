<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { data: page } = await useAsyncData(
  `doc-${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
  title: page.value.title,
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else class="text-center py-20">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
  </div>
</template>
