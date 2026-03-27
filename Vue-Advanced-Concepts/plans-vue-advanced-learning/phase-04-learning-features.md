# Phase 4: Learning Features

## Context
- **Parent plan:** [plan.md](./plan.md)
- **Dependencies:** Phase 1 (Project Setup), Phase 2 (Content Architecture)
- **Blocks:** Phase 6 (polish)

## Overview
- **Date:** 2026-03-27
- **Description:** Implement progress tracking with Pinia + localStorage, full-text search with MiniSearch, and finalize the dark/light theme integration.
- **Priority:** P2
- **Status:** pending
- **Effort:** ~3h

## Key Insights (from research)
- `pinia-plugin-persistedstate` with `@pinia-plugin-persistedstate/nuxt` provides SSR-safe localStorage sync.
- MiniSearch (~8KB) supports fuzzy matching, prefix search, and field boosting — ideal for a static site.
- Build-time index generation avoids runtime indexing cost. Ship index as a static JSON asset.
- localStorage has ~5-10MB limit per origin — more than enough for progress data.
- @nuxt/ui includes `useColorMode()` and a `UColorModeButton` component.

## Requirements
- Pinia store for lesson progress (completed/not, timestamps)
- Persistent state via localStorage with SSR safety
- Progress indicator badges in sidebar navigation
- Overall progress bar on landing page
- MiniSearch with build-time index over all lesson content
- Search UI — command palette style (Cmd+K / Ctrl+K trigger)
- Dark/light theme toggle in header (via @nuxt/ui)
- "Mark as complete" button on each lesson page
- Optional: JSON export/import of progress data

## Architecture

### Progress Store
```ts
// app/composables/useProgressStore.ts (or stores/progress.ts)
export const useProgressStore = defineStore('progress', () => {
  const completedLessons = ref<Record<string, number>>({})  // path -> timestamp
  const completionPercent = computed(() => /* total completed / 18 * 100 */)
  function markComplete(lessonPath: string) { ... }
  function markIncomplete(lessonPath: string) { ... }
  function isComplete(lessonPath: string): boolean { ... }
  function reset() { ... }
  return { completedLessons, completionPercent, markComplete, markIncomplete, isComplete, reset }
}, { persist: true })
```

### Search Architecture
```
Build time:
  content/docs/**/*.md → Nuxt hook → extract title, description, body text → MiniSearch index → public/search-index.json

Runtime:
  User types in search → fetch search-index.json (cached) → MiniSearch.loadJSON() → query → render results
```

### Component Structure
```
app/components/
  global/
    SearchPalette.vue      # Command palette overlay (Cmd+K)
    ProgressBar.vue        # Overall progress bar
    LessonComplete.vue     # "Mark as complete" button + confetti
  content/
    (existing Playground.vue, CodeExample.vue)
```

## Related Code Files
| File | Action | Purpose |
|---|---|---|
| `app/stores/progress.ts` | Create | Pinia progress store |
| `app/components/global/SearchPalette.vue` | Create | Cmd+K search overlay |
| `app/components/global/ProgressBar.vue` | Create | Visual progress indicator |
| `app/components/global/LessonComplete.vue` | Create | Completion toggle button |
| `app/components/global/SidebarNav.vue` | Modify | Add completion badges |
| `app/pages/index.vue` | Modify | Add progress bar |
| `app/pages/[...slug].vue` | Modify | Add LessonComplete button |
| `app/components/global/AppHeader.vue` | Modify | Add search trigger + theme toggle |
| `server/plugins/search-index.ts` | Create | Build-time search index generation |
| `nuxt.config.ts` | Modify | Register Pinia persistedstate module |

## Implementation Steps

1. **Set up Pinia with persistence**
   - Add `@pinia-plugin-persistedstate/nuxt` to modules in `nuxt.config.ts`
   - Pinia itself is auto-installed by this module (or via `@pinia/nuxt`)
   - Create `app/stores/progress.ts` with `useProgressStore`

2. **Create progress store**
   - `completedLessons`: Record mapping lesson path to completion timestamp
   - `markComplete(path)`: Set timestamp for lesson
   - `markIncomplete(path)`: Remove lesson from completed
   - `isComplete(path)`: Check if lesson is in completed map
   - `completionPercent`: Computed as `Object.keys(completedLessons).length / TOTAL_LESSONS * 100`
   - `reset()`: Clear all progress (with confirmation)
   - Configure `persist: true` for localStorage sync

3. **Create LessonComplete component**
   - Toggle button: "Mark as Complete" / "Completed"
   - Uses `useProgressStore().markComplete(currentPath)`
   - Visual feedback on completion (checkmark animation)
   - Place at bottom of each lesson page

4. **Add progress badges to SidebarNav**
   - For each lesson link, check `isComplete(lessonPath)`
   - Show green checkmark icon next to completed lessons
   - Show tier completion count (e.g., "2/4" next to "Foundations")

5. **Create ProgressBar component**
   - Horizontal bar showing `completionPercent`
   - Label: "X of 18 lessons completed (Y%)"
   - Use @nuxt/ui `UProgress` component if available, or custom

6. **Add ProgressBar to landing page**
   - Show below hero section
   - Only visible when progress > 0 (don't show empty bar to new users)

7. **Generate build-time search index**
   - Create a Nitro plugin or Nuxt build hook that:
     - Reads all docs from content collection
     - Extracts: path, title, description, body text (stripped of markdown)
     - Creates MiniSearch index with field boosting: `title: 3, description: 2, body: 1`
     - Serializes to JSON and writes to `public/search-index.json`
   - Alternative: use a `nuxt hook` in a module to run at build time

8. **Create SearchPalette component**
   - Modal overlay triggered by Cmd+K (Mac) / Ctrl+K (Windows)
   - Text input with instant results
   - Fetch and cache `search-index.json` on first open
   - Initialize MiniSearch from loaded JSON
   - Display results as a list: title, description snippet, tier badge
   - Click result navigates to lesson page
   - Keyboard navigation (arrow keys + Enter)
   - Use @nuxt/ui `UModal` or `UCommandPalette` if available

9. **Wire search trigger into AppHeader**
   - Search icon button in header
   - Keyboard shortcut listener for Cmd+K / Ctrl+K
   - Opens SearchPalette

10. **Verify theme toggle**
    - @nuxt/ui should include color mode toggle — wire `UColorModeButton` into AppHeader
    - If not available, use `useColorMode()` composable with a custom toggle button
    - Verify all components respect dark/light: sidebar, content, playground, search

## Todo List
- [ ] Add @pinia-plugin-persistedstate/nuxt to nuxt.config.ts
- [ ] Create useProgressStore with persistence
- [ ] Create LessonComplete toggle button component
- [ ] Add completion badges to SidebarNav
- [ ] Create ProgressBar component
- [ ] Add ProgressBar to landing page
- [ ] Create build-time search index generator
- [ ] Create SearchPalette component with Cmd+K trigger
- [ ] Wire search trigger into AppHeader
- [ ] Verify color mode toggle works across all components
- [ ] Test progress persistence across page reloads
- [ ] Test search with fuzzy matching and prefix search

## Success Criteria
- Marking a lesson complete persists across page reloads and browser restarts
- Sidebar shows completion badges for completed lessons
- Landing page shows accurate progress bar
- Cmd+K opens search palette with instant results
- Search returns relevant results with fuzzy matching
- Dark/light theme toggle works everywhere including playground
- Progress data survives `nuxi generate` and works in static deployment

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| SSR hydration mismatch with localStorage | Medium | Medium | @pinia-plugin-persistedstate/nuxt handles this via cookies for SSR |
| Search index too large for many lessons | Low | Low | 18 lessons produce a small index (<100KB); scale concern only at 500+ |
| MiniSearch API changes | Low | Low | Pin version, simple API surface |
| Cmd+K conflicts with browser shortcut | Low | Low | Use @nuxt/ui command palette which handles this |

## Carry-over Notes from Phase 1

> **IMPORTANT:** `@pinia-plugin-persistedstate/nuxt` is deprecated and crashes on Nuxt 4. Do NOT use it.
>
> Instead, configure `pinia-plugin-persistedstate` manually as a Nuxt plugin:
> ```ts
> // app/plugins/pinia-persist.ts
> import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
> export default defineNuxtPlugin((nuxtApp) => {
>   nuxtApp.$pinia.use(piniaPluginPersistedstate)
> })
> ```
> Or use a simple `watch` + `localStorage` approach for SSG since there's no server state.

## Next Steps
After this phase, all interactive features are in place. Proceed to:
- **[Phase 5: Content Creation](./phase-05-content-creation.md)** — write all lesson content (can overlap)
- **[Phase 6: Polish & Deploy](./phase-06-polish-deploy.md)** — final pass after content is done
