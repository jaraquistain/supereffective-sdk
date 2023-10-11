import { type Move, moveSchema } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { createRepositoryClient, findResourceById, findResourcesByIds, getResourceById } from './_base'
import type { Repository, RepositoryDataProvider } from './_types'

export function createMoveRepository(dataProvider: RepositoryDataProvider): Repository<Move> {
  return createRepositoryClient<Move>({
    id: 'moves',
    resourcePath: 'moves.min.json',
    schema: moveSchema,
    dataProvider: dataProvider,
  })
}

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Move[]>
} = {
  collection: new Map(),
}

export async function getAllMoves(baseUrl?: string): Promise<Move[]> {
  return fetchCollectionWithCache<Move>(_memCache, 'moves.min.json', baseUrl)
}

export async function getMoveById(id: string, baseUrl?: string): Promise<Move> {
  return getAllMoves(baseUrl).then((records) => getResourceById(records, id, 'Move'))
}

export async function findMoveById(id: string, baseUrl?: string): Promise<Move | undefined> {
  return getAllMoves(baseUrl).then((records) => findResourceById(records, id))
}

export async function findMovesByIds(ids: Array<string>, baseUrl?: string): Promise<Move[]> {
  return getAllMoves(baseUrl).then((records) => findResourcesByIds(records, ids))
}
