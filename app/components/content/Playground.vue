<script setup lang="ts">
import { useColorMode } from '#imports'

const props = withDefaults(defineProps<{
  files: string
  height?: number
}>(), {
  height: 400,
})

const colorMode = useColorMode()

// Load all playground files at build time
const allFiles = import.meta.glob('/playground-files/**/*', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

// Filter files for the given directory
const playgroundFiles = computed(() => {
  const prefix = `/playground-files/${props.files}/`
  const result: Record<string, string> = {}
  for (const [path, code] of Object.entries(allFiles)) {
    if (path.startsWith(prefix)) {
      const filename = path.slice(prefix.length)
      result[filename] = code
    }
  }
  return result
})

// Store original files for reset
const originalFiles = computed(() => ({ ...playgroundFiles.value }))

const storeRef = shallowRef<any>(null)

const theme = computed(() => colorMode.value === 'dark' ? 'dark' : 'light')

async function initStore() {
  const { useStore, useVueImportMap } = await import('@vue/repl')
  const { importMap } = useVueImportMap()

  const files: Record<string, string> = {}
  for (const [filename, code] of Object.entries(playgroundFiles.value)) {
    files[filename] = code
  }

  const store = useStore({
    builtinImportMap: importMap,
    files: Object.entries(files).reduce(
      (acc, [name, code]) => {
        acc[name] = ref(code)
        return acc
      },
      {} as Record<string, any>,
    ),
    mainFile: ref(Object.keys(files).find((f) => f === 'App.vue') || Object.keys(files)[0] || 'App.vue'),
  })

  storeRef.value = store
}

function resetCode() {
  if (!storeRef.value) return
  for (const [filename, code] of Object.entries(originalFiles.value)) {
    if (storeRef.value.files[filename]) {
      storeRef.value.files[filename].code = code
    }
  }
}

// Lazy-load the Repl component
const VueRepl = defineAsyncComponent({
  loader: () => import('@vue/repl'),
  loadingComponent: resolveComponent('PlaygroundSkeleton') as any,
  delay: 200,
})

// Lazy-load CodeMirror editor
const CodeMirrorEditor = defineAsyncComponent(() => import('@vue/repl/codemirror-editor'))

onMounted(initStore)
</script>

<template>
  <ClientOnly>
    <div class="my-6 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Playground: {{ files }}
        </span>
        <UButton
          icon="i-heroicons-arrow-path"
          variant="ghost"
          color="neutral"
          size="xs"
          label="Reset"
          @click="resetCode"
        />
      </div>

      <!-- REPL -->
      <div v-if="storeRef" :style="{ height: `${height}px` }">
        <VueRepl
          :store="storeRef"
          :editor="CodeMirrorEditor"
          :theme="theme"
          :show-compile-output="false"
          :auto-resize="true"
          :show-open-source-map="false"
        />
      </div>
      <PlaygroundSkeleton v-else />
    </div>

    <template #fallback>
      <PlaygroundSkeleton />
    </template>
  </ClientOnly>
</template>
