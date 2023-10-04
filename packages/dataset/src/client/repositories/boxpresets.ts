import { type BoxPreset, boxPresetSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createBoxPresetRepository(dataProvider: RepositoryDataProvider): Repository<BoxPreset> {
  return createReadOnlyRepository<BoxPreset>({
    id: 'boxpresets',
    resourcePath: 'boxpresets.min.json',
    schema: boxPresetSchema,
    dataProvider: dataProvider,
  })
}

export function createBoxPresetSearchEngine(repository: Repository<BoxPreset>): SearchEngine<BoxPreset> {
  return createSearchEngine<BoxPreset>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
