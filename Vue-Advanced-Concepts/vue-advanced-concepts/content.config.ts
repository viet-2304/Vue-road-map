import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: z.object({
        section: z.number().min(1).max(8),
        order: z.number(),
        icon: z.string().optional(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        estimatedTime: z.string(),
        prerequisites: z.array(z.string()).default([]),
      }),
    }),
  },
})
