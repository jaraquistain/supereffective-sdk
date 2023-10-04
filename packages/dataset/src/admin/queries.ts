import type { Ability, BoxPreset, Item, Move, Pokemon } from '../schemas'
import { localDataLoader } from './loader'

export function getBoxPresets(): BoxPreset[] {
  return localDataLoader.boxPresets()
}

export function getAbilityByShowdownNameOrFail(name: string): Ability {
  const record = localDataLoader.abilitiesByShowdownId().get(name)

  if (!record) {
    throw new Error(`Ability with psName '${name}' not found`)
  }

  return record
}

export function getMoveByShowdownNameOrFail(name: string): Move {
  const record = localDataLoader.movesByShowdownId().get(name)

  if (!record) {
    throw new Error(`Move with psName '${name}' not found`)
  }

  return record
}

export function getItemByShowdownNameOrFail(name: string): Item {
  const record = localDataLoader.itemsByShowdownId().get(name)

  if (!record) {
    throw new Error(`Item with psName '${name}' not found`)
  }

  return record
}

export function getPokemonByShowdownNameOrFail(name: string): Pokemon {
  const pkm = localDataLoader.pokemon().get(name)
  if (!pkm) {
    throw Error(`Pokémon with psName '${name}' not found`)
  }

  return pkm
}

export function getPokemonList(): Pokemon[] {
  return Array.from(localDataLoader.pokemon().values())
}
