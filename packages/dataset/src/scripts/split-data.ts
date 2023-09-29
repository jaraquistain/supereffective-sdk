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

function splitEntitiesToFiles(filename: string): void {
  const destDirname = filename.replace('.json', '')
  const destDir = getDataPath(`v2/${destDirname}`)
  const destIndexFile = getDataPath(`v2/${destDirname}.json`)
  const srcFile = getDataPath(`v1/${filename}`)

  ensureDir(destDir)

  const records = readFileAsJson<BaseEntity[]>(srcFile)
  let indexDoc = '[\n'

  for (const record of records) {
    const jsonDoc = `${JSON.stringify(record, null, 2)}\n`
    const destFile = path.join(destDir, `${record.id}.json`)
    indexDoc += `  ${JSON.stringify({ id: record.id, name: record.name })},\n`
    writeFile(destFile, jsonDoc)
  }

  indexDoc = indexDoc.replace(/,\n$/, '\n')
  indexDoc += ']\n'

  writeFile(destIndexFile, indexDoc)
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

const splitFiles = ['pokedexes.json', 'pokemon.json']

for (const file of files) {
  transformToJsonLines(file)
}

for (const file of splitFiles) {
  splitEntitiesToFiles(file)
}
