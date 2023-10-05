import type { Pokemon, PokemonIndex } from '../schemas'
import { createHttpDataProvider } from './providers'
import {
  type Repository,
  createPokemonIndexRepository,
  createPokemonRepository,
  createPokemonSearchEngine,
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
    urls: {
      images: createImageUrlResolver(config.baseImageUrl),
      data: createDataUrlResolver(config.baseDataUrl),
    },
  }

  return client
}
