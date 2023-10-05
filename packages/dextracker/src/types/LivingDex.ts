import type { Pokemon } from '@supeffective/dataset'

// TODO: create Zod schemas

export type LivingDex<P = LivingDexBoxCell> = {
  uid?: string
  ownerId?: string
  title: string
  gameId: string
  boxes: Map<number, LivingDexBox<P>>
}

export type ResolvedLivingDex = LivingDex<ResolvedLivingDexBoxCell> & {
  totalPokemon: {
    nonShiny: number
    nonShinyCaught: number
    shiny: number
    shinyCaught: number
  }
}

export type LivingDexBox<P = LivingDexBoxCell> = {
  position: number
  title?: string
  pokemon: Map<number, P>
}

export type LivingDexPokemonState = {
  caught: boolean
  shiny: boolean
  // teratype, marks, origin, ball, ability, nature, ivs, evs, moves, etc
}

export type GenericBoxCell = {
  /**
   * Unique ID for the cell
   *
   * Example: `p-${boxNum}-${boxSlot}-${nid}` or `p-${boxNum}-${boxSlot}`
   */
  uid: string
  /**
   * Position of the cell in the boxes as [boxIndex, cellIndex]
   */
  position: [number, number]
}

export type LivingDexBoxCell = GenericBoxCell & {
  pokemonId?: string
  state?: LivingDexPokemonState
}

export type UpdateLivingDexBoxCell = Partial<Omit<LivingDexBoxCell, 'state'>> & {
  state?: Partial<LivingDexPokemonState>
}

export type RequiredLivingDexBoxCell = Required<LivingDexBoxCell>

export type ResolvedLivingDexBoxCell = Omit<LivingDexBoxCell, 'pokemonId'> & {
  pokemon: Pokemon | null
}

export type LivingDexRepository = {
  getById: (id: string) => Promise<LivingDex | null>
  getByOwnerId: (ownerId: string) => Promise<Array<LivingDex>>
  save: (dex: LivingDex) => Promise<LivingDex>
  delete: (id: string) => Promise<void>
}
