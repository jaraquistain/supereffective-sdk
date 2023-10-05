import { type Pokemon, createHttpDataProvider, createPokemonRepository } from '@supeffective/dataset'
import type { LivingDex, LivingDexBox, LivingDexBoxCell } from '@supeffective/dextracker'
import { getUiAssetsUrl } from '@supeffective/ui'

function buildPokemonUid(id: string, boxNum: number, cellNum: number): string {
  return `${id}_${boxNum}-${cellNum}`
}

function transformPoke(idx: number, boxNum: number, cellNum: number, pokes: Pokemon[]): LivingDexBoxCell {
  const poke = pokes[idx]
  if (!poke) {
    throw new Error('No pokemon found')
  }

  return {
    pokemonId: poke.nid,
    state: {
      caught: Math.random() > 0.2,
      shiny: Math.random() > 0.51,
    },
    position: [boxNum, cellNum],
    uid: buildPokemonUid(poke.nid, boxNum, cellNum),
  }
}

function getRandomPoke(boxNum: number, cellNum: number, pokes: Pokemon[]): LivingDexBoxCell {
  const idx = Math.floor(Math.random() * pokes.length)

  return transformPoke(idx, boxNum, cellNum, pokes)
}

export async function generateBoxes(quantity = 200, boxCapacity = 30): Promise<LivingDexBox[]> {
  const allPokes = await createPokemonRepository(createHttpDataProvider(getUiAssetsUrl())).getAll()

  const boxes: LivingDexBox[] = []

  for (let boxNum = 0; boxNum < quantity; boxNum++) {
    const box: LivingDexBox = {
      position: boxNum,
      title: `Box ${boxNum + 1}`,
      pokemon: new Map<number, LivingDexBoxCell>([]),
    }

    for (let cellNum = 0; cellNum < boxCapacity; cellNum++) {
      const pokeIndex = boxNum * boxCapacity + cellNum
      if (pokeIndex >= allPokes.length || !allPokes[pokeIndex]) {
        const poke = getRandomPoke(boxNum, cellNum, allPokes)
        box.pokemon.set(cellNum, poke)
        continue
      }

      box.pokemon.set(cellNum, transformPoke(pokeIndex, boxNum, cellNum, allPokes))
    }

    boxes.push(box)
  }

  return boxes
}

export async function generateLivingDex(quantity = 200, boxCapacity = 30): Promise<LivingDex> {
  const boxes: LivingDexBox[] = await generateBoxes(quantity, boxCapacity)

  const livingDex: LivingDex = {
    gameId: 'home',
    title: 'Random Living Dex',
    ownerId: 'me',
    uid: 'my-living-dex',
    boxes: new Map<number, LivingDexBox>(boxes.map((b) => [b.position, b])),
  }

  return livingDex
}
