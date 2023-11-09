import fs from 'node:fs'
import path from 'node:path'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Express, type Request, type Response } from 'express'
import { ZodError, z } from 'zod'

const monorepoRoot = path.resolve(process.cwd(), '..', '..')

const envVarsSchema = z.object({
  STATIC_DEV_SERVER_PORT: z.string().default('4455'),
  STATIC_DEV_SERVER_DATA_PATH: z.string(),
  STATIC_DEV_SERVER_DATA_DIST_PATH: z.string(),
  STATIC_DEV_SERVER_ASSETS_PATH: z.string(),
})

type EnvVars = z.infer<typeof envVarsSchema>

function ensureDirExists(dirPath: string, errorMsg?: string) {
  if (!dirPath) {
    throw new Error('static-dev-server: cannot use an empty path')
  }
  if (!fs.existsSync(dirPath)) {
    throw new Error(`static-dev-server: ${errorMsg ?? `cannot use an non existing path: ${dirPath}`}`)
  }
}

function resolveConfig(): {
  port: string
  dataPath: string
  distDataPath: string
  assetsPath: string
} {
  let envVars: EnvVars

  try {
    envVars = envVarsSchema.parse(process.env)
  } catch (error) {
    if (!(error instanceof ZodError)) {
      throw error
    }
    throw new Error(`Invalid environment variables: ${JSON.stringify(error.format(), null, 2)}`)
  }

  // const envVars: EnvVars = envVarsSchema.parse(process.env)
  const dataPath = path.resolve(monorepoRoot, envVars.STATIC_DEV_SERVER_DATA_PATH)
  const distDataPath = path.resolve(monorepoRoot, envVars.STATIC_DEV_SERVER_DATA_DIST_PATH)
  const assetsPath = path.resolve(monorepoRoot, envVars.STATIC_DEV_SERVER_ASSETS_PATH)
  const port = envVars.STATIC_DEV_SERVER_PORT

  ensureDirExists(dataPath)
  ensureDirExists(distDataPath, 'cannot find the data dist folder, did you run pnpm build?')
  ensureDirExists(assetsPath, 'cannot find assets folder, did you clone the itsjavi/supereffective-assets repo?')

  return {
    port,
    dataPath,
    distDataPath,
    assetsPath,
  }
}

const app: Express = express()
const { port, dataPath, distDataPath, assetsPath } = resolveConfig()

app.use(cors())

// parse application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json requests
app.use(bodyParser.json())

// root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.send('Assets Server is Running')
})

// serve static content under /assets
app.use('/data', express.static(dataPath))
app.use('/dist/data', express.static(distDataPath))
app.use('/assets', express.static(assetsPath))

app.listen(port, () => {
  console.log(`⚡️[static-dev-server]: Server is running at http://localhost:${port}`)
  console.log(`⚡️[static-dev-server]: Serving /assets from ${assetsPath}`)
  console.log(`⚡️[static-dev-server]: Serving /data from ${dataPath}`)
  console.log(`⚡️[static-dev-server]: Serving /dist/data from ${distDataPath}`)
})
