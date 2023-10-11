import { type Ribbon, ribbonSchema } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { createRepositoryClient, findResourceById, findResourcesByIds, getResourceById } from './_base'
import type { Repository, RepositoryDataProvider } from './_types'

export function createRibbonRepository(dataProvider: RepositoryDataProvider): Repository<Ribbon> {
  return createRepositoryClient<Ribbon>({
    id: 'ribbons',
    resourcePath: 'ribbons.min.json',
    schema: ribbonSchema,
    dataProvider: dataProvider,
  })
}

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Ribbon[]>
} = {
  collection: new Map(),
}

export async function getAllRibbons(baseUrl?: string): Promise<Ribbon[]> {
  return fetchCollectionWithCache<Ribbon>(_memCache, 'ribbons.min.json', baseUrl)
}

export async function getRibbonById(id: string, baseUrl?: string): Promise<Ribbon> {
  return getAllRibbons(baseUrl).then((records) => getResourceById(records, id, 'Ribbon'))
}

export async function findRibbonById(id: string, baseUrl?: string): Promise<Ribbon | undefined> {
  return getAllRibbons(baseUrl).then((records) => findResourceById(records, id))
}

export async function findRibbonsByIds(ids: Array<string>, baseUrl?: string): Promise<Ribbon[]> {
  return getAllRibbons(baseUrl).then((records) => findResourcesByIds(records, ids))
}
