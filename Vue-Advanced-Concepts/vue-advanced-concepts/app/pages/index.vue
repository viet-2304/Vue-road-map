<script setup lang="ts">
const appConfig = useAppConfig() as any
const siteTitle = appConfig?.site?.title ?? 'Vue Advanced Concepts'
const siteDescription = appConfig?.site?.description ?? 'Hands-on Vue/Nuxt learning platform with interactive playgrounds'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 text-center">
      <div class="max-w-3xl mx-auto">
        <UIcon name="i-heroicons-academic-cap" class="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ siteTitle }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {{ siteDescription }}
        </p>
        <UButton
          to="/docs/fundamentals/single-file-components"
          size="lg"
          label="Start Learning"
          icon="i-heroicons-arrow-right"
          trailing
        />
      </div>
    </section>

    <!-- Tier Overview -->
    <section class="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Learning Path
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-fire" class="w-5 h-5 text-green-500" />
                <h3 class="font-semibold">Beginner</h3>
              </div>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Fundamentals, Templates & Rendering, Composition API basics.
            </p>
            <p class="text-xs text-gray-500 mt-2">13 lessons</p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-yellow-500" />
                <h3 class="font-semibold">Intermediate</h3>
              </div>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Advanced Components, Reusability Patterns, Ecosystem tools.
            </p>
            <p class="text-xs text-gray-500 mt-2">15 lessons</p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 text-red-500" />
                <h3 class="font-semibold">Advanced</h3>
              </div>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Nuxt & Beyond, Testing with Vitest, Performance optimization.
            </p>
            <p class="text-xs text-gray-500 mt-2">10 lessons</p>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>
