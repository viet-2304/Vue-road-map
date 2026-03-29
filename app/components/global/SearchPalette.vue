<script setup lang="ts">
import MiniSearch from 'minisearch'

const open = defineModel<boolean>({ default: false })
const query = ref('')
const results = ref<any[]>([])
const selectedIndex = ref(0)
const searchEngine = ref<MiniSearch | null>(null)
const inputRef = ref<HTMLInputElement>()

async function initSearch() {
  if (searchEngine.value) return
  try {
    const res = await $fetch('/search-index.json')
    const docs = res as any[]
    const ms = new MiniSearch({
      fields: ['title', 'description', 'body'],
      storeFields: ['title', 'description', 'path'],
      searchOptions: {
        boost: { title: 3, description: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    })
    ms.addAll(docs)
    searchEngine.value = ms
  } catch {
    // Search index not available
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    await initSearch()
    query.value = ''
    results.value = []
    selectedIndex.value = 0
    nextTick(() => inputRef.value?.focus())
  }
})

watch(query, (q) => {
  if (!searchEngine.value || !q.trim()) {
    results.value = []
    selectedIndex.value = 0
    return
  }
  results.value = searchEngine.value.search(q).slice(0, 10)
  selectedIndex.value = 0
})

function navigate(path: string) {
  open.value = false
  navigateTo(path)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter' && results.value[selectedIndex.value]) {
    navigate(results.value[selectedIndex.value].path)
  }
}

// Cmd+K / Ctrl+K global shortcut
function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    open.value = !open.value
  }
  if (e.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" @click.self="open = false">
      <div class="fixed inset-0 bg-black/50" @click="open = false" />
      <div class="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Search lessons..."
            class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
            @keydown="onKeydown"
          >
          <kbd class="hidden sm:inline-block px-1.5 py-0.5 text-xs text-gray-400 border border-gray-300 dark:border-gray-600 rounded">
            ESC
          </kbd>
        </div>

        <ul v-if="results.length" class="max-h-80 overflow-y-auto py-2">
          <li
            v-for="(result, i) in results"
            :key="result.id"
            class="px-4 py-2.5 cursor-pointer transition-colors"
            :class="i === selectedIndex ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'"
            @click="navigate(result.path)"
            @mouseenter="selectedIndex = i"
          >
            <div class="text-sm font-medium text-gray-900 dark:text-white">{{ result.title }}</div>
            <div v-if="result.description" class="text-xs text-gray-500 mt-0.5 line-clamp-1">{{ result.description }}</div>
          </li>
        </ul>

        <div v-else-if="query.trim()" class="px-4 py-8 text-center text-sm text-gray-500">
          No results found
        </div>

        <div v-else class="px-4 py-8 text-center text-sm text-gray-500">
          Type to search lessons...
        </div>
      </div>
    </div>
  </Teleport>
</template>
