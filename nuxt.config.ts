import { z } from 'zod';

const envSchema = z.object({
  NUXT_PUBLIC_API_BASE: z.string().url().optional(),
  NUXT_ENVIRONMENT: z.enum(['development', 'staging', 'production']).default('development'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(parsedEnv.error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

const env = parsedEnv.data;

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    environment: env.NUXT_ENVIRONMENT,
    public: {
      apiBase: env.NUXT_PUBLIC_API_BASE || '',
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
});
