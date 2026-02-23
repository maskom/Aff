import { z } from 'zod';

const configSchema = z.object({
  NUXT_PUBLIC_APP_NAME: z.string().optional().default('Affiliate Connect'),
  NUXT_PUBLIC_API_BASE: z.string().url().optional(),
  NUXT_SECRET_API_KEY: z.string().min(1).optional(),
});

const parsed = configSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  console.error(parsed.error.flatten().fieldErrors);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

export const env = parsed.success ? parsed.data : configSchema.parse({});

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiKey: env.NUXT_SECRET_API_KEY,
    public: {
      appName: env.NUXT_PUBLIC_APP_NAME,
      apiBase: env.NUXT_PUBLIC_API_BASE,
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
});
