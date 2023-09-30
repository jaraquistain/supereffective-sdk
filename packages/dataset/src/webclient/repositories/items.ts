import { type Item, itemSchema } from '../../schemas'
import { createReadOnlyRepository } from '../core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from '../core/types'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'

export function createItemRepository(dataProvider: RepositoryDataProvider): Repository<Item> {
  return createReadOnlyRepository<Item>({
    id: 'items',
    resourcePath: 'data/items.min.json',
    schema: itemSchema,
    dataProvider: dataProvider,
  })
}

export function createItemSearchEngine(repository: Repository<Item>): SearchEngine<Item> {
  return createSearchEngine<Item>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
