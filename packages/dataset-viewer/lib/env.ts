import { ZodError, z } from 'zod'

const envVarsSchema = z.object({
  NEXT_PUBLIC_DATASET_VIEWER_DATA_URL: z.string().url(),
  NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL: z.string().url(),
})

let envVars: z.infer<typeof envVarsSchema>

try {
  // we must explicitly access each process.env.* var here, otherwise Next.js will not process them
  envVars = envVarsSchema.parse({
    NEXT_PUBLIC_DATASET_VIEWER_DATA_URL: process.env.NEXT_PUBLIC_DATASET_VIEWER_DATA_URL,
    NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL: process.env.NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL,
  })
} catch (error) {
  if (!(error instanceof ZodError)) {
    throw error
  }
  throw new Error(`Invalid environment variables: ${JSON.stringify(error.format(), null, 2)}`)
}

export { envVars }
