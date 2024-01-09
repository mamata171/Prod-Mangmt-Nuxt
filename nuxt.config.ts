// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css",
],

modules : ['nuxt-icons','@pinia/nuxt'],
routeRules: {
  'confirm-key': {
      ssr: false
  }
}
})
