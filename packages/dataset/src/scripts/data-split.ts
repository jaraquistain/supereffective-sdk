import path from 'node:path'
import type { BaseEntity } from '../schemas'
import { ensureDir, getDataPath, readFileAsJson, writeFile } from '../utils/fs'

function transformToJsonLines(filename: string): void {
  const srcFile = getDataPath(`v1/${filename}`)
  const destFile = getDataPath(`v2/${filename}`)
  const records = readFileAsJson<BaseEntity[]>(srcFile)

  let jsonlDoc = '[\n'

  for (const record of records) {
    jsonlDoc += `  ${JSON.stringify(record)},\n`
  }

  jsonlDoc = jsonlDoc.replace(/,\n$/, '\n')
  jsonlDoc += ']\n'

  writeFile(destFile, jsonlDoc)
}

function splitEntitiesToFiles(filename: string, subdirProp?: string): void {
  const destDirname = filename.replace('.json', '')
  const destIndexFile = getDataPath(`v2/${destDirname}-index.json`)
  const destFullFile = getDataPath(`v2/${destDirname}.json`)
  const srcFile = getDataPath(`v1/${filename}`)

  const records = readFileAsJson<BaseEntity[]>(srcFile)
  let indexDoc = '[\n'

  for (const record of records) {
    const destDir =
      subdirProp && (record as any)[subdirProp]
        ? getDataPath(`v2/${destDirname}/${(record as any)[subdirProp]}`)
        : getDataPath(`v2/${destDirname}`)

    ensureDir(destDir)

    const jsonDoc = `${JSON.stringify(record, null, 2)}\n`
    const destFile = path.join(destDir, `${record.id}.json`)
    const indexPayload = subdirProp
      ? {
          id: record.id,
          [subdirProp]: (record as any)[subdirProp],
          name: record.name,
        }
      : {
          id: record.id,
          name: record.name,
        }
    indexDoc += `  ${JSON.stringify(indexPayload)},\n`
    writeFile(destFile, jsonDoc)
  }

  indexDoc = indexDoc.replace(/,\n$/, '\n')
  indexDoc += ']\n'

  writeFile(destIndexFile, indexDoc)
  writeFile(destFullFile, indexDoc)
}

function splitLegacyBoxPresets(): void {
  const destDirname = 'box-presets'
  const destIndexFile = getDataPath(`v2/${destDirname}-index.json`)
  const destFullFile = getDataPath(`v2/${destDirname}.json`)
  const srcFile = getDataPath('v1/legacy/box-presets.json')

  const data = readFileAsJson<Record<string, Record<string, any>>>(srcFile)
  const records = Object.entries(data)
  let indexDoc = '[\n'

  for (const [gameSetId, presetsData] of records) {
    const presetRecords = Object.entries(presetsData)
    const destDir = getDataPath(`v2/${destDirname}/${gameSetId}`)

    ensureDir(destDir)

    for (const [, record] of presetRecords) {
      const uid = `${gameSetId}-${record.id}`
      record.gameSet = gameSetId
      const { id: legacyId, ...oldRecord } = record
      const newRecord = {
        id: uid,
        legacyId,
        ...oldRecord,
      }

      const jsonDoc = `${JSON.stringify(newRecord, null, 2)}\n`
      const destFile = path.join(destDir, `${uid}.json`)
      indexDoc += `  ${JSON.stringify({
        id: uid,
        gameSet: gameSetId,
        legacyId: legacyId,
        isHidden: newRecord.isHidden ? true : undefined,
        name: newRecord.name,
      })},\n`
      writeFile(destFile, jsonDoc)
    }
  }

  indexDoc = indexDoc.replace(/,\n$/, '\n')
  indexDoc += ']\n'

  writeFile(destIndexFile, indexDoc)
  writeFile(destFullFile, indexDoc)
}

const files = [
  'abilities.json',
  'colors.json',
  'games.json',
  'items.json',
  'languages.json',
  'locations.json',
  'marks.json',
  'moves.json',
  'natures.json',
  'originmarks.json',
  // 'pokedexes.json',
  // 'pokemon.json',
  'regions.json',
  'ribbons.json',
  'types.json',
]

for (const file of files) {
  transformToJsonLines(file)
}

splitEntitiesToFiles('pokedexes.json', 'region')
splitEntitiesToFiles('pokemon.json', 'region')

splitLegacyBoxPresets()
