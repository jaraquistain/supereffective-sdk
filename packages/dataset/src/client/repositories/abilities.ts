import { type Ability, abilitySchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createAbilityRepository(dataProvider: RepositoryDataProvider): Repository<Ability> {
  return createReadOnlyRepository<Ability>({
    id: 'abilities',
    resourcePath: 'abilities.min.json',
    schema: abilitySchema,
    dataProvider: dataProvider,
  })
}

export function createAbilitySearchEngine(repository: Repository<Ability>): SearchEngine<Ability> {
  return createSearchEngine<Ability>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
