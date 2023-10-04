import { type Mark, markSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createMarkRepository(dataProvider: RepositoryDataProvider): Repository<Mark> {
  return createReadOnlyRepository<Mark>({
    id: 'marks',
    resourcePath: 'marks.min.json',
    schema: markSchema,
    dataProvider: dataProvider,
  })
}

export function createMarkSearchEngine(repository: Repository<Mark>): SearchEngine<Mark> {
  return createSearchEngine<Mark>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
