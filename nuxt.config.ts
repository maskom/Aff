import { z } from 'zod';

const configSchema = z.object({
  public: z.object({
    apiBase: z.string().url().optional(),
    analyticsKey: z.string().optional(),
  }),
});

function validateConfig() {
  const config = {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      analyticsKey: process.env.NUXT_PUBLIC_ANALYTICS_KEY,
    },
  };

  const result = configSchema.safeParse(config);

  if (!result.success) {
    console.error('Invalid runtime configuration:');
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }

  return result.data;
}

const validatedConfig = validateConfig();

export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
  },
  runtimeConfig: {
    public: {
      apiBase: validatedConfig.public.apiBase ?? '',
      analyticsKey: validatedConfig.public.analyticsKey ?? '',
    },
  },
});
