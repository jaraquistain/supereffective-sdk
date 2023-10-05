import { findPokemonInBoxesById } from './helpers'
import { type MiddlewareContext, createMiddlewarePipeline } from './middleware'
import type { DeserializedLivingDexDoc } from './types'

function _mw_FixMausholdIds({ dex }: MiddlewareContext<DeserializedLivingDexDoc>): DeserializedLivingDexDoc {
  const mausholdFourHits = findPokemonInBoxesById('maushold-four', dex)
  const mausholdThreeHits = findPokemonInBoxesById('maushold', dex)
  const shouldSwitch = mausholdFourHits.length > 0 && mausholdThreeHits.length > 0

  if (!shouldSwitch) {
    return dex
  }

  for (const [boxIndex, pokemonIndex] of mausholdFourHits) {
    // @ts-ignore
    dex.boxes[boxIndex].pokemon[pokemonIndex].id = 'maushold'
  }

  for (const [boxIndex, pokemonIndex] of mausholdThreeHits) {
    // @ts-ignore
    dex.boxes[boxIndex].pokemon[pokemonIndex].id = 'maushold-three'
  }

  return dex
}

export const applyDefaultMiddlewares = createMiddlewarePipeline(_mw_FixMausholdIds)
