import type { Ability, BoxPreset, Item, Location, Mark, Move, Pokedex, Pokemon, PokemonIndex, Ribbon } from '../schemas'
import { createHttpDataProvider } from './providers'
import {
  type Repository,
  createAbilityRepository,
  createBoxPresetRepository,
  createItemRepository,
  createLocationRepository,
  createMarkRepository,
  createMoveRepository,
  createPokedexRepository,
  createPokemonIndexRepository,
  createPokemonRepository,
  createPokemonSearchEngine,
  createRibbonRepository,
} from './repositories'
import type { SearchEngine } from './search'
import type { AssetUrlResolver, ImageUrlResolver } from './types'
import { createDataUrlResolver, createImageUrlResolver } from './urlResolvers'

export type DatasetClientConfig = {
  baseDataUrl: string
  baseImageUrl: string
}

export type DatasetSearchClient = {
  pokemon: SearchEngine<Pokemon>
}

export type DatasetClient = {
  config: DatasetClientConfig
  search: DatasetSearchClient
  pokemon: Repository<Pokemon>
  pokemonIndex: Repository<PokemonIndex>
  pokedexes: Repository<Pokedex>
  boxPresets: Repository<BoxPreset>
  abilities: Repository<Ability>
  moves: Repository<Move>
  items: Repository<Item>
  marks: Repository<Mark>
  ribbons: Repository<Ribbon>
  locations: Repository<Location>
  urls: {
    data: AssetUrlResolver
    images: ImageUrlResolver
  }
}

export function createDatasetClient(
  config: DatasetClientConfig = {
    baseDataUrl: '/data',
    baseImageUrl: '/assets/images',
  },
): DatasetClient {
  const pokemonRepo = createPokemonRepository(createHttpDataProvider(config.baseDataUrl))

  const client: DatasetClient = {
    config,
    search: {
      pokemon: createPokemonSearchEngine(pokemonRepo),
    },
    pokemon: pokemonRepo,
    pokemonIndex: createPokemonIndexRepository(createHttpDataProvider(config.baseDataUrl)),
    pokedexes: createPokedexRepository(createHttpDataProvider(config.baseDataUrl)),
    boxPresets: createBoxPresetRepository(createHttpDataProvider(config.baseDataUrl)),
    abilities: createAbilityRepository(createHttpDataProvider(config.baseDataUrl)),
    moves: createMoveRepository(createHttpDataProvider(config.baseDataUrl)),
    items: createItemRepository(createHttpDataProvider(config.baseDataUrl)),
    marks: createMarkRepository(createHttpDataProvider(config.baseDataUrl)),
    ribbons: createRibbonRepository(createHttpDataProvider(config.baseDataUrl)),
    locations: createLocationRepository(createHttpDataProvider(config.baseDataUrl)),
    urls: {
      images: createImageUrlResolver(config.baseImageUrl),
      data: createDataUrlResolver(config.baseDataUrl),
    },
  }

  return client
}
