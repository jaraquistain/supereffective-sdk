import type { LivingDex, LivingDexBoxCell } from '../types'

export function findPokemonInBoxes(
  search: string | number | null,
  dex: LivingDex,
  searchField: keyof LivingDexBoxCell = 'pokemonId',
  matchType: 'exact' | 'starts' | 'ends' | 'contains' = 'exact',
  limit = 0,
): LivingDexBoxCell[] {
  const hits: LivingDexBoxCell[] = []
  for (const [, box] of dex.boxes) {
    for (const [, pokemon] of box.pokemon) {
      if (!pokemon || !pokemon.pokemonId) {
        continue
      }

      const fieldValue = pokemon[searchField]
      const fieldValueStr = String(fieldValue ?? '')
      const searchStr = String(search ?? '')

      const found =
        (matchType === 'exact' && fieldValueStr === searchStr) ||
        (matchType === 'starts' && fieldValueStr.startsWith(searchStr)) ||
        (matchType === 'ends' && fieldValueStr.endsWith(searchStr)) ||
        (matchType === 'contains' && fieldValueStr.includes(searchStr))

      if (found) {
        hits.push(pokemon)
      }

      if (limit > 0 && hits.length >= limit) {
        return hits
      }
    }
  }

  return hits
}

export function findFirstPokemonInBoxes(
  search: string | number | null,
  dex: LivingDex,
  searchField: keyof LivingDexBoxCell = 'pokemonId',
  matchType: 'exact' | 'starts' | 'ends' | 'contains' = 'exact',
): LivingDexBoxCell | null {
  const hits = findPokemonInBoxes(search, dex, searchField, matchType, 1).pop()

  return hits ?? null
}
