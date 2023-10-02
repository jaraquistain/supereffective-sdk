import { existsSync } from 'node:fs'
import type { BaseEntity } from '../schemas'
import { getDataPath, readFileAsJson, writeFile } from '../utils/fs'

function joinIndexFile(filename: string, subdirProp?: string): void {
  const baseFileName = filename.replace('-index.json', '')
  const srcFile = getDataPath(`${filename}`)
  const destFile = getDataPath(`${baseFileName}.json`)
  const records = readFileAsJson<BaseEntity[]>(srcFile)
  const recordMap = new Map<string, BaseEntity>()

  // Detect duplicate IDs
  for (const record of records) {
    if (recordMap.has(record.id)) {
      throw new Error(`Duplicate record ID: ${record.id}`)
    }

    recordMap.set(record.id, record)
  }

  let jsonlDoc = '[\n'

  for (const baseRecord of records) {
    const destRecordFile =
      subdirProp && (baseRecord as any)[subdirProp]
        ? getDataPath(`${baseFileName}/${(baseRecord as any)[subdirProp]}/${baseRecord.id}.json`)
        : getDataPath(`${baseFileName}/${baseRecord.id}.json`)

    if (!existsSync(destRecordFile)) {
      throw new Error(`Record file does not exist: ${destRecordFile}`)
    }
    const record = readFileAsJson<BaseEntity>(destRecordFile)

    jsonlDoc += `  ${JSON.stringify(record)},\n`
  }

  jsonlDoc = jsonlDoc.replace(/,\n$/, '\n')
  jsonlDoc += ']\n'

  writeFile(destFile, jsonlDoc)
}

joinIndexFile('box-presets-index.json', 'gameSet')
joinIndexFile('pokedexes-index.json', 'region')
joinIndexFile('pokemon-index.json', 'region')
