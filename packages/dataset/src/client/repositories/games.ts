import { type Game, gameSchema } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { createRepositoryClient, findResourceById, findResourcesByIds, getResourceById } from './_base'
import type { Repository, RepositoryDataProvider } from './_types'

export function createGameRepository(dataProvider: RepositoryDataProvider): Repository<Game> {
  return createRepositoryClient<Game>({
    id: 'games',
    resourcePath: 'games.min.json',
    schema: gameSchema,
    dataProvider: dataProvider,
  })
}

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Game[]>
} = {
  collection: new Map(),
}

export async function getAllGames(baseUrl?: string): Promise<Game[]> {
  return fetchCollectionWithCache<Game>(_memCache, 'games.min.json', baseUrl)
}

export async function getGameById(id: string, baseUrl?: string): Promise<Game> {
  return getAllGames(baseUrl).then((records) => getResourceById(records, id, 'Game'))
}

export async function findGameById(id: string, baseUrl?: string): Promise<Game | undefined> {
  return getAllGames(baseUrl).then((records) => findResourceById(records, id))
}

export async function findGamesByIds(ids: Array<string>, baseUrl?: string): Promise<Game[]> {
  return getAllGames(baseUrl).then((records) => findResourcesByIds(records, ids))
}
