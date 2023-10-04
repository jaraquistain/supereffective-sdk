import { type Ribbon, ribbonSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createRibbonRepository(dataProvider: RepositoryDataProvider): Repository<Ribbon> {
  return createReadOnlyRepository<Ribbon>({
    id: 'ribbons',
    resourcePath: 'ribbons.min.json',
    schema: ribbonSchema,
    dataProvider: dataProvider,
  })
}

export function createRibbonSearchEngine(repository: Repository<Ribbon>): SearchEngine<Ribbon> {
  return createSearchEngine<Ribbon>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
