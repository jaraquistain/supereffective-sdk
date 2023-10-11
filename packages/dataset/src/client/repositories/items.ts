import type { Item } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { findResourceById, findResourcesByIds, getResourceById } from './_base'

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Item[]>
} = {
  collection: new Map(),
}

export async function getAllItems(baseUrl: string): Promise<Item[]> {
  return fetchCollectionWithCache<Item>(_memCache, 'items.min.json', baseUrl)
}

export async function getItemById(id: string, baseUrl: string): Promise<Item> {
  return getAllItems(baseUrl).then((records) => getResourceById(records, id, 'Item'))
}

export async function findItemById(id: string, baseUrl: string): Promise<Item | undefined> {
  return getAllItems(baseUrl).then((records) => findResourceById(records, id))
}

export async function findItemsByIds(ids: Array<string>, baseUrl: string): Promise<Item[]> {
  return getAllItems(baseUrl).then((records) => findResourcesByIds(records, ids))
}
