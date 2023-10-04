import { type Location, locationSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createLocationRepository(dataProvider: RepositoryDataProvider): Repository<Location> {
  return createReadOnlyRepository<Location>({
    id: 'locations',
    resourcePath: 'locations.min.json',
    schema: locationSchema,
    dataProvider: dataProvider,
  })
}

export function createLocationSearchEngine(repository: Repository<Location>): SearchEngine<Location> {
  return createSearchEngine<Location>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
