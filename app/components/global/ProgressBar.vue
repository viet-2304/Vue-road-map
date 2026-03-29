<script setup lang="ts">
const progress = useProgressStore()
</script>

<template>
  <div v-if="progress.completedCount > 0" class="max-w-xl mx-auto mt-8 px-4">
    <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
      <span>{{ progress.completedCount }} of 38 lessons completed</span>
      <span class="font-medium">{{ progress.completionPercent }}%</span>
    </div>
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div
        class="bg-primary h-2.5 rounded-full transition-all duration-500"
        :style="{ width: `${progress.completionPercent}%` }"
      />
    </div>
  </div>
</template>
