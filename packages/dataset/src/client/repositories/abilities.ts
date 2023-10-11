import { type Ability, abilitySchema } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { createRepositoryClient, findResourceById, findResourcesByIds, getResourceById } from './_base'
import type { Repository, RepositoryDataProvider } from './_types'

export function createAbilityRepository(dataProvider: RepositoryDataProvider): Repository<Ability> {
  return createRepositoryClient<Ability>({
    id: 'abilities',
    resourcePath: 'abilities.min.json',
    schema: abilitySchema,
    dataProvider: dataProvider,
  })
}

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Ability[]>
} = {
  collection: new Map(),
}

export async function getAllAbilities(baseUrl?: string): Promise<Ability[]> {
  return fetchCollectionWithCache<Ability>(_memCache, 'abilities.min.json', baseUrl)
}

export async function findAbilityById(id: string, baseUrl?: string): Promise<Ability | undefined> {
  return getAllAbilities(baseUrl).then((records) => findResourceById(records, id))
}

export async function getAbilityById(id: string, baseUrl?: string): Promise<Ability> {
  return getAllAbilities(baseUrl).then((records) => getResourceById(records, id, 'Ability'))
}

export async function findAbilitiesByIds(ids: Array<string>, baseUrl?: string): Promise<Ability[]> {
  return getAllAbilities(baseUrl).then((records) => findResourcesByIds(records, ids))
}
