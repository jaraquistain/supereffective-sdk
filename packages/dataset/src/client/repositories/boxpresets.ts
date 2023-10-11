import { type BoxPreset, type BoxPresetIndexItem, boxPresetSchema } from '../../schemas'
import { fetchCollection, fetchCollectionWithCache } from '../providers'
import { createRepositoryClient, findResourceById, findResourcesByIds, getResource, getResourceById } from './_base'
import type { Repository, RepositoryDataProvider } from './_types'

export function createBoxPresetRepository(dataProvider: RepositoryDataProvider): Repository<BoxPreset> {
  return createRepositoryClient<BoxPreset>({
    id: 'boxpresets',
    resourcePath: 'boxpresets.min.json',
    schema: boxPresetSchema,
    dataProvider: dataProvider,
  })
}

// -------------------------------- Functional API -----------------------------------------------
const _memCache: {
  collection: Map<string, BoxPreset[]>
} = {
  collection: new Map(),
}

export async function getAllBoxPresets(baseUrl?: string): Promise<BoxPreset[]> {
  return fetchCollectionWithCache<BoxPreset>(_memCache, 'boxpresets.min.json', baseUrl)
}

export async function getBoxPresetById(id: string, baseUrl?: string): Promise<BoxPreset> {
  return getAllBoxPresets(baseUrl).then((records) => getResourceById(records, id, 'Box Preset'))
}

export async function findBoxPresetById(id: string, baseUrl?: string): Promise<BoxPreset | undefined> {
  return getAllBoxPresets(baseUrl).then((records) => findResourceById(records, id))
}

export async function findBoxPresetsByIds(ids: Array<string>, baseUrl?: string): Promise<BoxPreset[]> {
  return getAllBoxPresets(baseUrl).then((records) => findResourcesByIds(records, ids))
}

// Memory-optimized functions (avoids fetching the whole collection):
export async function fetchBoxPresetIndex(baseUrl?: string): Promise<BoxPresetIndexItem[]> {
  return fetchCollection<BoxPresetIndexItem>('boxpresets-index.min.json', baseUrl)
}

export async function fetchBoxPreset(id: string, gameSetId: string, baseUrl?: string): Promise<BoxPreset> {
  return getResource<BoxPreset>('boxpresets', gameSetId, id, baseUrl, 'Box Preset')
}
