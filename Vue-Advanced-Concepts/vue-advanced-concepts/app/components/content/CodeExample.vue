<script setup lang="ts">
const props = withDefaults(defineProps<{
  filename?: string
  language?: string
}>(), {
  filename: '',
  language: 'vue',
})

const copied = ref(false)
const codeEl = ref<HTMLElement>()

async function copyCode() {
  const code = codeEl.value?.textContent || ''
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = code
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<template>
  <div class="my-4 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Header -->
    <div v-if="filename" class="flex items-center justify-between px-4 py-1.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <span class="text-xs font-mono text-gray-600 dark:text-gray-400">{{ filename }}</span>
      <UButton
        :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
        variant="ghost"
        color="neutral"
        size="xs"
        :label="copied ? 'Copied!' : 'Copy'"
        @click="copyCode"
      />
    </div>
    <div v-else class="flex justify-end px-2 py-1 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <UButton
        :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'"
        variant="ghost"
        color="neutral"
        size="xs"
        @click="copyCode"
      />
    </div>

    <!-- Code content (slot filled by @nuxt/content with Shiki-highlighted code) -->
    <div ref="codeEl" class="overflow-x-auto">
      <slot />
    </div>
  </div>
</template>
