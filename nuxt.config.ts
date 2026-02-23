import { validateConfig } from './lib/config'

const config = validateConfig(process.env)

export default defineNuxtConfig({
  devtools: { enabled: config.NODE_ENV === 'development' },
  routeRules: {
    '/': { prerender: true },
  },
  runtimeConfig: {
    apiBase: config.AFF_API_BASE,
  },
});
