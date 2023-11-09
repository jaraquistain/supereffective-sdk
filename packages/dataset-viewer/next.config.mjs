import { ZodError, z } from 'zod'

const envVarsSchema = z.object({
  PORT: z.string(),
  DATASET_VIEWER_DATA_URL: z.string().url(),
  DATASET_VIEWER_ASSETS_URL: z.string().url(),
  NEXT_PUBLIC_DATASET_VIEWER_DATA_URL: z.string().url(),
  NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL: z.string().url(),
})

/**
 * @type {ReturnType<envVarsSchema['parse']>}
 */
let envVars = {}

try {
  envVars = process.env
} catch (error) {
  if (!(error instanceof ZodError)) {
    throw error
  }
  throw new Error(`Invalid environment variables: ${JSON.stringify(error.format(), null, 2)}`)
}

console.log('>> Environment Variables are: ', {
  NODE_ENV: String(process.env.NODE_ENV),
  VERCEL_ENV: String(process.env.VERCEL_ENV),
  VERCEL: String(process.env.VERCEL),
  CI: String(process.env.CI),
  DATASET_VIEWER_PORT: envVars.PORT,
  DATASET_VIEWER_DATA_URL: envVars.DATASET_VIEWER_DATA_URL,
  DATASET_VIEWER_ASSETS_URL: envVars.DATASET_VIEWER_ASSETS_URL,
  NEXT_PUBLIC_DATASET_VIEWER_DATA_URL: envVars.NEXT_PUBLIC_DATASET_VIEWER_DATA_URL,
  NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL: envVars.NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL,
})

// process.env.NEXT_PUBLIC_DATASET_VIEWER_DATA_URL = envVars.DATASET_VIEWER_DATA_URL
// process.env.NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL = envVars.DATASET_VIEWER_ASSETS_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   NEXT_PUBLIC_DATASET_VIEWER_DATA_URL: envVars.DATASET_VIEWER_DATA_URL,
  //   NEXT_PUBLIC_DATASET_VIEWER_ASSETS_URL: envVars.DATASET_VIEWER_ASSETS_URL,
  // },
}

export default nextConfig
