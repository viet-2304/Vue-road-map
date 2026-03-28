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

const tocLinks = computed(() => {
  if (!page.value?.body?.toc?.links) return []
  return flattenToc(page.value.body.toc.links)
})

function flattenToc(links: any[]): { id: string; text: string; depth: number }[] {
  const result: { id: string; text: string; depth: number }[] = []
  for (const link of links) {
    result.push({ id: link.id, text: link.text, depth: link.depth })
    if (link.children) {
      result.push(...flattenToc(link.children))
    }
  }
  return result
}
</script>

<template>
  <div>
    <BreadcrumbNav />
    <ContentRenderer v-if="page" :value="page" />
    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
    </div>

    <template #toc>
      <TableOfContents :links="tocLinks" />
    </template>
  </div>
</template>
