const TOTAL_LESSONS = 38

export const useProgressStore = defineStore('progress', () => {
  const completedLessons = ref<Record<string, number>>({})

  const completedCount = computed(() => Object.keys(completedLessons.value).length)
  const completionPercent = computed(() => Math.round((completedCount.value / TOTAL_LESSONS) * 100))

  function markComplete(lessonPath: string) {
    completedLessons.value[lessonPath] = Date.now()
  }

  function markIncomplete(lessonPath: string) {
    delete completedLessons.value[lessonPath]
  }

  function isComplete(lessonPath: string): boolean {
    return lessonPath in completedLessons.value
  }

  function reset() {
    completedLessons.value = {}
  }

  return { completedLessons, completedCount, completionPercent, markComplete, markIncomplete, isComplete, reset }
}, {
  persist: true,
})
