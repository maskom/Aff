import { z } from 'zod';

const configSchema = z.object({
  NUXT_PUBLIC_APP_NAME: z.string().optional().default('Affiliate Connect'),
  NUXT_PUBLIC_API_BASE: z.string().url().optional(),
  NUXT_API_TIMEOUT_MS: z.string().regex(/^\d+$/).optional().default('10000'),
});

function validateConfig() {
  const result = configSchema.safeParse(process.env);
  if (!result.success) {
    console.error('Invalid environment configuration:');
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
  return result;
}

const config = validateConfig();

export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
  },
  runtimeConfig: {
    public: {
      appName: config.success ? config.data.NUXT_PUBLIC_APP_NAME : 'Affiliate Connect',
      apiBase: config.success ? config.data.NUXT_PUBLIC_API_BASE : undefined,
    },
    apiTimeoutMs: config.success ? parseInt(config.data.NUXT_API_TIMEOUT_MS, 10) : 10000,
  },
});
