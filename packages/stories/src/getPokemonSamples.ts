import { type Pokemon, createHttpDataProvider, createPokemonRepository } from '@supeffective/dataset'
import type { ResolvedLivingDexBoxCell } from '@supeffective/dextracker'
import { DATA_URL } from './utils'

export async function getPokemonSamples(
  pokeIds: string[] = [
    'keldeo-resolute',
    'alcremie-matcha-cream-strawberry',
    'eternatus-eternamax',
    'oinkologne-f',
    'miraidon',
    'poltchageist',
  ],
): Promise<Pokemon[]> {
  const repo = createPokemonRepository(createHttpDataProvider(DATA_URL))

  return await repo.getManyByIds(pokeIds)
}

export async function getPokemonCellSamples(
  pokeIds: (string | null)[] = [
    'keldeo-resolute',
    'alcremie-matcha-cream-strawberry',
    'eternatus-eternamax',
    'oinkologne-f',
    'miraidon',
    'poltchageist',
  ],
): Promise<ResolvedLivingDexBoxCell[]> {
  const repo = createPokemonRepository(createHttpDataProvider(DATA_URL))
  const pokemonMap = new Map<string, Pokemon>(
    (await repo.getManyByIds(pokeIds.filter(Boolean) as string[])).map((p) => [p.id, p]),
  )

  return pokeIds.flatMap((pokeId, idx): ResolvedLivingDexBoxCell[] => {
    if (!pokeId) {
      return [
        {
          pokemon: null,
          position: [0, idx],
          uid: `empty-${idx}`,
          state: {
            caught: false,
            shiny: false,
          },
        },
      ]
    }

    const poke = pokemonMap.get(pokeId)
    if (!poke) {
      throw new Error(`Could not find pokemon with id ${pokeId}`)
    }

    return [
      {
        pokemon: poke,
        position: [0, idx],
        uid: `${poke.id}-${idx}`,
        state: {
          caught: true,
          shiny: false,
        },
      },
      {
        pokemon: poke,
        position: [0, idx],
        uid: `${poke.id}-${idx}_shiny`,
        state: {
          caught: true,
          shiny: true,
        },
      },
    ]
  })
}
