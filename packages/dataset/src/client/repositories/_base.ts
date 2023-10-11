import { fetchResource } from '../providers'
import type { Entity, Repository, RepositoryConfig } from './_types'

/**
 * @deprecated Use functional API instead (individual functions)
 */
export function createRepositoryClient<R extends Entity>(config: RepositoryConfig<R>): Repository<R> {
  const getAll = async () => {
    return await config.dataProvider.readFile<R>(config.resourcePath)
  }

  const repo: Repository<R> = {
    id: config.id,
    async getAll() {
      return await getAll()
    },
    async getById(id) {
      const data = await getAll()
      const found = data.find((item) => item.id === id)

      if (!found) {
        throw new Error(`${config.id} with id ${id} not found`)
      }

      return found
    },
    async findById(id) {
      return getAll().then((data) => data.find((item) => item.id === id))
    },
    async getManyByIds(ids) {
      return getAll().then((data) => data.filter((item) => ids.includes(item.id)))
    },
  }

  return repo
}

export function getSiblingEntities<R extends Entity = Entity>(
  collection: R[],
  id: string,
): {
  prev: R | null
  next: R | null
} {
  const index = collection.findIndex((entity) => entity.id === id)
  const prev = index <= 0 ? null : collection[index - 1]
  const next = index < collection.length - 1 ? collection[index + 1] : null

  return {
    prev: prev ?? null,
    next: next ?? null,
  }
}

export function findResourceByField<R extends Entity = Entity>(
  collection: Array<R>,
  field: keyof R,
  value: string | number | boolean | undefined | null,
): R | undefined {
  return collection.find((ability) => ability[field] === value)
}

export function findResourceById<R extends Entity = Entity>(collection: Array<R>, id: string): R | undefined {
  return findResourceByField<R>(collection, 'id', id)
}

export function findResourcesByIds<R extends Entity = Entity>(collection: Array<R>, ids: Array<string>): Array<R> {
  return collection.filter((ability) => ids.includes(ability.id))
}

export function getResourceByField<R extends Entity = Entity>(
  collection: Array<R>,
  field: keyof R,
  id: string,
  title = 'Resource',
): R {
  const found = findResourceByField<R>(collection, field, id)

  if (!found) {
    throw new Error(`${title} with ${String(field)} = ${id} not found`)
  }

  return found
}

export function getResourceById<R extends Entity = Entity>(collection: Array<R>, id: string, title = 'Resource'): R {
  const found = findResourceById<R>(collection, id)

  if (!found) {
    throw new Error(`${title} with ID = ${id} not found`)
  }

  return found
}

export async function findResource<R extends Entity = Entity>(
  dirName: string,
  groupId: string,
  id: string,
  baseUrl?: string,
): Promise<R | undefined> {
  return fetchResource<R>(`${dirName}/${groupId}/${id}.min.json`, baseUrl).catch((e) => {
    if (String(e).includes('HTTP error 404')) {
      return undefined
    }

    throw e
  })
}

export async function getResource<R extends Entity = Entity>(
  dirName: string,
  groupId: string,
  id: string,
  baseUrl?: string,
  title = 'Resource',
): Promise<R> {
  const found = await findResource<R>(dirName, groupId, id, baseUrl)

  if (!found) {
    throw new Error(`${title} ${dirName}/${groupId}/${id}.min.json not found`)
  }

  return found
}
