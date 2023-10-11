import type { Entity } from '../repositories'
import type { RepositoryDataProvider } from '../repositories/_types'
import type { DatasetClientConfig, InMemoryCache, NextCompatibleRequestInit } from './types'

const _defaultDatasetClientConfig: DatasetClientConfig = {
  baseDataUrl: '/data/',
  baseImageUrl: '/assets/images/',
  dataHeaders: {
    'Content-Type': 'application/json',
  },
}

const _datasetClientConfig: DatasetClientConfig = {
  ..._defaultDatasetClientConfig,
  dataHeaders: {
    ..._defaultDatasetClientConfig.dataHeaders,
  },
}

function _resolveUri(relativePath: string, baseUrl?: string): string {
  return `${baseUrl ?? _datasetClientConfig.baseDataUrl}/${relativePath.replace(/^\//, '')}`
}

function _buildRequestInit(relativePath: string): NextCompatibleRequestInit {
  return {
    method: 'GET',
    headers: _datasetClientConfig.dataHeaders,
    next: {
      tags: [`dataset:${relativePath}`],
    },
  }
}

async function _fetch<T>(relativePath: string, baseUrl?: string): Promise<T> {
  const url = _resolveUri(relativePath, baseUrl)
  const requestInit = _buildRequestInit(relativePath)

  const data = await fetch(url, requestInit).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status} on GET ${res.url}`)
    }

    return res.text()
  })

  const parsedData = JSON.parse(data)

  return parsedData
}

export function configureDatasetClient(config: Partial<DatasetClientConfig>): void {
  Object.assign(_datasetClientConfig, config)
}

export async function fetchCollection<R extends Entity = Entity>(
  relativePath: string,
  baseUrl?: string,
): Promise<Array<R>> {
  return _fetch(relativePath, baseUrl)
}

export async function fetchCollectionWithCache<R extends Entity = Entity>(
  cache: InMemoryCache<R>,
  relativePath: string,
  baseUrl?: string,
): Promise<R[]> {
  const cacheId = baseUrl ?? _datasetClientConfig.baseDataUrl
  let data = cache.collection.get(cacheId)

  if (!data) {
    cache.collection = new Map() // reset cache for other baseUrls to avoid memory leaks
    data = await fetchCollection<R>(relativePath, baseUrl)
  }

  cache.collection.set(cacheId, data)
  return data
}

export async function fetchResource<R extends Entity = Entity>(relativePath: string, baseUrl?: string): Promise<R> {
  return _fetch(relativePath, baseUrl)
}

/**
 * @deprecated Use `fetchCollection` or `fetchResource` instead.
 */
export function createHttpDataProvider(baseUrl: string): RepositoryDataProvider {
  return {
    id: 'http',
    baseUri: baseUrl,
    resolveUri(relativePath) {
      return `${baseUrl}/${relativePath.replace(/^\//, '')}`
    },
    async readFile(relativePath) {
      return _fetch(relativePath, baseUrl)
    },
  }
}
