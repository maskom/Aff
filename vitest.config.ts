import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', '.nuxt', '.output'],
  },
})
