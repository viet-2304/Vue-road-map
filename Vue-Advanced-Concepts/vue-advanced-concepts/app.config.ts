export default defineAppConfig({
  site: {
    title: 'Vue Advanced Concepts',
    description: 'Hands-on Vue/Nuxt learning platform with interactive playgrounds',
  },
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Lessons', to: '/docs/fundamentals/single-file-components' },
  ],
  ui: {
    primary: 'green',
    gray: 'neutral',
  },
})
