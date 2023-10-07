import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useSearchParamState(name: string, defaultValue?: string): [string, (value?: string) => void] {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const changeParam = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(searchParams)
      if (value === undefined) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      const queryString = params.toString()

      // Update the URL with the new searchParams
      const newUri = `${pathname}?${queryString}`
      router.push(newUri)
    },
    [name, searchParams, pathname, router],
  )

  const rawValue = searchParams.get(name)
  const currentValue = rawValue ? String(rawValue) : defaultValue ?? ''

  return [currentValue, changeParam]
}
