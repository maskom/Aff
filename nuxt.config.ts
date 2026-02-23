import { z } from 'zod';

const configSchema = z.object({
  NUXT_PUBLIC_APP_NAME: z.string().default('Affiliate Dashboard'),
  NUXT_PUBLIC_API_BASE: z.string().url().optional(),
  NUXT_ENVIRONMENT: z.enum(['development', 'staging', 'production']).default('development'),
});

function validateConfig() {
  const result = configSchema.safeParse(process.env);
  if (!result.success) {
    console.error('\n❌ Invalid environment configuration:');
    result.error.issues.forEach((issue) => {
      console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
    });
    console.error('\nPlease check your environment variables.\n');
    process.exit(1);
  }
  return result.data;
}

const config = validateConfig();

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appName: config.NUXT_PUBLIC_APP_NAME,
      apiBase: config.NUXT_PUBLIC_API_BASE,
    },
    environment: config.NUXT_ENVIRONMENT,
  },
  routeRules: {
    '/': { prerender: true },
  },
});
