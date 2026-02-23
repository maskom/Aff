import { z } from 'zod';

const configSchema = z.object({
  AFF_API_BASE: z.string().url().optional().default('https://api.example.com'),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
});

function validateConfig() {
  const env = {
    AFF_API_BASE: process.env.AFF_API_BASE,
    NODE_ENV: process.env.NODE_ENV,
  };

  const result = configSchema.safeParse(env);

  if (!result.success) {
    console.error('Invalid runtime configuration:');
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    return env;
  }

  return result.data;
}

const config = validateConfig();

export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
  },
  runtimeConfig: {
    affApiBase: config.AFF_API_BASE,
  },
});
