import { type Move, moveSchema } from '../../schemas'
import { type SearchEngine, createSearchIndex } from '../search'
import createSearchEngine, { defaultSearchIndexHydrator } from '../search/createSearchEngine'
import { createReadOnlyRepository } from './core/createReadOnlyRepository'
import type { Repository, RepositoryDataProvider } from './core/types'

export function createMoveRepository(dataProvider: RepositoryDataProvider): Repository<Move> {
  return createReadOnlyRepository<Move>({
    id: 'moves',
    resourcePath: 'moves.min.json',
    schema: moveSchema,
    dataProvider: dataProvider,
  })
}

export function createMoveSearchEngine(repository: Repository<Move>): SearchEngine<Move> {
  return createSearchEngine<Move>(repository, createSearchIndex(), defaultSearchIndexHydrator)
}
