import type { Location } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { findResourceById, findResourcesByIds, getResourceById } from './_base'

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Location[]>
} = {
  collection: new Map(),
}

export async function getAllLocations(baseUrl: string): Promise<Location[]> {
  return fetchCollectionWithCache<Location>(_memCache, 'locations.min.json', baseUrl)
}

export async function getLocationById(id: string, baseUrl: string): Promise<Location> {
  return getAllLocations(baseUrl).then((records) => getResourceById(records, id, 'Location'))
}

export async function findLocationById(id: string, baseUrl: string): Promise<Location | undefined> {
  return getAllLocations(baseUrl).then((records) => findResourceById(records, id))
}

export async function findLocationsByIds(ids: Array<string>, baseUrl: string): Promise<Location[]> {
  return getAllLocations(baseUrl).then((records) => findResourcesByIds(records, ids))
}
