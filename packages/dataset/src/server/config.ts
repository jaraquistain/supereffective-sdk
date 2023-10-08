import fs from 'node:fs'
import path from 'node:path'
// import { parseArgs } from 'node:util'
// const {
//   values: { port, dataPath },
// } = parseArgs({
//   options: {
//     port: {
//       type: 'string',
//       short: 'p',
//       default: '4455',
//     },
//     dataPath: {
//       type: 'string',
//       short: 'a',
//       default: path.join(projectRoot, 'data'),
//     },
//   },
// })

// project root is where the package.json is located, for this package
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

const config = {
  port,
  dataPath,
  distDataPath,
  assetsPath,
}

export default config
