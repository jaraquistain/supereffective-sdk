import type { jest } from 'bun:test'

export type Mocked<T> = T extends (...args: any) => any
  ? jest.Mock<T>
  : {
      [P in keyof T]: T[P] extends (...args: any) => any ? jest.Mock<T[P]> : T[P]
    }

export function mocked<T>(item: T | Partial<T>): Mocked<T> & typeof item {
  return item as Mocked<T> & typeof item
}
