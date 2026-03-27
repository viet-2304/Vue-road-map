# Phase 6: Polish & Deploy

## Context
- **Parent plan:** [plan.md](./plan.md)
- **Dependencies:** Phase 1-5 (all prior phases)
- **Blocks:** None (final phase)

## Overview
- **Date:** 2026-03-27
- **Description:** Final polish pass including mobile responsiveness, SEO optimization, performance tuning, landing page refinement, and deployment to a static hosting platform.
- **Priority:** P2
- **Status:** pending
- **Effort:** ~2h

## Key Insights (from research)
- Nuxt 3 SSG via `nuxi generate` produces fully static output deployable to Vercel/Netlify/Cloudflare Pages.
- `routeRules` can fine-tune caching and prerendering per route.
- `useHead()` and `useSeoMeta()` provide per-page SEO control.
- @nuxt/image provides build-time image optimization.
- Bundle analysis via `nuxi analyze` identifies large chunks (especially @vue/repl lazy chunk).

## Requirements
- All pages responsive on mobile, tablet, desktop
- SEO meta tags on every page (title, description, OG tags)
- Performance: Lighthouse score > 90 on landing page
- Landing page polished with clear value proposition
- Successful static deployment to Vercel or Netlify
- README.md with setup instructions

## Architecture

### SEO Strategy
- Global defaults in `nuxt.config.ts`: `app.head` with base title, description, OG image
- Per-page overrides via `useSeoMeta()` in `[...slug].vue` using content front-matter
- Sitemap generation via `@nuxtjs/sitemap` module or manual `server/routes/sitemap.xml.ts`
- robots.txt in `public/`

### Performance Targets
| Metric | Target |
|---|---|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Bundle (initial) | < 200KB gzipped |
| Playground chunk | Lazy-loaded, < 300KB gzipped |

### Responsive Breakpoints
- Mobile: < 768px — single column, sidebar as drawer, no TOC
- Tablet: 768-1024px — two columns (sidebar + content), TOC hidden
- Desktop: > 1024px — three columns (sidebar + content + TOC)

## Related Code Files
| File | Action | Purpose |
|---|---|---|
| `app/layouts/docs.vue` | Modify | Responsive breakpoints, mobile drawer |
| `app/pages/index.vue` | Modify | Polish landing page design |
| `app/pages/[...slug].vue` | Modify | Add useSeoMeta per page |
| `nuxt.config.ts` | Modify | SEO defaults, sitemap, performance config |
| `public/robots.txt` | Create | Search engine directives |
| `public/og-image.png` | Create | Default Open Graph image |
| `README.md` | Create | Project documentation |
| `vercel.json` or `netlify.toml` | Create | Deployment config |

## Implementation Steps

1. **Mobile responsiveness audit**
   - Test all pages at 375px, 768px, 1024px, 1440px widths
   - Docs layout: convert sidebar to slide-out drawer on mobile (hamburger menu)
   - Hide TOC on tablet and below
   - Playground: stack editor/preview vertically on mobile
   - Search palette: full-screen on mobile
   - Fix any overflow or layout issues

2. **SEO optimization**
   - Add global `app.head` in `nuxt.config.ts`: charset, viewport, default title template, OG defaults
   - In `[...slug].vue`, use `useSeoMeta()` with content front-matter:
     ```ts
     useSeoMeta({
       title: page.title,
       description: page.description,
       ogTitle: page.title,
       ogDescription: page.description,
       ogImage: '/og-image.png',
     })
     ```
   - Create `public/robots.txt` allowing all crawlers
   - Add sitemap generation (consider `@nuxtjs/sitemap` module)

3. **Performance optimization**
   - Run `nuxi analyze` to review bundle composition
   - Verify @vue/repl is in a separate lazy chunk (not in main bundle)
   - Verify search index loads on-demand (not at page load)
   - Add `loading="lazy"` to any images via @nuxt/image
   - Enable Nuxt built-in optimizations: `experimental.payloadExtraction`, component islands if beneficial
   - Test with Lighthouse, target > 90 on all metrics

4. **Landing page polish**
   - Hero section: clear headline, subtitle, CTA button
   - Feature highlights: 3 cards (interactive playgrounds, progress tracking, 18 lessons)
   - Tier overview section with lesson counts and difficulty indicators
   - Progress bar (visible if user has started)
   - Footer with links

5. **Create deployment config**
   - **Vercel:** `vercel.json` with SSG preset (or auto-detected)
   - **Netlify:** `netlify.toml` with `[build] command = "npx nuxi generate"` and `publish = ".output/public"`
   - Test deployment locally: `npx nuxi generate && npx serve .output/public`

6. **Create README.md**
   - Project description
   - Tech stack summary
   - Setup instructions (`npm install`, `npm run dev`, `npm run generate`)
   - Content authoring guide (how to add a new lesson)
   - Deployment instructions

7. **Final testing**
   - Full navigation test: visit every lesson via sidebar
   - Test progress tracking: mark lessons, refresh, verify persistence
   - Test search: query various terms, verify results
   - Test playground: edit code, reset, verify in multiple lessons
   - Test dark/light mode across all pages
   - Test on actual mobile device if possible
   - Run `nuxi generate` and verify output

## Todo List
- [ ] Audit and fix mobile responsiveness
- [ ] Implement mobile sidebar drawer
- [ ] Add SEO meta tags to all pages
- [ ] Create robots.txt
- [ ] Create default OG image
- [ ] Run bundle analysis and optimize
- [ ] Polish landing page design
- [ ] Create deployment configuration
- [ ] Create README.md
- [ ] Run Lighthouse audit
- [ ] Full end-to-end testing
- [ ] Deploy to hosting platform
- [ ] Verify deployed site works correctly

## Success Criteria
- All pages render correctly on mobile (375px), tablet (768px), and desktop (1440px)
- Lighthouse performance score > 90 on landing page
- Every page has unique, accurate SEO meta tags
- `nuxi generate` completes without errors
- Site deploys successfully and all features work in production
- README provides clear setup and authoring instructions

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| SSG build fails on some content pages | Medium | High | Test `nuxi generate` early and often during Phase 5 |
| Lighthouse score below target | Medium | Medium | Focus on lazy loading and initial bundle size |
| Mobile layout edge cases | Medium | Low | Test with real devices, not just browser resize |
| Deployment platform-specific issues | Low | Medium | Test locally with `serve` before deploying |

## Carry-over Notes from Phase 1

> **@nuxt/image** — Currently set to `image: { provider: 'none' }` because `ipx` depends on `sharp` which fails native build on this machine. Options to fix:
> - Try `npm install --platform=darwin sharp` or install pre-built binary
> - Use a cloud provider (e.g., Vercel/Netlify image optimization, Cloudinary)
> - Keep `provider: 'none'` if no image optimization is needed (static site with few images)

## Next Steps
This is the final phase. After deployment:
- Monitor for issues in production
- Gather user feedback
- Plan future content additions (new lessons, quizzes, challenges)
- Consider adding Algolia DocSearch for improved search in the future
