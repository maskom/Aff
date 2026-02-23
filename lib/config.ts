import { z } from 'zod'

const configSchema = z.object({
  AFF_API_BASE: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type AppConfig = z.infer<typeof configSchema>

export function validateConfig(env: Record<string, string | undefined>): AppConfig {
  const result = configSchema.safeParse(env)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')

    throw new Error(`Invalid configuration:\n${issues}`)
  }

  return result.data
}
