<script setup lang="ts">
const route = useRoute()
const progress = useProgressStore()

const completed = computed(() => progress.isComplete(route.path))

function toggle() {
  if (completed.value) {
    progress.markIncomplete(route.path)
  } else {
    progress.markComplete(route.path)
  }
}
</script>

<template>
  <div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
    <UButton
      :icon="completed ? 'i-heroicons-check-circle' : 'i-heroicons-check-circle'"
      :label="completed ? 'Completed' : 'Mark as Complete'"
      :color="completed ? 'success' : 'neutral'"
      :variant="completed ? 'solid' : 'outline'"
      size="lg"
      @click="toggle"
    />
    <span v-if="completed" class="text-sm text-gray-500">
      Well done!
    </span>
  </div>
</template>
