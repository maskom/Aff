import { validateRuntimeConfig } from './lib/config/runtime-config';

function getValidatedConfig() {
  try {
    return validateRuntimeConfig(process.env);
  } catch (error) {
    console.error('[AFF-04] Runtime config validation failed:');
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
}

const validatedConfig = getValidatedConfig();

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    environment: validatedConfig.environment,
    apiBaseUrl: validatedConfig.apiBaseUrl,
    public: {
      appName: validatedConfig.appName,
      version: validatedConfig.version,
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
});
