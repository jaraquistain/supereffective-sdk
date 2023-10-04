import { type Item, itemSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createItemRepository(dataProvider: RepositoryDataProvider): Repository<Item> {
  return createReadOnlyRepository<Item>({
    id: 'items',
    resourcePath: 'items.min.json',
    schema: itemSchema,
    dataProvider: dataProvider,
  })
}

export function createItemSearchEngine(repository: Repository<Item>): SearchEngine<Item> {
  return createSearchEngine<Item>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
