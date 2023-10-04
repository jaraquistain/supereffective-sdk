import { type Pokedex, pokedexSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createPokedexRepository(dataProvider: RepositoryDataProvider): Repository<Pokedex> {
  return createReadOnlyRepository<Pokedex>({
    id: 'pokedexes',
    resourcePath: 'pokedexes.min.json',
    schema: pokedexSchema,
    dataProvider: dataProvider,
  })
}

export function createPokedexSearchEngine(repository: Repository<Pokedex>): SearchEngine<Pokedex> {
  return createSearchEngine<Pokedex>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
