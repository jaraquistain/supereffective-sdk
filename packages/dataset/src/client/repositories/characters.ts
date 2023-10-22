import type { Character } from '../../schemas'
import { fetchCollectionWithCache } from '../providers'
import { findResourceById, findResourcesByIds, getResourceById } from './_base'

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, Character[]>
} = {
  collection: new Map(),
}

export async function getAllCharacters(baseUrl: string): Promise<Character[]> {
  return fetchCollectionWithCache<Character>(_memCache, 'characters.min.json', baseUrl)
}

export async function getCharacterById(id: string, baseUrl: string): Promise<Character> {
  return getAllCharacters(baseUrl).then((records) => getResourceById(records, id, 'Character'))
}

export async function findCharacterById(id: string, baseUrl: string): Promise<Character | undefined> {
  return getAllCharacters(baseUrl).then((records) => findResourceById(records, id))
}

export async function findCharactersByIds(ids: Array<string>, baseUrl: string): Promise<Character[]> {
  return getAllCharacters(baseUrl).then((records) => findResourcesByIds(records, ids))
}
