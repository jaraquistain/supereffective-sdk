import type {
  Ability,
  BoxPreset,
  Item,
  Location,
  Mark,
  Move,
  Pokedex,
  Pokemon,
  PokemonIndexItem,
  Ribbon,
} from '../schemas'
import { type DatasetClientConfig, createHttpDataProvider } from './providers'
import type { AssetUrlResolver, ImageUrlResolver } from './providers/types'
import { createDataUrlResolver, createImageUrlResolver } from './providers/urlResolvers'
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
  createRibbonRepository,
} from './repositories'

export type DatasetClient = {
  config: DatasetClientConfig
  pokemon: Repository<Pokemon>
  pokemonIndex: Repository<PokemonIndexItem>
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

/**
 * @deprecated Use functional API instead (individual functions)
 */
export function createDatasetClient(
  config: DatasetClientConfig = {
    baseDataUrl: '/data',
    baseImageUrl: '/assets/images',
  },
): DatasetClient {
  const pokemonRepo = createPokemonRepository(createHttpDataProvider(config.baseDataUrl))

  const client: DatasetClient = {
    config,
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
