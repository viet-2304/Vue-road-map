// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
  ],

  image: {
    provider: 'none',
  },

  ssr: true,

  routeRules: {
    '/**': { prerender: true },
  },

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  app: {
    baseURL: process.env.GITHUB_ACTIONS ? '/Vue-road-map/' : '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Vue Advanced Concepts',
      meta: [
        { name: 'description', content: 'Hands-on Vue/Nuxt learning platform with interactive playgrounds' },
      ],
    },
  },
})
