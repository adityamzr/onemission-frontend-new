import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./assets/css/main.css', './assets/css/font.css'],

  app: {
    head: {
      title: 'OneMission - Values Matter',
      meta: [
        { name: 'description', content: 'Discover premium fashion with modern elegance' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Inconsolata:wdth,wght@50..200,200..900&family=Jura:wght@300..700&display=swap', rel: 'stylesheet' },
        { href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,600;1,700&display=swap', rel: 'stylesheet' }
      ],
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@pinia/nuxt'],
})