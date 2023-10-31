// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://drive.google.com/file/d/18cwKBO0ZzLNQEnoqjEfC_6PCxqETDSqt/view?usp=sharing",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      zenhubAPI: process.env.ZENHUB_APIKEY,
    },
  },
});
