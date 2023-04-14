// https://nuxt.com/docs/api/configuration/nuxt-config
// http://localhost:3000/api/image/
// https://api.baiyan777.com/api/image
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000'
    }
  }
})
