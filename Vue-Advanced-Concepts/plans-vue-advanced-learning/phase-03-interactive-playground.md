# Phase 3: Interactive Playground

## Context
- **Parent plan:** [plan.md](./plan.md)
- **Dependencies:** Phase 1 (Project Setup), Phase 2 (Content Architecture)
- **Blocks:** Phase 5 (playground files needed for lessons)

## Overview
- **Date:** 2026-03-27
- **Description:** Integrate @vue/repl as a lazy-loaded MDC component for interactive code playgrounds, plus a static CodeExample component for highlighted code with copy functionality.
- **Priority:** P1
- **Status:** done
- **Effort:** ~3h

## Key Insights (from research)
- `@vue/repl` is ~250KB gzipped, ships as a native Vue component with built-in editor + preview.
- CodeMirror editor (default) is lighter than Monaco (~150KB vs ~2-4MB).
- Lazy-loading via `defineAsyncComponent` or dynamic `import()` avoids loading the REPL on pages that don't use it.
- MDC components in `components/content/` are auto-registered for use in markdown files.
- Pre-written SFC files should be stored separately from markdown for maintainability.
- The REPL supports custom import maps, read-only mode, hidden files, and theme configuration.

## Requirements
- `Playground.vue` MDC component wrapping @vue/repl with lazy-loading
- `CodeExample.vue` MDC component for static highlighted code with copy button
- Directory for pre-written playground SFC files
- "Reset code" functionality to restore original code
- Playground supports dark/light theme syncing
- Playground works offline after initial load
- Test playground embedding in at least one sample markdown lesson

## Architecture

### Component Structure
```
app/components/content/
  Playground.vue          # MDC component wrapping @vue/repl (lazy-loaded)
  CodeExample.vue         # Static code block with copy button + filename header

playground-files/
  composition-api/
    App.vue               # Pre-written SFC for the lesson
    helper.ts             # Optional additional files
  custom-composables/
    App.vue
    useCounter.ts
```

### Playground.vue Design
```
+--------------------------------------------------+
| Playground: composition-api          [Reset] [⛶]  |
+-------------------------+------------------------+
| Editor (CodeMirror)     | Live Preview (iframe)  |
| <script setup>          |                        |
| import { ref } from ... | [Rendered output]      |
| </script>               |                        |
| <template>              |                        |
|   <div>{{ count }}</div> |                        |
| </template>             |                        |
+-------------------------+------------------------+
```

### MDC Usage in Markdown
```md
## Try It Yourself

::playground
---
files: composition-api
height: 400
---
Edit the code below to see reactivity in action.
::
```

### Lazy-Loading Strategy
```ts
// Playground.vue
const VueRepl = defineAsyncComponent({
  loader: () => import('@vue/repl'),
  loadingComponent: PlaygroundSkeleton,
  delay: 200,
})
```

## Related Code Files
| File | Action | Purpose |
|---|---|---|
| `app/components/content/Playground.vue` | Create | MDC component wrapping @vue/repl |
| `app/components/content/PlaygroundSkeleton.vue` | Create | Loading placeholder |
| `app/components/content/CodeExample.vue` | Create | Static code + copy button |
| `playground-files/**/*.vue` | Create | Pre-written SFC examples |
| `content/docs/1.foundations/1.composition-api.md` | Modify | Add playground embed |

## Implementation Steps

1. **Verify @vue/repl is installed**
   - Already added in Phase 1: `npm install @vue/repl`
   - Import `@vue/repl/style.css` in Playground.vue

2. **Create PlaygroundSkeleton.vue**
   - Pulsing placeholder matching playground dimensions
   - Shows "Loading playground..." text
   - Matches dark/light theme

3. **Create Playground.vue MDC component**
   - Props: `files` (string — directory name under `playground-files/`), `height` (number, default 400)
   - Lazy-load `@vue/repl` via `defineAsyncComponent`
   - Initialize `ReplStore` with files loaded from `playground-files/` directory
   - Configure: hide compile output, use CodeMirror editor, set Vue CDN URL
   - Sync theme with `useColorMode()` — pass dark/light to REPL theme config
   - Store original files in a ref for reset functionality
   - "Reset" button restores original files to the REPL store
   - "Fullscreen" toggle button (optional, uses CSS)
   - Wrap in a styled container with rounded corners and border

4. **Implement file loading for playground**
   - Use Vite's `import.meta.glob` to load playground files at build time:
     ```ts
     const files = import.meta.glob('/playground-files/**/*', { as: 'raw', eager: true })
     ```
   - Map file paths to REPL store format: `{ 'App.vue': { code: '...' } }`
   - Filter by the `files` prop directory name

5. **Create CodeExample.vue MDC component**
   - Props: `filename` (string), `language` (string, default 'vue')
   - Renders its default slot (which @nuxt/content will fill with Shiki-highlighted code)
   - Adds a header bar with filename label and copy button
   - Copy button uses `navigator.clipboard.writeText()` with success feedback
   - Styled container matching the Shiki theme

6. **Create initial playground files**
   - `playground-files/composition-api/App.vue` — ref, reactive, computed demo
   - `playground-files/custom-composables/App.vue` + `useCounter.ts` — composable extraction demo
   - Each file should be a self-contained, working SFC

7. **Test playground in markdown**
   - Add `::playground` block to `composition-api.md` sample lesson
   - Add `::code-example` blocks to sample lessons
   - Verify: playground loads, code edits reflect in preview, reset works, theme syncs

8. **Handle edge cases**
   - SSR compatibility: wrap REPL in `<ClientOnly>` since it requires browser APIs
   - Error boundary: catch compilation errors gracefully (REPL has built-in error display)
   - Mobile: stack editor and preview vertically on small screens

## Todo List
- [x] Create PlaygroundSkeleton.vue loading component
- [x] Create Playground.vue MDC component with lazy-loaded @vue/repl
- [x] Implement file loading via import.meta.glob
- [x] Add reset code functionality
- [x] Sync playground theme with color mode
- [x] Create CodeExample.vue MDC component with copy button
- [x] Create playground-files directory with 2+ example sets
- [x] Wrap REPL in ClientOnly for SSR safety
- [x] Add ::playground block to sample lesson markdown
- [x] Test playground rendering and interactivity
- [ ] Test on mobile (stacked layout) — deferred to Phase 6
- [ ] Verify playground works after `nuxi generate` — deferred to Phase 6

## Success Criteria
- `::playground` in markdown renders an interactive code editor + live preview
- Editing code in the editor updates the preview in real-time
- "Reset" button restores original code
- Playground respects dark/light theme
- `::code-example` renders highlighted code with copy button
- REPL loads lazily (not in initial bundle)
- Works correctly in SSG output (client-side only)

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| @vue/repl version incompatibility | Medium | High | Pin version, test thoroughly |
| Large bundle impact on page load | Medium | Medium | Lazy-load with skeleton; measure with `nuxi analyze` |
| REPL fails in SSG hydration | Medium | High | Use `<ClientOnly>` wrapper |
| import.meta.glob path issues | Low | Medium | Test glob patterns; use explicit imports as fallback |
| Mobile layout breaks | Low | Low | CSS media query for stacked layout |

## Next Steps
After this phase, playground infrastructure is ready. Proceed to:
- **[Phase 5: Content Creation](./phase-05-content-creation.md)** — create playground files for each lesson
- **[Phase 4: Learning Features](./phase-04-learning-features.md)** — can run in parallel
