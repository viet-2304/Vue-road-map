<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
}

const props = defineProps<{
  links: TocItem[]
}>()

const activeId = ref('')

onMounted(() => {
  const headings = props.links.map((link) => document.getElementById(link.id)).filter(Boolean) as HTMLElement[]
  if (!headings.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '-80px 0px -80% 0px', threshold: 0 },
  )

  for (const heading of headings) {
    observer.observe(heading)
  }

  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <nav v-if="links.length" class="text-sm">
    <h3 class="font-semibold text-gray-900 dark:text-white mb-3">On this page</h3>
    <ul class="space-y-1">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block py-0.5 transition-colors"
          :class="[
            link.depth === 3 ? 'pl-3' : '',
            activeId === link.id
              ? 'text-primary font-medium'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
          ]"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
