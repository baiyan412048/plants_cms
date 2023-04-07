// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.baiyan777.com'
    }
  }
})
