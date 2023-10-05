import type { RepositoryDataProvider } from '../repositories/core/types'

export function createHttpDataProvider(baseUrl: string): RepositoryDataProvider {
  return {
    id: 'http',
    baseUri: baseUrl,
    resolveUri(relativePath) {
      return `${baseUrl}/${relativePath.replace(/^\//, '')}`
    },
    async readFile(relativePath) {
      const uri = this.resolveUri(relativePath)
      const lastPart = uri.split('/').pop()

      // @see https://nextjs.org/docs/app/api-reference/functions/revalidateTag#parameters
      const requestInit: RequestInit = {
        next: {
          tags: [lastPart],
        },
      } as any

      const data = await fetch(uri, requestInit).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status} on GET ${res.url}`)
        }

        return res.text()
      })

      const parsedData = JSON.parse(data)

      return parsedData
    },
  }
}
