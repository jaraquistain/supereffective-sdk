import { ReactNode } from 'react'

export type PageProps<K extends Array<string> = []> = {
  params: {
    [key in K[number]]: string
  }
}

export type LayoutProps<K extends Array<string> = []> = {
  children: ReactNode
} & {
  [key in K[number]]: ReactNode
}
