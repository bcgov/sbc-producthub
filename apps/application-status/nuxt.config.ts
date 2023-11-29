// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/BCSans.css', '~/assets/css/tailwind.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/BCID_V_rgb_pos_small.png'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      zenhubAPI: process.env.ZENHUB_APIKEY,
      ENTITIES_ID: process.env.ENTITIES,
      NAMETEAMSPACE_ID: process.env.NAMETEAMSPACE
    }
  }
})
