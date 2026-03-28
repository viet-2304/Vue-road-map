<script setup lang="ts">
const route = useRoute()
const { data: docs } = await useAsyncData('sidebar-docs', () =>
  queryCollection('docs').order('section', 'ASC').order('order', 'ASC').all(),
)

const sections = computed(() => {
  if (!docs.value) return []
  const grouped = new Map<number, { title: string; items: typeof docs.value }>()

  const sectionNames: Record<number, string> = {
    1: 'Fundamentals',
    2: 'Templates & Rendering',
    3: 'Composition API',
    4: 'Advanced Components',
    5: 'Reusability',
    6: 'Ecosystem',
    7: 'Nuxt & Beyond',
    8: 'Testing',
  }

  for (const doc of docs.value) {
    const sec = (doc as any).section ?? 1
    if (!grouped.has(sec)) {
      grouped.set(sec, { title: sectionNames[sec] ?? `Section ${sec}`, items: [] })
    }
    grouped.get(sec)!.items.push(doc)
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a - b)
    .map(([num, data]) => ({ num, ...data }))
})

const expandedSections = ref<Set<number>>(new Set())

function toggleSection(num: number) {
  if (expandedSections.value.has(num)) {
    expandedSections.value.delete(num)
  } else {
    expandedSections.value.add(num)
  }
}

// Auto-expand the section containing current page
watchEffect(() => {
  if (!docs.value) return
  const current = docs.value.find((d) => d.path === route.path)
  if (current) {
    expandedSections.value.add((current as any).section ?? 1)
  }
})
</script>

<template>
  <nav class="text-sm">
    <h2 class="font-semibold text-gray-900 dark:text-white mb-4">Lessons</h2>
    <ul class="space-y-1">
      <li v-for="section in sections" :key="section.num">
        <button
          class="flex items-center justify-between w-full px-2 py-1.5 rounded-md text-left font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          @click="toggleSection(section.num)"
        >
          <span>{{ section.num }}. {{ section.title }}</span>
          <UIcon
            :name="expandedSections.has(section.num) ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'"
            class="w-4 h-4 shrink-0"
          />
        </button>
        <ul v-show="expandedSections.has(section.num)" class="ml-3 mt-1 space-y-0.5">
          <li v-for="item in section.items" :key="item.path">
            <NuxtLink
              :to="item.path"
              class="block px-2 py-1 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              :class="{ 'bg-primary-50 dark:bg-primary-900/20 text-primary font-medium': route.path === item.path }"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
