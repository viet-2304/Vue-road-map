# Phase 1: Project Setup

## Context
- **Parent plan:** [plan.md](./plan.md)
- **Dependencies:** None (first phase)
- **Blocks:** Phase 2, 3, 4, 5, 6

## Overview
- **Date:** 2026-03-27
- **Description:** Initialize a Nuxt 3 project with all required modules, configure TypeScript, layouts, and base routing.
- **Priority:** P1
- **Status:** done
- **Effort:** ~2h

## Key Insights (from research)
- Nuxt 3.15+ has full TypeScript by default with auto-generated types.
- @nuxt/ui v3 bundles Tailwind CSS v4 and @nuxtjs/color-mode — no separate install needed.
- @nuxt/content v3 uses `content.config.ts` for collection definitions.
- Numbered prefixes in content dirs (`1.topic/`) control ordering; prefixes are stripped from URLs.
- The `app/` directory is the recommended source root for components, pages, layouts, composables.

## Requirements
- Working Nuxt 3 dev server with TypeScript
- All modules installed and registered: @nuxt/content, @nuxt/ui, @nuxt/fonts, @nuxt/image
- Base `nuxt.config.ts`, `content.config.ts`, `app.config.ts` configured
- Two layouts: `default` (landing page) and `docs` (sidebar + content + TOC)
- Two pages: `index.vue` (landing) and `[...slug].vue` (content catch-all)
- Tailwind CSS v4 functional with @nuxt/ui theming
- Dark/light mode toggle working

## Architecture

```
project-root/
  app/
    app.vue
    layouts/
      default.vue          # Clean layout for landing page
      docs.vue             # 3-column: sidebar | content | TOC
    pages/
      index.vue            # Landing page (hero + tier overview)
      [...slug].vue        # Catch-all for all content pages
    components/
      global/
        AppHeader.vue      # Site header with nav, search trigger, theme toggle
        AppFooter.vue      # Minimal footer
  content/                 # Empty for now, populated in Phase 2
  public/
    favicon.ico
  nuxt.config.ts
  content.config.ts
  app.config.ts
  tsconfig.json
  package.json
```

### Design Decisions
- Use `app/` directory structure (Nuxt 3 recommended pattern).
- `docs` layout uses CSS Grid for responsive 3-column layout.
- `default` layout is minimal — just header + slot + footer.
- SSG mode via `ssr: true` + `nuxi generate`.

## Related Code Files
| File | Action | Purpose |
|---|---|---|
| `nuxt.config.ts` | Create | Module registration, SSG config, shiki themes |
| `content.config.ts` | Create | Placeholder for collections (filled in Phase 2) |
| `app.config.ts` | Create | Runtime theme config (site name, nav links, colors) |
| `app/app.vue` | Create | Root component with `<NuxtLayout>` |
| `app/layouts/default.vue` | Create | Landing page layout |
| `app/layouts/docs.vue` | Create | Docs layout with sidebar + TOC slots |
| `app/pages/index.vue` | Create | Landing page |
| `app/pages/[...slug].vue` | Create | Content renderer page |
| `app/components/global/AppHeader.vue` | Create | Header with navigation |
| `app/components/global/AppFooter.vue` | Create | Site footer |

## Implementation Steps

1. **Initialize project**
   ```bash
   npx nuxi@latest init vue-advanced-concepts
   cd vue-advanced-concepts
   ```

2. **Install dependencies**
   ```bash
   npx nuxi module add content ui image fonts
   npm install @vue/repl pinia @pinia-plugin-persistedstate/nuxt minisearch
   npm install -D vitest @vue/test-utils @vitejs/plugin-vue happy-dom
   ```

3. **Configure `nuxt.config.ts`**
   - Register modules: `@nuxt/content`, `@nuxt/ui`, `@nuxt/fonts`, `@nuxt/image`
   - Set `ssr: true` for SSG compatibility
   - Configure Shiki themes (e.g., `github-dark`, `github-light`) via content module options
   - Set `routeRules: { '/**': { prerender: true } }` for full SSG

4. **Configure `app.config.ts`**
   - Site title, description
   - Navigation links
   - UI color scheme settings

5. **Create `app/app.vue`**
   - `<NuxtLayout><NuxtPage /></NuxtLayout>`

6. **Create `default` layout**
   - AppHeader + `<slot />` + AppFooter
   - Full-width, no sidebar

7. **Create `docs` layout**
   - AppHeader
   - 3-column grid: sidebar (250px) | main content (flex) | TOC (200px)
   - Responsive: collapse sidebar to drawer on mobile
   - Slot for main content

8. **Create AppHeader component**
   - Site logo/title
   - Navigation links
   - Color mode toggle button (using `useColorMode()` from @nuxt/ui)
   - Search trigger button (placeholder, wired in Phase 4)

9. **Create AppFooter component**
   - Minimal: copyright, links

10. **Create `index.vue` landing page**
    - Hero section with title and description
    - Three cards for Tier 1/2/3 overview
    - CTA button to first lesson

11. **Create `[...slug].vue` catch-all**
    - Use `useRoute()` to get slug
    - Render with `<ContentRenderer>` (from @nuxt/content)
    - Set `layout: 'docs'` via `definePageMeta`

12. **Verify setup**
    - `npm run dev` — confirm dev server works
    - Confirm dark/light toggle works
    - Confirm `[...slug]` route resolves (will be empty until Phase 2)

## Todo List
- [x] Initialize Nuxt 3 project
- [x] Install all modules and dependencies
- [x] Configure nuxt.config.ts
- [x] Configure app.config.ts
- [x] Configure content.config.ts (placeholder)
- [x] Create app.vue
- [x] Create default layout
- [x] Create docs layout (3-column)
- [x] Create AppHeader with theme toggle
- [x] Create AppFooter
- [x] Create index.vue landing page
- [x] Create [...slug].vue catch-all page
- [x] Verify dev server runs without errors
- [x] Verify dark/light mode toggle

## Success Criteria
- `npm run dev` starts without errors
- Landing page renders at `/`
- Dark/light mode toggle works
- Docs layout shows 3-column structure
- `nuxi generate` produces a static build without errors

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| @nuxt/ui v3 breaking changes | Low | Medium | Pin version, check release notes |
| Tailwind v4 config differences | Medium | Low | Follow @nuxt/ui docs (Tailwind v4 is auto-configured) |
| Module compatibility issues | Low | High | Test each module incrementally |

## Implementation Notes (2026-03-27)

> Discovered during implementation — important context for later phases.

1. **Nuxt 4, not Nuxt 3** — Project was initialized with `nuxt@^4.4.2`. APIs are largely compatible but some modules behave differently.
2. **`@pinia-plugin-persistedstate/nuxt` is deprecated and incompatible with Nuxt 4** — Crashes at runtime (`Cannot read properties of undefined (reading 'use')`). Removed from modules. Phase 4 must configure Pinia persistence manually (e.g., `pinia-plugin-persistedstate` as a Nuxt plugin).
3. **`@nuxt/content v3` requires `better-sqlite3`** — Must be installed explicitly (`npm install better-sqlite3`).
4. **`@nuxt/image` requires `ipx` which depends on `sharp`** — `sharp` native build fails on this machine. Workaround: set `image: { provider: 'none' }` in `nuxt.config.ts`. Phase 6 should revisit (try `npm install --platform=darwin sharp` or use a cloud image provider).
5. **`@iconify-json/heroicons` must be installed separately** — `@nuxt/ui` does not bundle icon sets. Added as devDependency.
6. **`useAppConfig()` nested keys** — In Nuxt 4, custom keys under `defineAppConfig()` work but require safe access (`appConfig?.site?.title`) to avoid SSR crashes during initial render.

## Next Steps
After this phase, proceed to **[Phase 2: Content Architecture](./phase-02-content-architecture.md)** to define content collections, create the directory structure, and build navigation components.
