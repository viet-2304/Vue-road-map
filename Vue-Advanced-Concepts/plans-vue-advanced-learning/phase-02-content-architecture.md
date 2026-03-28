# Phase 2: Content Architecture

## Context
- **Parent plan:** [plan.md](./plan.md)
- **Dependencies:** Phase 1 (Project Setup)
- **Blocks:** Phase 3, 4, 5

## Overview
- **Date:** 2026-03-27
- **Description:** Define content collections and schemas, create the 3-tier directory structure, build sidebar navigation and TOC components, and write sample lessons to validate the pipeline.
- **Priority:** P1
- **Status:** done
- **Effort:** ~3h

## Key Insights (from research)
- @nuxt/content v3 uses `content.config.ts` with `defineCollection()` and `defineContentConfig()` for typed collections.
- `queryCollection()` composable replaces the old `queryContent()` API.
- Navigation trees are auto-generated from directory structure with numbered prefixes.
- MDC syntax allows embedding Vue components in markdown via `::component-name` blocks.
- Front-matter fields can be validated with Zod-like schemas.

## Requirements
- `content.config.ts` with a `docs` collection and typed schema
- Content directory structure for all 33 lessons across 7 sections (per roadmap.sh/vue)
- Sidebar navigation component auto-generated from content tree
- Breadcrumb navigation component
- Table of contents component (per-page headings)
- 2-3 sample markdown lessons to validate rendering pipeline
- Consistent front-matter schema across all lessons

## Architecture

### Content Directory Structure (Based on roadmap.sh/vue)
```
content/docs/
  1.fundamentals/
    1.single-file-components.md
    2.component-registration.md
    3.props-and-events.md
    4.v-model-and-attrs.md
  2.templates-and-rendering/
    1.directives-overview.md
    2.conditional-rendering.md
    3.list-rendering.md
    4.event-handling.md
    5.data-binding.md
  3.composition-api/
    1.ref-and-reactive.md
    2.computed-properties.md
    3.watchers.md
    4.lifecycle-hooks.md
  4.advanced-components/
    1.provide-inject.md
    2.slots.md
    3.teleport.md
    4.suspense-async.md
    5.transitions.md
    6.forms-handling.md
  5.reusability/
    1.composables.md
    2.custom-directives.md
    3.plugins.md
    4.render-functions.md
  6.ecosystem/
    1.vue-router.md
    2.pinia.md
    3.vueuse.md
    4.form-validation.md
    5.api-integration.md
  7.nuxt-and-beyond/
    1.nuxt-ssr-ssg.md
    2.middleware.md
    3.server-components.md
    4.seo-meta.md
    5.performance.md
```

### Front-matter Schema
```yaml
---
title: "Composition API Deep Dive"
description: "Master ref, reactive, computed, and watch in depth"
section: 1       # 1-7 matching roadmap.sh/vue sections
order: 1
icon: "i-heroicons-code-bracket"
difficulty: "beginner"  # beginner | intermediate | advanced
estimatedTime: "30 min"
prerequisites: []       # Array of lesson slugs
---
```

### Collection Definition
```ts
// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: z.object({
        section: z.number().min(1).max(7),
        order: z.number(),
        icon: z.string().optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        estimatedTime: z.string(),
        prerequisites: z.array(z.string()).default([]),
      }),
    }),
  },
})
```

### Navigation Components
```
app/components/
  global/
    SidebarNav.vue         # Tree navigation from content structure
    BreadcrumbNav.vue      # Path-based breadcrumbs
    TableOfContents.vue    # In-page heading links (h2, h3)
    LessonCard.vue         # Card component for tier overview
```

## Related Code Files
| File | Action | Purpose |
|---|---|---|
| `content.config.ts` | Modify | Define docs collection with schema |
| `content/docs/**/*.md` | Create | All 18 lesson files (stubs + 2-3 full samples) |
| `app/components/global/SidebarNav.vue` | Create | Sidebar navigation tree |
| `app/components/global/BreadcrumbNav.vue` | Create | Breadcrumb path |
| `app/components/global/TableOfContents.vue` | Create | Page TOC from headings |
| `app/layouts/docs.vue` | Modify | Wire in sidebar + TOC components |
| `app/pages/[...slug].vue` | Modify | Pass TOC data, use `queryCollection` |

## Implementation Steps

1. **Define content collection in `content.config.ts`**
   - Create `docs` collection with source `docs/**`
   - Define front-matter schema with tier, order, difficulty, estimatedTime, prerequisites

2. **Create content directory structure**
   - Create all 33 lesson files as stubs with front-matter only
   - Use numbered prefixes for ordering (e.g., `1.fundamentals/1.single-file-components.md`)
   - Each stub has title, description, section, order, difficulty, estimatedTime

3. **Write 2-3 complete sample lessons**
   - `1.foundations/1.composition-api.md` — full lesson with theory, code blocks, MDC component placeholders
   - `2.intermediate/1.custom-composables.md` — full lesson demonstrating a different tier
   - These validate the rendering pipeline end-to-end

4. **Build SidebarNav component**
   - Use `queryCollection('docs')` to fetch all docs
   - Group by section (7 sections per roadmap.sh/vue)
   - Render collapsible tree with section headers and lesson links
   - Highlight current page using `useRoute()`
   - Show tier badge/icon next to each section

5. **Build BreadcrumbNav component**
   - Parse current route path into segments
   - Map segments to readable names (strip numbers, capitalize)
   - Render as linked breadcrumb trail

6. **Build TableOfContents component**
   - Accept `toc` prop (array of headings from content renderer)
   - Render as linked list of h2/h3 headings
   - Add scroll-spy to highlight current section (Intersection Observer)

7. **Wire components into docs layout**
   - SidebarNav in left column
   - TableOfContents in right column
   - BreadcrumbNav above main content

8. **Update `[...slug].vue`**
   - Use `queryCollection('docs').path(route.path)` to fetch current doc
   - Pass TOC data to layout/component
   - Handle 404 for missing content

9. **Test the pipeline**
   - Navigate to sample lessons via sidebar
   - Verify breadcrumbs update correctly
   - Verify TOC links scroll to headings
   - Verify front-matter data is accessible

## Todo List
- [x] Define docs collection in content.config.ts
- [x] Create all 38 lesson stub files with front-matter (updated from 33 to 38 — added Section 8 Testing)
- [x] Write full sample: ref-and-reactive.md
- [x] Write full sample: composables.md
- [x] Build SidebarNav component
- [x] Build BreadcrumbNav component
- [x] Build TableOfContents component with scroll-spy
- [x] Wire navigation into docs layout
- [x] Update [...slug].vue to use queryCollection
- [x] Test navigation flow end-to-end
- [ ] Verify `nuxi generate` handles all content routes

## Success Criteria
- All 33 lesson stubs exist with valid front-matter
- Sidebar renders all lessons grouped by 7 sections
- Clicking a sidebar link navigates to the correct lesson
- Breadcrumbs show correct path hierarchy
- TOC shows headings for the current page
- Sample lessons render markdown with code highlighting
- `nuxi generate` pre-renders all content pages

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Content v3 API differences from v2 docs | Medium | Medium | Follow content.nuxt.com v3 docs carefully |
| Navigation not auto-sorting correctly | Low | Low | Use consistent numbered prefixes |
| TOC scroll-spy performance | Low | Low | Throttle Intersection Observer callbacks |

## Next Steps
After this phase:
- **[Phase 3: Interactive Playground](./phase-03-interactive-playground.md)** — add @vue/repl MDC components
- **[Phase 4: Learning Features](./phase-04-learning-features.md)** — add progress tracking and search
- **[Phase 5: Content Creation](./phase-05-content-creation.md)** — can begin writing full lessons
