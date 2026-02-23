import { z } from 'zod';

const environmentSchema = z.enum(['development', 'staging', 'production', 'test']);

const runtimeConfigSchema = z.object({
  environment: environmentSchema.default('development'),
  apiBaseUrl: z.string().url().optional(),
  appName: z.string().min(1).default('Aff'),
  version: z.string().optional(),
});

const envSchema = z.object({
  NODE_ENV: environmentSchema.optional(),
  NUXT_PUBLIC_APP_NAME: z.string().min(1).optional(),
  NUXT_PUBLIC_VERSION: z.string().optional(),
  NUXT_API_BASE_URL: z.string().url().optional(),
});

export type RuntimeConfig = z.infer<typeof runtimeConfigSchema>;
export type Environment = z.infer<typeof environmentSchema>;

export function validateRuntimeConfig(env: Record<string, string | undefined>): RuntimeConfig {
  const parsedEnv = envSchema.parse(env);

  const config: RuntimeConfig = {
    environment: (parsedEnv.NODE_ENV as Environment) || 'development',
    apiBaseUrl: parsedEnv.NUXT_API_BASE_URL,
    appName: parsedEnv.NUXT_PUBLIC_APP_NAME || 'Aff',
    version: parsedEnv.NUXT_PUBLIC_VERSION,
  };

  return runtimeConfigSchema.parse(config);
}

export { runtimeConfigSchema, envSchema };
