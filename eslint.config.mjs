import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
})
  .append(eslintConfigPrettier)
  .append({
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: {
          ts: '@typescript-eslint/parser',
          js: 'espree',
          '<template>': 'espree',
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  })
  .append({
    ignores: ['cloudflare/**', 'dist/**', '.nuxt/**', '.output/**', 'node_modules/**'],
  });
