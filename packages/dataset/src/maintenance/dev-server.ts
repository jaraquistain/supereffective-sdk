import fs from 'node:fs'
import path from 'node:path'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Express, type Request, type Response } from 'express'

function resolveConfig(): {
  port: string
  dataPath: string
  distDataPath: string
  assetsPath: string
} {
  const projectRoot = path.resolve(process.cwd())

  const dataPath = path.join(projectRoot, 'data')
  const distDataPath = path.join(projectRoot, 'dist', 'data')
  const assetsPath = path.resolve(path.join(projectRoot, '..', '..', '..', 'supereffective-assets', 'assets'))
  const port = '4455'

  function ensureDirExists(dirPath: string, errorMsg?: string) {
    if (!dirPath) {
      throw new Error('dataset dev-server: cannot use an empty path')
    }
    if (!fs.existsSync(dirPath)) {
      throw new Error(`dataset dev-server: ${errorMsg ?? `cannot use an non existing path: ${dirPath}`}`)
    }
  }

  ensureDirExists(dataPath)
  ensureDirExists(distDataPath, 'cannot find dist folder, did you run pnpm build?')
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

// TODO add CRUD endpoints for the data, refactoring admin and datalayer accordingly

app.listen(port, () => {
  console.log(`⚡️[assets-server]: Server is running at http://localhost:${port}`)
  console.log(`⚡️[assets-server]: Serving /assets from ${assetsPath}`)
  console.log(`⚡️[assets-server]: Serving /data from ${dataPath}`)
  console.log(`⚡️[assets-server]: Serving /dist/data from ${distDataPath}`)
})
