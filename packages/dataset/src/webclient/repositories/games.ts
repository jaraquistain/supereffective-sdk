import { type GameV2, gameSchemaV2 } from '../../schemas'
import { createReadOnlyRepository } from '../core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from '../core/types'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'

export function createGameRepository(dataProvider: RepositoryDataProvider): Repository<GameV2> {
  return createReadOnlyRepository<GameV2>({
    id: 'games',
    resourcePath: 'data/games.min.json',
    schema: gameSchemaV2,
    dataProvider: dataProvider,
  })
}

export function createGameSearchEngine(repository: Repository<GameV2>): SearchEngine<GameV2> {
  return createSearchEngine<GameV2>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
