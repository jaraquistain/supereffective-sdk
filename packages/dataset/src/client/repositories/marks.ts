import { type Mark, markSchema } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { createRepositoryClient, findResourceById, findResourcesByIds, getResourceById } from './_base'
import type { Repository, RepositoryDataProvider } from './_types'

export function createMarkRepository(dataProvider: RepositoryDataProvider): Repository<Mark> {
  return createRepositoryClient<Mark>({
    id: 'marks',
    resourcePath: 'marks.min.json',
    schema: markSchema,
    dataProvider: dataProvider,
  })
}

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Mark[]>
} = {
  collection: new Map(),
}

export async function getAllMarks(baseUrl?: string): Promise<Mark[]> {
  return fetchCollectionWithCache<Mark>(_memCache, 'marks.min.json', baseUrl)
}

export async function getMarkById(id: string, baseUrl?: string): Promise<Mark> {
  return getAllMarks(baseUrl).then((records) => getResourceById(records, id, 'Mark'))
}

export async function findMarkById(id: string, baseUrl?: string): Promise<Mark | undefined> {
  return getAllMarks(baseUrl).then((records) => findResourceById(records, id))
}

export async function findMarksByIds(ids: Array<string>, baseUrl?: string): Promise<Mark[]> {
  return getAllMarks(baseUrl).then((records) => findResourcesByIds(records, ids))
}
