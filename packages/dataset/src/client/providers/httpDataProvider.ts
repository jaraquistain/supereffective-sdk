import type { Entity } from '../repositories'
import type { InMemoryCache, NextCompatibleRequestInit } from './types'

function _resolveUri(relativePath: string, baseUrl: string): string {
  return `${baseUrl}/${relativePath.replace(/^\//, '')}`
}

function _buildRequestInit(relativePath: string): NextCompatibleRequestInit {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: [`dataset:${relativePath}`],
    },
  }
}

async function _fetch<T>(relativePath: string, baseUrl: string): Promise<T> {
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

export async function fetchCollection<R extends Entity = Entity>(
  relativePath: string,
  baseUrl: string,
): Promise<Array<R>> {
  return _fetch(relativePath, baseUrl)
}

export async function fetchCollectionWithCache<R extends Entity = Entity>(
  cache: InMemoryCache<R>,
  relativePath: string,
  baseUrl: string,
): Promise<R[]> {
  const cacheId = baseUrl
  let data = cache.collection.get(cacheId)

  if (!data) {
    cache.collection = new Map() // reset cache for other baseUrls to avoid memory leaks
    data = await fetchCollection<R>(relativePath, baseUrl)
  }

  cache.collection.set(cacheId, data)
  return data
}

export async function fetchResource<R extends Entity = Entity>(relativePath: string, baseUrl: string): Promise<R> {
  return _fetch(relativePath, baseUrl)
}
