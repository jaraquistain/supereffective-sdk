'use client'

import { createQueryString } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ComponentProps } from 'react'

type StatefulLinkProps = ComponentProps<typeof Link> & {
  params?: Record<string, string | number | null | undefined>
}
export function StatefulLink(props: StatefulLinkProps) {
  const { children, href, params, ...rest } = props
  const searchParams = Object.fromEntries(useSearchParams().entries())
  const qs = createQueryString({
    ...searchParams,
    ...params,
  })
  const url = `${href}${qs}`

  return (
    <Link href={url} {...rest}>
      {children}
    </Link>
  )
}
