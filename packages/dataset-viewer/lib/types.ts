import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export const searchParamKeys = ['gen', 'forms', 'region', 'lang', 'labels', 'table'] as const
export type AppSearchParamKeys = typeof searchParamKeys

export type PageProps<P extends Array<string> = [], S extends AppSearchParamKeys = AppSearchParamKeys> = {
  params: {
    [key in P[number]]: string
  }
  searchParams: {
    [key2 in S[number]]: string | undefined
  }
}

export type LayoutProps<K extends Array<string> = []> = {
  children: ReactNode
} & {
  [key in K[number]]: ReactNode
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ResponsiveSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full'
export type FontType = 'sans' | 'comic' | 'mono'
export type Orientation = 'vertical' | 'horizontal'

export type PropsOf<T extends ElementType> = ComponentPropsWithoutRef<T>
export type PropsWithRefOf<T extends ElementType> = ComponentPropsWithRef<T>
