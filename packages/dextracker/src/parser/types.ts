import type { TypedCSVTypeToken } from './parser-tscv'

export const LIVINGDEX_DOC_SPEC_VERSIONS = ['v4'] as const

export type LivingDexDocSpecVersion = typeof LIVINGDEX_DOC_SPEC_VERSIONS[number]

export const LIVINGDEX_DOC_SPEC_VERSION_LAST: LivingDexDocSpecVersion = 'v4'

export type SemverVersion = `${number}` | `${number}.${number}` | `${number}.${number}.${number}`

export type BaseDocument = {
  // id from Firestore:
  id?: string
  // these are custom properties that are indexed:
  userId?: string
  createdAt?: Date
  updatedAt?: Date
} & Record<string, unknown>

export type BaseUserDocument = BaseDocument

export type LivingDexDocSpecPropType = TypedCSVTypeToken | 'string:slug' | 'string:slug[]'

export interface DeserializedLivingDexDoc extends LivingDexDocMeta {
  boxes: LivingDexDocBox[]
}

export interface LivingDexDocMeta {
  $id?: string
  format: LivingDexDocSpecVersion
  title: string
  // gameId: GameId
  gameId: string
  ownerId: string
  creationTime: string
  lastUpdateTime: string
  legacyPresetId?: string
  legacyPresetVersion?: number
}

export type LivingDexDocBoxByFormat<T extends LivingDexDocSpecVersion> = T extends 'v4' ? LivingDexDocBox : never

export interface LivingDexDocBox {
  title: string
  shiny: boolean
  pokemon: (LivingDexDocPokemon | null)[]
}

export interface LivingDexDocPokemon {
  id: string
  // id: PokemonId
  captured: boolean
  shiny: boolean
  // originMark?: OriginMarkId
  originMark?: string
  nature?: string
  // nature?: NatureId
  pokerus?: 'infected' | 'cured'
  level?: number
  dynamaxLevel?: number
  teraType?: string
  // teraType?: PokemonTypeId
  ball?: string
  item?: string
  // item?: ItemId
  language?: string
  evs: [number, number, number, number, number, number] | []
  ivs: [number, number, number, number, number, number] | []
  moves: [string, string, string, string] | []
  // moves: [MoveId, MoveId, MoveId, MoveId] | []
  emblemMarks: string[]
}

// export interface LivingDexDocGameConfig {
//   gameId: GameId
//   boxes: number
//   boxCapacity: number
// }

export interface LivingDexDocSpecConfig {
  version: LivingDexDocSpecVersion
  arrayDelimiters: [string, string]
  arraySeparator: string
  propertySeparator: string
  boxPrefix: string
  pokemonPrefix: string
  boxProperties: [keyof LivingDexDocBox, LivingDexDocSpecPropType][]
  pokemonProperties: [keyof LivingDexDocPokemon, LivingDexDocSpecPropType][]
}

export type LivingDexDocSpecs = Map<LivingDexDocSpecVersion, LivingDexDocSpecConfig>
