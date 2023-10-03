import type { SafeParseReturnType } from 'zod'

import { PKM_SWITCH_GAMESET_IDS } from '../constants'
import type { IDType } from '../schemas'
import { type Pokemon, pokemonSchema } from '../schemas'
import { ensureDir, getDataPath, writeFileAsJson } from '../utils/fs'
import { mergeEntityIndex, softMerge } from '../utils/merge'

export type UpdatePokemon = Partial<Pokemon> & { id: string }
export type PokemonMap = Map<string, Pokemon>
export type UpdatePokemonFn = (data: UpdatePokemon) => Pokemon

let _pokemon: Map<string, Pokemon> = new Map()
let _pokemonInitialized = false

export function getPokemonAsMergedEntities(): Map<string, Pokemon> {
  if (_pokemonInitialized) {
    return _pokemon
  }

  _pokemon = mergeEntityIndex<Pokemon>('pokemon-index.json', 'region')
  const values = Array.from(_pokemon.values())
  for (const pkm of values) {
    validatePokemonOrFail(pkm)
  }

  _pokemonInitialized = true

  return _pokemon
}

export function validatePokemon(record: Pokemon): SafeParseReturnType<Pokemon, Pokemon> {
  return pokemonSchema.safeParse(record)
}

export function validatePokemonOrFail(record: Pokemon): Pokemon {
  try {
    return pokemonSchema.parse(record)
  } catch (error) {
    throw new Error(`Invalid Pokémon record for ${record.id}: ${error}`)
  }
}

export function getPokemon(id: string): Pokemon | null {
  const pkm = getPokemonAsMergedEntities().get(id)
  if (!pkm) {
    return null
  }

  return pkm
}

export function getPokemonByNameOrFail(name: string): Pokemon {
  const pkm = getAllPokemon().find((record) => record.name === name)
  if (!pkm) {
    throw Error(`Pokémon with name '${name}' not found`)
  }

  return pkm
}
export function getPokemonByShowdownNameOrFail(name: string): Pokemon {
  const pkm = getAllPokemon().find((record) => record.psName === name)
  if (!pkm) {
    throw Error(`Pokémon with psName '${name}' not found`)
  }

  return pkm
}

export function getManyPokemon(ids: string[]): Pokemon[] {
  return ids.map((id) => getPokemonOrFail(id))
}

export function getAllPokemon(): Pokemon[] {
  return Array.from(getPokemonAsMergedEntities().values())
}

export function getPreviousAndNextPokemon(
  list: Pokemon[],
  id: string,
): {
  prev: Pokemon | null
  next: Pokemon | null
} {
  const index = list.findIndex((pkm) => pkm.id === id)
  const prev = index <= 0 ? null : list[index - 1]
  const next = index < list.length - 1 ? list[index + 1] : null

  return {
    prev: prev ?? null,
    next: next ?? null,
  }
}

export function getAllPokemonMappedById(): Map<IDType, Pokemon> {
  return getPokemonAsMergedEntities()
}

export function getPokemonMissingOnSwitchGames(): Pokemon[] {
  return getAllPokemon()
    .filter((pkm) => {
      return !pkm.obtainableIn.some((gs: string) => PKM_SWITCH_GAMESET_IDS.includes(gs))
    })
    .filter((pkm) => pkm.dexNum > 0)
}

export type PokemonForGameSet = {
  obtainable: Pokemon[]
  storable: Pokemon[]
  transferOnly: Pokemon[]
  eventOnly: Pokemon[]
}
export function getPokemonForGameSet(gameSetId: string): PokemonForGameSet {
  const data: PokemonForGameSet = {
    obtainable: [],
    storable: [],
    transferOnly: [],
    eventOnly: [],
  }

  const pokes = getAllPokemon()

  for (const pkm of pokes) {
    if (pkm.obtainableIn.includes(gameSetId)) {
      data.obtainable.push(pkm)
    }

    if (pkm.storableIn.includes(gameSetId)) {
      data.storable.push(pkm)
    }

    if (pkm.eventOnlyIn.includes(gameSetId)) {
      data.eventOnly.push(pkm)
    }

    if (
      pkm.storableIn.includes(gameSetId) &&
      !pkm.obtainableIn.includes(gameSetId) &&
      !pkm.eventOnlyIn.includes(gameSetId)
    ) {
      data.transferOnly.push(pkm)
    }
  }

  return data
}
export function getExclusivePokemonForGame(gameId: string): Pokemon[] {
  return getAllPokemon()
    .filter((pkm) => {
      return pkm.versionExclusiveIn.some((g: string) => gameId === g)
    })
    .filter((pkm) => pkm.dexNum > 0)
}

export function getPokemonOrFail(id: string): Pokemon {
  const entry = getPokemon(id)

  if (!entry) {
    throw new Error(`No Pokémon entry found for ID ${id}`)
  }

  return validatePokemonOrFail(entry)
}

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

    const dataFileDir = getDataPath(`pokemon/${data.region}`)
    ensureDir(dataFileDir)

    const dataFile = getDataPath(`pokemon/${data.region}/${data.id}.json`)

    writeFileAsJson(dataFile, newPkm)
  }
}

export function updatePokemon(data: UpdatePokemon): void {
  updateManyPokemon([data])
}
