import type { Game, Pokemon } from '@supeffective/dataset'

import type { LivingDex, LivingDexBox, LivingDexBoxCell } from '../types'

export function createLivingDexForGame(game: Game, pokemon: Pokemon[], genStartsNewBox = false): LivingDex {
  const maxBoxes = game.storage.numBoxes
  const slotsPerBox = game.storage.boxCapacity

  const boxes = new Map<number, LivingDexBox>()

  // init boxes filling them with empty slots:
  for (let boxNum = 0; boxNum < maxBoxes; boxNum++) {
    const box: LivingDexBox = {
      position: boxNum,
      title: `Box ${boxNum + 1}`,
      pokemon: new Map<number, LivingDexBoxCell>(),
    }
    for (let boxSlot = 0; boxSlot < slotsPerBox; boxSlot++) {
      box.pokemon.set(boxSlot, {
        uid: `p-${boxNum}-${boxSlot}`,
        position: [boxNum, boxSlot],
        pokemonId: undefined,
        state: undefined,
      })
    }
    boxes.set(boxNum, box)
  }

  // fill boxes with pokemon:
  let currentBox = 0
  let currentSlot = 0
  let lastGen = 0

  const pokemonStorable = pokemon.filter(
    (p) => p.storableIn.includes(game.id) || (game.gameSet && p.storableIn.includes(game.gameSet)),
  )

  for (const p of pokemonStorable) {
    const box = boxes.get(currentBox)
    if (!box) {
      throw new Error(`Box ${currentBox} not found`)
    }
    const slotData: LivingDexBoxCell = {
      uid: `p-${currentBox}-${currentSlot}-${p.nid}`,
      pokemonId: p.nid,
      position: [currentBox, currentSlot],
      state: {
        caught: false,
        shiny: false,
      },
    }

    box.pokemon.set(currentSlot, slotData)
    currentSlot++

    const shouldIncrementBox = currentSlot >= slotsPerBox && currentBox < maxBoxes - 1
    const isNewGen = p.generation > lastGen

    if (shouldIncrementBox || (genStartsNewBox && isNewGen)) {
      currentSlot = 0
      currentBox++
    }

    if (isNewGen) {
      lastGen = p.generation
    }

    const shouldBreak = currentBox >= maxBoxes - 1
    if (shouldBreak) {
      break
    }
  }

  return {
    title: game.name,
    gameId: game.id,
    boxes,
  }
}
