import { defineNuxtModule, useNuxt } from 'nuxt/kit'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

export default defineNuxtModule({
  meta: { name: 'search-index' },
  setup() {
    const nuxt = useNuxt()

    nuxt.hook('build:before', () => {
      const contentDir = join(nuxt.options.rootDir, 'content/docs')
      const publicDir = join(nuxt.options.rootDir, 'public')
      const docs: any[] = []
      let id = 1

      function walkDir(dir: string) {
        for (const entry of readdirSync(dir)) {
          const fullPath = join(dir, entry)
          const stat = statSync(fullPath)
          if (stat.isDirectory()) {
            walkDir(fullPath)
          } else if (entry.endsWith('.md')) {
            const raw = readFileSync(fullPath, 'utf-8')
            const { frontmatter, body } = parseFrontmatter(raw)
            const relPath = relative(join(nuxt.options.rootDir, 'content'), fullPath)
              .replace(/\.md$/, '')
              .replace(/\/\d+\./g, '/')
              .replace(/^\d+\./, '')
            docs.push({
              id: id++,
              title: frontmatter.title || entry.replace('.md', ''),
              description: frontmatter.description || '',
              body: body.replace(/[#*`\[\]()>_~|\\-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500),
              path: `/docs/${relPath}`,
            })
          }
        }
      }

      try {
        walkDir(contentDir)
        writeFileSync(join(publicDir, 'search-index.json'), JSON.stringify(docs))
        console.log(`[search-index] Generated index with ${docs.length} documents`)
      } catch (e) {
        console.warn('[search-index] Could not generate search index:', e)
      }
    })
  },
})

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { frontmatter: {} as any, body: content }
  const frontmatter: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      frontmatter[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
    }
  }
  return { frontmatter, body: match[2] }
}
