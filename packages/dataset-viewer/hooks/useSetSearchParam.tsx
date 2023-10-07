import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useSetSearchParam(): (key: string, value: string) => void {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  return useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(key, value)
      const queryString = params.toString()

      // Update the URL with the new searchParams
      const newUri = `${pathname}?${queryString}`
      router.push(newUri)
    },
    [searchParams, pathname, router],
  )
}
