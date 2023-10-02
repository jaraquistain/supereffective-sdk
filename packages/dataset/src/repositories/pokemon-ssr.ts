import { softMerge } from '../utils/merge'

import type { Pokemon } from '../schemas'
import { ensureDir, getDataPath, writeFileAsJson } from '../utils/fs'
import { type UpdatePokemon, getAllPokemonMappedById, getPokemon, getPokemonOrFail, validatePokemon } from './pokemon'

export function updateManyPokemon(batch: UpdatePokemon[]): void {
  const allPkm = getAllPokemonMappedById()

  for (const data of batch) {
    const isUpdate = allPkm.has(data.id)
    const id = data.id
    const pkm = isUpdate ? getPokemonOrFail(id) : getPokemon(id)
    const newPkm = softMerge<Pokemon>(
      (pkm || {
        evolvesFrom: null,
      }) as Pokemon,
      data,
    )
    const validation = validatePokemon(newPkm)

    if (!validation.success) {
      throw new Error(validation.error.issues.map((issue) => `[${issue.path}]: ${issue.message}`).join(',\n'))
    }
    allPkm.set(id, newPkm)

    const dataFileDir = getDataPath(`v2/pokemon/${data.region}`)
    ensureDir(dataFileDir)

    const dataFile = getDataPath(`v2/pokemon/${data.region}/${data.id}.json`)

    writeFileAsJson(dataFile, newPkm)
  }
}

export function updatePokemon(data: UpdatePokemon): void {
  updateManyPokemon([data])
}

// function updateCompactPokemonFile(data: Pokemon[]): void {
//   const dataFile = getDataPath('v2/pokemon-compact.json')
//   const result: CompactPokemon[] = []

//   for (const pkm of data) {
//     const cPkm: CompactPokemon = {
//       id: pkm.id,
//       nid: pkm.nid,
//       dexNum: pkm.dexNum,
//       formId: pkm.formId,
//       name: pkm.name,
//       formName: pkm.formName,
//       region: pkm.region,
//       generation: pkm.generation,
//       type1: pkm.type1,
//       type2: pkm.type2,
//       color: pkm.color,
//       isDefault: pkm.isDefault,
//       isForm: pkm.isForm,
//       isSpecialAbilityForm: pkm.isSpecialAbilityForm,
//       isCosmeticForm: pkm.isCosmeticForm,
//       isFemaleForm: pkm.isFemaleForm,
//       storableIn: pkm.storableIn,
//       baseSpecies: pkm.baseSpecies,
//     }
//     result.push(cPkm)
//   }

//   writeFileAsJson(dataFile, result)
// }
