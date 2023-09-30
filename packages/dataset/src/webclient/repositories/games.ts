import { type Game, gameSchema } from '../../schemas'
import { createReadOnlyRepository } from '../core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from '../core/types'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'

export function createGameRepository(dataProvider: RepositoryDataProvider): Repository<Game> {
  return createReadOnlyRepository<Game>({
    id: 'games',
    resourcePath: 'data/games.min.json',
    schema: gameSchema,
    dataProvider: dataProvider,
  })
}

export function createGameSearchEngine(repository: Repository<Game>): SearchEngine<Game> {
  return createSearchEngine<Game>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
