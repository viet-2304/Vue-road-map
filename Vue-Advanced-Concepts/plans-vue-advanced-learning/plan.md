---
title: "Vue Advanced Concepts Learning Platform"
description: "Hands-on Nuxt 3 learning website following roadmap.sh/vue with interactive playgrounds"
status: pending
priority: P2
effort: "27h"
branch: main
tags: [vue, nuxt, learning, ssg, typescript, roadmap]
created: 2026-03-27
---

# Vue Advanced Concepts Learning Platform

Website học Vue/Nuxt xây dựng bằng chính Nuxt 3 — mỗi concept có theory, code examples, và interactive playground. Nội dung theo [roadmap.sh/vue](https://roadmap.sh/vue).

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 3 (SSG) + TypeScript |
| Content | @nuxt/content v3 (MDC components) |
| UI | @nuxt/ui v3 + Tailwind CSS v4 |
| Code Highlighting | Shiki (built into @nuxt/content) |
| Playground | @vue/repl (lazy-loaded, ~250KB) |
| State | Pinia + pinia-plugin-persistedstate |
| Testing | Vitest + @vue/test-utils + happy-dom |
| Search | MiniSearch (~8KB, build-time index) |
| Fonts/Images | @nuxt/fonts, @nuxt/image |
| Deploy | Vercel / Netlify (SSG) |

## Phases Overview

### Part A — Project Build (Phases 1-4)

| # | Phase | Effort | Status | What |
|---|---|---|---|---|
| 1 | [Project Setup](./phase-01-project-setup.md) | ~2h | done | Init Nuxt 3, install modules, layouts, base pages |
| 2 | [Content Architecture](./phase-02-content-architecture.md) | ~3h | pending | Collections, 38 lesson stubs, sidebar/TOC/breadcrumb |
| 3 | [Interactive Playground](./phase-03-interactive-playground.md) | ~3h | pending | @vue/repl MDC component, CodeExample, playground files |
| 4 | [Learning Features](./phase-04-learning-features.md) | ~3h | pending | Progress tracking, MiniSearch, dark/light theme |

### Part B — Content (Phase 5)

| # | Phase | Effort | Status | What |
|---|---|---|---|---|
| 5 | [Content Creation](./phase-05-content-creation.md) | ~14h | pending | 38 lessons across 8 sections (roadmap.sh/vue + Vitest) |

### Part C — Ship (Phase 6)

| # | Phase | Effort | Status | What |
|---|---|---|---|---|
| 6 | [Polish & Deploy](./phase-06-polish-deploy.md) | ~2h | pending | Mobile responsive, SEO, Lighthouse, deploy |

## Content Structure (roadmap.sh/vue)

| # | Section | Lessons | Difficulty |
|---|---|---|---|
| 1 | Fundamentals | 4 | Beginner |
| 2 | Templates & Rendering | 5 | Beginner |
| 3 | Composition API | 4 | Beginner-Intermediate |
| 4 | Advanced Components | 6 | Intermediate |
| 5 | Reusability Patterns | 4 | Intermediate-Advanced |
| 6 | Ecosystem | 5 | Intermediate |
| 7 | Nuxt & Beyond | 5 | Advanced |
| 8 | Testing (Vitest) | 5 | Intermediate-Advanced |
| | **Total** | **38** | |

## Critical Path

```
Phase 1 (Setup)
  └→ Phase 2 (Content Architecture)
       ├→ Phase 3 (Playground)  ──┐
       ├→ Phase 4 (Features)   ──┼→ Phase 6 (Polish & Deploy)
       └→ Phase 5 (Content)    ──┘
```

- Phases 3 & 4 chạy song song sau Phase 2
- Phase 5 bắt đầu ngay sau Phase 2, viết dần khi Phase 3-4 hoàn thành
- Phase 6 là bước cuối khi mọi thứ đã sẵn sàng

## Key Architecture Decisions

1. **Nuxt 3 SSG** — full static site, no server needed
2. **@nuxt/content v3 + MDC** — viết lessons bằng Markdown, embed Vue components
3. **@vue/repl lazy-loaded** — playground chỉ load khi cần, giữ initial bundle nhỏ
4. **Pinia + localStorage** — progress tracking không cần backend
5. **MiniSearch build-time index** — search nhanh, offline-capable
6. **8 sections theo roadmap.sh/vue + Vitest** — learning path chuẩn, progressive difficulty
7. **Vitest** — unit test, component test, store test, mocking patterns

## Known Issues & Notes

| Issue | Impact | Where to Fix | Detail |
|---|---|---|---|
| Project uses **Nuxt 4** (not 3) | Low — APIs compatible | All phases | `nuxt@^4.4.2`, some modules behave differently |
| `@pinia-plugin-persistedstate/nuxt` deprecated | High — crashes at runtime | Phase 4 | Must use manual Pinia plugin setup instead |
| `@nuxt/content v3` needs `better-sqlite3` | Low — just install it | Done (Phase 1) | `npm install better-sqlite3` |
| `@nuxt/image` → `sharp` build fails | Low — images still work | Phase 6 | Set `image: { provider: 'none' }` as workaround |
| `@iconify-json/heroicons` needed | Low — just install it | Done (Phase 1) | Icons won't render without this devDep |
| @nuxt/ui v4 needs explicit CSS file | High — no styles without it | Done (Phase 1) | Create `app/assets/css/main.css` with `@import "tailwindcss"` + `@import "@nuxt/ui"`, add to `css` in nuxt.config |

## Research

- [Nuxt 3 Ecosystem](./research/researcher-01-nuxt3-ecosystem.md)
- [Interactive Playground & Features](./research/researcher-02-interactive-playground.md)
- Reference: [roadmap.sh/vue](https://roadmap.sh/vue)
