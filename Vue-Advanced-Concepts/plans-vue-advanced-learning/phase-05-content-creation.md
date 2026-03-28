# Phase 5: Content Creation (Based on roadmap.sh/vue)

## Context
- **Parent plan:** [plan.md](./plan.md)
- **Dependencies:** Phase 2 (Content Architecture), Phase 3 (Playground)
- **Reference:** [roadmap.sh/vue](https://roadmap.sh/vue)
- **Blocks:** Phase 6 (Polish)

## Overview
- **Date:** 2026-03-27
- **Description:** Write 38 lessons across 8 sections following the roadmap.sh/vue learning path + Vitest testing. Each lesson: theory → code examples → interactive playground → exercise.
- **Priority:** P2
- **Status:** pending
- **Effort:** ~12h (incremental, can start after Phase 2)

## Key Insights
- roadmap.sh/vue organizes learning from project bootstrapping → components → templates → advanced → ecosystem
- Each topic maps to a real-world skill; lessons should reflect practical usage
- MDC components enable embedding ::playground and ::code-example inline
- Playground files in `playground-files/` keep markdown clean

## Content Map (38 Lessons)

### Section 1 — Fundamentals (4 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 1.1 | Single File Components | SFC structure, `<script setup>`, `<style scoped>` | Basic SFC |
| 1.2 | Component Registration | Global vs local, naming conventions, auto-import (Nuxt) | Component tree |
| 1.3 | Props & Events | Props validation, emit, defineProps/defineEmits | Parent-child comm |
| 1.4 | v-model & Attribute Inheritance | v-model on components, defineModel, $attrs, inheritAttrs | Custom input |

### Section 2 — Templates & Rendering (5 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 2.1 | Directives Overview | Built-in directives, v-text, v-html, v-cloak, v-pre, v-once | Directive showcase |
| 2.2 | Conditional Rendering | v-if, v-else, v-else-if, v-show, key for reuse | Toggle UI |
| 2.3 | List Rendering | v-for, key attribute, array mutation, filtering/sorting | Dynamic list |
| 2.4 | Event Handling | v-on, modifiers (.stop, .prevent, .once), method handlers | Event lab |
| 2.5 | Data Binding | v-bind, class/style binding, dynamic attributes | Style playground |

### Section 3 — Composition API (4 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 3.1 | Reactivity: ref & reactive | ref vs reactive, toRef, toRefs, unref, isRef | Reactivity explorer |
| 3.2 | Computed Properties | computed(), writable computed, caching behavior | Derived state |
| 3.3 | Watchers | watch, watchEffect, deep/immediate, cleanup, watchPostEffect | Auto-save form |
| 3.4 | Lifecycle Hooks | onMounted, onUnmounted, onUpdated, execution order | Timer with cleanup |

### Section 4 — Advanced Components (6 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 4.1 | Provide/Inject | provide/inject, reactivity, Symbol keys, defaults | Theme provider |
| 4.2 | Slots | Named slots, scoped slots, dynamic slots, renderless components | Slot patterns |
| 4.3 | Teleport | `<Teleport>`, to target, disabled state, multiple teleports | Modal system |
| 4.4 | Suspense & Async Components | `<Suspense>`, defineAsyncComponent, fallback, error boundary | Async loading UI |
| 4.5 | Transitions & Animations | `<Transition>`, `<TransitionGroup>`, CSS/JS hooks, FLIP | Animated list |
| 4.6 | Forms Handling | Input bindings, modifiers (.lazy, .number, .trim), form patterns | Form builder |

### Section 5 — Reusability Patterns (4 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 5.1 | Custom Composables | Extraction patterns, return conventions, async composables | useMousePosition, useFetch |
| 5.2 | Custom Directives | Directive hooks, arguments, modifiers, lifecycle | v-focus, v-click-outside |
| 5.3 | Plugins | app.use(), provide at app level, plugin options | Toast plugin |
| 5.4 | Render Functions & JSX | h(), functional components, JSX setup, slots in render | Dynamic component factory |

### Section 6 — Ecosystem (5 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 6.1 | Vue Router | Dynamic routes, nested routes, navigation guards, lazy loading | Router playground |
| 6.2 | Pinia State Management | defineStore, composable stores, plugins, $subscribe, HMR | Store with history |
| 6.3 | VueUse Utilities | Essential composables, integration patterns, custom extensions | VueUse showcase |
| 6.4 | Form Validation | Vee-Validate / FormKit, schema validation, error handling | Validated form |
| 6.5 | API Integration | fetch/Axios, Tanstack Query, loading/error states, caching | API data fetcher |

### Section 7 — Nuxt & Beyond (5 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 7.1 | Nuxt SSR/SSG | Rendering modes, routeRules, nuxi generate, hybrid rendering | N/A (code examples) |
| 7.2 | Nuxt Middleware | Route middleware, server middleware, global vs inline | Auth guard pattern |
| 7.3 | Server Components | Nuxt Islands, partial hydration, server-only rendering | N/A (code examples) |
| 7.4 | SEO & Meta | useHead, useSeoMeta, OG images, structured data, sitemap | SEO configurator |
| 7.5 | Performance | shallowRef, v-once, v-memo, lazy hydration, bundle analysis | Before/after perf |

### Section 8 — Testing with Vitest (5 lessons)
| # | Lesson | Key Topics | Playground |
|---|---|---|---|
| 8.1 | Vitest Fundamentals | Setup, config, describe/it/expect, run modes, CLI | N/A (code examples) |
| 8.2 | Unit Testing Composables | Testing ref/reactive logic, mocking dependencies, async composables | Code examples |
| 8.3 | Component Testing | @vue/test-utils, mount/shallowMount, props, events, slots, stubs | Code examples |
| 8.4 | Testing Pinia Stores | createTestingPinia, mocking stores, testing actions/getters | Code examples |
| 8.5 | Mocking & Advanced Patterns | vi.mock, vi.spyOn, fake timers, snapshot testing, coverage | Code examples |

## Content Directory Structure

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
  8.testing/
    1.vitest-fundamentals.md
    2.unit-testing-composables.md
    3.component-testing.md
    4.testing-pinia-stores.md
    5.mocking-and-advanced.md
```

## Implementation Steps

1. **Create all playground files first** — each lesson gets a directory under `playground-files/` with `App.vue` + supporting files
2. **Write Section 1-3 first** (Fundamentals → Composition API) — core foundation
3. **Write Section 4-5** (Advanced Components → Reusability) — intermediate
4. **Write Section 6-8** (Ecosystem → Nuxt → Testing) — advanced/ecosystem
5. **Cross-reference pass** — link prerequisites, related lessons, "next lesson"
6. **Consistency review** — terminology, voice, formatting

## Todo List

### Section 1 — Fundamentals
- [ ] 1.1 Single File Components
- [ ] 1.2 Component Registration
- [ ] 1.3 Props & Events
- [ ] 1.4 v-model & Attribute Inheritance

### Section 2 — Templates & Rendering
- [ ] 2.1 Directives Overview
- [ ] 2.2 Conditional Rendering
- [ ] 2.3 List Rendering
- [ ] 2.4 Event Handling
- [ ] 2.5 Data Binding

### Section 3 — Composition API
- [ ] 3.1 Reactivity: ref & reactive
- [ ] 3.2 Computed Properties
- [ ] 3.3 Watchers
- [ ] 3.4 Lifecycle Hooks

### Section 4 — Advanced Components
- [ ] 4.1 Provide/Inject
- [ ] 4.2 Slots
- [ ] 4.3 Teleport
- [ ] 4.4 Suspense & Async Components
- [ ] 4.5 Transitions & Animations
- [ ] 4.6 Forms Handling

### Section 5 — Reusability
- [ ] 5.1 Custom Composables
- [ ] 5.2 Custom Directives
- [ ] 5.3 Plugins
- [ ] 5.4 Render Functions & JSX

### Section 6 — Ecosystem
- [ ] 6.1 Vue Router
- [ ] 6.2 Pinia State Management
- [ ] 6.3 VueUse Utilities
- [ ] 6.4 Form Validation
- [ ] 6.5 API Integration

### Section 7 — Nuxt & Beyond
- [ ] 7.1 Nuxt SSR/SSG
- [ ] 7.2 Middleware
- [ ] 7.3 Server Components
- [ ] 7.4 SEO & Meta
- [ ] 7.5 Performance

### Section 8 — Testing with Vitest
- [ ] 8.1 Vitest Fundamentals
- [ ] 8.2 Unit Testing Composables
- [ ] 8.3 Component Testing
- [ ] 8.4 Testing Pinia Stores
- [ ] 8.5 Mocking & Advanced Patterns

### Final
- [ ] Cross-reference pass
- [ ] Consistency review
- [ ] All playground files tested

## Success Criteria
- All 38 lessons complete with theory, code examples, and playgrounds
- Content follows roadmap.sh/vue learning path order + Vitest testing section
- Playground files load correctly in @vue/repl
- Lessons build progressively (each section builds on previous)
- Cross-references link correctly

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| 38 lessons takes longer than 14h | High | Medium | Prioritize Section 1-3 first; later sections can ship as stubs |
| Ecosystem lessons need real project context | Medium | Low | Use simplified examples; link to full docs |
| Some Nuxt topics can't use @vue/repl | Medium | Low | Use CodeExample + explanation for server-side topics |

## Next Steps
→ [Phase 6: Polish & Deploy](./phase-06-polish-deploy.md)
